import { projectId } from "../../utils/supabase/info";

export class AuthDebugger {
  static async debugAuthentication(token: string | null) {
    console.group('🔍 Authentication Debug Report');
    
    // Check token existence
    if (!token) {
      console.error('❌ No token found');
      console.log('Checking localStorage...');
      const storedToken = localStorage.getItem("access_token");
      if (storedToken) {
        console.log('✅ Token found in localStorage');
        token = storedToken;
      } else {
        console.error('❌ No token in localStorage either');
        console.groupEnd();
        return { success: false, error: 'No token available' };
      }
    }

    console.log('📋 Token Information:');
    console.log('- Length:', token.length);
    console.log('- Starts with eyJ:', token.startsWith('eyJ'));
    console.log('- Ends with ===', token.endsWith('==='));

    // Test the debug endpoint
    try {
      console.log('🌐 Testing debug endpoint...');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b6941cdd/debug-auth`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('📡 Response Status:', response.status);
      console.log('📡 Response OK:', response.ok);

      const data = await response.json();
      
      if (response.ok) {
        console.log('✅ Authentication successful!');
        console.log('👤 User:', data.user);
        console.log('🔑 Token Info:', data.token_info);
      } else {
        console.error('❌ Authentication failed!');
        console.error('Error:', data.error);
        console.error('Details:', data.details);
        console.error('Error Code:', data.error_code);
      }

      console.groupEnd();
      return { success: response.ok, data, status: response.status };
      
    } catch (error) {
      console.error('❌ Network error:', error);
      console.groupEnd();
      return { success: false, error: error instanceof Error ? error.message : 'Network error' };
    }
  }

  static async testMenusEndpoint(token: string | null) {
    console.group('🍽️ Testing Menus Endpoint');
    
    if (!token) {
      console.error('❌ No token provided');
      console.groupEnd();
      return { success: false, error: 'No token' };
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b6941cdd/menus`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('📡 Response Status:', response.status);
      console.log('📡 Response OK:', response.ok);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Menus endpoint successful!');
        console.log('📊 Menus count:', data.menus?.length || 0);
        console.log('📋 Menus:', data.menus);
      } else {
        const errorText = await response.text();
        console.error('❌ Menus endpoint failed!');
        console.error('Status:', response.status);
        console.error('Response:', errorText);
      }

      console.groupEnd();
      return { success: response.ok, status: response.status };
      
    } catch (error) {
      console.error('❌ Network error:', error);
      console.groupEnd();
      return { success: false, error: error instanceof Error ? error.message : 'Network error' };
    }
  }

  static async runFullDiagnostic() {
    console.group('🏥 Full Authentication Diagnostic');
    
    // Get token from localStorage
    const token = localStorage.getItem("access_token");
    
    console.log('🔑 Token Status:', token ? 'Found' : 'Not found');
    
    if (token) {
      // Test debug endpoint
      const debugResult = await this.debugAuthentication(token);
      
      if (debugResult.success) {
        // Test menus endpoint
        await this.testMenusEndpoint(token);
      }
    } else {
      console.error('❌ Cannot run diagnostic - no token available');
    }
    
    console.groupEnd();
  }
}

// Make it available globally for easy debugging
declare global {
  interface Window {
    authDebug: typeof AuthDebugger;
  }
}

// Attach to window for easy access in browser console
if (typeof window !== 'undefined') {
  window.authDebug = AuthDebugger;
}

export default AuthDebugger;
