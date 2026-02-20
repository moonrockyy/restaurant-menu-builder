import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js'
import * as kv from './kv_store.tsx'

const app = new Hono()

// Middleware
app.use('*', cors())
app.use('*', logger(console.log))

// Create Supabase client with service role key
const getSupabaseClient = () => {
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
  
  console.log('=== Supabase Client Debug ===')
  console.log('SUPABASE_URL exists:', !!supabaseUrl)
  console.log('SUPABASE_URL length:', supabaseUrl.length)
  console.log('SUPABASE_SERVICE_ROLE_KEY exists:', !!serviceRoleKey)
  console.log('SERVICE_ROLE_KEY length:', serviceRoleKey.length)
  console.log('SERVICE_ROLE_KEY starts with eyJ:', serviceRoleKey.startsWith('eyJ'))
  console.log('==========================')
  
  return createClient(supabaseUrl, serviceRoleKey)
}

// Health check
app.get('/make-server-b6941cdd/health', (c) => {
  return c.json({ status: 'ok' })
})

// Debug authentication endpoint
app.get('/make-server-b6941cdd/debug-auth', async (c) => {
  try {
    console.log('=== DEBUG AUTH ENDPOINT ===')
    
    const authHeader = c.req.header('Authorization')
    console.log('Auth header:', authHeader ? 'Present' : 'Missing')
    console.log('Auth header value:', authHeader)
    
    if (!authHeader) {
      return c.json({ 
        error: 'No Authorization header found',
        headers: Object.fromEntries(c.req.header()),
        timestamp: new Date().toISOString()
      }, 401)
    }
    
    if (!authHeader.startsWith('Bearer ')) {
      return c.json({ 
        error: 'Invalid Authorization header format. Expected: Bearer <token>',
        received: authHeader,
        timestamp: new Date().toISOString()
      }, 401)
    }
    
    const accessToken = authHeader.split(' ')[1]
    console.log('Access token length:', accessToken.length)
    console.log('Access token starts with eyJ:', accessToken.startsWith('eyJ'))
    
    if (!accessToken) {
      return c.json({ 
        error: 'Access token is empty',
        authHeader: authHeader,
        timestamp: new Date().toISOString()
      }, 401)
    }
    
    const supabase = getSupabaseClient()
    
    // Test token verification
    console.log('Attempting to verify token...')
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    console.log('Token verification result:')
    console.log('Error:', error)
    console.log('User:', user)
    
    if (error) {
      return c.json({ 
        error: 'Token verification failed',
        details: error.message,
        error_code: error.code || 'UNKNOWN',
        token_length: accessToken.length,
        token_starts_correctly: accessToken.startsWith('eyJ'),
        timestamp: new Date().toISOString()
      }, 401)
    }
    
    if (!user?.id) {
      return c.json({ 
        error: 'Token is valid but no user found',
        user_data: user,
        timestamp: new Date().toISOString()
      }, 401)
    }
    
    return c.json({ 
      success: true,
      user: {
        id: user.id,
        email: user.email,
        created_at: user.created_at,
        last_sign_in_at: user.last_sign_in_at
      },
      token_info: {
        length: accessToken.length,
        starts_with_eyJ: accessToken.startsWith('eyJ')
      },
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.log('Debug auth endpoint error:', error)
    return c.json({ 
      error: 'Internal server error in debug endpoint',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, 500)
  }
})

// Sign up route
app.post('/make-server-b6941cdd/signup', async (c) => {
  try {
    const { email, password, name, businessName } = await c.req.json()
    
    if (!email || !password || !name) {
      return c.json({ error: 'Email, password, and name are required' }, 400)
    }

    const supabase = getSupabaseClient()
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, businessName },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    })

    if (error) {
      console.log('Sign up error:', error)
      return c.json({ error: error.message }, 400)
    }

    return c.json({ 
      user: {
        id: data.user?.id,
        email: data.user?.email,
        name: data.user?.user_metadata?.name,
        businessName: data.user?.user_metadata?.businessName
      }
    })
  } catch (error) {
    console.log('Error in signup route:', error)
    return c.json({ error: 'Internal server error during signup' }, 500)
  }
})

// Generate unique slug
const generateSlug = (businessName: string, userId: string): string => {
  const baseSlug = businessName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 30)
  const randomId = Math.random().toString(36).substring(2, 9)
  return `${baseSlug}-${randomId}`
}

// Create or update menu
app.post('/make-server-b6941cdd/menu', async (c) => {
  try {
    const authHeader = c.req.header('Authorization')
    console.log('Authorization header:', authHeader ? 'Present' : 'Missing')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Invalid authorization header format')
      return c.json({ error: 'Unauthorized: Missing or invalid authorization header' }, 401)
    }
    
    const accessToken = authHeader.split(' ')[1]
    
    if (!accessToken) {
      console.log('Access token is missing')
      return c.json({ error: 'Unauthorized: Access token missing' }, 401)
    }
    
    const supabase = getSupabaseClient()
    
    // Verify the JWT token using the service role client
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (error) {
      console.log('Token verification failed:', error.message)
      return c.json({ error: `Unauthorized: ${error.message}` }, 401)
    }
    
    if (!user?.id) {
      console.log('User not found in token')
      return c.json({ error: 'Unauthorized: Invalid user token' }, 401)
    }
    
    console.log('Successfully authenticated user:', user.id)

    const menuData = await c.req.json()
    
    // Generate or reuse menuId
    let menuId = menuData.menuId
    if (!menuId) {
      menuId = generateSlug(menuData.businessName || 'menu', user.id)
    }
    
    const menuWithId = { 
      ...menuData, 
      menuId,
      createdAt: menuData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    // Store menu with user-specific key: menu:userId:menuId
    const menuKey = `menu:${user.id}:${menuId}`
    await kv.set(menuKey, menuWithId)
    
    // Also store with slug key for public access
    const slugKey = `menu:slug:${menuId}`
    await kv.set(slugKey, menuWithId)
    
    // Update user's menu list
    const menusListKey = `menus:${user.id}`
    const existingMenus = await kv.get(menusListKey) || []
    if (!existingMenus.includes(menuId)) {
      existingMenus.push(menuId)
      await kv.set(menusListKey, existingMenus)
    }
    
    // For backward compatibility, also store as menu:userId (latest menu)
    const legacyKey = `menu:${user.id}`
    await kv.set(legacyKey, menuWithId)
    
    return c.json({ success: true, menu: menuWithId, menuId })
  } catch (error) {
    console.log('Error saving menu:', error)
    return c.json({ error: `Failed to save menu: ${error instanceof Error ? error.message : 'Unknown error'}` }, 500)
  }
})

// Get user's menu (backward compatibility - returns latest menu)
app.get('/make-server-b6941cdd/menu', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const supabase = getSupabaseClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken)
    if (!user?.id || authError) {
      console.log('Authorization error while fetching menu:', authError)
      return c.json({ error: 'Unauthorized' }, 401)
    }

    // Try to get latest menu from menus list
    const menusListKey = `menus:${user.id}`
    const menuIds = await kv.get(menusListKey) || []
    
    if (menuIds.length > 0) {
      // Get the most recent menu
      const menuKeys = menuIds.map((menuId: string) => `menu:${user.id}:${menuId}`)
      const menus = await kv.mget(menuKeys)
      const validMenus = menus.filter((m: any) => m !== null)
      if (validMenus.length > 0) {
        // Sort by updatedAt and return the latest
        const sortedMenus = validMenus.sort((a: any, b: any) => {
          const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime()
          const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime()
          return dateB - dateA
        })
        return c.json({ menu: sortedMenus[0] })
      }
    }
    
    // Fallback to legacy single menu
    const menuKey = `menu:${user.id}`
    const menu = await kv.get(menuKey)
    
    if (!menu) {
      return c.json({ menu: null })
    }
    
    return c.json({ menu })
  } catch (error) {
    console.log('Error fetching menu:', error)
    return c.json({ error: 'Failed to fetch menu' }, 500)
  }
})

// Get public menu by slug (no auth required)
app.get('/make-server-b6941cdd/menu/public/:slug', async (c) => {
  try {
    const slug = c.req.param('slug')
    const slugKey = `menu:slug:${slug}`
    const menu = await kv.get(slugKey)
    
    if (!menu) {
      return c.json({ error: 'Menu not found' }, 404)
    }
    
    return c.json({ menu })
  } catch (error) {
    console.log('Error fetching public menu:', error)
    return c.json({ error: 'Failed to fetch menu' }, 500)
  }
})

// Get all menus for a user
app.get('/make-server-b6941cdd/menus', async (c) => {
  try {
    const authHeader = c.req.header('Authorization')
    console.log('Menus endpoint - Authorization header:', authHeader ? 'Present' : 'Missing')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Menus endpoint - Invalid authorization header format')
      return c.json({ error: 'Unauthorized: Missing or invalid authorization header' }, 401)
    }
    
    const accessToken = authHeader.split(' ')[1]
    
    if (!accessToken) {
      console.log('Menus endpoint - Access token is missing')
      return c.json({ error: 'Unauthorized: Access token missing' }, 401)
    }
    
    const supabase = getSupabaseClient()
    
    // Verify JWT token using service role client
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (error) {
      console.log('Menus endpoint - Token verification failed:', error.message)
      return c.json({ error: `Unauthorized: ${error.message}` }, 401)
    }
    
    if (!user?.id) {
      console.log('Menus endpoint - User not found in token')
      return c.json({ error: 'Unauthorized: Invalid user token' }, 401)
    }
    
    console.log('Menus endpoint - Successfully authenticated user:', user.id)

    const menusListKey = `menus:${user.id}`
    const menuIds = await kv.get(menusListKey) || []
    
    if (menuIds.length === 0) {
      // Check for legacy single menu
      const legacyKey = `menu:${user.id}`
      const legacyMenu = await kv.get(legacyKey)
      if (legacyMenu) {
        return c.json({ menus: [legacyMenu] })
      }
      return c.json({ menus: [] })
    }
    
    // Fetch all menus
    const menuKeys = menuIds.map((menuId: string) => `menu:${user.id}:${menuId}`)
    const menus = await kv.mget(menuKeys)
    
    // Filter out null values and sort by updatedAt (newest first)
    const validMenus = menus.filter((m: any) => m !== null).sort((a: any, b: any) => {
      const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime()
      const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime()
      return dateB - dateA
    })
    
    return c.json({ menus: validMenus })
  } catch (error) {
    console.log('Error fetching menus:', error)
    return c.json({ error: 'Failed to fetch menus' }, 500)
  }
})

// Get a specific menu by ID
app.get('/make-server-b6941cdd/menu/:menuId', async (c) => {
  try {
    const authHeader = c.req.header('Authorization')
    const menuId = c.req.param('menuId')
    console.log('Get menu endpoint - Authorization header:', authHeader ? 'Present' : 'Missing')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Get menu endpoint - Invalid authorization header format')
      return c.json({ error: 'Unauthorized: Missing or invalid authorization header' }, 401)
    }
    
    const accessToken = authHeader.split(' ')[1]
    
    if (!accessToken) {
      console.log('Get menu endpoint - Access token is missing')
      return c.json({ error: 'Unauthorized: Access token missing' }, 401)
    }
    
    const supabase = getSupabaseClient()
    
    // Verify JWT token using service role client
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
    if (error) {
      console.log('Get menu endpoint - Token verification failed:', error.message)
      return c.json({ error: `Unauthorized: ${error.message}` }, 401)
    }
    
    if (!user?.id) {
      console.log('Get menu endpoint - User not found in token')
      return c.json({ error: 'Unauthorized: Invalid user token' }, 401)
    }
    
    console.log('Get menu endpoint - Successfully authenticated user:', user.id)

    const menuKey = `menu:${user.id}:${menuId}`
    const menu = await kv.get(menuKey)
    
    if (!menu) {
      return c.json({ error: 'Menu not found' }, 404)
    }
    
    return c.json({ menu })
  } catch (error) {
    console.log('Error fetching menu:', error)
    return c.json({ error: 'Failed to fetch menu' }, 500)
  }
})

// Delete menu item
app.delete('/make-server-b6941cdd/menu/item/:itemId', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const supabase = getSupabaseClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken)
    if (!user?.id || authError) {
      console.log('Authorization error while deleting menu item:', authError)
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const itemId = c.req.param('itemId')
    const menuKey = `menu:${user.id}`
    const menu = await kv.get(menuKey)
    
    if (!menu) {
      return c.json({ error: 'Menu not found' }, 404)
    }

    // Filter out the item
    const updatedItems = menu.items.filter((item: any) => item.id !== itemId)
    const updatedMenu = { ...menu, items: updatedItems }
    
    await kv.set(menuKey, updatedMenu)
    
    return c.json({ success: true, menu: updatedMenu })
  } catch (error) {
    console.log('Error deleting menu item:', error)
    return c.json({ error: 'Failed to delete menu item' }, 500)
  }
})

Deno.serve(app.fetch)
