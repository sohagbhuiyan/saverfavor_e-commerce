// src/components/CheckoutPage.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { placeOrder } from "../../../store/orderSlice";
import { API_BASE_URL } from "../../../store/api";

const CheckoutPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, profile, token } = useSelector((state) => state.auth);
  const { product, quantity } = location.state || {}; // Product and quantity passed via navigation
  const [orderForm, setOrderForm] = useState({
    districts: "",
    upazila: "",
    address: "",
  });

  // Redirect to login if not authenticated
  if (!user?.id || !profile?.email || !token) {
    alert.error("Please log in to place an order.", { duration: 1000 });
    navigate("/login", { state: { from: location.pathname } });
    return null;
  }

  if (!product) {
    toast.error("No product selected.", { duration: 1000 });
    navigate("/");
    return null;
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setOrderForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!orderForm.districts || !orderForm.upazila || !orderForm.address) {
      toast.error("Please fill in all required fields.", { duration: 2000 });
      return;
    }

    const requestDate = new Date().toISOString();
    const orderPayload = {
      quantity,
      catagory: {
        id: product.catagory.id,
        name: product.catagory.name,
      },
      product: {
        id: product.product.id,
        name: product.product.name,
        catagory: {
          id: product.catagory.id,
          name: product.catagory.name,
        },
      },
      productDetails: {
        id: product.id,
        productid: product.productid,
        name: product.name,
        quantity: product.quantity,
        regularprice: product.regularprice,
        specialprice: product.specialprice,
        title: product.title,
        details: product.details,
        specification: product.specification,
        imagea: product.imagea,
        imageb: product.imageb,
        imagec: product.imagec,
        catagory: {
          id: product.catagory.id,
          name: product.catagory.name,
        },
        product: {
          id: product.product.id,
          name: product.product.name,
          catagory: {
            id: product.catagory.id,
            name: product.catagory.name,
          },
        },
      },
      productid: product.productid,
      productname: product.name,
      districts: orderForm.districts,
      upazila: orderForm.upazila,
      address: orderForm.address,
      requestDate,
      userId: user.id,
    };

    dispatch(placeOrder(orderPayload))
      .unwrap()
      .then(() => {
        toast.success("Order placed successfully!", { duration: 2000 });
        navigate("/order-confirmation", { state: { order: orderPayload } });
      })
      .catch((error) => {
        toast.error(`Order failed: ${error}`, { duration: 2000 });
      });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="flex gap-4">
            <img
              src={`${API_BASE_URL}/images/${product.imagea}`}
              alt={product.name}
              className="w-24 h-24 object-cover border"
            />
            <div>
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-sm text-gray-600">Product ID: {product.productid}</p>
              <p className="text-sm">Quantity: {quantity}</p>
              <p className="text-sm font-bold">
                Price: Tk {product.specialprice || product.regularprice}
              </p>
              <p className="text-sm font-bold">
                Total: Tk {(product.specialprice || product.regularprice) * quantity}
              </p>
            </div>
          </div>
        </div>

        {/* Shipping Address Form */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">District</label>
              <input
                type="text"
                name="districts"
                value={orderForm.districts}
                onChange={handleFormChange}
                className="mt-1 p-2 block w-full border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Upazila</label>
              <input
                type="text"
                name="upazila"
                value={orderForm.upazila}
                onChange={handleFormChange}
                className="mt-1 p-2 block w-full border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                name="address"
                value={orderForm.address}
                onChange={handleFormChange}
                className="mt-1 p-2 block w-full border rounded-md"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Confirm Order
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default CheckoutPage;
