// components/layout/Layout.jsx

import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

// Admin components
import AdminSidebar from "../admin/AdminSidebar";
import AdminNavbar from "../admin/AdminNavbar";

// User components
import UserNavbar from "../user/navbar/UserNavbar";
import Footer from "../user/footer/Footer"; // Adjust path if needed

const Layout = () => {
  const { role, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!role) {
    return <div>No role found. Please login.</div>;
  }

  return (
    <div className="flex h-screen">
      {role === "admin" ? (
        // Admin Layout
        <>
          {/* Sidebar */}
          <div className="w-64 bg-gray-800 text-white">
            <AdminSidebar />
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col">
            <div className="bg-gray-900 text-white p-4">
              <AdminNavbar />
            </div>
            <main className="flex-1 p-4 overflow-y-auto">
              <Outlet />
            </main>
          </div>
        </>
      ) : (
        // User Layout
        <div className="flex flex-col h-screen">
          <UserNavbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Layout;
