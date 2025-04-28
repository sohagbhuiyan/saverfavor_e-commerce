// // components/admin/AddProduct.jsx
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCategories } from "../../../store/categorySlice";  // Import fetchCategories action
// import { addProduct } from "../../../store/productSlice";  // Import the addProduct action
// import { TextField, Button, Typography, Box, Avatar, IconButton, Stack, CircularProgress } from "@mui/material";
// import { Delete as DeleteIcon } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";  // For navigation after product submission

// const AddProduct = () => {
//   const [product, setProduct] = useState({
//     productId: "",
//     name: "",
//     category: "",
//     regularPrice: "",
//     specialPrice: "",
//     tax: "",
//     slug: "",
//     details: "",
//     specification: "",
//     quantity: "",
//     mainImage: null,
//     additionalImages: [],
//   });

//   const [customFields, setCustomFields] = useState([]);
//   const [mainImagePreview, setMainImagePreview] = useState(null);
//   const [additionalImagesPreviews, setAdditionalImagesPreviews] = useState([]);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();  // To navigate after a successful product add

//   // Fetch categories from Redux store
//   const { items: categories, loading: categoriesLoading, error: categoriesError } = useSelector((state) => state.categories);

//   // Dispatch fetchCategories action when component mounts
//   useEffect(() => {
//     if (categories.length === 0) {
//       dispatch(fetchCategories());
//     }
//   }, [dispatch, categories.length]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleMainImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProduct((prev) => ({ ...prev, mainImage: file }));
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setMainImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAdditionalImagesChange = (e) => {
//     const files = Array.from(e.target.files);
//     setProduct((prev) => ({
//       ...prev,
//       additionalImages: [...prev.additionalImages, ...files],
//     }));

//     files.forEach((file) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setAdditionalImagesPreviews((prev) => [...prev, reader.result]);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const addCustomField = () => {
//     setCustomFields([...customFields, { title: "", value: "" }]);
//   };

//   const updateCustomField = (index, field, value) => {
//     const updated = [...customFields];
//     updated[index][field] = value;
//     setCustomFields(updated);
//   };

//   const removeCustomField = (index) => {
//     const updated = [...customFields];
//     updated.splice(index, 1);
//     setCustomFields(updated);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Dispatch the addProduct action to Redux
//     dispatch(addProduct(product))
//       .unwrap()
//       .then(() => {
//         alert("Product added successfully!");
//         navigate('/admin/products');  // Navigate to products list after success
//       })
//       .catch((err) => {
//         console.error("Error adding product:", err);
//         alert("Failed to add product!");
//       });
//   };

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
//         <Typography variant="h5" gutterBottom>
//           Add Product
//         </Typography>
//         <form onSubmit={handleSubmit} className="flex-col gap-4 space-y-4">
//           {/* Core Fields */}
//           <Stack spacing={2}>
//             <TextField
//               label="Product ID"
//               name="productId"
//               fullWidth
//               onChange={handleChange}
//               value={product.productId}
//             />
//             <TextField
//               label="Product Name"
//               name="name"
//               fullWidth
//               required
//               onChange={handleChange}
//               value={product.name}
//             />
//             {/* Category Select */}
//             <TextField
//               label="Category"
//               name="category"
//               fullWidth
//               required
//               select
//               value={product.category}
//               onChange={handleChange}
//               SelectProps={{
//                 native: true,
//               }}
//               disabled={categoriesLoading}  // Disable select when loading categories
//             >
//               <option value="">Select Category</option>
//               {categories?.map((category) => (
//                 <option key={category.id} value={category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </TextField>
//             {categoriesError && <Typography color="error">Error: {categoriesError}</Typography>}
//             {categoriesLoading && <CircularProgress />}
//             <TextField
//               label="Regular Price"
//               name="regularPrice"
//               type="number"
//               fullWidth
//               required
//               onChange={handleChange}
//               value={product.regularPrice}
//             />
//             <TextField
//               label="Special Price"
//               name="specialPrice"
//               type="number"
//               fullWidth
//               onChange={handleChange}
//               value={product.specialPrice}
//             />
//             <TextField
//               label="Tax (%)"
//               name="tax"
//               type="number"
//               fullWidth
//               onChange={handleChange}
//               value={product.tax}
//             />
//             <TextField
//               label="Slug"
//               name="slug"
//               fullWidth
//               required
//               onChange={handleChange}
//               value={product.slug}
//             />
//             <TextField
//               label="Details"
//               name="details"
//               fullWidth
//               required
//               multiline
//               rows={4}
//               onChange={handleChange}
//               value={product.details}
//             />
//             <TextField
//               label="Specification"
//               name="specification"
//               fullWidth
//               required
//               multiline
//               rows={2}
//               onChange={handleChange}
//               value={product.specification}
//             />
//             <TextField
//               label="Quantity"
//               name="quantity"
//               type="number"
//               fullWidth
//               required
//               onChange={handleChange}
//               value={product.quantity}
//             />
//           </Stack>

//           {/* Main Image */}
//           <Box>
//             <Typography variant="subtitle1">Upload Product Image</Typography>
//             {mainImagePreview && (
//               <Avatar src={mainImagePreview} variant="rounded" sx={{ width: 80, height: 80 }} />
//             )}
//             <Button component="label">
//               Upload Product Image
//               <input type="file" hidden accept="image/*" onChange={handleMainImageChange} />
//             </Button>
//           </Box>

//           {/* Additional Images */}
//           <Box>
//             <Typography variant="subtitle1">Upload Gallery Images</Typography>
//             <Box display="flex" flexWrap="wrap" gap={2}>
//               {additionalImagesPreviews.map((src, i) => (
//                 <Avatar key={i} src={src} variant="rounded" sx={{ width: 60, height: 60 }} />
//               ))}
//             </Box>
//             <Button component="label">
//               Upload Gallery Images
//               <input type="file" hidden multiple accept="image/*" onChange={handleAdditionalImagesChange} />
//             </Button>
//           </Box>

//           {/* Custom Fields */}
//           <Box>
//             <Typography variant="subtitle1">Product Specifications (Optional)</Typography>
//             <Button variant="outlined" onClick={addCustomField}>
//               Add Custom Field
//             </Button>
//             {customFields.map((field, index) => (
//               <Box key={index} className="flex gap-4 mt-2">
//                 <TextField
//                   label="Title"
//                   value={field.title}
//                   onChange={(e) => updateCustomField(index, "title", e.target.value)}
//                 />
//                 <TextField
//                   label="Value"
//                   value={field.value}
//                   onChange={(e) => updateCustomField(index, "value", e.target.value)}
//                 />
//                 <IconButton onClick={() => removeCustomField(index)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </Box>
//             ))}
//           </Box>

//           {/* Submit Button */}
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Add Product
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;
