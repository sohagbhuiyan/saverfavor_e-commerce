// Layout.jsx

import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

// Admin Components
import AdminSidebar from "../admin/AdminSidebar";
import AdminNavbar from "../admin/AdminNavbar";

// User Components
import UserNavbar from "../user/navbar/UserNavbar";
import Footer from "../user/footer/Footer";

const Layout = () => {
  const { role } = useSelector((state) => state.auth);

  // Show appropriate layout based on role
  if (role === "admin") {
    return (
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white fixed h-full">
          <AdminSidebar />
        </aside>

        {/* Main content area */}
        <div className="flex-1 flex flex-col ml-64">
          {/* Top Navbar */}
          <header className="bg-gray-900 text-white p-4">
            <AdminNavbar />
          </header>
          {/* Outlet renders admin protected routes */}
          <main className="flex-1 p-4 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    );
  }

  // 🧑‍💼 Default: User layout for 'user' or unknown roles
  return (
    <div className="min-h-screen flex flex-col">
      {/* User Navbar */}
      <UserNavbar />

      {/* Main Content Area */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;