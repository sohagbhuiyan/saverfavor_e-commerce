import { useState } from "react";
import { jscomputer } from "../../Utils/images";
import TopBar from "./TopBar";
import NavIcons from "./NavIcons";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import { menuItems } from "./menuItems";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMoreItems, setShowMoreItems] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const toggleCartDropdown = () => {
    setCartDropdownOpen(!cartDropdownOpen);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    setCartDropdownOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div className="bg-[#CF212B] text-white">
        <TopBar />
        
        <div className="flex items-center justify-between px-5 py-3 md:px-6 lg:px-12">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-xl"
          >
            {mobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>

          <div className="flex flex-1 items-center justify-center gap-3 px-2 md:gap-10">
            <img
              src={jscomputer}
              className="h-10 w-20 cursor-pointer"
              onClick={() => {
                window.location.href = "/";
                closeAllDropdowns();
              }}
              alt="JS Computer Logo"
            />
            
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <NavIcons 
              variant="desktop"
              activeDropdown={activeDropdown}
              toggleDropdown={toggleDropdown}
              cartDropdownOpen={cartDropdownOpen}
              toggleCartDropdown={toggleCartDropdown}
              cartCount={cartCount}
              closeAllDropdowns={closeAllDropdowns}
            />
          </div>
        </div>

        <DesktopMenu 
          menuItems={menuItems}
          showMoreItems={showMoreItems}
          setShowMoreItems={setShowMoreItems}
        />

        <MobileMenu 
          isOpen={mobileMenuOpen} 
          onClose={() => {
            setMobileMenuOpen(false);
            closeAllDropdowns();
          }}
          menuItems={menuItems}
        />
      </div>

      <NavIcons 
        variant="mobile"
        activeDropdown={activeDropdown}
        toggleDropdown={toggleDropdown}
        cartDropdownOpen={cartDropdownOpen}
        toggleCartDropdown={toggleCartDropdown}
        cartCount={cartCount}
        closeAllDropdowns={closeAllDropdowns}
      />
    </div>
  );
};

export default Navbar;
