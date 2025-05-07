import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Dashboard,
  Inventory,
  AddBox,
  ViewList,
  ShoppingCart,
  People,
  Payment,
  Category,
} from "@mui/icons-material";

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === `/` + path;

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <ul className="space-y-4">

        {/* Dashboard */}
        <li>
          <Link
            to="/admin/dashboard"
            className={`flex items-center p-2 rounded-md ${
              isActive("admin/dashboard") ? "bg-gray-700 text-blue-400" : "hover:text-gray-400"
            }`}
          >
            <Dashboard className="mr-2" /> Dashboard
          </Link>
        </li>

        {/* Products */}
        <li>
          <div className="text-sm font-semibold text-gray-400 px-2">Products</div>
          <ul className="pl-4 mt-1 space-y-2">
            <li>
              <Link
                to="/admin/products"
                className={`flex items-center p-2 rounded-md ${
                  isActive("admin/products") ? "bg-gray-700 text-blue-400" : "hover:text-gray-400"
                }`}
              >
                <Inventory className="mr-2" /> All Products
              </Link>
            </li>
            <li>
              <Link
                to="/admin/products/add-category"
                className={`flex items-center p-2 rounded-md ${
                  isActive("admin/products/add-category")
                    ? "bg-gray-700 text-blue-400"
                    : "hover:text-gray-400"
                }`}
              >
                <Category className="mr-2" /> Add Category
              </Link>
            </li>
            <li>
              <Link
                to="/admin/products/view-product"
                className={`flex items-center p-2 rounded-md ${
                  isActive("admin/products/view-product")
                    ? "bg-gray-700 text-blue-400"
                    : "hover:text-gray-400"
                }`}
              >
                <ViewList className="mr-2" /> View Product
              </Link>
            </li>
            <li>
              <Link
                to="/admin/products/add-product"
                className={`flex items-center p-2 rounded-md ${
                  isActive("admin/products/add-product")
                    ? "bg-gray-700 text-blue-400"
                    : "hover:text-gray-400"
                }`}
              >
                <AddBox className="mr-2" /> Add Product
              </Link>
            </li>
          </ul>
        </li>

        {/* Orders */}
        <li>
          <Link
            to="/admin/orders"
            className={`flex items-center p-2 rounded-md ${
              isActive("admin/orders") ? "bg-gray-700 text-blue-400" : "hover:text-gray-400"
            }`}
          >
            <ShoppingCart className="mr-2" /> Orders
          </Link>
        </li>

        {/* Customers */}
        <li>
          <Link
            to="/admin/customers"
            className={`flex items-center p-2 rounded-md ${
              isActive("admin/customers") ? "bg-gray-700 text-blue-400" : "hover:text-gray-400"
            }`}
          >
            <People className="mr-2" /> Customers
          </Link>
        </li>

        {/* Payments */}
        <li>
          <Link
            to="/admin/payments"
            className={`flex items-center p-2 rounded-md ${
              isActive("admin/payments") ? "bg-gray-700 text-blue-400" : "hover:text-gray-400"
            }`}
          >
            <Payment className="mr-2" /> Payments
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
