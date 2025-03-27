import { FaShoppingCart, FaHeart, FaExchangeAlt, FaUser } from "react-icons/fa";
import { CartDropdown } from "./CartDropdown";
import { UserDropdown } from "./UserDropdown";
import { useEffect, useRef } from "react";

const NavIcon = ({ 
  icon: Icon, 
  label, 
  onClick, 
  count = 0, 
  isActive, 
  dropdownContent,
  isMobile = false,
  isUserIcon = false
}) => {
  return (
    <div className={`relative ${isMobile ? "flex flex-col items-center" : ""}`}>
      <div 
        className={`flex items-center cursor-pointer ${isMobile ? "flex-col" : ""}`}
        onClick={onClick}
      >
        <div className="flex flex-col items-center">
          <Icon className={isMobile ? "text-lg" : "text-lg hover:text-gray-300"} />
          {count > 0 && !isUserIcon && (
            <span className={`absolute ${isMobile ? "-top-2 -right-2" : "-top-4 -right-3"} bg-red-500 text-white text-xs p-1 rounded-full`}>
              {count}
            </span>
          )}
        </div>
        {isMobile && <span className="text-xs mt-1">{label}</span>}
      </div>
      
      {isActive && dropdownContent}
    </div>
  );
};

const NavIcons = ({
  variant = "desktop",
  activeDropdown,
  toggleDropdown,
  cartDropdownOpen,
  toggleCartDropdown,
  cartCount,
  closeAllDropdowns
}) => {
  const isMobile = variant === "mobile";
  const wrapperClasses = isMobile 
    ? "fixed z-50 bottom-0 w-full bg-[#CF212B] p-2 flex justify-around items-center text-white"
    : "flex items-center justify-center space-x-4";
  
  const navIconsRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navIconsRef.current && !navIconsRef.current.contains(event.target)) {
        closeAllDropdowns();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeAllDropdowns]);

  return (
    <div className={isMobile ? "md:hidden" : "hidden md:flex"} ref={navIconsRef}>
      <div className={wrapperClasses}>
        {/* Cart Icon with Dropdown */}
        <div className="relative">
          <NavIcon
            icon={FaShoppingCart}
            label="Cart"
            onClick={(e) => {
              e.stopPropagation();
              toggleCartDropdown();
            }}
            count={cartCount}
            isActive={cartDropdownOpen}
            isMobile={isMobile}
          />
          {cartDropdownOpen && (
            <CartDropdown 
              isOpen={cartDropdownOpen} 
              onClose={toggleCartDropdown} 
              position={variant}
            />
          )}
        </div>
        
        {/* Wishlist */}
        <div className="relative">
          <NavIcon
            icon={FaHeart}
            label="Wishlist"
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown("wishlist");
            }}
            isActive={activeDropdown === "wishlist"}
            dropdownContent={
              <div className={`
                ${isMobile 
                  ? "fixed bottom-16 bg-white text-black p-3 rounded-t-lg shadow-lg z-50" 
                  : "absolute top-8 right-0 bg-white text-black p-3 rounded-lg shadow-lg w-48 z-50"}
              `}>
                <p className="font-semibold">Wishlist</p>
                <p className="text-sm text-gray-600">Your favorite items.</p>
              </div>
            }
            isMobile={isMobile}
          />
        </div>
        
        {/* Compare */}
        <div className="relative">
          <NavIcon
            icon={FaExchangeAlt}
            label="Compare"
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown("compare");
            }}
            isActive={activeDropdown === "compare"}
            dropdownContent={
              <div className={`
                ${isMobile 
                  ? "fixed bottom-16 bg-white text-black p-3 rounded-t-lg shadow-lg z-50" 
                  : "absolute top-8 right-0 bg-white text-black p-3 rounded-lg shadow-lg w-48 z-50"}
              `}>
                <p className="font-semibold">Compare Items</p>
                <p className="text-sm text-gray-600">No items to compare.</p>
              </div>
            }
            isMobile={isMobile}
          />
        </div>
        
        {/* User Profile */}
        <div className="relative">
          <UserDropdown 
            position={variant}
            onClose={() => toggleDropdown("user")}
          />
        </div>
      </div>
    </div>
  );
};

export default NavIcons;
