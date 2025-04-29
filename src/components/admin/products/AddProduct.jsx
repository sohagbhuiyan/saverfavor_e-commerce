// AddProduct.jsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../store/productSlice";
import {
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  Stack,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../store/api";

const AddProduct = () => {
  const [product, setProduct] = useState({
    productid: "",
    name: "",
    categoryId: "",
    productId: "",
    regularprice: "",
    specialprice: "",
    title: "",
    details: "",
    specification: "",
    quantity: "",
    imagea: null,
    imageb: null,
    imagec: null,
  });

  const [categories, setCategories] = useState([]);
  const [subMenus, setSubMenus] = useState([]);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [additionalImagesPreviews, setAdditionalImagesPreviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/catagories/get`),
          fetch(`${API_BASE_URL}/api/Product/getall`),
        ]);
        const categories = await catRes.json();
        const products = await prodRes.json();

        if (Array.isArray(categories) && Array.isArray(products)) {
          const structured = categories.map((category) => {
            const related = products.filter(
              (product) => product.catagory?.id === category.id
            );
            return { ...category, subMenu: related };
          });
          setCategories(structured);
        } else {
          throw new Error("API did not return arrays");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load categories or products");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "categoryId") {
      const selected = categories.find((cat) => cat.id === parseInt(value));
      setSubMenus(selected?.subMenu || []);
      setProduct((prev) => ({
        ...prev,
        categoryId: value,
        productId: "",
      }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMainImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const key = index === 0 ? "imagea" : index === 1 ? "imageb" : "imagec";
    setProduct((prev) => ({ ...prev, [key]: file }));

    const reader = new FileReader();
    reader.onloadend = () => {
      if (index === 0) {
        setMainImagePreview(reader.result);
      } else {
        setAdditionalImagesPreviews((prev) => {
          const updated = [...prev];
          updated[index - 1] = reader.result;
          return updated;
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addProduct(product))
      .unwrap()
      .then(() => {
        alert("Product added successfully!");
        navigate("/admin/products");
      })
      .catch((err) => {
        console.error("Error adding product:", err);
        alert("Failed to add product!");
      });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <Typography variant="h5" gutterBottom>
          Add Product
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Stack spacing={2}>
              <TextField label="Product ID" name="productid" fullWidth onChange={handleChange} value={product.productid} />
              <TextField label="Product Name" name="name" fullWidth required onChange={handleChange} value={product.name} />
              <TextField label="Title" name="title" fullWidth required onChange={handleChange} value={product.title} />

              <TextField
                select
                name="categoryId"
                label="Category"
                fullWidth
                required
                onChange={handleChange}
                value={product.categoryId}
              >
                <MenuItem value="">Select Category</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                ))}
              </TextField>

              <TextField
                select
                name="productId"
                label="Submenu"
                fullWidth
                disabled={!subMenus.length}
                onChange={handleChange}
                value={product.productId}
              >
                <MenuItem value="">Select Submenu</MenuItem>
                {subMenus.map((sub) => (
                  <MenuItem key={sub.id} value={sub.id}>{sub.name}</MenuItem>
                ))}
              </TextField>

              <TextField label="Regular Price" name="regularprice" type="number" fullWidth required onChange={handleChange} value={product.regularprice} />
              <TextField label="Special Price" name="specialprice" type="number" fullWidth onChange={handleChange} value={product.specialprice} />
              <TextField label="Details" name="details" fullWidth multiline rows={4} required onChange={handleChange} value={product.details} />
              <TextField label="Specification" name="specification" fullWidth multiline rows={2} required onChange={handleChange} value={product.specification} />
              <TextField label="Quantity" name="quantity" type="number" fullWidth required onChange={handleChange} value={product.quantity} />

              <Box>
                <Typography variant="subtitle1">Image A (Main)</Typography>
                {mainImagePreview && <Avatar src={mainImagePreview} variant="rounded" sx={{ width: 80, height: 60 }} />}
                <Button component="label">
                  Upload Image A
                  <input type="file" hidden accept="image/*" onChange={(e) => handleMainImageChange(e, 0)} />
                </Button>
              </Box>

              {[1, 2].map((index) => (
                <Box key={index}>
                  <Typography variant="subtitle1">Image {index + 1} (Gallery)</Typography>
                  {additionalImagesPreviews[index - 1] && (
                    <Avatar src={additionalImagesPreviews[index - 1]} variant="rounded" sx={{ width: 60, height: 50 }} />
                  )}
                  <Button component="label">
                    Upload Image {index + 1}
                    <input type="file" hidden accept="image/*" onChange={(e) => handleMainImageChange(e, index)} />
                  </Button>
                </Box>
              ))}
            </Stack>

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Product
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
