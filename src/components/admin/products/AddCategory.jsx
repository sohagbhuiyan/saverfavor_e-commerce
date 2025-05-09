
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, fetchCategories } from '../../../store/categorySlice';
import api, { API_BASE_URL } from '../../../store/api';

const AddCategory = () => {
  
  const dispatch = useDispatch();
  const { items: categories } = useSelector((state) => state.categories);

  const token = useSelector((state) => state.auth.token) || localStorage.getItem("authToken");
  const userRole = useSelector((state) => state.auth.role) || localStorage.getItem("authRole");
  console.log("Role --> ",userRole,"\nToken -->",token)
  
  const [categoryName, setCategoryName] = useState('');
  const [categorySuccess, setCategorySuccess] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [itemImage, setItemImage] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemSuccess, setItemSuccess] = useState('');
  const [itemError, setItemError] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setCategorySuccess('');
    setCategoryError('');
  
    try {
      const resultAction = await dispatch(addCategory({ name: categoryName, token }));
      if (resultAction.meta.requestStatus === 'fulfilled') {
        setCategorySuccess('Category (Menu) added successfully!');
        setCategoryName('');
        dispatch(fetchCategories());
      } else {
        setCategoryError('Failed to add category.');
      }
    } catch (err) {
      setCategoryError('Failed to add category.');
      console.error('Error:', err);
    }
  };
const handleItemSubmit = async (e) => {
  e.preventDefault();
  setItemSuccess('');
  setItemError('');

  if (!selectedCategoryId || !itemName || !itemImage) {
    setItemError('All fields including image are required.');
    return;
  }

  try {
    // Find the selected category object from the Redux state
    const selectedCategory = categories.find(
      (cat) => String(cat.id) === String(selectedCategoryId)
    );

    if (!selectedCategory) {
      setItemError('Selected category not found.');
      return;
    }

    // Create FormData
    const formData = new FormData();

    // Build dynamic product JSON
    const productData = {
      name: itemName,
      catagory: {
        id: selectedCategory.id,
        name: selectedCategory.name
      }
    };

    formData.append(
      "product",
      new Blob([JSON.stringify(productData)], { type: "application/json" })
    );

    formData.append("image", itemImage);

    const response = await api.post(`${API_BASE_URL}/api/Product/save`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data) {
      setItemSuccess('Item (Submenu) with image added successfully!');
      setItemName('');
      setSelectedCategoryId('');
      setItemImage(null);
    } else {
      setItemError('Failed to add item.');
    }
  } catch (err) {
    setItemError('Failed to add item.');
    console.error('Error:', err.response?.data || err.message);
  }
};

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-12">
      {userRole === 'admin' ? (
        <>
          {/* Add Category Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Add New Category (Menu)</h2>
            <form onSubmit={handleCategorySubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Enter Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                className="border rounded w-full p-2"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Add Category
              </button>
            </form>

            {categorySuccess && <p className="text-green-600 mt-4">{categorySuccess}</p>}
            {categoryError && <p className="text-red-600 mt-4">{categoryError}</p>}
          </div>

          {/* Add Item (Submenu) Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Add New Item (Submenu under Menu)</h2>
            <form onSubmit={handleItemSubmit} className="space-y-4">
              <select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                required
                className="border rounded w-full p-2"
              >
                <option value="">Select Category</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Enter Item (Submenu) Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
                className="border rounded w-full p-2"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setItemImage(e.target.files[0])}
                required
                className="border rounded w-full p-2"
              />

              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Add Item
              </button>
            </form>

            {itemSuccess && <p className="text-green-600 mt-4">{itemSuccess}</p>}
            {itemError && <p className="text-red-600 mt-4">{itemError}</p>}
          </div>
        </>
      ) : (
        <p className="text-red-600 text-center text-xl font-semibold">
          You do not have permission to access this page.
        </p>
      )}
    </div>
  );
};

export default AddCategory;
