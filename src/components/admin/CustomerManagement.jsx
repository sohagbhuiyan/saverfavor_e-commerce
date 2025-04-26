import React, { useState } from "react";
import { FiSearch, FiMail, FiUser, FiDollarSign, FiCalendar, FiEdit, FiEye } from "react-icons/fi";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([
    {
      id: "CUST-1001",
      name: "Sohag Bhuiyan",
      email: "sohag171@example.com",
      phone: "+1 (555) 123-4567",
      orders: 5,
      totalSpent: "$1,245.75",
      lastOrder: "2023-05-10",
    },
    {
      id: "CUST-1002",
      name: "Sanaullah",
      email: "sanaullah.smith@example.com",
      phone: "+1 (555) 987-6543",
      orders: 3,
      totalSpent: "$589.50",
      lastOrder: "2023-04-28",
    },
    {
      id: "CUST-1003",
      name: "Robert Johnson",
      email: "robert.j@example.com",
      phone: "+1 (555) 456-7890",
      orders: 1,
      totalSpent: "$89.99",
      lastOrder: "2023-03-15",
    },
    {
      id: "CUST-1004",
      name: "Dada",
      email: "dada.d@example.com",
      phone: "+1 (555) 789-0123",
      orders: 7,
      totalSpent: "$2,145.30",
      lastOrder: "2023-05-12",
    },
    {
      id: "CUST-1005",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 789-0123",
      orders: 7,
      totalSpent: "$2,145.30",
      lastOrder: "2023-05-12",
    },
    {
      id: "CUST-1006",
      name: "Emily Davis",
      email: "emily.d@example.com",
      phone: "+1 (555) 789-0123",
      orders: 7,
      totalSpent: "$2,145.30",
      lastOrder: "2023-05-12",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter(customer => {
    return customer.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
           customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           customer.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Customer Management</h1>
      
      {/* Stats Overview */}
      <div className="flex justify-between items-center mb-6">
        <div className="bg-white p-3 px-12 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FiUser className="h-5 w-5" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Customers</p>
              <p className="text-2xl font-semibold text-gray-900">{customers.length}</p>
            </div>
          </div>
        </div>
      {/* Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center ">
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      </div>
      

      
      {/* Customers Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{customer.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{customer.email}</div>
                    <div className="text-xs text-gray-400">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.orders}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.totalSpent}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <FiEye className="h-5 w-5" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <FiMail className="h-5 w-5" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <FiEdit className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Customer Details - {selectedCustomer.name}</h3>
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                ✕
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-md font-medium mb-2">Customer Information</h4>
                  <div className="space-y-2">
                    <p><span className="font-medium">Customer ID:</span> {selectedCustomer.id}</p>
                    <p><span className="font-medium">Name:</span> {selectedCustomer.name}</p>
                    <p><span className="font-medium">Email:</span> {selectedCustomer.email}</p>
                    <p><span className="font-medium">Phone:</span> {selectedCustomer.phone}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-medium mb-2">Customer Statistics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Total Orders</p>
                      <p className="text-xl font-bold">{selectedCustomer.orders}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Total Spent</p>
                      <p className="text-xl font-bold">{selectedCustomer.totalSpent}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Avg. Order Value</p>
                      <p className="text-xl font-bold">
                        {selectedCustomer.orders > 0 
                          ? `$${(parseFloat(selectedCustomer.totalSpent.replace('$', '')) / selectedCustomer.orders).toFixed(2)}` 
                          : '$0.00'}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Last Order</p>
                      <p className="text-xl font-bold">{selectedCustomer.lastOrder}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <h4 className="text-md font-medium mb-2">Recent Orders</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">#ORD-1042</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{selectedCustomer.lastOrder}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$345.99</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <h4 className="text-md font-medium mt-6 mb-2">Customer Notes</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <textarea 
                  className="w-full bg-transparent text-sm text-gray-600 focus:outline-none"
                  rows="3"
                  placeholder="Add notes about this customer..."
                  defaultValue="This customer prefers email communication and has requested notifications about new arrivals."
                ></textarea>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Send Email
              </button>
              <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Edit Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;
