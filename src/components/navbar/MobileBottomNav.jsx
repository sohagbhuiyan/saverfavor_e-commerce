import { FaShoppingCart, FaHeart, FaExchangeAlt, FaUser } from "react-icons/fa";
import { CartDropdown } from "./CartDropdown";
import { UserDropdown } from "./UserDropdown";

const MobileBottomNav = ({
  activeDropdown,
  toggleDropdown,
  cartDropdownOpen,
  toggleCartDropdown,
  user,
  fetchProfileData,
  handleLogout,
  cartCount
}) => {
  return (
    <div className="md:hidden fixed z-50 bottom-0 left-0 w-full bg-[#CF212B] p-2 flex justify-around items-center text-white">
      {/* Mobile Cart */}
      <div className="relative flex flex-col items-center">
        <div className="flex items-center cursor-pointer" onClick={toggleCartDropdown}>
          <FaShoppingCart className="text-xl" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs p-1 rounded-full">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-xs">Cart</span>
        <CartDropdown isOpen={cartDropdownOpen} onClose={toggleCartDropdown} position="mobile" />
      </div>

      {/* Wishlist */}
      <div className="relative flex flex-col items-center">
        <FaHeart
          className="text-xl cursor-pointer hover:text-gray-300"
          onClick={() => toggleDropdown("wishlist")}
        />
        <span className="text-xs">Wishlist</span>
        {activeDropdown === "wishlist" && (
          <div className="fixed bottom-16 left-0 right-0 bg-white text-black p-3 rounded-t-lg shadow-lg">
            <p className="font-semibold">Wishlist</p>
            <p className="text-sm text-gray-600">Your favorite items.</p>
          </div>
        )}
      </div>

      {/* Compare */}
      <div className="relative flex flex-col items-center">
        <FaExchangeAlt
          className="text-xl cursor-pointer hover:text-gray-300"
          onClick={() => toggleDropdown("compare")}
        />
        <span className="text-xs">Compare</span>
        {activeDropdown === "compare" && (
          <div className="fixed bottom-16 left-0 right-0 bg-white text-black p-3 rounded-t-lg shadow-lg">
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
        position="mobile"
      />
    </div>
  );
};
export default MobileBottomNav
