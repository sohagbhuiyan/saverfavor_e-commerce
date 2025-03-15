import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Cookies from 'js-cookie'

const Registration = () => {
  const [formData, setFormData] = useState({
    userid: "",
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    address: "",
    country: "",
    dob: "",
    nidnumber: "",
    passport: "",
  });

  const [responseMessage, setResponseMessage] = useState(""); // Store API response
  const [error, setError] = useState(""); // Store error messages


  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage("");
    setError("");
  
    try {
      const response = await axios.post(
        "http://108.181.173.121:6061/api/userRegistration",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.data) {
        setResponseMessage("Registration successful!");
  
        // Store user data in cookies
        const userData = {
          name: formData.name,
          email: formData.email,
          token: response.data.token, // Assuming the API returns a token
        };
        Cookies.set('user', JSON.stringify(userData), { expires: 10 }); // Expires in 1 day
        console.log("User Data:", userData); // Print user data to console
      }
    } catch (err) {
      console.error("Error response:", err.response);
      setError("Registration failed. Please try again.");
    }
};

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, marginTop: 4, marginBottom: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Register
          </Typography>

          {responseMessage && <Alert severity="success">{responseMessage}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        

          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleChange} margin="normal" required />
            <TextField fullWidth type="email" label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" required />
            <TextField fullWidth type="password" label="Password" name="password" value={formData.password} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Phone Number" name="phoneNo" value={formData.phoneNo} onChange={handleChange} margin="normal" />
            <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} margin="normal" />
            <TextField fullWidth label="Country" name="country" value={formData.country} onChange={handleChange} margin="normal" />
            <TextField fullWidth type="date" name="dob" value={formData.dob} onChange={handleChange} margin="normal" InputLabelProps={{ shrink: true }} />
            <TextField fullWidth label="NID Number" name="nidnumber" value={formData.nidnumber} onChange={handleChange} margin="normal" />
            <TextField fullWidth label="Passport Number" name="passport" value={formData.passport} onChange={handleChange} margin="normal" />

            <Box mt={2}>
              <Button type="submit" variant="contained" color="secondary" fullWidth>
                Register
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default Registration;
