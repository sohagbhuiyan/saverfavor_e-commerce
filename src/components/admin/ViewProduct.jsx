import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Avatar
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ViewProduct = () => {
  // Sample product data with images
  const [products, setProducts] = useState([
    {
      id: 1,
      productId: "PRD-001",
      name: "Premium Wireless Headphones",
      description: "Noise cancelling wireless headphones with 30hr battery life",
      price: "$199.99",
      discount: "$20",
      tax: "$15",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200"
      ],
      category: "electronics",
      tags: ["wireless", "audio", "premium"],
      metaTitle: "Premium Wireless Headphones",
      metaDescription: "Buy the best noise cancelling wireless headphones",
      slug: "premium-wireless-headphones",
      weight: "0.5",
      dimensions: { length: "20", width: "15", height: "10" },
      isFeatured: true,
      stock: 25,
      createdAt: "2023-05-15"
    },
    {
      id: 2,
      productId: "PRD-002",
      name: "Organic Cotton T-Shirt",
      description: "100% organic cotton t-shirt, available in multiple colors",
      price: "$29.99",
      discount: "$5",
      tax: "$2",
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200"
      ],
      category: "clothing",
      tags: ["organic", "cotton", "tshirt"],
      metaTitle: "Organic Cotton T-Shirt",
      metaDescription: "Eco-friendly organic cotton t-shirt",
      slug: "organic-cotton-tshirt",
      weight: "0.2",
      dimensions: { length: "30", width: "20", height: "2" },
      isFeatured: false,
      stock: 50,
      createdAt: "2023-06-20"
    }
  ]);

  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState(false);

  const handleView = (product) => {
    setSelectedProduct(product);
    setViewMode(true);
    setOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setViewMode(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setSelectedProduct(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setSelectedProduct(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSave = () => {
    setProducts(products.map(product => 
      product.id === selectedProduct.id ? selectedProduct : product
    ));
    handleClose();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Product Inventory</h1>
            <Link to="/products/add-product">
              <Button variant="contained" color="primary">
                Add New Product
              </Button>
            </Link>
          </div>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-100">
                  <TableCell>Image</TableCell>
                  <TableCell>Product ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Date Added</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell>
                      <Avatar 
                        src={product.images[0]} 
                        alt={product.name}
                        variant="rounded"
                        sx={{ width: 56, height: 56 }}
                      />
                    </TableCell>
                    <TableCell>{product.productId}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="capitalize">{product.category}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.createdAt}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleView(product)} color="primary">
                        <Visibility />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(product)} color="secondary">
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(product.id)} color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      {/* Product Detail/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {viewMode ? "Product Details" : "Edit Product"}
        </DialogTitle>
        <DialogContent dividers>
          {selectedProduct && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col items-center">
                  <Avatar 
                    src={selectedProduct.images[0]} 
                    alt={selectedProduct.name}
                    variant="rounded"
                    sx={{ width: 200, height: 200, mb: 2 }}
                  />
                  <div className="flex space-x-2">
                    {selectedProduct.images.map((img, index) => (
                      <Avatar 
                        key={index}
                        src={img} 
                        variant="rounded"
                        sx={{ width: 56, height: 56 }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <TextField
                    fullWidth
                    label="Product ID"
                    name="productId"
                    value={selectedProduct.productId}
                    onChange={handleChange}
                    disabled={viewMode}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Product Name"
                    name="name"
                    value={selectedProduct.name}
                    onChange={handleChange}
                    disabled={viewMode}
                    margin="normal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormControl fullWidth margin="normal">
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={selectedProduct.category}
                    onChange={handleChange}
                    disabled={viewMode}
                  >
                    <MenuItem value="electronics">Electronics</MenuItem>
                    <MenuItem value="clothing">Clothing</MenuItem>
                    <MenuItem value="home">Home</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Date Added"
                  name="createdAt"
                  value={selectedProduct.createdAt}
                  onChange={handleChange}
                  disabled
                  margin="normal"
                />
              </div>

              <TextField
                fullWidth
                label="Description"
                name="description"
                value={selectedProduct.description}
                onChange={handleChange}
                multiline
                rows={3}
                disabled={viewMode}
                margin="normal"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  value={selectedProduct.price}
                  onChange={handleChange}
                  disabled={viewMode}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Discount"
                  name="discount"
                  value={selectedProduct.discount}
                  onChange={handleChange}
                  disabled={viewMode}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Stock"
                  name="stock"
                  type="number"
                  value={selectedProduct.stock}
                  onChange={handleChange}
                  disabled={viewMode}
                  margin="normal"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  fullWidth
                  label="Weight (kg)"
                  name="weight"
                  value={selectedProduct.weight}
                  onChange={handleChange}
                  disabled={viewMode}
                  margin="normal"
                />
                <div className="grid grid-cols-3 gap-2">
                  <TextField
                    fullWidth
                    label="Length"
                    name="dimensions.length"
                    value={selectedProduct.dimensions.length}
                    onChange={handleChange}
                    disabled={viewMode}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Width"
                    name="dimensions.width"
                    value={selectedProduct.dimensions.width}
                    onChange={handleChange}
                    disabled={viewMode}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Height"
                    name="dimensions.height"
                    value={selectedProduct.dimensions.height}
                    onChange={handleChange}
                    disabled={viewMode}
                    margin="normal"
                  />
                </div>
              </div>

              <FormControlLabel
                control={
                  <Checkbox
                    name="isFeatured"
                    checked={selectedProduct.isFeatured}
                    onChange={handleChange}
                    disabled={viewMode}
                  />
                }
                label="Featured Product"
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {!viewMode && (
            <Button onClick={handleSave} color="primary" variant="contained">
              Save Changes
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewProduct;
