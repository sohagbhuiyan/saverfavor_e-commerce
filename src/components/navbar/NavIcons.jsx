// components/navigation/NavIcons.jsx
import {
  FaShoppingCart,
  FaHeart,
  FaExchangeAlt,
} from "react-icons/fa";
import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartDropdown } from "./CartDropdown";
import WishList from "./WishList";
import CompareDropdown from "./CompareDropdown";
import {UserDropdown} from "./UserDropdown";
import NavIcon from "./NavIcon";

const DROPDOWNS = {
  cart: "cart",
  wishlist: "wishlist",
  compare: "compare",
};

const NavIcons = ({ variant = "desktop" }) => {
  const isMobile = variant === "mobile";
  const wrapperClasses = isMobile
    ? "fixed z-50 bottom-0 w-full bg-[#CF212B] p-2 flex justify-around items-center text-white"
    : "flex items-center justify-center space-x-4";

  const [openDropdown, setOpenDropdown] = useState(null);
  const navIconsRef = useRef(null);

  const cartCount = useSelector((state) => state.cart.count);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const closeDropdown = () => setOpenDropdown(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navIconsRef.current && !navIconsRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={isMobile ? "md:hidden" : "hidden md:flex"} ref={navIconsRef}>
      <div className={wrapperClasses}>
        {/* Cart */}
        <div className="relative">
          <NavIcon
            icon={FaShoppingCart}
            label="Cart"
            count={cartCount}
            isMobile={isMobile}
            onClick={() => toggleDropdown(DROPDOWNS.cart)}
          />
          <CartDropdown
            isOpen={openDropdown === DROPDOWNS.cart}
            onClose={closeDropdown}
            position={variant}
          />
        </div>

        {/* Wishlist */}
        <div className="relative">
          <NavIcon
            icon={FaHeart}
            label="Wishlist"
            count={wishlistItems.length}
            isMobile={isMobile}
            onClick={() => toggleDropdown(DROPDOWNS.wishlist)}
          />
          <WishList
            isOpen={openDropdown === DROPDOWNS.wishlist}
            onClose={closeDropdown}
            isMobile={isMobile}
          />
        </div>

        {/* Compare */}
        <div className="relative">
          <NavIcon
            icon={FaExchangeAlt}
            label="Compare"
            isMobile={isMobile}
            onClick={() => toggleDropdown(DROPDOWNS.compare)}
          />
          <CompareDropdown
            isOpen={openDropdown === DROPDOWNS.compare}
            onClose={closeDropdown}
            isMobile={isMobile}
          />
        </div>

        {/* User */}
        <div className="relative">
          <UserDropdown position={variant} />
        </div>
      </div>
    </div>
  );
};

export default NavIcons;
