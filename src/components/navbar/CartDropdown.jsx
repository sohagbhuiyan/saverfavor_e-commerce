import { useRef, useEffect } from "react";
import { X, Trash } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../store/cartSlice";

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
    console.log("Clicked on cart item:", item);
  };

  if (!isOpen) return null;

  return (
    <div className={containerClasses} ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between items-center border-b">
        <h3 className="text-lg font-semibold">Cart ({cartItems.length})</h3>
        <button onClick={onClose}>
          <X className="w-6 h-6 cursor-pointer" />
        </button>
      </div>
      <div className={`mt-2 ${position === "desktop" ? "max-h-90" : ""} overflow-y-auto`}>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between p-2 border-b cursor-pointer"
              onClick={(event) => handleItemClick(item, event)}
            >
              <img
                src={item.images[0]}
                alt={item.name}
                className={`${imageSize} object-cover rounded`}
              />
              <div className="flex-1 px-2">
                <p className="text-sm font-semibold">{item.name}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>Tk {item.specialprice}</span>
                  <span>x</span>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.productId, e.target.value, e)
                    }
                    className="w-12 border border-gray-300 rounded-sm text-center"
                  />
                </div>
              </div>
              <button
                onClick={(event) => handleRemove(item.productId, event)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="border-t p-2">
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded">
            View Cart
          </button>
          <button className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};
