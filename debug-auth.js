// Debug script to test authentication
const projectId = "nyqfsuwxrzrfnrslpgfj";
const publicAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55cWZzdXd4cnpyZm5yc2xwZ2ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NjYxMjUsImV4cCI6MjA4NzA0MjEyNX0.WqIJVzzjcVE-ZtxGFoIXqIMTZNeJzTlk8NB9pl-HIjI";

async function testAuth() {
    console.log("Testing authentication...");
    
    // Check if we have a token in localStorage
    const token = localStorage.getItem("access_token");
    console.log("Token from localStorage:", token ? "Exists" : "Missing");
    
    if (token) {
        console.log("Token length:", token.length);
        console.log("Token starts with:", token.substring(0, 20) + "...");
        
        // Test the menus endpoint
        try {
            const response = await fetch(
                `https://${projectId}.supabase.co/functions/v1/make-server-b6941cdd/menus`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            console.log("Response status:", response.status);
            console.log("Response ok:", response.ok);
            
            const text = await response.text();
            console.log("Response body:", text);
            
        } catch (error) {
            console.error("Error testing endpoint:", error);
        }
    }
}

// Run this in the browser console
console.log("Run testAuth() in the browser console to debug authentication");
