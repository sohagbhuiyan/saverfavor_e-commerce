import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";


const ProductManagement = () => {
  const location = useLocation();

  // Determine active tab based on current route
  const getActiveTab = () => {
    if (location.pathname.includes("add-product")) return 0;
    if (location.pathname.includes("view-product")) return 1;
    return 1; // Default to view product if no specific route
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>

      {/* Tabs with Link components */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={getActiveTab()}>
          <Tab 
            label="Add Product" 
            component={Link} 
            to="add-product" 
          />
          <Tab 
            label="View Product" 
            component={Link} 
            to="view-product" 
          />
        </Tabs>
      </Box>

      {/* Tab Content - replaced with Outlet */}
      <Box className="mt-6">
        <Outlet />
      </Box>
    </div>
  );
};

export default ProductManagement;
