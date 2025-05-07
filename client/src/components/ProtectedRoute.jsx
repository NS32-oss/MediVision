import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser } = useAuth();

  // If the user is not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If the user's role is not allowed, redirect to an unauthorized page
  if (!allowedRoles.includes(currentUser.userType)) {
    return <Navigate to="/" replace />;
  }

  // If the user is authorized, render the children
  return children;
};

export default ProtectedRoute;