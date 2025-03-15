
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaExchangeAlt,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

const menuItems = [
  { name: "Home", path: "/" },
  {
    name: "Laptop",
    path: "/laptop",
    subMenu: [
      { name: "HP", path: "/laptop/hp" },
      { name: "Acer", path: "/laptop/acer" },
      { name: "Dell", path: "/laptop/dell" },
      { name: "Asus", path: "/laptop/asus" },
    ],
  },
  {
    name: "Desktop & Server",
    path: "/desktop-server",
    subMenu: [
      { name: "Gaming PC", path: "/desktop-server/gaming-pc" },
      { name: "Workstation", path: "/desktop-server/workstation" },
      { name: "Server", path: "/desktop-server/server" },
    ],
  },
  {
    name: "Gaming",
    path: "/gaming",
    subMenu: [
      { name: "Consoles", path: "/gaming/consoles" },
      { name: "Accessories", path: "/gaming/accessories" },
      { name: "Games", path: "/gaming/games" },
    ],
  },
  {
    name: "Monitor",
    path: "/monitor",
    subMenu: [
      { name: "Samsung", path: "/monitor/samsung" },
      { name: "HP", path: "/monitor/hp" },
      { name: "Dell", path: "/monitor/dell" },
    ],
  },
  {
    name: "Tablet PC",
    path: "/tablet-pc",
    subMenu: [
      { name: "Samsung", path: "/tablet-pc/samsung" },
      { name: "HP", path: "/tablet-pc/hp" },
      { name: "Dell", path: "/tablet-pc/dell" },
    ],
  },
  {
    name: "Printer",
    path: "/printer",
    subMenu: [
      { name: "Samsung", path: "/printer/samsung" },
      { name: "HP", path: "/printer/hp" },
      { name: "Dell", path: "/printer/dell" },
      { name: "Tep", path: "/printer/tep" },
      { name: "QWD", path: "/printer/qwd" },
    ],
  },
  {
    name: "Camera",
    path: "/camera",
    subMenu: [
      { name: "Canon", path: "/camera/canon" },
      { name: "Sony", path: "/camera/sony" },
      { name: "MSI", path: "/camera/msi" },
    ],
  },
  {
    name: "Security System",
    path: "/security-system",
    subMenu: [
      { name: "XYZ", path: "/security-system/xyz" },
      { name: "ABC", path: "/security-system/abc" },
      { name: "WFDSD", path: "/security-system/wfdsd" },
    ],
  },
  {
    name: "Network",
    path: "/network",
    subMenu: [
      { name: "SDVX", path: "/network/sdvx" },
      { name: "DFDF", path: "/network/dfdf" },
      { name: "Ddfell", path: "/network/ddfell" },
      { name: "ABC", path: "/network/abc" },
      { name: "SFDSD", path: "/network/sfdsd" },
    ],
  },
  {
    name: "Sound System",
    path: "/sound-system",
    subMenu: [
      { name: "WCSAC", path: "/sound-system/wcsac" },
      { name: "Tep", path: "/sound-system/tep" },
      { name: "QWD", path: "/sound-system/qwd" },
    ],
  },
  {
    name: "Office Items",
    path: "/office-items",
    subMenu: [
      { name: "CSDD", path: "/office-items/csdd" },
      { name: "TGVE", path: "/office-items/tgve" },
      { name: "BEFxs", path: "/office-items/befxs" },
    ],
  },
  {
    name: "Accessories",
    path: "/accessories",
    subMenu: [
      { name: "CEW", path: "/accessories/cew" },
      { name: "BGD", path: "/accessories/bgd" },
      { name: "NTgf", path: "/accessories/ntgf" },
      { name: "ABC", path: "/accessories/abc" },
      { name: "AFDSD", path: "/accessories/afdsd" },
    ],
  },
  {
    name: "Software",
    path: "/software",
    subMenu: [
      { name: "ZEDSA", path: "/software/zedsa" },
      { name: "MJHg", path: "/software/mjhg" },
      { name: "HFASD", path: "/software/hfasd" },
    ],
  },
  {
    name: "Daily Life",
    path: "/daily-life",
    subMenu: [
      { name: "WDWD", path: "/daily-life/wdwd" },
      { name: "TWWW", path: "/daily-life/twww" },
      { name: "VDSE", path: "/daily-life/vdse" },
    ],
  },
  {
    name: "Store",
    path: "/store",
    subMenu: [
      { name: "OPhg", path: "/store/ophg" },
      { name: "Crsd", path: "/store/crsd" },
      { name: "Dell", path: "/store/dell" },
    ],
  },
];

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

  // Initialize user state from localStorage
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setUser({ email: userEmail });
    }
  }, []);

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
      <div className="flex items-center justify-center space-x-6 px-6 py-2 text-xs md:text-sm">
        <span className="hover:text-gray-300 cursor-pointer">Big Sale</span>
        <span className="hover:text-gray-300 cursor-pointer">Offers</span>
        <span className="hover:text-gray-300 cursor-pointer">System Builder</span>
        <span className="hover:text-gray-300 cursor-pointer">Customer Service</span>
      </div>

      {/* Main Navbar */}
      <div className="flex items-center justify-between px-4 py-3 md:px-6 lg:px-12">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-xl"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Logo and Search Bar */}
        <div className="flex-1 flex items-center justify-center gap-3 px-2 md:gap-10">
          <h1
            className="text-sm sm:text-2xl font-bold md:text-4xl text-center cursor-pointer"
            onClick={() => window.location.href = "/"}
          >
            SaverFavor
          </h1>
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
                <div className="absolute top-8 right-0 z-51 bg-white text-black p-3 rounded-lg shadow-lg">
                  {user ? (
                    <>
                      <p className="">{user.email}</p>
                      <p className="text-sm text-gray-600">Profile Edit</p>
                      <button
                        className="mt-2 bg-red-500 text-white text-md rounded-lg w-48 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600">Not logged in</p>
                      <Link to="/login">
                        <button className="mt-2 bg-green-500 text-white p-2 rounded-lg w-48 cursor-pointer">
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
      <div className="hidden md:flex items-center justify-center space-x-2 px-2 py-3 text-sm md:space-x-4 md:px-4">
        {menuItems.map((item, index) => (
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
                  (hoverIndex === index || desktopSubmenuOpen === index) ? 'block' : 'hidden'
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
            <div className="absolute bottom-12 right-0 bg-white text-black p-4 rounded-lg shadow-lg w-48">
              {user ? (
                <>
                  <p className="">{user.email}</p>
                  <p className="text-sm text-gray-600">Profile Edit</p>
                  <button
                    className="mt-2 bg-red-500 text-white rounded-lg w-full"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-600">Not logged in</p>
                  <Link to="/login">
                    <button className="mt-2 cursor-pointer bg-green-500 text-white rounded-lg w-full">
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
  );
};

export default Navbar;
