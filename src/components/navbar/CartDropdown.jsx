import { X, Trash } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../store/cartSlice";

export const CartDropdown = ({ isOpen, onClose, position = "desktop" }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const containerClasses = position === "desktop" 
    ? "absolute right-0 top-12 w-80 bg-white shadow-lg rounded-lg p-4 z-50 text-black"
    : "fixed bottom-16 left-0 right-0 bg-white shadow-lg rounded-t-lg p-4 z-50 text-black max-h-60 overflow-y-auto";

  const imageSize = position === "desktop" ? "w-16 h-16" : "w-12 h-12";

  if (!isOpen) return null;

  return (
    <div className={containerClasses}>
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="text-lg font-semibold">Cart ({cartItems.length})</h3>
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className={`mt-4 ${position === "desktop" ? "max-h-80" : ""} overflow-y-auto`}>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2 border-b"
            >
              <img
                src={item.image}
                alt={item.name}
                className={`${imageSize} object-cover rounded`}
              />
              <div className="flex-1 px-2">
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-xs text-gray-500">
                  Tk {item.price} x {item.quantity}
                </p>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 hover:text-red-700"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
