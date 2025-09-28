
// import React, { createContext, useState, useEffect, useContext } from "react";
// import api from "../Api/Axios_Instance";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext(null);

// // Custom hook for easy access
// export const useAuth = () => useContext(AuthContext);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // Start as true to prevent redirects on refresh
//   const navigate = useNavigate();

//   // This effect runs only once on app startup to check for a logged-in user
//   useEffect(() => {
//     try {
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       }
//     } catch (error) {
//       console.error("Failed to parse stored user:", error);
//       localStorage.removeItem("user"); // Clear corrupted data
//       setUser(null);
//     } finally {
//       // Set loading to false after checking localStorage, allowing the app to render
//       setLoading(false);
//     }
//   }, []);

//   const signup = async (newUser) => {
//     try {
//       // 1. Check if a user with the same email already exists
//       const existingUserCheck = await api.get(`/users?email=${newUser.email}`);
//       if (existingUserCheck.data.length > 0) {
//         toast.error("An account with this email already exists.");
//         return; // Stop the function
//       }

//       // 2. Create the full user object with default values
//       const userData = {
//         ...newUser,
//         role: "user",
//         isAuthenticated: true,
//         cart: [],
//         wishlist: [],
//         shippingAddress: [],
//         orders: [],
//       };

//       // 3. Save the new user to the server and get the response (which includes the ID)
//       const response = await api.post("/users", userData);
//       const createdUser = response.data;

//       // 4. Automatically log the new user in
//       setUser(createdUser);
//       localStorage.setItem("user", JSON.stringify(createdUser));
      
//       toast.success("Signup Successful! Welcome!");
//       navigate("/"); // Redirect to the home page
//     } catch (e) {
//       console.error("Signup failed:", e);
//       toast.error("Signup failed. Please try again.");
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       // 1. Fetch user by email only for security (never send password in a GET request)
//       const response = await api.get(`/users?email=${email}`);
//       const users = response.data;

//       // 2. Check if a user was found and if the password matches
//       if (users.length === 0 || users[0].password !== password) {
//         toast.error("Invalid email or password.");
//       } else {
//         const loggedInUser = users[0];
//         setUser(loggedInUser);
//         localStorage.setItem("user", JSON.stringify(loggedInUser));

//         toast.success(`Welcome back, ${loggedInUser.name}!`);
        
//         // 3. Redirect based on role
//         if (loggedInUser.role === "admin") {
//           navigate("/dashboard");
//         } else {
//           navigate("/");
//         }
//       }
//     } catch (e) {
//       console.error("Login failed:", e);
//       toast.error("Login failed. Please try again.");
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   // While loading, show a simple loading message. This prevents the app from
//   // redirecting before the user's session has been restored.
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div>Loading...</div>
//       </div>
//     );
//   }

//   // Once loading is complete, render the rest of the application
//   return (
//     <AuthContext.Provider value={{ user, signup, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;










import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../Api/Axios_Instance";


export const AuthContext = createContext(null);

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse stored user:", error);
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = async (newUser) => {
    try {
      const existingUserCheck = await api.get(`/users?email=${newUser.email}`);
      if (existingUserCheck.data.length > 0) {
        toast.error("An account with this email already exists.");
        return;
      }
      const userData = { ...newUser, role: "user", cart: [], wishlist: [], orders: [] };
      const response = await api.post("/users", userData);
      const createdUser = response.data;
      setUser(createdUser);
      localStorage.setItem("user", JSON.stringify(createdUser));
      toast.success("Signup Successful! Welcome!");
      navigate("/");
    } catch (e) {
      console.error("Signup failed:", e);
      toast.error("Signup failed. Please try again.");
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.get(`/users?email=${email}`);
      const users = response.data;

      if (users.length === 0 || users[0].password !== password) {
        toast.error("Invalid email or password.");
        return;
      }

      const loggedInUser = users[0];

      // Check if the user's account is blocked
      if (loggedInUser.isBlocked) {
        toast.error("Your account has been blocked. Please contact support.");
        return; // Prevent login
      }

      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      toast.success(`Welcome back, ${loggedInUser.name}!`);
      
      if (loggedInUser.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (e) {
      console.error("Login failed:", e);
      toast.error("Login failed. Please try again.");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

