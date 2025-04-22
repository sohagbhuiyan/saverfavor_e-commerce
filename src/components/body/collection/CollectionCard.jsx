import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaExchangeAlt, FaHeart, FaEye, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../../../store/wishlistSlice";
import { addToCart } from "../../../store/cartSlice";
import { addToCompare } from "../../../store/compareSlice";

const CollectionCard = ({id, image, category, name, price, discount, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [showMobileIcons, setShowMobileIcons] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const iconsRef = useRef(null);
  const dispatch = useDispatch();

  // Detect mobile screen size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Close icons when clicking outside (mobile only)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobile && showMobileIcons && iconsRef.current && !iconsRef.current.contains(e.target)) {
        setShowMobileIcons(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobile, showMobileIcons]);

  const handleProductClick = (e) => {
    if (isMobile) {
      // Prevent navigation only when showing icons
      if (!showMobileIcons) {
        e.preventDefault();
        e.stopPropagation();
      }
      setShowMobileIcons(!showMobileIcons);
    }
  };

  const handleIconAction = (callback) => (e) => {
    e.preventDefault();
    callback(e);
    if (isMobile) setShowMobileIcons(false);
  };

  const handleAddToCart = handleIconAction((e) => {
    dispatch(addToCart({
      productId: id,
      name,
      specialprice: price,
      images: [image],
      quantity: 1
    }));
  });

  const handleAddToWishlist = handleIconAction((e) => {
    dispatch(addToWishlist({
      id,
      image,
      category,
      name,
      price,
      discount,
      description
    }));
  });

  const handleAddToCompare = handleIconAction((e) => {
    dispatch(addToCompare({
      id,
      name,
      price,
      image,
      category,
      description,
      specifications: {
        display: "15.6\" FHD IPS Display",
        processor: "Intel Core i5-1135G7",
        ram: "8GB DDR4",
        storage: "512GB SSD",
        graphics: "Intel Iris Xe Graphics",
        weight: "1.75 kg"
      }
    }));
  });

  return (
    <>
      <Link to={`/product/${name}`} className="block">
        <div 
          className="border border-gray-300 rounded-lg p-3 shadow-md hover:shadow-lg transition duration-300 bg-white cursor-pointer relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleProductClick}
        >
          <div className="relative p-1 md:p-2 overflow-hidden rounded-md">
            <img 
              src={image} 
              alt={name} 
              className={`w-full h-40 object-cover rounded-md transition-transform duration-600 ${
                isHovered ? "scale-130" : "scale-100"
              }`}
            />

            {/* Action Icons */}
            {(isHovered || (isMobile && showMobileIcons)) && (
              <div 
                ref={iconsRef}
                className="absolute top-2 right-2 flex flex-col space-y-2 rounded-lg"
              >
                <button 
                  className="text-gray-600 bg-white hover:text-white hover:bg-gray-500 p-1 rounded-full border cursor-pointer" 
                  title="Add to Cart"
                  onClick={handleAddToCart}
                >
                  <FaShoppingCart />
                </button>
                <button 
                  className="text-gray-600 bg-white hover:text-white hover:bg-gray-500 p-1 rounded-full border cursor-pointer" 
                  title="Compare"
                  onClick={handleAddToCompare}
                >
                  <FaExchangeAlt />
                </button>
                <button
                  className="text-gray-600 bg-white hover:text-white hover:bg-gray-500 p-1 rounded-full border cursor-pointer"
                  title="Wishlist"
                  onClick={handleAddToWishlist}
                >
                  <FaHeart />
                </button>
                <button 
                  className="text-gray-600 bg-white hover:text-white hover:bg-gray-500 p-1 rounded-full border cursor-pointer" 
                  title="Quick View"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsQuickViewOpen(true);
                    if (isMobile) setShowMobileIcons(false);
                  }}
                >
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

      {/* Quick View Modal */}
      {isQuickViewOpen && (
  <div className="fixed inset-0 backdrop-blur-md  bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-gray-50 p-6 rounded-lg w-11/12 md:w-3/4 lg:w-1/2 relative">
      {/* Close Button */}
      <button 
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        onClick={() => setIsQuickViewOpen(false)}
      >
        <FaTimes className="text-xl cursor-pointer" />
      </button>

      {/* Modal Content */}
      {image && name && description ? (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <img 
              src={image} 
              alt={name} 
              className="w-full h-48 md:h-64 object-cover rounded-md"
            />
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2">
            <h2 className="text-lg md:text-xl font-bold text-gray-800">{name}</h2>
            <p className="text-sm md:text-md text-gray-600 mt-2">Product: {category}</p>
            <p className="text-sm md:text-md text-gray-600 mt-2">{description}</p>
            <p className="text-sm md:text-md text-gray-600 mt-2">Price: BDT {price}</p>
          </div>
        </div>
      ) : (
        // Product Not Found Message
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">Product Not Found</h2>
          <p className="text-sm text-gray-600 mt-2">The product you are looking for does not exist.</p>
        </div>
      )}
    </div>
  </div>
)}
</>
  )
};

export default CollectionCard;
