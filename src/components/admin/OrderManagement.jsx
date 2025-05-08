import React, { useState, useEffect } from "react";
import { FiSearch, FiFilter, FiPrinter, FiEye } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../store/orderSlice";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const orderState = useSelector((state) => state.order) || {};
  const { orders = [], loading = false, error = null } = orderState;
  
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const filteredOrders = orders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (order.productDetails?.productid?.toLowerCase().includes(searchLower) ||
        order.productDetails?.name?.toLowerCase().includes(searchLower)) &&
      (statusFilter === "all" || order.status === statusFilter)
    );
  });

  const handleStatusChange = (orderId, newStatus) => {
    // Assuming you have an async thunk to update order status
    // dispatch(updateOrderStatus({ orderId, status: newStatus }))
    dispatch(({ orderId, status: newStatus }))
      .unwrap()
      .then(() => {
        dispatch(fetchOrders()); // Refresh the orders list
      })
      .catch((error) => {
        console.error("Status update failed:", error);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <div className="text-center py-4">Loading orders...</div>;
  if (error) return <div className="text-center text-red-500 py-4">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Search by Product ID or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <FiFilter className="text-gray-400" />
          <select
            className="border rounded-md px-3 py-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-600 hover:underline"
                  >
                    #{order.id}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {order.user?.name || 'Guest'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.user?.email}
                  </div>
                  {order.user?.phoneNo && (
                    <div className="text-xs text-gray-500">
                      {order.user.phoneNo}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">{order.productDetails?.name}</td>
                <td className="px-6 py-4">{order.productDetails?.catagory?.name || 'N/A'}</td>
                <td className="px-6 py-4">{order.quantity}</td>
                <td className="px-6 py-4">৳{order.productDetails?.specialprice?.toLocaleString()}</td>
                <td className="px-6 py-4">
                  ৳{(order.quantity * order.productDetails?.specialprice)?.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-sm ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-600 hover:text-blue-800 p-1"
                    >
                      <FiEye className="w-5 h-5" />
                    </button>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-auto">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold">Order Details - #{selectedOrder.id}</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="p-6 grid gap-4 md:grid-cols-2">
              {/* Customer Information */}
              <div className="space-y-2">
                <h4 className="font-medium text-lg">Customer Information</h4>
                <p><span className="font-medium">Name:</span> {selectedOrder.user?.name || 'Guest'}</p>
                <p><span className="font-medium">Email:</span> {selectedOrder.user?.email}</p>
                {selectedOrder.user?.phoneNo && (
                  <p><span className="font-medium">Phone:</span> {selectedOrder.user.phoneNo}</p>
                )}
              </div>

              {/* Product Information */}
              <div className="space-y-2">
                <h4 className="font-medium text-lg">Product Information</h4>
                <p><span className="font-medium">Product ID:</span> {selectedOrder.productDetails?.productid}</p>
                <p><span className="font-medium">Name:</span> {selectedOrder.productDetails?.name}</p>
                <p><span className="font-medium">Category:</span> {selectedOrder.productDetails?.catagory?.name}</p>
              </div>

              {/* Pricing Details */}
              <div className="space-y-2">
                <h4 className="font-medium text-lg">Pricing Details</h4>
                <p><span className="font-medium">Unit Price:</span> ৳{selectedOrder.productDetails?.specialprice?.toLocaleString()}</p>
                <p><span className="font-medium">Quantity:</span> {selectedOrder.quantity}</p>
                <p><span className="font-medium">Total Price:</span> ৳{(selectedOrder.quantity * selectedOrder.productDetails?.specialprice)?.toLocaleString()}</p>
              </div>

              {/* Product Specifications */}
              <div className="md:col-span-2 space-y-2">
                <h4 className="font-medium text-lg">Product Specifications</h4>
                <p className="text-gray-600">{selectedOrder.productDetails?.details}</p>
                <p className="text-gray-600">{selectedOrder.productDetails?.specification}</p>
              </div>

              {/* Price Comparison */}
              <div className="md:col-span-2">
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Regular Price:</span>
                    <span>৳{selectedOrder.productDetails?.regularprice?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Special Price:</span>
                    <span>৳{selectedOrder.productDetails?.specialprice?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total Paid:</span>
                    <span>৳{(selectedOrder.quantity * selectedOrder.productDetails?.specialprice)?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t flex justify-end">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
              >
                <FiPrinter className="w-5 h-5" />
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
