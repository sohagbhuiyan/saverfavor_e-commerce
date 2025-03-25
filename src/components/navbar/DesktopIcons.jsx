import { FaShoppingCart, FaHeart, FaExchangeAlt, FaUser } from "react-icons/fa";
import { CartDropdown } from "./CartDropdown";
import { UserDropdown } from "./UserDropdown";

const DesktopIcons = ({
  cartDropdownOpen,
  toggleCartDropdown,
  activeDropdown,
  toggleDropdown,
  user,
  fetchProfileData,
  handleLogout,
  cartCount
}) => {
  return (
    <div className="hidden md:flex items-center justify-center space-x-4 relative">
      {/* Shopping Cart */}
      <div className="relative">
        <div className="flex items-center cursor-pointer" onClick={toggleCartDropdown}>
          <FaShoppingCart className="text-lg hover:text-gray-300" />
          {cartCount > 0 && (
            <span className="absolute -top-4 -right-3 bg-red-500 text-white text-xs p-1 rounded-full">
              {cartCount}
            </span>
          )}
        </div>
        <CartDropdown isOpen={cartDropdownOpen} onClose={toggleCartDropdown} />
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

      {/* User Profile */}
      <UserDropdown 
        activeDropdown={activeDropdown}
        toggleDropdown={toggleDropdown}
        user={user}
        fetchProfileData={fetchProfileData}
        handleLogout={handleLogout}
      />
    </div>
  );
};
export default DesktopIcons
