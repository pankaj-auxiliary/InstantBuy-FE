import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { UserRole } from "../../features/user/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation(); // Ensure location is defined
  console.log("ProtectedRoute Rendered", { user, isAuthenticated, loading });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("Redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    console.log("Redirecting based on user role", user.role);
    const redirectPath = user.role === "seller" ? "/seller" : "/";
    return <Navigate to={redirectPath} replace />;
  }

  console.log("Rendering children");
  return <>{children}</>;
}