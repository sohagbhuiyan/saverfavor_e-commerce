import { useRef, useEffect } from "react";
import { Trash } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../store/cartSlice";
import { Link } from "react-router-dom"; // Add this import
import { FaTimes } from "react-icons/fa";

export const CartDropdown = ({ isOpen, onClose, position = "desktop", cartIconRef }) => {
  const dropdownRef = useRef(null);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
 
  const containerClasses = position === "desktop"
    ? "absolute md:-left-15 right-0 top-8 w-60 md:w-80 bg-white shadow-lg rounded-lg p-2 z-50 text-black"
    : "fixed bottom-16 bg-white shadow-lg rounded-t-lg p-2 z-50 text-black max-h-100 overflow-y-auto";

  const imageSize = position === "desktop" ? "w-16 h-16" : "w-12 h-12";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target) && cartIconRef.current && !cartIconRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, cartIconRef]);

  const handleRemove = (productId, event) => {
    event.stopPropagation();
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, newQuantity, event) => {
    event.stopPropagation();
    dispatch(updateQuantity({ productId, quantity: parseInt(newQuantity, 10) }));
  };

  const handleItemClick = (item, event) => {
    event.stopPropagation();
    onClose(); // Close dropdown when navigating
  };

  if (!isOpen) return null;

  return (
    <div className={containerClasses} ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
      {/* Keep header section */}
      <div className="flex justify-between items-center border-b border-gray-400">
        <h3 className="text-lg font-semibold">Cart ({cartItems.length})</h3>
        <button 
          onClick={onClose} 
          className="p-1 hover:bg-gray-200 rounded-full"
        >
          <FaTimes className="text-lg cursor-pointer text-gray-600" />
        </button>
      </div>

      {/* Modified items section */}
      <div className={`mt-2 ${position === "desktop" ? "max-h-90" : ""} overflow-y-auto`}>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.productId}
              className="group relative flex items-center justify-between p-2 border-b border-gray-200"
            >
              {/* Product Link Wrapper */}
              <Link
                to={`/product/${item.name}`}
                className="absolute inset-0 z-10"
                onClick={(e) => handleItemClick(item, e)}
              />

              {/* Product Content */}
              <div className="flex items-center w-full">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className={`${imageSize} object-cover rounded`}
                />
                <div className="flex-1 px-2">
                  <p className="text-sm font-semibold group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>Tk {item.specialprice}</span>
                    <span>x</span>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.productId, e.target.value, e)}
                      className="w-12 border border-gray-300 rounded-sm text-center z-20 relative"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={(event) => handleRemove(item.productId, event)}
                className="text-red-500 hover:text-red-700 z-20 relative"
              >
                <Trash className="w-5 cursor-pointer h-5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Keep footer buttons */}
      {cartItems.length > 0 && (
        <div className="p-2">
          <Link
            to="/cart"
            className="block w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded text-center"
            onClick={onClose}
          >
            View Cart
          </Link>
          <button className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};
