import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { authTokens } = useContext(AuthContext);

  // If not logged in, redirect to login
  if (!authTokens) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise show the requested page
  return children;
};

export default PrivateRoute;
