
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaExchangeAlt,
  FaUser,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import TopBar from "./TopBar";
import { menuItems } from "./menuItems";
import { jscomputer } from "../../Utils/images";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [desktopSubmenuOpen, setDesktopSubmenuOpen] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  
  const [user, setUser] = useState(
    localStorage.getItem("userEmail") ? { email: localStorage.getItem("userEmail") } : null
  );
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showMoreItems, setShowMoreItems] = useState(false); 
  const [moreItemsSubmenuOpen, setMoreItemsSubmenuOpen] = useState(null);

  const firstTenItems = menuItems.slice(0, 10);
  const remainingItems = menuItems.slice(10);
  // Toggle "More Items" dropdown
  const toggleMoreItems = () => {
    setShowMoreItems(!showMoreItems);
    setMoreItemsSubmenuOpen(null); // Reset submenu when toggling
  };

  // Toggle submenu under "More Items"
  const toggleMoreItemsSubmenu = (index) => {
    setMoreItemsSubmenuOpen(moreItemsSubmenuOpen === index ? null : index);
  };

  // Initialize user state from localStorage
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setUser({ email: userEmail });
    }
  }, []);

// Fetch all users' data and filter for the logged-in user
const fetchProfileData = async () => {
  setLoading(true);
  setError("");
  try {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("userEmail"); // Get the logged-in user's email

    if (!token || !userEmail) {
      throw new Error("No token or user email found. Please log in again.");
    }

    // Fetch all users' data
    const response = await axios.get(
      "http://108.181.173.121:6061/api/userRegistration/get",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("API Response (All Users):", response.data); // Log the API response

    // Filter the data to find the logged-in user
    const loggedInUser = response.data.find((user) => user.email === userEmail);

    if (loggedInUser) {
      console.log("Filtered User Data:", loggedInUser); // Log the filtered user data
      setProfileData(loggedInUser); // Set the logged-in user's data
    } else {
      throw new Error("No data found for the logged-in user.");
    }
  } catch (err) {
    console.error("Error fetching profile data:", err);
    setError("Failed to fetch profile data. Please try again.");
  } finally {
    setLoading(false);
  }
};

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setUser(null);
    setActiveDropdown(null);
  };

  // Toggle dropdown
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Update cart count
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(count);
  };

  // Listen for cart updates
  useEffect(() => {
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  return (
    <div className="bg-[#CF212B] text-white">
      {/* Top Bar */}
      <TopBar/>
      {/* Main Navbar */}
      <div className="flex items-center justify-between px-5 py-3 md:px-6 lg:px-12">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-xl"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars className="cursor-pointer "/>}
        </button>

        {/* Logo and Search Bar */}
        <div className=" flex flex-1 items-center justify-center gap-3 px-2 md:gap-10">
          <img  src = {jscomputer}
            className="text-sm font-medium sm:text-2xl md:text-4xl h-10 w-20 text-center cursor-pointer"
            onClick={() => window.location.href = "/"}
           
          />
          <div className="relative bg-white w-full max-w-xs sm:max-w-xs md:max-w-lg lg:max-w-xl rounded-md flex">
            <input
              type="text"
              placeholder="Enter Your Keyword..."
              className="w-full px-2 text-sm md:text-lg sm:px-4 text-black rounded-md outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && console.log("Searching:", searchQuery)}
            />
            <button
              className="p-1 sm:p-2 bg-green-500 hover:bg-green-600 rounded-r-md cursor-pointer"
              onClick={() => console.log("Searching:", searchQuery)}
            >
              <AiOutlineSearch className="text-white text-xl" />
            </button>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center justify-center space-x-4 relative">
            {/* Shopping Cart */}
            <div className="relative">
              <FaShoppingCart
                className="text-lg cursor-pointer hover:text-gray-300"
                onClick={() => toggleDropdown("cart")}
              />
              {cartCount > 0 && (
                <span className="absolute -top-4 -right-3 bg-red-500 text-white text-xs p-1 rounded-full">
                  {cartCount}
                </span>
              )}
              {activeDropdown === "cart" && (
                <div className="absolute top-8 z-51 right-0 bg-white text-black p-3 rounded-lg shadow-lg w-48">
                  <p className="font-semibold">Your Cart</p>
                  <p className="text-sm text-gray-600">No items added yet.</p>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <div className="relative">
              <FaHeart
                className="text-lg cursor-pointer hover:text-gray-300"
                onClick={() => toggleDropdown("wishlist")}
              />
              {activeDropdown === "wishlist" && (
                <div className="absolute top-8 z-51 right-0 bg-white text-black p-3 rounded-lg shadow-lg w-48">
                  <p className="font-semibold">Wishlist</p>
                  <p className="text-sm text-gray-600">Your favorite items.</p>
                </div>
              )}
            </div>

            {/* Compare */}
            <div className="relative">
              <FaExchangeAlt
                className="text-lg cursor-pointer hover:text-gray-300"
                onClick={() => toggleDropdown("compare")}
              />
              {activeDropdown === "compare" && (
                <div className="absolute top-8 right-0 z-51 bg-white text-black p-3 rounded-lg shadow-lg w-48">
                  <p className="font-semibold">Compare Items</p>
                  <p className="text-sm text-gray-600">No items to compare.</p>
                </div>
              )}
            </div>

            {/* User Profile for Desktop */}
            <div className="relative">
              <FaUser
                className="text-lg cursor-pointer hover:text-gray-300"
                onClick={() => toggleDropdown("user")}
              />
              {activeDropdown === "user" && (
                <div className="absolute top-8 right-0 z-40 bg-white text-black px-1 py-2 rounded-lg shadow-lg">
                  {user ? (
                    <>
                      <p className="bg-green-600 text-white rounded-lg px-1">{user.email}</p>
                      <p className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-500 rounded-lg ">Profile Edit</p>
                      <button 
                      className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-500 rounded-lg "
                      onClick={fetchProfileData}
                      >
                      Profile View
                    </button>
                      <button
                        className="text-red-600 hover:text-red-400 font-medium text-sm md:text-md rounded-lg w-full cursor-pointer"
                        onClick={handleLogout}
                      >
                        Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600">Not logged in</p>
                      <Link to="/login">
                        <button className="mt-2 bg-green-500 text-white px-1 py-2 rounded-lg w-48 cursor-pointer">
                          Log In
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

{/* Desktop Menu */}
<div className="hidden md:flex items-center justify-center space-x-2 px-2 py-3 font-medium text-sm md:space-x-6 md:px-4">
        {/* First 10 Menu Items */}
        {firstTenItems.map((item, index) => (
          <div
            key={index}
            className="relative cursor-pointer group"
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => setDesktopSubmenuOpen(desktopSubmenuOpen === index ? null : index)}
          >
            <Link to={item.path} className="hover:text-gray-300">
              {item.name}
            </Link>

            {item.subMenu && (
              <div
                className={`${
                  hoverIndex === index || desktopSubmenuOpen === index ? "block" : "hidden"
                } absolute left-0 mt-2 w-48 bg-gray-300 text-black shadow-lg rounded-md z-50`}
              >
                {item.subMenu.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    to={subItem.path}
                    className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* More Items Dropdown */}
        {remainingItems.length > 0 && (
          <div className="relative cursor-pointer group">
            <div
              className="flex items-center hover:text-gray-300"
              onClick={toggleMoreItems}
            >
              More Items <FaAngleDoubleRight className="ml-1" />
            </div>

            {/* Dropdown for Remaining Items */}
            {showMoreItems && (
              <div className="absolute left-0 mt-2 w-48 bg-gray-300 text-black shadow-lg rounded-md z-50">
                {remainingItems.map((item, index) => (
                  <div key={index} className="relative">
                    <div
                      className="flex justify-between items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => toggleMoreItemsSubmenu(index)}
                    >
                      <span>{item.name}</span>
                      {item.subMenu && <FaChevronDown className="text-sm" />}
                    </div>

                    {/* Submenu for Remaining Items */}
                    {item.subMenu && moreItemsSubmenuOpen === index && (
                      <div className="ml-4 mt-1">
                        {item.subMenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.path}
                            className="block px-4 py-2 hover:bg-gray-200"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu (Sidebar) */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-48 bg-gray-900 text-white transform ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        {/* Close Button */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-4 right-4 text-xl cursor-pointer"
        >
          <FaTimes />
        </button>

        {/* Mobile Menu Title */}
        <h2 className="text-sm font-bold text-green-400 p-4">Items</h2>

        {/* Mobile Menu Items */}
        <div className="flex flex-col space-y-2 px-4 overflow-y-auto pb-10 h-[calc(100vh-60px)]">
          {menuItems.map((item, index) => (
            <div key={index} className="py-2 text-xs border-b border-gray-700">
              {/* Parent Menu Item */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() =>
                  setMobileSubmenuOpen(mobileSubmenuOpen === index ? null : index)
                }
              >
                <Link to={item.path} className="hover:text-gray-300">
                  {item.name}
                </Link>
                {item.subMenu && <span>{mobileSubmenuOpen === index ? "▲" : "▼"}</span>}
              </div>

              {/* Mobile Submenu */}
              {item.subMenu && mobileSubmenuOpen === index && (
                <div className="ml-0 mt-2">
                  {item.subMenu.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subItem.path}
                      className="block text-white text-xs bg-gray-700 p-1 cursor-pointer hover:bg-gray-600"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <div className="md:hidden fixed z-50 bottom-0 left-0 w-full bg-[#CF212B] p-2 flex justify-around items-center text-white">
        {[
          { icon: <FaShoppingCart />, name: "cart", text: "Cart Items" },
          { icon: <FaHeart />, name: "wishlist", text: "Wishlist" },
          { icon: <FaExchangeAlt />, name: "compare", text: "Compare Items" },
        ].map((item, index) => (
          <div key={index} className="relative flex flex-col items-center">
            <div
              className="text-xl cursor-pointer hover:text-gray-300"
              onClick={() => toggleDropdown(item.name)}
            >
              {item.icon}
            </div>
            <span className="text-xs ">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</span>
            {activeDropdown === item.name && (
              <div className="absolute bottom-12 left-0 bg-white text-black p-3 rounded-lg shadow-lg w-40">
                <p>{item.text}</p>
              </div>
            )}
          </div>
        ))}

        {/* User Profile for Mobile */}
        <div className="relative flex flex-col items-center">
          <FaUser
            className="text-xl cursor-pointer hover:text-gray-300"
            onClick={() => toggleDropdown("user")}
          />
          <span className="text-xs">Profile</span>
          {activeDropdown === "user" && (
            <div className="absolute bottom-12 right-0 bg-white text-black px-1 py-2 rounded-lg shadow-lg">
              {user ? (
                <>
                  <p className="bg-green-600 text-white rounded-lg ">{user.email}</p>
                  <p className="text-sm font-medium text-gray-600 cursor-pointer">Profile Edit</p>
                  <button className="cursor-pointer text-sm font-medium text-gray-600 rounded-lg "
                  onClick={fetchProfileData}>
                      Profile View
                    </button>
                  <button
                    className="text-red-600 hover:text-red-400 font-medium text-sm md:text-md rounded-lg w-full cursor-pointer"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-600">Not logged in</p>
                  <Link to="/login">
                    <button className="mt-2 cursor-pointer bg-green-500 text-white rounded-lg w-48">
                      Log In
                    </button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      {/* // Modal for displaying profile data */}
      {profileData && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl text-gray-600 font-bold mb-4">Profile Information</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="text-gray-800">
          <p><strong>Name:</strong> {profileData.name}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Address:</strong> {profileData.address}</p>
          <p><strong>Country:</strong> {profileData.country}</p>
          <p><strong>Phone Number:</strong> {profileData.phoneNo}</p>
          <p><strong>Date of Birth:</strong> {profileData.dob}</p>
          <p><strong>NID Number:</strong> {profileData.nidnumber}</p>  
        </ul>
      )}
      <button
        className="mt-4 bg-red-500 text-white p-2 cursor-pointer rounded-lg w-full"
        onClick={() => setProfileData(null)}
      >
        Close
      </button>
    </div>
  </div>
)}
</div>
  );
};

export default Navbar;
