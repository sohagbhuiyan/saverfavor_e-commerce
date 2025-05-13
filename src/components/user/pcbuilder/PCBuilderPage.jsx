import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPCComponents } from "../../../store/pcbuilderSlice";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { API_BASE_URL } from "../../../store/api";

// Fallback image for missing or failed images
const FALLBACK_IMAGE = "/images/placeholder.png"; // Ensure this exists in your public folder or use a CDN URL

const PCBuilderPage = () => {
  const dispatch = useDispatch();
  const { components, loading, error } = useSelector((state) => state.pcBuilder);

  useEffect(() => {
    dispatch(fetchPCComponents());
  }, [dispatch]);

  // Log components and image URLs for debugging
  useEffect(() => {
    console.log("Fetched components:", components);
    components.forEach((component) => {
      console.log("Image URL for", component.name, ":", `${API_BASE_URL}/images/${component.imagea}`);
    });
  }, [components]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Build Your Custom PC</h1>
      <Box>
        {loading.component ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : error.component ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error.component}
          </Alert>
        ) : components.length === 0 ? (
          <Typography variant="h6" textAlign="center" my={4}>
            No PC components found.
          </Typography>
        ) : (
          <div className="mt-2 flex flex-col gap-4 px-2 md:px-10">
            {components.map((component) => (
              <Link
                key={component.id}
                to={`/pc-builder/${component.name.toLowerCase()}`}
                className="border border-gray-300 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={component.imagea? `${API_BASE_URL}/images/${component.imagea}` : FALLBACK_IMAGE}
                    alt={component.name}
                    className="w-10 h-10 object-contain rounded"
                    onError={(e) => {
                      e.target.src = FALLBACK_IMAGE; // Fallback on error
                    }}
                    loading="lazy" // Optimize image loading
                  />
                  <h3 className="text-lg font-semibold">{component.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Box>
    </div>
  );
};

export default PCBuilderPage;
