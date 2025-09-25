

// import React, { createContext, useState, useEffect } from "react";
// import api from "../Api/Axios_Instance";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   //  Restore user on page refresh
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const signup = async (newuser) => {
//     try {
//       const response = await api.get(`/users?email=${newuser.email}`);
//       if (response.data.length > 0) {
//         toast.error("Email id Already Exists");
//       } else {
//         const userData = {
//           ...newuser,
//           role: "user",
//           isAuthenticated: true,
//           cart: [],
//           wishlist: [],
//           shippingAddress: [],
//           orders: [],
//         };

//         await api.post("/users", userData);

//         setUser(userData);
//         toast.success("Signup SuccessFull");
//         navigate("/login");
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       const response = await api.get(`/users?email=${email}&&password=${password}`);

//       if (response.data.length === 0) {
//         toast.error("The UserName or Password doesn't Match");
//       } else {
//         const loggedInUser = response.data[0];
//         setUser(loggedInUser);

//         if (loggedInUser.role === "user") {
//           const localStorageLoginData = {
//             isAuthenticated: true,
//             id: loggedInUser.id,
//             username: loggedInUser.username,
//             email: loggedInUser.email,
//           };

//           localStorage.setItem("user", JSON.stringify(localStorageLoginData));
//           navigate("/");
//           toast.success("Logined Successfully");
//         }
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ signup, login, logout, user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;












// import React, { createContext, useState, useEffect, useContext } from "react";
// import api from "../Api/Axios_Instance";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// // Custom hook for easy access
// export const useAuth = () => useContext(AuthContext);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   // Restore user on page refresh
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const signup = async (newUser) => {
//     try {
//       const response = await api.get(`/users?email=${newUser.email}`);
//       if (response.data.length > 0) {
//         toast.error("Email id Already Exists");
//       } else {
//         const userData = {
//           ...newUser,
//           role: "user",
//           isAuthenticated: true,
//           cart: [],
//           wishlist: [],
//           shippingAddress: [],
//           orders: [],
//         };

//         await api.post("/users", userData);

//         setUser(userData);
//         toast.success("Signup Successful");
//         navigate("/login");
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       const response = await api.get(`/users?email=${email}&&password=${password}`);

//       if (response.data.length === 0) {
//         toast.error("The Username or Password doesn't Match");
//       } else {
//         const loggedInUser = response.data[0];
//         setUser(loggedInUser);

//         // Save user to localStorage
//         localStorage.setItem("user", JSON.stringify(loggedInUser));

//         // Redirect based on role
//         if (loggedInUser.role === "admin") {
//           navigate("/dashboard");
//           toast.success("Admin Logged In Successfully");
//         } else {
//           navigate("/");
//           toast.success("User Logged In Successfully");
//         }
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ signup, login, logout, user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;






import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../Api/Axios_Instance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 1. Add a loading state, initially true
  const navigate = useNavigate();

  // This effect now handles the initial loading process
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      // If there's an error parsing, clear the storage and user
      console.error("Failed to parse stored user:", error);
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      // 2. Set loading to false after checking localStorage
      setLoading(false);
    }
  }, []);

  const signup = async (newUser) => {
    // ... your existing signup logic ...
  };

  const login = async (email, password) => {
    // ... your existing login logic ...
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  // 3. While loading, render a loading indicator (or nothing)
  // This prevents the rest of the app (the children) from rendering prematurely
  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  // Once loading is false, render the app with the correct user state
  return (
    <AuthContext.Provider value={{ signup, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;