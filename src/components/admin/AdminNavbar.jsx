import React, { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setIsDropdownOpen(false);
    alert("Logged out successfully!");
    navigate("/login");
  };

  const handleLoginRedirect = () => {
    setIsDropdownOpen(false);
    navigate("/login");
  };

  return (
    <div className="bg-gray-900 text-white p-1 flex justify-between items-center relative">
      <h1 className="text-xl px-12 font-bold">Techno Shop</h1>
      <div className="flex items-center">
        <FaCircleUser
          className="mr-8 h-6 w-6 cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />

        {isDropdownOpen && (
          <div className="absolute right-0 mt-40 w-48 bg-white rounded-lg shadow-lg text-gray-800">
            {isLoggedIn ? (
              <>
                <div className="p-4 border-b">
                  <p className="font-semibold">{localStorage.getItem("userEmail")}</p>
                </div>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={handleLoginRedirect}
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
