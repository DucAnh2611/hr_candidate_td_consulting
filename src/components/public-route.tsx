import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function PublicRoute() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  return !user ? <Outlet /> : <Navigate to="/" replace />;
}
