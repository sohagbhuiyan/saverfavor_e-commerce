import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaExchangeAlt, FaHeart, FaEye, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../../../../store/wishlistSlice";
import { addToCart } from "../../../../store/cartSlice";
import { addToCompare } from "../../../../store/compareSlice";
import { API_BASE_URL } from "../../../../store/api";

const CollectionCard = ({
  id,
  imagea,
  category,
  name,
  regularprice,
  specialprice,
  title,
  product,
  details,
  specification
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [showMobileIcons, setShowMobileIcons] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const iconsRef = useRef(null);
  const dispatch = useDispatch();

  const discount = regularprice - specialprice;
  const hasDiscount = specialprice > 0 && discount > 0;
  const currentPrice = hasDiscount ? specialprice : regularprice;

  const formatPrice = (amount) =>
    new Intl.NumberFormat('en-BD', { maximumFractionDigits: 0 })
      .format(amount)
      .replace(/(\d+)/, 'Tk $1');

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

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

  const handleAddToCart = handleIconAction(() => {
    dispatch(addToCart({
      productId: id,
      name,
      price: currentPrice,
      regularprice,
      specialprice,
      imagea: imagea,
      quantity: 1
    }));
  });

  const handleAddToWishlist = handleIconAction(() => {
    dispatch(addToWishlist({
      id,
      imagea: imagea,
      category,
      name,
      regularprice,
      specialprice,
      title
    }));
  });

  const handleAddToCompare = handleIconAction(() => {
    dispatch(addToCompare({
      id,
      name,
      regularprice,
      specialprice,
      imagea: imagea,
      category,
      title,
      specifications: specification?.split(', ').reduce((acc, spec) => {
        const [key, value] = spec.split(': ');
        return { ...acc, [key?.trim()]: value?.trim() };
      }, {}) || { details }
    }));
  });

  return (
    <>
      <Link to={`/product/${id}`} className="block" onClick={handleProductClick}>
        <div
          className={`border border-gray-300 rounded-lg p-3 shadow-md hover:shadow-xl transition-all duration-300 bg-white relative ${isHovered ? "md:scale-105" : "scale-100"}`}
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
        >
          <div className="relative p-1 md:p-2 overflow-hidden rounded-md">
          <img
        src={imagea}
        alt={name}
        className="w-full h-40 md:h-48 object-cover rounded-md transition-transform duration-300"
        loading="lazy"
    
    />
            {(isHovered || (isMobile && showMobileIcons)) && (
              <div
                ref={iconsRef}
                className="absolute top-2 right-2 flex flex-col gap-2 rounded-lg"
              >
                {['cart', 'compare', 'wishlist', 'view'].map((action, idx) => (
                  <button
                    key={action}
                    className="p-2 bg-white/90 hover:bg-gray-700 rounded-full shadow-sm transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      switch (idx) {
                        case 0: handleAddToCart(e); break;
                        case 1: handleAddToCompare(e); break;
                        case 2: handleAddToWishlist(e); break;
                        case 3: setIsQuickViewOpen(true); break;
                      }
                    }}
                    aria-label={`${action} ${name}`}
                  >
                    {[<FaShoppingCart />, <FaExchangeAlt />, <FaHeart />, <FaEye />][idx]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-2 text-center space-y-1">
            <h3 className="text-sm font-semibold text-gray-700 truncate">{name}</h3>
            <p className="text-xs text-gray-600 line-clamp-2 min-h-[2 rem]">{category}</p>
            <p className="text-xs text-gray-600 line-clamp-2 min-h-[1.5rem]">{title}</p>
            <p className="text-xs text-gray-600 line-clamp-2 min-h-[1.5rem] ">{product}</p>
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm font-bold text-gray-900">{formatPrice(currentPrice)}</span>
              {hasDiscount && (
                <div className="flex items-center gap-2">
                  <span className="text-xs line-through text-gray-400">{formatPrice(regularprice)}</span>
                  <span className="text-xs text-green-600 font-medium">Save {formatPrice(discount)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>

      {isQuickViewOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setIsQuickViewOpen(false)}
                aria-label="Close quick view"
              >
                <FaTimes className="text-2xl" />
              </button>

              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-3">
                  <img
                    src={imagea} 
                    alt={name}
                    className="w-full h-64 object-contain rounded-lg"
                  />
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-gray-900">
                      {formatPrice(currentPrice)}
                      {hasDiscount && (
                        <span className="ml-3 text-sm line-through text-gray-400">
                          {formatPrice(regularprice)}
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-600">{category}</p>
                  </div>

                  {details && (
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">Details</h3>
                      <p className="text-sm text-gray-600 whitespace-pre-line">{details}</p>
                    </div>
                  )}

                  {specification && (
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">Specifications</h3>
                      <ul className="grid grid-cols-2 gap-2 text-sm">
                        {specification.split(', ').map((spec, index) => {
                          const [key, value] = spec.split(': ');
                          return (
                            <li key={index} className="flex justify-between py-1 border-b">
                              <span className="text-gray-600">{key}:</span>
                              <span className="text-gray-900">{value}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CollectionCard;
