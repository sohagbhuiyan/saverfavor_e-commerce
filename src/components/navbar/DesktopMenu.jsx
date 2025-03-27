import { Link } from "react-router-dom";
import { FaAngleDoubleRight, FaChevronDown } from "react-icons/fa";
import { useState, useEffect } from "react";

const DesktopMenu = ({ menuItems }) => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [desktopSubmenuOpen, setDesktopSubmenuOpen] = useState(null);
  const [showMoreItems, setShowMoreItems] = useState(false);
  const [moreItemsSubmenuOpen, setMoreItemsSubmenuOpen] = useState(null);

  const firstTenItems = menuItems.slice(0, 10);
  const remainingItems = menuItems.slice(10);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".desktop-menu-item")) {
        setDesktopSubmenuOpen(null);
        setShowMoreItems(false);
        setMoreItemsSubmenuOpen(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="hidden md:flex items-center justify-center space-x-2 px-2 py-3 font-medium text-sm md:space-x-6 md:px-4">
      {firstTenItems.map((item, index) => (
        <div
          key={index}
          className="relative cursor-pointer desktop-menu-item"
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
          onClick={(e) => {
            e.stopPropagation(); // Prevent closing when clicking inside
            setDesktopSubmenuOpen(desktopSubmenuOpen === index ? null : index);
          }}
        >
          <Link to={item.path} className="hover:text-gray-300">
            {item.name}
          </Link>

          {item.subMenu && (hoverIndex === index || desktopSubmenuOpen === index) && (
            <div className="absolute left-0 mt-2 w-48 bg-gray-300 text-black shadow-lg rounded-md z-50">
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
      
      {remainingItems.length > 0 && (
        <div
          className="relative cursor-pointer desktop-menu-item"
          onClick={(e) => {
            e.stopPropagation();
            setShowMoreItems(!showMoreItems);
            setMoreItemsSubmenuOpen(null);
          }}
        >
          <div className="flex items-center hover:text-gray-300">
            More Items <FaAngleDoubleRight className="ml-1" />
          </div>

          {showMoreItems && (
            <div className="absolute left-0 mt-2 w-48 bg-gray-300 text-black shadow-lg rounded-md z-50">
              {remainingItems.map((item, index) => (
                <div key={index} className="relative">
                  <div
                    className="flex justify-between items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMoreItemsSubmenuOpen(moreItemsSubmenuOpen === index ? null : index);
                    }}
                  >
                    <span>{item.name}</span>
                    {item.subMenu && <FaChevronDown className="text-sm" />}
                  </div>

                  {item.subMenu && moreItemsSubmenuOpen === index && (
                    <div className="ml-4 mt-1">
                      {item.subMenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className="block px-4 py-2 hover:bg-gray-200"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DesktopMenu;
