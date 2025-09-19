

import React, { createContext, useState, useEffect } from "react";
import api from "../Api/Axios_Instance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Restore user on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signup = async (newuser) => {
    try {
      const response = await api.get(`/users?email=${newuser.email}`);
      if (response.data.length > 0) {
        toast.error("Email id Already Exists");
      } else {
        const userData = {
          ...newuser,
          role: "user",
          isAuthenticated: true,
          cart: [],
          wishlist: [],
          shippingAddress: [],
          orders: [],
        };

        await api.post("/users", userData);

        setUser(userData);
        toast.success("Signup SuccessFull");
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.get(`/users?email=${email}&&password=${password}`);

      if (response.data.length === 0) {
        toast.error("The UserName or Password doesn't Match");
      } else {
        const loggedInUser = response.data[0];
        setUser(loggedInUser);

        if (loggedInUser.role === "user") {
          const localStorageLoginData = {
            isAuthenticated: true,
            id: loggedInUser.id,
            username: loggedInUser.username,
            email: loggedInUser.email,
          };

          localStorage.setItem("user", JSON.stringify(localStorageLoginData));
          navigate("/");
          toast.success("Logined Successfully");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ signup, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
