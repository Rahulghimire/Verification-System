import React from "react";
import { Navigate } from "react-router-dom";

interface RootGuardProps {
  children: React.ReactNode;
}

const RootGuard: React.FC<RootGuardProps> = ({ children }) => {
  const isAuthenticated = checkAuthentication();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default RootGuard;

function checkAuthentication() {
  return !!localStorage.getItem("successToken");
}
