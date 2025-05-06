


// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// const UserProtectedRoute = ({ children }) => {
//   const role = useSelector((state) => state.auth.role);

//   if (role !== "user") {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default UserProtectedRoute;

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
  const { role, token, isValidating } = useSelector((state) => state.auth);

  if (isValidating) {
    return <div className="text-center p-8">Validating...</div>;
  }

  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "user") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UserProtectedRoute;