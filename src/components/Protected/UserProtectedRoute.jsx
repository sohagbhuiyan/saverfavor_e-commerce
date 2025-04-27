


import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
  // const role = useSelector((state) => state.auth.role);

  // if (role !== "user") {
  //   return <Navigate to="/login" replace />;
  // }

  return children;
};

export default UserProtectedRoute;
