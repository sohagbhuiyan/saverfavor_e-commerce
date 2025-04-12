import { Link } from "react-router-dom";
import { FaAngleDoubleRight, FaChevronRight, FaChevronDown } from "react-icons/fa";
import { useState } from "react";

const DesktopMenu = ({ menuItems }) => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hoverSubIndex, setHoverSubIndex] = useState(null);
  const [showMoreItems, setShowMoreItems] = useState(false);
  const [hoverMoreItemIndex, setHoverMoreItemIndex] = useState(null);

  const firstTenItems = menuItems.slice(0, 10);
  const remainingItems = menuItems.slice(10);

  return (
    <div className="hidden md:flex items-center justify-center space-x-2 px-2 py-3 font-medium text-sm md:space-x-6 md:px-4">
      {firstTenItems.map((item, index) => (
        <div
          key={index}
          className="relative cursor-pointer desktop-menu-item"
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => {
            setHoverIndex(null);
            setHoverSubIndex(null);
          }}
        >
          <Link to={item.path || "#"} className="hover:text-gray-300">
            {item.name}
          </Link>

          {/* Printer & Scanner submenu with nested hover */}
          {item.name === "Printer & Scanner" && hoverIndex === index && (
            <div className="absolute -left-2 top-full w-48 bg-gray-300 text-gray-900 shadow-lg rounded-md z-50">
              {item.subMenu.map((subItem, subIndex) => (
                <div
                  key={subIndex}
                  className="relative group"
                  onMouseEnter={() => setHoverSubIndex(subIndex)}
                  onMouseLeave={() => setHoverSubIndex(null)}
                >
                  <div className="flex justify-between items-center px-4 py-2 hover:bg-gray-200">
                    <span>{subItem.name}</span>
                    {subItem.subMenu && <FaChevronRight className="text-xs" />}
                  </div>

                  {/* Nested submenu */}
                  {subItem.subMenu && hoverSubIndex === subIndex && (
                    <div className="absolute left-full top-0 w-48 bg-gray-200 text-gray-900 shadow-lg rounded-md z-50">
                      {subItem.subMenu.map((nestedItem, nestedIndex) => (
                        <Link
                          key={nestedIndex}
                          to={nestedItem.path}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          {nestedItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Regular single-level submenu for other items */}
          {item.name !== "Printer & Scanner" &&
            item.subMenu &&
            hoverIndex === index && (
              <div className="absolute left-0 top-full w-48 bg-gray-300 text-gray-900 shadow-lg rounded-md z-50">
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

      {/* More Items dropdown – untouched */}
      {remainingItems.length > 0 && (
        <div
          className="relative cursor-pointer desktop-menu-item"
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
            <div className="absolute left-0 w-48 bg-gray-300 text-gray-900 shadow-lg rounded-md z-50">
              {remainingItems.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setHoverMoreItemIndex(index)}
                  onMouseLeave={() => setHoverMoreItemIndex(null)}
                >
                  <Link
                    to={item.path || "#"}
                    className="flex justify-between items-center px-4 py-2 "
                  >
                    <span>{item.name}</span>
                    {item.subMenu && <FaChevronDown className="text-sm" />}
                  </Link>

                  {item.subMenu && hoverMoreItemIndex === index && (
                    <div className="block left-full top-0 mt-0 w-48 p-1 bg-gray-200 text-gray-900 shadow-lg rounded-md z-50">
                      {item.subMenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className="block px-4 py-2 hover:bg-gray-100 rounded-md"
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
