import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPCComponents, fetchPCParts } from "../../store/pcbuilderSlice";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";

const ViewSystemBuilder = () => {
  const dispatch = useDispatch();
  const { components, parts, loading, error } = useSelector((state) => state.pcBuilder);
  const userRole = useSelector((state) => state.auth.role) || localStorage.getItem("authRole");

  useEffect(() => {
    dispatch(fetchPCComponents());
    dispatch(fetchPCParts());
  }, [dispatch]);

  if (userRole !== "admin") {
    return (
      <Box minWidth={900} mx="auto" mt={5} p={1} textAlign="center">
        <Typography variant="h6" color="error">
          You do not have permission to access this page.
        </Typography>
      </Box>
    );
  }

  return (
    <Box minWidth={900} mx="auto" mt={5} p={1} borderRadius={2} boxShadow={3} bgcolor="white">
      <Typography variant="h5" mb={4} fontWeight="bold" textAlign="center">
        System Builder Admin Panel
      </Typography>

      {/* PC Components Section */}
      <Box mb={6}>
        <Typography variant="h6" mb={2} fontWeight="medium">
          PC Components
        </Typography>
        {loading.component ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : error.component ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.component}
          </Alert>
        ) : components.length === 0 ? (
          <Typography>No PC components found.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {components.map((component) => (
                  <TableRow key={component.id}>
                    <TableCell>{component.id}</TableCell>
                    <TableCell>{component.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* PC Parts Section */}
      <Box>
        <Typography variant="h6" mb={2} fontWeight="medium">
          PC Parts
        </Typography>
        {loading.part ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : error.part ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.part}
          </Alert>
        ) : parts.length === 0 ? (
          <Typography>No PC parts found.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>System Category</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Performance</TableCell>
                  <TableCell>Ability</TableCell>
                  <TableCell>Regular Price</TableCell>
                  <TableCell>Special Price</TableCell>
                  <TableCell>Quantity</TableCell>                
                </TableRow>
              </TableHead>
              <TableBody>
                {parts.map((part) => (
                  <TableRow key={part.id}>
                    <TableCell>{part.id}</TableCell>
                    <TableCell>{part.name}</TableCell>
                    <TableCell>{part.pcbuilder?.name || part.pcbuilder?.id || "N/A"}</TableCell>
                    <TableCell>{part.description}</TableCell>
                    <TableCell>{part.performance}</TableCell>
                    <TableCell>{part.ability}</TableCell>
                    <TableCell>${part.regularprice.toFixed(2)}</TableCell>
                    <TableCell>${part.specialprice.toFixed(2)}</TableCell>
                    <TableCell>{part.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default ViewSystemBuilder;
