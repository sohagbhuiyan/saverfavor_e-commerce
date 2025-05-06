// import { useSelector } from "react-redux";
// import { Outlet } from "react-router-dom";

// // Admin components
// import AdminSidebar from "../admin/AdminSidebar";
// import AdminNavbar from "../admin/AdminNavbar";

// // User components
// import UserNavbar from "../user/navbar/UserNavbar";
// import Footer from "../user/footer/Footer";

// const Layout = () => {
//   const { role, loading } = useSelector((state) => state.auth);

//   if (loading) {
//     return <div className="text-center p-8">Loading layout...</div>;
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       {role === "admin" ? (
//         // Admin Layout
//         <div className="flex flex-1">
//           <div className="w-64 bg-gray-800 text-white fixed h-full">
//             <AdminSidebar />
//           </div>
//           <div className="flex-1 flex flex-col ml-64">
//             <div className="bg-gray-900 text-white p-4">
//               <AdminNavbar />
//             </div>
//             <main className="flex-1 p-4 overflow-y-auto">
//               <Outlet />
//             </main>
//           </div>
//         </div>
//       ) : (
//         // User Layout
//         <>
//           <UserNavbar />
//           <main className="flex-1">
//             <Outlet />
//           </main>
//           <Footer />
//         </>
//       )}
//     </div>
//   );
// };

// export default Layout;

import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

// Admin components
import AdminSidebar from "../admin/AdminSidebar";
import AdminNavbar from "../admin/AdminNavbar";

// User components
import UserNavbar from "../user/navbar/UserNavbar";
import Footer from "../user/footer/Footer";

const Layout = () => {
  const { role, loading, isValidating, token } = useSelector((state) => state.auth);

  if (loading || isValidating) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {role === "admin" ? (
        // Admin Layout
        <div className="flex flex-1">
          <div className="w-64 bg-gray-800 text-white fixed h-full">
            <AdminSidebar />
          </div>
          <div className="flex-1 flex flex-col ml-64">
            <div className="bg-gray-900 text-white p-4">
              <AdminNavbar />
            </div>
            <main className="flex-1 p-4 overflow-y-auto">
              <Outlet />
            </main>
          </div>
        </div>
      ) : role === "user" ? (
        // User Layout
        <>
          <UserNavbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </>
      ) : (
        // Invalid role or unauthenticated
        <Navigate to="/login" replace />
      )}
    </div>
  );
};

export default Layout;
