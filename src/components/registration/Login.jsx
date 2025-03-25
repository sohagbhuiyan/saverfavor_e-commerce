import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const result = await dispatch(loginUser(formData));
      
      if (result.payload?.token) {
        navigate("/");
      } else if (result.error) {
        setError(result.error.message || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred",err.response);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4, marginBottom: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Box mt={2}>
            <Button type="submit" variant="contained" color="secondary" fullWidth>
              Login
            </Button>
          </Box>
        </form>
        <Typography mt={2} variant="body2">
          Don't have an account?{" "}
          <Link to="/registration" style={{ color: "#1976d2", textDecoration: "none" }}>
            Register now
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
