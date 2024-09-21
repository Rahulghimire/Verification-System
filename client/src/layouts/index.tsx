import * as React from "react";
import { Outlet } from "react-router-dom";

const LoginLayout: React.FC = () => {
  const success = localStorage.getItem("successToken");
  if (success) return <Outlet />;
};

export default LoginLayout;
