import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Trash } from "lucide-react";
import { fetchCartItemsAsync, removeFromCartAsync, updateQuantity, initializeCart } from "../../../store/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, count, status, error } = useSelector((state) => state.cart);
  const { profile, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (profile?.id && profile?.email && token) {
      dispatch(fetchCartItemsAsync());
    } else {
      dispatch(initializeCart({ auth: { profile } }));
    }
  }, [dispatch, profile, token]);

  const handleRemove = (cartId, productId) => {
    if (profile?.id && token && cartId) {
      dispatch(removeFromCartAsync({ cartId, productId }));
    } else {
      dispatch({ type: "cart/removeFromCart", payload: productId });
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (quantity >= 1) {
      dispatch(updateQuantity({ productId, quantity }));
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart ({count} items)</h1>

      {status === "loading" && <p className="text-center">Loading cart...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {items.length === 0 && status !== "loading" ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.imagea}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <Link
                    to={`/product/${item.productId}`}
                    className="text-lg font-semibold hover:text-blue-600"
                  >
                    {item.name}
                  </Link>
                  <p className="text-gray-600">Tk {item.price}</p>
                  <div className="flex items-center space-x-2">
                    <span>Quantity:</span>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.productId, e.target.value)}
                      className="w-16 border border-gray-300 rounded text-center"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <p className="font-semibold">Tk {(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => handleRemove(item.cartId, item.productId)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-6">
            <div className="text-right">
              <p className="text-lg font-semibold">Total: Tk {calculateTotal()}</p>
              <Link
                to="/checkout"
                className="inline-block mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;