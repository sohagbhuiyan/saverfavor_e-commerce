import { FaTimes } from "react-icons/fa";

const ProductModal = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal Content */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
        {/* Close Button */}
        <button 
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600" 
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        {/* Product Details */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side: Image */}
          <div className="flex-1">
            <img src={product.images[0]} alt={product.name} className="w-full rounded-md" />
          </div>

          {/* Right Side: Details */}
          <div className="flex-1">
            <h2 className="text-lg md:text-2xl font-bold">{product.name}</h2>
            <p className="text-sm text-gray-600">Product Id: {product.productId}</p>

            <p className="text-md md:text-lg font-bold text-red-700 mt-2">
              Special Price: Tk {product.specialprice}
            </p>
            <p className="text-md font-bold text-gray-700 mt-2">
              Regular Price: Tk {product.regularprice}
            </p>
            {product.discount && (
              <p className="text-purple-600 text-sm">Save Tk {product.discount} on online order</p>
            )}

            <h3 className="mt-4 font-semibold text-lg">Quick Overview</h3>
            <ul className="list-disc pl-4 text-sm text-gray-700">
              <li><strong>Display Size:</strong> {product.details.displaySize}</li>
              <li><strong>Resolution:</strong> {product.details.resolution}</li>
              <li><strong>Panel Type:</strong> {product.details.panelType}</li>
              <li><strong>Refresh Rate:</strong> {product.details.refreshRate}</li>
              <li><strong>Rotatable:</strong> {product.details.rotatable}</li>
              <li><strong>HDMI Port:</strong> {product.details.hdmiPort}</li>
            </ul>

            {/* Add to Cart Button */}
            <button className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
