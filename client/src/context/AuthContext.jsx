"use client";

import { createContext, useState, useEffect, useContext } from "react";
import React from "react";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE_URL = "http://localhost:8000"; // Hardcoded backend URL

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem("user");
    console.log("User from localStorage:", user); // Log the user for debugging
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);
  
  // Log the updated currentUser
  useEffect(() => {
    console.log("Current User in AuthContext:", currentUser);
  }, [currentUser]);

  const login = async (email, password) => {
    try {
      setLoading(true);
      // Call the backend API for login
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log(data); // Log the response for debugging
      setCurrentUser(data.data); // Use `data.data` as per the API response structure
      localStorage.setItem("user", JSON.stringify(data.data));
      return data.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      // Call the backend API for registration
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      return data.data; // Use `data.data` as per the API response structure
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    register,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};