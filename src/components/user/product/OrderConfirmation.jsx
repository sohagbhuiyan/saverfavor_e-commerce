// src/components/OrderConfirmation.jsx
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  if (!order) {
    navigate("/");
    return null;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Order Confirmation</h2>
      <p className="text-lg mb-4">Thank you for your order!</p>
      <div className="border p-4 rounded-md">
        <h3 className="text-lg font-semibold">Order Details</h3>
        <p><strong>Product:</strong> {order.productname}</p>
        <p><strong>Quantity:</strong> {order.quantity}</p>
        <p><strong>Total Price:</strong> Tk {(order.productDetails.specialprice || order.productDetails.regularprice) * order.quantity}</p>
        <p><strong>Shipping Address:</strong> {order.address}, {order.upazila}, {order.districts}</p>
        <p><strong>Order Date:</strong> {new Date(order.requestDate).toLocaleString()}</p>
      </div>
      <button
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default OrderConfirmation;
