// pages/CartPage.jsx
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../../../store/cartSlice";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.specialprice * item.quantity), 0);
  const shipping = 100; // Example fixed shipping cost
  const tax = subtotal * 0.05; // Example 5% tax
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ productId, quantity: parseInt(newQuantity) }));
      toast.success("Quantity updated", { position: "bottom-right" });
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
    toast.error("Item removed from cart", { position: "bottom-right" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            </li>
            <li>
              <span className="text-gray-400 mx-2">→</span>
            </li>
            <li className="text-gray-700 font-medium" aria-current="page">
              Shopping Cart
            </li>
          </ol>
        </nav>
        
        <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">{cartItems.length} items in cart</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-6 md:py-16">
          <div className="max-w-md mx-auto">
            <svg className="mx-auto w-12 h-12 md:h-24 md:w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="mt-4 md:text-2xl font-bold text-gray-900">Your cart is empty</h2>
            <Link
              to="/"
              className="mt-6 inline-block p-1 md:p-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-300">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex items-center sm:p-4 border-b border-gray-200">
                  <Link to={`/product/${item.name}`} className="flex-shrink-0">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-20 h-20 object-contain rounded"
                    />
                  </Link>

                  <div className="sm:ml-4 flex-1">
                    <Link to={`/product/${item.name}`} className="font-medium text-sm sm:text-lg text-gray-900 hover:text-blue-600">
                      {item.name}
                    </Link>
                    <p className="text-gray-500 text-sm">SKU: {item.productId}</p>
                  </div>

                  <div className="sm:ml-4">
                    <p className="text-sm sm:text-lg font-bold">Tk {item.specialprice}</p>
                    
                    <div className="flex items-center mt-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.productId, e.target.value)}
                        className="w-20 border border-gray-300 rounded px-2 py-1 text-center"
                      />
                      <button
                        onClick={() => handleRemoveItem(item.productId)}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        <Trash className="w-5 h-5 mr-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>Tk {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Tk {shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (5%)</span>
                <span>Tk {tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-3">
                <span>Total</span>
                <span>Tk {total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full mt-6 cursor-pointer bg-green-600 hover:bg-green-700 text-white p-1 md:py-3 rounded-md transition-colors">
              Proceed to Checkout
            </button>

            <div className="mt-4 text-center">
              <button
                onClick={() => dispatch(clearCart())}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
