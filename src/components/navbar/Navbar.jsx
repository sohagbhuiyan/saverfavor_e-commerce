import { useState } from "react";
import { jscomputer } from "../../Utils/images";
import TopBar from "./TopBar";
import DesktopIcons from './DesktopIcons';
import  DesktopMenu  from "./DesktopMenu";
import  MobileMenu  from "./MobileMenu";
import  MobileBottomNav  from "./MobileBottomNav";
import  SearchBar  from "./SearchBar";
import  {menuItems}  from "./menuItems";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMoreItems, setShowMoreItems] = useState(false);

  return (
    <div className="bg-[#CF212B] text-white">
      <TopBar />
      
      <div className="flex items-center justify-between px-5 py-3 md:px-6 lg:px-12">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-xl"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        <div className="flex flex-1 items-center justify-center gap-3 px-2 md:gap-10">
          <img
            src={jscomputer}
            className="h-10 w-20 cursor-pointer"
            onClick={() => window.location.href = "/"}
          />
          
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <DesktopIcons />
        </div>
      </div>

      <DesktopMenu 
        menuItems={menuItems}
        showMoreItems={showMoreItems}
        setShowMoreItems={setShowMoreItems}
      />

      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
        menuItems={menuItems}
      />

      <MobileBottomNav />
    </div>
  );
};

export default Navbar;
