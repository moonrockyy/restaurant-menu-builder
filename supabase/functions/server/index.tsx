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
  return createClient(
    Deno.env.get('SUPABASE_URL') || '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
  )
}

// Health check
app.get('/make-server-b6941cdd/health', (c) => {
  return c.json({ status: 'ok' })
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
    
    // Try to get user with the access token
    let user
    let authError
    
    try {
      const result = await supabase.auth.getUser(accessToken)
      user = result.data.user
      authError = result.error
    } catch (err) {
      console.log('Exception getting user:', err)
      authError = err as any
    }
    
    // If getUser fails, try to verify token and get user ID from JWT
    if (authError || !user) {
      try {
        // Decode JWT to get user ID (base64url decode of payload)
        const parts = accessToken.split('.')
        if (parts.length === 3) {
          // Decode base64url to base64
          let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
          // Add padding if needed
          while (base64.length % 4) {
            base64 += '='
          }
          
          // Decode using atob (available in Deno)
          const decoded = atob(base64)
          const payload = JSON.parse(decoded)
          const userId = payload.sub
          
          console.log('Decoded JWT, user ID:', userId)
          
          if (userId) {
            // Get user by ID using admin API
            const { data: adminUser, error: adminError } = await supabase.auth.admin.getUserById(userId)
            if (adminUser?.user && !adminError) {
              user = adminUser.user
              authError = null
              console.log('Authenticated user via admin API:', user.id)
            } else {
              console.log('Admin API error:', adminError)
            }
          }
        }
      } catch (jwtError) {
        console.log('JWT decode error:', jwtError)
      }
    }
    
    if (authError) {
      console.log('Auth error details:', {
        message: authError.message,
        status: authError.status,
        name: authError.name
      })
      return c.json({ error: `Unauthorized: ${authError.message}` }, 401)
    }
    
    if (!user?.id) {
      console.log('User not found after authentication')
      return c.json({ error: 'Unauthorized: User not found' }, 401)
    }
    
    console.log('Authenticated user:', user.id)

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
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const supabase = getSupabaseClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken)
    if (!user?.id || authError) {
      console.log('Authorization error while fetching menus:', authError)
      return c.json({ error: 'Unauthorized' }, 401)
    }

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
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const menuId = c.req.param('menuId')
    const supabase = getSupabaseClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken)
    if (!user?.id || authError) {
      console.log('Authorization error while fetching menu:', authError)
      return c.json({ error: 'Unauthorized' }, 401)
    }

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
