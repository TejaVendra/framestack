// src/components/PublicRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const PublicRoute = ({ children }) => {
  const { authTokens } = useContext(AuthContext);

  // If user is logged in, redirect to dashboard
  if (authTokens) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
