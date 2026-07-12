import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminProtectedRoutes = () => {
  const location = useLocation();

  const adminJwt = localStorage.getItem("admin_jwt");
  const adminRole = localStorage.getItem("admin_role");

  if (!adminJwt || adminRole !== "ROLE_ADMIN") {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoutes;
