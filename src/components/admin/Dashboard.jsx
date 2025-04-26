import React from "react";
import { FiTrendingUp, FiShoppingCart, FiUsers, FiDollarSign, FiPackage } from "react-icons/fi";
// import { Bar, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

const Dashboard = () => {
  // Sample data for charts
  // const salesData = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  //   datasets: [
  //     {
  //       label: 'Monthly Sales ($)',
  //       data: [5000, 8000, 12000, 9000, 15000, 18000],
  //       backgroundColor: 'rgba(99, 102, 241, 0.2)',
  //       borderColor: 'rgba(99, 102, 241, 1)',
  //       borderWidth: 2,
  //       tension: 0.4,
  //     },
  //   ],
  // };

  // const ordersData = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  //   datasets: [
  //     {
  //       label: 'Monthly Orders',
  //       data: [120, 180, 210, 190, 250, 300],
  //       backgroundColor: 'rgba(16, 185, 129, 0.2)',
  //       borderColor: 'rgba(16, 185, 129, 1)',
  //       borderWidth: 2,
  //       tension: 0.4,
  //     },
  //   ],
  // };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      {/* Key Metrics */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Sales</p>
              <p className="text-2xl font-semibold mt-1">$24,345</p>
            </div>
            <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600">
              <FiDollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 text-sm text-green-600 flex items-center">
            <FiTrendingUp className="mr-1" /> 12.5% from last month
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <p className="text-2xl font-semibold mt-1">1,245</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <FiShoppingCart className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 text-sm text-green-600 flex items-center">
            <FiTrendingUp className="mr-1" /> 8.3% from last month
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Customers</p>
              <p className="text-2xl font-semibold mt-1">586</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <FiUsers className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 text-sm text-green-600 flex items-center">
            <FiTrendingUp className="mr-1" /> 5.2% from last month
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Products</p>
              <p className="text-2xl font-semibold mt-1">128</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              <FiPackage className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 text-sm text-green-600 flex items-center">
            <FiTrendingUp className="mr-1" /> 3 new this month
          </div>
        </div> */}
      {/* </div> */}
      
      {/* Charts Section
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Sales Performance</h2>
          <div className="h-72">
            <Bar 
              data={salesData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      drawBorder: false
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                }
              }} 
            />
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Order Trends</h2>
          <div className="h-72">
            <Line 
              data={ordersData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      drawBorder: false
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                }
              }} 
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
