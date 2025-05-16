import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPCComponents, fetchPCPartsByBuilderId } from "../../../store/pcbuilderSlice";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { API_BASE_URL } from "../../../store/api";

const FALLBACK_IMAGE = "/images/placeholder.png";

const ComponentProductsPage = () => {
  const dispatch = useDispatch();
  const { categoryName } = useParams();
  const { components, categoryParts, loading, error } = useSelector((state) => state.pcBuilder);

  const selectedCategory = components.find(
    (component) => component.name.toLowerCase() === categoryName.toLowerCase()
  );

  useEffect(() => {
    if (components.length === 0) {
      dispatch(fetchPCComponents());
    }
    if (selectedCategory?.id) {
      dispatch(fetchPCPartsByBuilderId(selectedCategory.id));
    }
  }, [dispatch, components, selectedCategory]);

  useEffect(() => {
    console.log("Fetched parts for category", categoryName, ":", categoryParts);
    categoryParts.forEach((part) => {
      console.log("Image URL for", part.name, ":", `${API_BASE_URL}/images/${part.image}`);
    });
  }, [categoryParts, categoryName]);

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", px: 2, py: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        {selectedCategory ? `${selectedCategory.name} Parts` : "Category Not Found"}
      </Typography>
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
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
            gap: 2,
            px: { xs: 1, md: 5 },
          }}
        >
          {categoryParts.map((part) => (
            <Box
              key={part.id}
              sx={{
                border: 1,
                borderColor: "grey.300",
                p: 2,
                borderRadius: 2,
                boxShadow: 1,
                transition: "0.3s",
                "&:hover": { boxShadow: 3, bgcolor: "grey.100" },
              }}
            >
              <img
                src={part.image ? `${API_BASE_URL}/images/${part.image}` : FALLBACK_IMAGE}
                alt={part.name}
                style={{ width: "100%", height: 160, objectFit: "contain", borderRadius: 4, mb: 2 }}
                onError={(e) => (e.target.src = FALLBACK_IMAGE)}
                loading="lazy"
              />
              <Typography variant="h6" fontWeight="medium" mb={1}>
                {part.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                {part.description || "No description available"}
              </Typography>
              <Typography variant="body2" mb={1}>
                <strong>Performance:</strong> {part.performance || "N/A"}
              </Typography>
              <Typography variant="body2" mb={1}>
                <strong>Other Info:</strong> {part.ability || "N/A"}
              </Typography>
              <Typography variant="body2" mb={1}>
                <strong>Regular Price:</strong> ${part.regularprice?.toFixed(2) || "N/A"}
              </Typography>
              <Typography variant="body2" mb={1}>
                <strong>Special Price:</strong> ${part.specialprice?.toFixed(2) || "N/A"}
              </Typography>
              <Typography variant="body2">
                <strong>Quantity:</strong> {part.quantity || "N/A"}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ComponentProductsPage;
