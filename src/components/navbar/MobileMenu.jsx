import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";

const MobileMenu = ({ isOpen, onClose, menuItems }) => {
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(null);

  // Reset submenu state when closing the menu
  const handleCloseMenu = () => {
    setMobileSubmenuOpen(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed top-0 left-0 h-full w-48 bg-gray-900 text-white z-50">
      <button
        onClick={handleCloseMenu}
        className="absolute top-4 right-4 text-xl cursor-pointer"
      >
        <FaTimes />
      </button>

      <h2 className="text-sm font-bold text-green-400 p-4">Menu</h2>

      <div className="flex flex-col space-y-2 px-4 overflow-y-auto pb-10 h-[calc(100vh-60px)]">
        {menuItems.map((item, index) => (
          <div key={index} className="py-2 text-xs border-b border-gray-700">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() =>
                setMobileSubmenuOpen(mobileSubmenuOpen === index ? null : index)
              }
            >
              <Link to={item.path} className="hover:text-gray-300">
                {item.name}
              </Link>
              {item.subMenu && (
                <span className="ml-2">
                  {mobileSubmenuOpen === index ? "▲" : "▼"}
                </span>
              )}
            </div>

            {item.subMenu && mobileSubmenuOpen === index && (
              <div className="ml-4 mt-2 bg-gray-700 p-1 ">
                {item.subMenu.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    to={subItem.path}
                    className="block text-white text-xs p-1 cursor-pointer hover:bg-gray-600 rounded-md"
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
  );
};

export default MobileMenu;
