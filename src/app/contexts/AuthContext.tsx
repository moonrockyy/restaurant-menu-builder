import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  user_metadata?: {
    name?: string;
    businessName?: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string, businessName: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
  getValidToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey,
  {
    auth: {
      persistSession: true,
      storage: localStorage,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    }
  }
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage and validate session
  useEffect(() => {
    initializeAuth();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (event === 'SIGNED_IN' && session) {
          localStorage.setItem("access_token", session.access_token);
          localStorage.setItem("user", JSON.stringify(session.user));
          setToken(session.access_token);
          setUser(session.user as unknown as User);
        } else if (event === 'SIGNED_OUT') {
          clearAuthData();
        } else if (event === 'TOKEN_REFRESHED' && session) {
          localStorage.setItem("access_token", session.access_token);
          localStorage.setItem("user", JSON.stringify(session.user));
          setToken(session.access_token);
          setUser(session.user as unknown as User);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const initializeAuth = async () => {
    try {
      // Check for stored auth data
      const storedToken = localStorage.getItem("access_token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        // First, set the stored token and user immediately
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        
        // Then validate session in background
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          // Session is invalid, clear stored data
          clearAuthData();
        } else if (session.access_token !== storedToken) {
          // Token mismatch, update with fresh token
          localStorage.setItem("access_token", session.access_token);
          localStorage.setItem("user", JSON.stringify(session.user));
          setToken(session.access_token);
          setUser(session.user as unknown as User);
        }
        // If session is valid and tokens match, keep using stored values
      }
    } catch (error) {
      console.error("Auth initialization error:", error);
      clearAuthData();
    } finally {
      setLoading(false);
    }
  };

  const clearAuthData = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Failed to login");
        return false;
      }

      if (data.session?.access_token && data.user) {
        localStorage.setItem("access_token", data.session.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setToken(data.session.access_token);
        setUser(data.user as unknown as User);
        toast.success("Login successful!");
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string, businessName: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b6941cdd/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email,
            password,
            name,
            businessName,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to sign up");
        return false;
      }

      toast.success("Account created successfully! Please login.");
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An error occurred during signup");
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        toast.error(error.message || "Failed to login with Google");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("An error occurred during Google login");
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAuthData();
      toast.success("Logged out successfully");
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession();

      if (error || !session) {
        clearAuthData();
        return false;
      }

      localStorage.setItem("access_token", session.access_token);
      localStorage.setItem("user", JSON.stringify(session.user));
      setToken(session.access_token);
      setUser(session.user as unknown as User);
      return true;
    } catch (error) {
      console.error("Token refresh error:", error);
      clearAuthData();
      return false;
    }
  };

  const getValidToken = async (): Promise<string | null> => {
    try {
      // First, check current session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        // Session is invalid, try to refresh
        const refreshed = await refreshToken();
        return refreshed ? session?.access_token || null : null;
      }
      
      // Update stored token if it differs from current session
      if (session.access_token !== token) {
        localStorage.setItem("access_token", session.access_token);
        localStorage.setItem("user", JSON.stringify(session.user));
        setToken(session.access_token);
        setUser(session.user as unknown as User);
      }
      
      return session.access_token;
    } catch (error) {
      console.error("Error validating token:", error);
      // Try to refresh as fallback
      const refreshed = await refreshToken();
      if (refreshed) {
        // Get the refreshed session
        const { data: { session } } = await supabase.auth.getSession();
        return session?.access_token || null;
      }
      return null;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    token,
    login,
    signup,
    loginWithGoogle,
    logout,
    refreshToken,
    getValidToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
