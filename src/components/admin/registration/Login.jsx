// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Container,
//   Paper,
//   Alert,
// } from "@mui/material";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom"; // For programmatic navigation

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [responseMessage, setResponseMessage] = useState("");
//   const navigate = useNavigate(); // Hook to navigate after successful login

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(""); // Reset error messages
//     setResponseMessage(""); // Reset response message

//     try {
//       const response = await axios.post("http://108.181.173.121:6061/login", formData);

//       if (response.data.token) {
//         localStorage.setItem("token", response.data.token); // Store token in localStorage
//         localStorage.setItem("userEmail", formData.email);
//         console.log("Login Successful, Token:", response.data.token);
//         setResponseMessage("Login successful!");
//         navigate("/dashboard"); // Navigate to Dashboard after successful login
//       } else {
//         setError("Login failed: Wrong Password!.");
//       }
//     } catch (err) {
//       if (err.response) {
//         // The request was made and the server responded with a status code
//         setError(err.response.data.message || "Invalid email or password. Please try again.");
//       } else if (err.request) {
//         // The request was made but no response was received
//         setError("Network error. Please check your connection.");
//       } else {
//         // Something happened in setting up the request
//         setError("An unexpected error occurred. Please try again.");
//       }
//       console.error("Login error:", err);
//     }
//   };

//   return (
//     <>
//       <Container maxWidth="sm">
//         <Paper elevation={3} sx={{ padding: 4, marginTop: 4, marginBottom: 4 }}>
//           <Typography variant="h5" component="h2" gutterBottom>
//             Login
//           </Typography>
//           {responseMessage && <Alert severity="success">{responseMessage}</Alert>}
//           {error && <Alert severity="error">{error}</Alert>}

//           <form onSubmit={handleSubmit}>
//             <TextField
//               fullWidth
//               type="email"
//               label="Email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               margin="normal"
//               required
//             />
//             <TextField
//               fullWidth
//               type="password"
//               label="Password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               margin="normal"
//               required
//             />

//             <Box mt={2}>
//               <Button type="submit" variant="contained" color="secondary" fullWidth>
//                 Login
//               </Button>
//             </Box>
//           </form>
//           <Typography mt={2} variant="body2">
//               Don't have an account?{" "}
//               <Link to="/registration" style={{ color: "#1976d2", textDecoration: "none",}}>
//                 Register now
//               </Link>
//             </Typography>
//         </Paper>
//       </Container>
     
//     </>
//   );
// };

// export default Login;
