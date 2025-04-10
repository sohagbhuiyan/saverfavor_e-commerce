import { FaShoppingCart, FaHeart, FaExchangeAlt, FaUser } from "react-icons/fa";
import { CartDropdown } from "./CartDropdown";
import { UserDropdown } from "./UserDropdown";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const NavIcon = ({
  icon: Icon,
  label,
  onClick,
  count = 0,
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

      {/* We will conditionally render dropdown content outside of NavIcon for toggle behavior */}
    </div>
  );
};

const NavIcons = ({
  variant = "desktop",
  activeDropdown,
  toggleDropdown,
}) => {
  const isMobile = variant === "mobile";
  const wrapperClasses = isMobile
    ? "fixed z-50 bottom-0 w-full bg-[#CF212B] p-2 flex justify-around items-center text-white"
    : "flex items-center justify-center space-x-4";

  const navIconsRef = useRef(null);
  const cartCount = useSelector((state) => state.cart.count);
  const dispatch = useDispatch();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const toggleCartDropdown = (e) => {
    e.stopPropagation();
    setIsCartOpen((prevState) => !prevState);
    setIsWishlistOpen(false);
    setIsCompareOpen(false);
    if (activeDropdown && activeDropdown !== "cart" && !isCartOpen) {
      toggleDropdown(activeDropdown);
    } else if (activeDropdown && activeDropdown !== "cart" && isCartOpen) {
      toggleDropdown(activeDropdown);
    }
  };

  const toggleWishlistDropdown = (e) => {
    e.stopPropagation();
    setIsWishlistOpen((prevState) => !prevState);
    setIsCartOpen(false);
    setIsCompareOpen(false);
    if (activeDropdown && activeDropdown !== "wishlist" && !isWishlistOpen) {
      toggleDropdown(activeDropdown);
    } else if (activeDropdown && activeDropdown !== "wishlist" && isWishlistOpen) {
      toggleDropdown(activeDropdown);
    }
  };

  const toggleCompareDropdown = (e) => {
    e.stopPropagation();
    setIsCompareOpen((prevState) => !prevState);
    setIsCartOpen(false);
    setIsWishlistOpen(false);
    if (activeDropdown && activeDropdown !== "compare" && !isCompareOpen) {
      toggleDropdown(activeDropdown);
    } else if (activeDropdown && activeDropdown !== "compare" && isCompareOpen) {
      toggleDropdown(activeDropdown);
    }
  };

  // Click outside logic for all dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navIconsRef.current && !navIconsRef.current.contains(event.target)) {
        setIsCartOpen(false);
        setIsWishlistOpen(false);
        setIsCompareOpen(false);
        if (activeDropdown) {
          toggleDropdown(activeDropdown);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown, toggleDropdown, isCartOpen, isWishlistOpen, isCompareOpen]);

  return (
    <div className={isMobile ? "md:hidden" : "hidden md:flex"} ref={navIconsRef}>
      <div className={wrapperClasses}>
        {/* Cart Icon with Dropdown */}
        <div className="relative">
          <NavIcon
            icon={FaShoppingCart}
            label="Cart"
            onClick={toggleCartDropdown}
            count={cartCount}
            isActive={isCartOpen}
            isMobile={isMobile}
          />
          <CartDropdown
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            position={variant}
          />
        </div>

        {/* Wishlist */}
        <div className="relative">
          <NavIcon
            icon={FaHeart}
            label="Wishlist"
            onClick={toggleWishlistDropdown}
            isActive={isWishlistOpen}
            isMobile={isMobile}
          />
          {isWishlistOpen && (
            <div className={`
              ${isMobile
                ? "fixed bottom-16 bg-white text-black p-3 rounded-t-lg shadow-lg z-50"
                : "absolute top-8 -left-5 bg-white text-black p-3 rounded-lg shadow-lg w-48 z-50"}
            `} onClick={(e) => e.stopPropagation()}>
              <p className="font-semibold">Wishlist</p>
              <p className="text-sm text-gray-600">Your favorite items.</p>
            </div>
          )}
        </div>

        {/* Compare */}
        <div className="relative">
          <NavIcon
            icon={FaExchangeAlt}
            label="Compare"
            onClick={toggleCompareDropdown}
            isActive={isCompareOpen}
            isMobile={isMobile}
          />
          {isCompareOpen && (
            <div className={`
              ${isMobile
                ? "fixed bottom-16 bg-white text-black p-3 rounded-t-lg shadow-lg "
                : "absolute top-8 -left-5 bg-white text-black p-3 rounded-lg shadow-lg w-48 z-50"}
            `} onClick={(e) => e.stopPropagation()}>
              <p className="font-semibold">Compare Items</p>
              <p className="text-sm text-gray-600">No items to compare.</p>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <UserDropdown position={variant} />
        </div>
      </div>
    </div>
  );
};

export default NavIcons;
