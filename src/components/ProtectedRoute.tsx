import { Navigate, Outlet } from "react-router-dom";

import { isAuthenticated } from "../features/auth/auth";

function ProtectedRoute() {
  const authenticated = isAuthenticated();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
