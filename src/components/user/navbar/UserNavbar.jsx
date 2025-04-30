import { useState, useEffect } from "react";
import { logo } from "../../../Utils/images";
import TopBar from "./TopBar";
import NavIcons from "./NavIcons";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import { FaBars, FaTimes } from "react-icons/fa";
import api, { API_BASE_URL } from "../../../store/api";

const UserNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [categoriesWithSub, setCategoriesWithSub] = useState([]);
  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          api.get(`${API_BASE_URL}/api/catagories/get`),   // 👈 uses baseURL
          api.get(`${API_BASE_URL}/api/Product/getall`),
        ]);
  
        const categories = catRes.data;
        const products = prodRes.data;
  
        if (Array.isArray(categories) && Array.isArray(products)) {
          const categoriesWithProducts = categories.map((category) => {
            const relatedProducts = products.filter(
              (product) => product.catagory?.id === category.id
            );
  
            return {
              ...category,
              subMenu: relatedProducts.map((product) => ({
                name: product.name,
                path: `/product/${product.title || product.id}`,
              })),
            };
          });
  
          setCategoriesWithSub(categoriesWithProducts);
          // console.log("Fetched Categories With Submenus:", categoriesWithProducts);
        } else {
          console.error("API did not return arrays:", { categories, products });
        }
      } catch (error) {
        console.error("Error fetching categories or products:", error);
      }
    };
  
    fetchCategoriesAndProducts();
  }, []);
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

        <div className="flex items-center justify-between px-5 py-2 md:py-1 md:px-6 lg:px-12">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-xl"
          >
            {mobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>

          <div className="flex flex-1 items-center justify-center gap-3 px-2 md:gap-15">
            <img
              src={logo}
              className="h-6 md:h-9.5 cursor-pointer"
              onClick={() => {
                window.location.href = "/";
                closeAllDropdowns();
              }}
              alt="Techno shop"
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

        <DesktopMenu menuItems={categoriesWithSub} />

        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => {
            setMobileMenuOpen(false);
            closeAllDropdowns();
          }}
          menuItems={categoriesWithSub}
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

export default UserNavbar;
