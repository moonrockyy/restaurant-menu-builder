// Quick authentication test - run this in browser console
const projectId = "nyqfsuwxrzrfnrslpgfj";

async function quickAuthTest() {
    console.log('🔍 Quick Authentication Test');
    
    // Check if we have a token
    const token = localStorage.getItem("access_token");
    if (!token) {
        console.error('❌ No token found in localStorage');
        console.log('Please log in first, then run this test again.');
        return;
    }
    
    console.log('✅ Token found');
    console.log('Token length:', token.length);
    console.log('Token format valid:', token.startsWith('eyJ'));
    
    // Test the debug endpoint
    try {
        console.log('🔄 Testing debug endpoint...');
        const debugResponse = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-b6941cdd/debug-auth`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        
        const debugData = await debugResponse.json();
        
        if (debugResponse.ok) {
            console.log('✅ Debug endpoint successful!');
            console.log('User:', debugData.user);
            
            // Now test the menus endpoint
            console.log('🔄 Testing menus endpoint...');
            const menusResponse = await fetch(
                `https://${projectId}.supabase.co/functions/v1/make-server-b6941cdd/menus`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            if (menusResponse.ok) {
                const menusData = await menusResponse.json();
                console.log('✅ Menus endpoint successful!');
                console.log('Menus:', menusData);
            } else {
                const errorText = await menusResponse.text();
                console.error('❌ Menus endpoint failed:', menusResponse.status);
                console.error('Error:', errorText);
            }
        } else {
            console.error('❌ Debug endpoint failed:', debugResponse.status);
            console.error('Error:', debugData);
        }
    } catch (error) {
        console.error('❌ Network error:', error);
    }
}

// Auto-run the test
quickAuthTest();

console.log('📋 Test complete! Check the results above.');
console.log('💡 If you see 401 errors, the issue is likely:');
console.log('   1. Missing SUPABASE_SERVICE_ROLE_KEY in your function');
console.log('   2. Expired JWT token');
console.log('   3. Invalid token format');
