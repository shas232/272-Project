import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import Cookies from 'js-cookie';
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useNavigate } from 'react-router-dom';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhQMzodQksq0vsseeSX2upsQ8T062RXLc",
  authDomain: "fraud-detection-992a7.firebaseapp.com",
  projectId: "fraud-detection-992a7",
  storageBucket: "fraud-detection-992a7.firebasestorage.app",
  messagingSenderId: "134719852144",
  appId: "1:134719852144:web:577f544657b349f6232eb5",
  measurementId: "G-M2RT3VQJFH"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface LoginPageProps {
  username: string;
  password: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onLogin: (username: string, role: string) => Promise<void>;
}

const LoginPage: React.FC<LoginPageProps> = ({
  username,
  password,
  setUsername,
  setPassword,
  onLogin,
}) => {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRedirectHandled, setIsRedirectHandled] = useState<boolean>(false); // Prevent duplicate handling
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await onLogin(username, password);
      Cookies.set('user', JSON.stringify({ username, role: 'USER' }), { expires: 7 });
      navigate('/dashboard');
    } catch {
      setError('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);
  
    const provider = new GoogleAuthProvider();
   
    
    try {
      console.log("Redirecting to Google...");
      await signInWithPopup(auth, provider).then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log("in req handling",result)
        if (result && result.user) {
            console.log("Redirect result received:", result);
            
            const user = result.user;
            const userData = {
              email: user.email || null,
              role: 'employee', // Default role
              password: null,   // Password is null for Google Auth users
            };
            console.log("user----->",user)
            const response = await fetch('http://localhost:5008/api/checkAndAddUser', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(userData),
            });
            console.log("chadcall--->",response)
            const username = user.email || user.displayName || 'Guest';
            const role = 'EMPLOYEE'; // Default role
            console.log("Username determined:", username);
            console.log("Role assigned:", role);
    
            // Store user in cookies
            
            const upUser=JSON.stringify({ username, role });
            console.log("User saved in cookies.");
            console.log("upser---->",upUser)
            localStorage.setItem('user', upUser);
  
             console.log("onLogin called successfully.");
    
            // Navigate to the Employee Dashboard
            navigate('/employeeDashboard');
            console.log("Navigation to /employeeDashboard successful.");
          } else {
            console.warn("No user found in the redirect result.");
          }



      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error("Error handling redirect result:", error);
        setError('Google login failed');
        // ...
      });
      console.log("Redirect triggered");
    } catch (err) {
      console.error("Error during Google login:", err);
      setError('Google login failed');
    } finally {
      setIsLoading(false);
    }
  };
  

//   useEffect(() => {
//     const handleRedirectResult = async () => {
//       // Add a check to make sure the redirect is not handled more than 
//       console.log("hi------->")
//       if (isRedirectHandled) {
//         console.log("Redirect already handled, skipping...");
//         return; // If the redirect has already been handled, skip the logic
//       }
  
//       // Set the flag to prevent further handling
//       setIsRedirectHandled(true);
//       console.log("Redirect handling initiated...");
  
//       try {
//         console.log("Attempting to retrieve redirect result...");
//         const result = await getRedirectResult(auth);
  
//         if (result && result.user) {
//           console.log("Redirect result received:", result);
  
//           const user = result.user;
//           const username = user.email || user.displayName || 'Guest';
//           const role = 'EMPLOYEE'; // Default role
//           console.log("Username determined:", username);
//           console.log("Role assigned:", role);
  
//           // Store user in cookies
//           Cookies.set('user', JSON.stringify({ username, role }), { expires: 7 });
//           console.log("User saved in cookies.");
  
//           // Call onLogin function
//           await onLogin(username, role);
//           console.log("onLogin called successfully.");
  
//           // Navigate to the Employee Dashboard
//           navigate('/employeeDashboard');
//           console.log("Navigation to /employeeDashboard successful.");
//         } else {
//           console.warn("No user found in the redirect result.");
//         }
//       } catch (error) {
//         console.error("Error handling redirect result:", error);
//         setError('Google login failed');
//       }
//     };
  
//     // Call the redirect handler
//     handleRedirectResult();
//   }, [auth, navigate, onLogin, isRedirectHandled]); // Dependencies of the useEffect
  
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center py-12 px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center">
          <Shield className="w-16 h-16 text-blue-600 animate-pulse" />
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
            Expense Management System
          </h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 sm:text-sm"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>

          {error && <div className="text-red-500 text-sm text-center mt-2">{error}</div>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
            >
              {isLoading ? (
                <span className="animate-spin border-t-transparent border-2 border-white rounded-full w-5 h-5"></span>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center mt-4">
          <div className="w-full border-t border-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">or</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
            alt="Google logo"
            className="h-5 w-5 mr-2"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
