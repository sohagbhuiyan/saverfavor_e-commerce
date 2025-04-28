import { Link } from "react-router-dom";
import { FaAngleDoubleRight, FaChevronDown } from "react-icons/fa";
import { useState } from "react";

const DesktopMenu = ({ menuItems }) => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [showMoreItems, setShowMoreItems] = useState(false);
  const [hoverMoreItemIndex, setHoverMoreItemIndex] = useState(null);

  const firstTenItems = menuItems.slice(0, 10);
  const remainingItems = menuItems.slice(10);

  return (
    <div className="hidden md:flex items-center justify-center space-x-2 px-2 py-3 font-medium text-sm md:space-x-6 md:px-4 relative z-50">
      {firstTenItems.map((item, index) => (
        <div
          key={index}
          className="relative cursor-pointer group"
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <Link to={item.path || "#"} className="hover:text-gray-300">
            {item.name}
          </Link>

          {item.subMenu && item.subMenu.length > 0 && hoverIndex === index && (
            <div className="absolute top-full left-0 mt-0 w-48 bg-white text-black shadow-lg rounded-md border border-gray-200 z-50">
              {item.subMenu
                .filter(subItem => subItem.name && subItem.path)
                .map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    to={subItem.path}
                    className="block px-4 py-3 hover:bg-gray-100"
                  >
                    {subItem.name}
                  </Link>
                ))}
            </div>
          )}
        </div>
      ))}

      {/* More Items Dropdown */}
      {remainingItems.length > 0 && (
        <div
          className="relative cursor-pointer group"
          onMouseEnter={() => setShowMoreItems(true)}
          onMouseLeave={() => {
            setShowMoreItems(false);
            setHoverMoreItemIndex(null);
          }}
        >
          <div className="flex items-center hover:text-gray-300">
            More Items <FaAngleDoubleRight className="ml-1" />
          </div>

          {showMoreItems && (
            <div className="absolute top-full left-0 mt-0 w-48 bg-white text-black shadow-lg rounded-md border border-gray-200 z-50">
              {remainingItems.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setHoverMoreItemIndex(index)}
                  onMouseLeave={() => setHoverMoreItemIndex(null)}
                >
                  <Link
                    to={item.path || "#"}
                    className="flex justify-between items-center px-4 py-3 hover:bg-gray-100"
                  >
                    <span>{item.name}</span>
                    {item.subMenu && <FaChevronDown className="text-xs ml-1" />}
                  </Link>

                  {item.subMenu && hoverMoreItemIndex === index && (
                    <div className="absolute left-full top-0 ml-2 w-48 bg-white text-black shadow-lg rounded-md border border-gray-200 z-50">
                      {item.subMenu
                        .filter(subItem => subItem.name && subItem.path)
                        .map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.path}
                            className="block px-4 py-3 hover:bg-gray-100"
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
