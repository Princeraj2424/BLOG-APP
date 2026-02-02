import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, profile } = useAuth();
  if (!isAuthenticated || profile?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default AdminRoute;
