import React, { useState } from "react";
import { FiSearch, FiFilter, FiPrinter, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: "#ORD-1001",
      customer: "John Doe",
      date: "2023-05-15",
      status: "Processing",
      total: "$125.99",
      items: 3,
      payment: "Credit Card",
      email: "john.doe@example.com",
      phone: "(123) 456-7890",
      address: "123 Main St, Anytown, CA 12345, United States",
      orderItems: [
        { name: "Wireless Headphones", price: "$59.99", quantity: 1, total: "$59.99" },
        { name: "Phone Case", price: "$19.99", quantity: 2, total: "$39.98" },
        { name: "Screen Protector", price: "$8.99", quantity: 3, total: "$26.97" }
      ],
      subtotal: "$126.94",
      shipping: "$5.99",
      tax: "$10.40"
    },
    {
      id: "#ORD-1002",
      customer: "Jane Smith",
      date: "2023-05-14",
      status: "Shipped",
      total: "$89.50",
      items: 2,
      payment: "PayPal",
      email: "jane.smith@example.com",
      phone: "(234) 567-8901",
      address: "456 Oak Ave, Somewhere, NY 54321, United States",
      orderItems: [
        { name: "Smart Watch", price: "$79.99", quantity: 1, total: "$79.99" },
        { name: "Charging Cable", price: "$9.99", quantity: 1, total: "$9.99" }
      ],
      subtotal: "$89.98",
      shipping: "$5.99",
      tax: "$7.20"
    },
    {
      id: "#ORD-1003",
      customer: "Robert Johnson",
      date: "2023-05-13",
      status: "Delivered",
      total: "$245.75",
      items: 5,
      payment: "Credit Card",
      email: "robert.j@example.com",
      phone: "(345) 678-9012",
      address: "789 Pine Rd, Nowhere, TX 67890, United States",
      orderItems: [
        { name: "Bluetooth Speaker", price: "$129.99", quantity: 1, total: "$129.99" },
        { name: "USB Flash Drive", price: "$12.99", quantity: 3, total: "$38.97" },
        { name: "Mouse Pad", price: "$7.99", quantity: 1, total: "$7.99" }
      ],
      subtotal: "$176.95",
      shipping: "$12.99",
      tax: "$19.60"
    },
    {
      id: "#ORD-1004",
      customer: "Emily Davis",
      date: "2023-05-12",
      status: "Pending",
      total: "$67.30",
      items: 1,
      payment: "Cash on Delivery",
      email: "emily.d@example.com",
      phone: "(456) 789-0123",
      address: "321 Elm St, Anywhere, FL 34567, United States",
      orderItems: [
        { name: "Wireless Earbuds", price: "$49.99", quantity: 1, total: "$49.99" }
      ],
      subtotal: "$49.99",
      shipping: "$5.99",
      tax: "$4.80"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? {...order, status: newStatus} : order
    ));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Processing": return "bg-blue-100 text-blue-800";
      case "Shipped": return "bg-purple-100 text-purple-800";
      case "Delivered": return "bg-green-100 text-green-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>
      
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center">
            <FiFilter className="text-gray-400 mr-2" />
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
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
      </div>
      
      {/* Orders Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {order.id}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.payment}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => setSelectedOrder(order)}
                        title="View Details"
                      >
                        <FiEye className="h-5 w-5" />
                      </button>
                      <button 
                        className="text-gray-600 hover:text-gray-900"
                        title="Print Invoice"
                      >
                        <FiPrinter className="h-5 w-5" />
                      </button>
                      <select
                        className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        title="Change Status"
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
      </div>
      
      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Order Details - {selectedOrder.id}</h3>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-500 text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-md font-medium mb-2">Customer Information</h4>
                  <div className="space-y-1">
                    <p><span className="font-medium">Name:</span> {selectedOrder.customer}</p>
                    <p><span className="font-medium">Email:</span> {selectedOrder.email}</p>
                    <p><span className="font-medium">Phone:</span> {selectedOrder.phone}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-medium mb-2">Shipping Address</h4>
                  <p>{selectedOrder.address}</p>
                </div>
              </div>
              
              <h4 className="text-md font-medium mb-2">Order Summary</h4>
              <div className="mb-4">
                <div className="flex justify-between py-2">
                  <span className="font-medium">Order Date:</span>
                  <span>{selectedOrder.date}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium">Status:</span>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium">Payment Method:</span>
                  <span>{selectedOrder.payment}</span>
                </div>
              </div>
              
              <h4 className="text-md font-medium mb-2">Order Items</h4>
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedOrder.orderItems.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex justify-end">
                <div className="w-full md:w-1/3">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium">Subtotal:</span>
                    <span>{selectedOrder.subtotal}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium">Shipping:</span>
                    <span>{selectedOrder.shipping}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium">Tax:</span>
                    <span>{selectedOrder.tax}</span>
                  </div>
                  <div className="flex justify-between py-2 font-bold text-lg">
                    <span>Total:</span>
                    <span>{selectedOrder.total}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => window.print()}
              >
                Print Invoice
              </button>
              <button 
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  // Add your update logic here
                  alert(`Update order ${selectedOrder.id}`);
                }}
              >
                Update Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
