import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPCComponents, fetchPCPartsByCategory } from "../../../store/pcbuilderSlice";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { API_BASE_URL } from "../../../store/api";

// Fallback image for missing or failed images
const FALLBACK_IMAGE = "/images/placeholder.png";

const ComponentProductsPage = () => {
  const dispatch = useDispatch();
  const { categoryName } = useParams(); // Get category name from URL
  const { components, categoryParts, loading, error } = useSelector((state) => state.pcBuilder);

  // Find the category ID based on the category name
  const selectedCategory = components.find(
    (component) => component.name.toLowerCase() === categoryName.toLowerCase()
  );

  useEffect(() => {
    // Fetch components if not already loaded
    if (components.length === 0) {
      dispatch(fetchPCComponents());
    }

    // Fetch parts for the selected category
    if (selectedCategory?.id) {
      dispatch(fetchPCPartsByCategory(selectedCategory.id));
    }
  }, [dispatch, components, selectedCategory]);

  // Log parts for debugging
  useEffect(() => {
    console.log("Fetched parts for category", categoryName, ":", categoryParts);
    categoryParts.forEach((part) => {
      console.log("Image URL for", part.name, ":", `${API_BASE_URL}/images/${part.image}`);
    });
  }, [categoryParts, categoryName]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h4" fontWeight="bold" mb={6}>
        {selectedCategory ? `${selectedCategory.name} Parts` : "Category Not Found"}
      </Typography>
      <Box>
        {loading.categoryParts ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : error.categoryParts ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error.categoryParts}
          </Alert>
        ) : !selectedCategory ? (
          <Typography variant="h6" textAlign="center" my={4}>
            Category not found.
          </Typography>
        ) : categoryParts.length === 0 ? (
          <Typography variant="h6" textAlign="center" my={4}>
            No parts found for this category.
          </Typography>
        ) : (
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2 md:px-10">
            {categoryParts.map((part) => (
              <div
                key={part.id}
                className="border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition"
              >
                <img
                  src={part.image ? `${API_BASE_URL}/images/${part.image}` : FALLBACK_IMAGE}
                  alt={part.name}
                  className="w-full h-40 object-contain rounded mb-2"
                  onError={(e) => {
                    e.target.src = FALLBACK_IMAGE;
                  }}
                  loading="lazy"
                />
                <Typography variant="h6" fontWeight="medium">
                  {part.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {part.description}
                </Typography>
                <Typography variant="body2">
                  <strong>Performance:</strong> {part.performance}
                </Typography>
                <Typography variant="body2">
                  <strong>Other Info:</strong> {part.ability}
                </Typography>
                <Typography variant="body2">
                  <strong>Regular Price:</strong> ${part.regularprice.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  <strong>Special Price:</strong> ${part.specialprice.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  <strong>Quantity:</strong> {part.quantity}
                </Typography>
              </div>
            ))}
          </div>
        )}
      </Box>
    </div>
  );
};

export default ComponentProductsPage;
