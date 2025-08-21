import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function PrivateRoute() {
  const { user, loading } = useAuth();
  
  if (loading) return <p>Loading...</p>;
  return user ? <Outlet/> : <Navigate to="/login" replace />;
}