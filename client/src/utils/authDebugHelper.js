// utils/authDebugHelper.js
/**
 * Helper utility to debug authentication issues
 */
export const debugAuth = (async () => {
    console.group('🔍 Auth Debug Information');
    
    // Check localStorage token
    const token = localStorage.getItem('token');
    console.log(`Token in localStorage: ${token ? '✅ Present' : '❌ Missing'}`);
    
    if (token) {
      console.log('Token Value:', token.substring(0, 15) + '...');
      
      // Try to decode the JWT (if it's a JWT)
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const payload = JSON.parse(jsonPayload);
        
        console.log('Token payload:', payload);
        
        // Check if token is expired
        if (payload.exp) {
          const expDate = new Date(payload.exp * 1000);
          const now = new Date();
          const isExpired = now > expDate;
          
          console.log(`Token expiration: ${expDate.toLocaleString()}`);
          console.log(`Token status: ${isExpired ? '❌ Expired' : '✅ Valid'}`);
        }
      } catch (e) {
        console.log('Could not decode token, may not be a valid JWT');
      }
    }
    
    // Test API connection
    try {
      console.log('Testing API connection...');
      const response = await fetch('http://your-backend-url/api/health-check');
      console.log(`API health check: ${response.ok ? '✅ OK' : '❌ Failed'}`);
      console.log('Response:', await response.text());
    } catch (error) {
      console.log('❌ API connection failed:', error.message);
    }
    
    console.groupEnd();
  });