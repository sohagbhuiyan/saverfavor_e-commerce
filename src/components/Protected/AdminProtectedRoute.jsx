import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const { role, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>; // or your custom spinner
  }

  if (!role) {
    // Not logged in at all
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    // Logged in, but not admin
    return <Navigate to="/" replace />;
  }

  // All good
  return children;
};

export default AdminProtectedRoute;
