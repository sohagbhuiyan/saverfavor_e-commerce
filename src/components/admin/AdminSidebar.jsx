import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Dashboard, Inventory, ShoppingCart, People, Payment } from "@mui/icons-material";

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-48 bg-gray-800 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <ul>
        {[
          { to: "/dashboard", label: "Dashboard", icon: <Dashboard /> },
          { to: "/products", label: "Products", icon: <Inventory /> },
          { to: "/orders", label: "Orders", icon: <ShoppingCart /> },
          { to: "/customers", label: "Customers", icon: <People /> },
          { to: "/payments", label: "Payments", icon: <Payment /> },
        ].map((item) => (
          <li key={item.to} className="mb-4">
            <Link
              to={item.to}
              className={`flex items-center p-2 rounded-md ${
                location.pathname === item.to
                  ? "bg-gray-700 text-blue-400" // Active state
                  : "hover:text-gray-400"
              }`}
            >
              <span className="mr-2">{item.icon}</span> {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;
