// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// const AdminProtectedRoute = ({ children }) => {
//   const { role, token } = useSelector((state) => state.auth);

//   if (!token) {
//        return <Navigate to="/login" replace />;
//   }

//   if (!role) {
//     // Not logged in at all
//     return <Navigate to="/login" replace />;
//   }

//   if (role !== "admin") {
//     // Logged in, but not admin
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default AdminProtectedRoute;

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const { role, token, isValidating } = useSelector((state) => state.auth);

  if (isValidating) {
    return <div className="text-center p-8">Validating...</div>;
  }

  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
