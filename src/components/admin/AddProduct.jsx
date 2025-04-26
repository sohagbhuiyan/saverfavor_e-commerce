import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  IconButton,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const AddProduct = () => {
  const [product, setProduct] = useState({
    productId: "",
    name: "",
    category: "",
    regularPrice: "",
    specialPrice: "",
    tax: "",
    slug: "",
    details:"",
    specification:"",
    mainImage: null,
    additionalImages: []
  });

  const [customFields, setCustomFields] = useState([]);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [additionalImagesPreviews, setAdditionalImagesPreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct((prev) => ({ ...prev, mainImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prev) => ({
      ...prev,
      additionalImages: [...prev.additionalImages, ...files],
    }));

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdditionalImagesPreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const addCustomField = () => {
    setCustomFields([...customFields, { title: "", value: "" }]);
  };

  const updateCustomField = (index, field, value) => {
    const updated = [...customFields];
    updated[index][field] = value;
    setCustomFields(updated);
  };

  const removeCustomField = (index) => {
    const updated = [...customFields];
    updated.splice(index, 1);
    setCustomFields(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Product:", product, customFields);
    alert("Product submitted successfully!");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <Typography variant="h5" gutterBottom>
          Add Product
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Core Fields */}
          <TextField label="Product ID" name="productId" fullWidth onChange={handleChange} value={product.productId} />
          <TextField label="Product Name" name="name" fullWidth required onChange={handleChange} value={product.name} />
          <TextField label="Category" name="category" fullWidth required onChange={handleChange} value={product.category} />
          <TextField label="Regular Price" name="regularPrice" type="number" fullWidth required onChange={handleChange} value={product.regularPrice} />
          <TextField label="Special Price" name="specialPrice" type="number" fullWidth onChange={handleChange} value={product.specialPrice} />
          <TextField label="Tax (%)" name="tax" type="number" fullWidth onChange={handleChange} value={product.tax} />
          <TextField label="Slug" name="slug" fullWidth required onChange={handleChange} value={product.slug} />
          <TextField label="Details" name="details" fullWidth required multiline rows={4} onChange={handleChange} value={product.details}/>
          <TextField label="Specification" name="specification" fullWidth required multiline rows={2} onChange={handleChange} value={product.specification}/>
          
          {/* Main Image */}
          <Box>
            <Typography variant="subtitle1">Upload Product Image</Typography>
            {mainImagePreview && <Avatar src={mainImagePreview} variant="rounded" sx={{ width: 80, height: 80 }} />}
            <Button component="label">
            Upload Product Image
              <input type="file" hidden accept="image/*" onChange={handleMainImageChange} />
            </Button>
          </Box>

          {/* Additional Images */}
          <Box>
            <Typography variant="subtitle1">Upload Gallery Images</Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
              {additionalImagesPreviews.map((src, i) => (
                <Avatar key={i} src={src} variant="rounded" sx={{ width: 60, height: 60 }} />
              ))}
            </Box>
            <Button component="label">
            Upload Gallery Images
              <input type="file" hidden multiple accept="image/*" onChange={handleAdditionalImagesChange} />
            </Button>
          </Box>

          {/* Custom Fields */}
          <Box>
            <Typography variant="subtitle1">Custom Specifications</Typography>
            {customFields.map((field, index) => (
              <Box key={index} display="flex" gap={2} alignItems="center" mt={2}>
                <TextField
                  label="Title"
                  value={field.title}
                  onChange={(e) => updateCustomField(index, "title", e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Value"
                  value={field.value}
                  onChange={(e) => updateCustomField(index, "value", e.target.value)}
                  fullWidth
                />
                <IconButton onClick={() => removeCustomField(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button onClick={addCustomField} variant="outlined" sx={{ mt: 2 }}>+ Add Custom Field</Button>
          </Box>

          {/* Submit */}
          <Box textAlign="right">
            <Button type="submit" variant="contained" color="primary">
              Submit Product
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
