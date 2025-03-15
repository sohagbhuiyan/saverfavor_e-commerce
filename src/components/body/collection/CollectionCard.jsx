import { Link } from "react-router-dom";
import { useState } from "react";
import { FaShoppingCart, FaExchangeAlt, FaHeart, FaEye } from "react-icons/fa";

const CollectionCard = ({ image, category, name, price, discount, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/product/${name}`} className="block">
      <div 
        className="border border-gray-300 rounded-lg p-3 shadow-md hover:shadow-lg transition duration-300 bg-white cursor-pointer relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <div className="relative p-1 md:p-2 overflow-hidden rounded-md">
          <img 
            src={image} 
            alt={name} 
            className={`w-full h-40 object-cover rounded-md transition-transform duration-600 ${
              isHovered ? "scale-120" : "scale-100"
            }`}
          />

          {/* Icons on Hover */}
          {isHovered && (
            <div className="absolute top-2 right-2 flex flex-col space-y-2 rounded-lg">
              <button className="text-gray-600 bg-white hover:text-white hover:bg-gray-500  p-1 rounded-full border cursor-pointer" title="Add to Cart">
                <FaShoppingCart />
              </button>
              <button className="text-gray-600 bg-white hover:text-white hover:bg-gray-500  p-1 rounded-full border cursor-pointer" title="Compare">
                <FaExchangeAlt />
              </button>
              <button className="text-gray-600 bg-white hover:text-white hover:bg-gray-500  p-1 rounded-full border cursor-pointer" title="Wishlist">
                <FaHeart />
              </button>
              <button className="text-gray-600 bg-white hover:text-white hover:bg-gray-500  p-1 rounded-full border cursor-pointer" title="Quick View">
                <FaEye />
              </button>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-2 text-center">
          <h2 className="text-sm md:text-md font-bold text-gray-700">{category}</h2>
          <p className="text-xs md:text-sm text-gray-600">{description}</p>
          <p className="text-sm md:text-lg font-bold text-gray-700 mt-1">Tk {price}</p>
          {discount && (
            <p className="text-purple-600 text-xs md:text-sm font-medium">
              Save Tk {discount} on online order
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
