import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Dashboard,
  AddBox,
  ViewList,
  ShoppingCart,
  People,
  Payment,
  Category,
  BuildCircleRounded,
  ListAlt,
  BuildCircleTwoTone,
  AddAPhoto,
  Info,
  BrandingWatermarkRounded,
} from "@mui/icons-material";

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === `/${path}`;

  return (
    <div
      className="w-50 bg-gray-800 text-white min-h-screen p-1"
      style={{ maxHeight: "calc(100vh - 16px)" }} // Adjust for padding/margin if needed
    >
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <ul className="space-y-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 70px)" }}>
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
        {/* Add Slider Image */}
        <li>
          <Link
            to="/admin/add-slider"
            className={`flex items-center p-2 rounded-md ${
              isActive("admin/add-slider") ? "bg-gray-700 text-blue-400" : "hover:text-gray-400"
            }`}
          >
            <AddAPhoto className="mr-2" /> Add Slider
          </Link>
        </li>
          <li>
          <Link
            to="/admin/add-info"
            className={`flex items-center p-2 rounded-md ${
              isActive("admin/add-info") ? "bg-gray-700 text-blue-400" : "hover:text-gray-400"
            }`}
          >
            <Info className="mr-2" /> Add Info
          </Link>
        </li>

        <li>
          <Link
            to="/admin/products/add-brand"
            className={`flex items-center p-2 rounded-md ${
              isActive("admin/products/add-brand")
                ? "bg-gray-700 text-blue-400"
                : "hover:text-gray-400"
            }`}
          >
            <BrandingWatermarkRounded className="mr-2" /> Add Brand
          </Link>
        </li>
                <li>
          <Link
            to="/admin/products/view-brand"
            className={`flex items-center p-2 rounded-md ${
              isActive("admin/products/view-brand")
                ? "bg-gray-700 text-blue-400"
                : "hover:text-gray-400"
            }`}
          >
            <BrandingWatermarkRounded className="mr-2" /> View Brand
          </Link>
        </li>
        {/* Categories and Products */}
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
            to="/admin/products/view-categories"
            className={`flex items-center p-2 rounded-md ${
              isActive("admin/products/view-categories")
                ? "bg-gray-700 text-blue-400"
                : "hover:text-gray-400"
            }`}
          >
            <ListAlt className="mr-2" /> View Categories
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
        {/* PC Builder */}
        <li>
          <Link
            to="/admin/Pc-Builder"
            className={`flex items-center p-2 rounded-md ${
              isActive("admin/Pc-Builder") ? "bg-gray-700 text-blue-400" : "hover:text-gray-400"
            }`}
          >
            <BuildCircleRounded className="mr-2" /> PC Builder
          </Link>
        </li>
        <li>
          <Link
            to="/admin/Pc-builder/ViewSystemBuilder"
            className={`flex items-center p-2 rounded-md ${
              isActive("admin/Pc-builder/ViewSystemBuilder")
                ? "bg-gray-700 text-blue-400"
                : "hover:text-gray-400"
            }`}
          >
            <BuildCircleTwoTone className="mr-2" /> View System Builder
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
