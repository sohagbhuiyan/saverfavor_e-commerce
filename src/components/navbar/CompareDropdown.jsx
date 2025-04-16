// src/components/navbar/CompareDropdown.jsx
import { FaExchangeAlt, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCompare } from "../../store/compareSlice";

const CompareDropdown = ({ isOpen, isMobile, onClose }) => {
  const dispatch = useDispatch();
  const compareItems = useSelector((state) => state.compare.items);

  if (!isOpen) return null;

  return (
    <div
      className={`${
        isMobile
          ? "fixed bottom-16 right-10 bg-gray-100 text-black p-2 rounded-t-lg shadow-lg z-50 max-h-64 overflow-y-auto"
          : "absolute top-7 -right-5 bg-gray-100 text-black  p-2 rounded-lg shadow-lg w-82 z-50 max-h-96 overflow-y-auto"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold flex items-center">
          <FaExchangeAlt className="text-blue-500 mr-2" />
          Compare ({compareItems.length})
        </h3>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-gray-200 rounded-full"
        >
          <FaTimes className="text-lg text-gray-600" />
        </button>
      </div>

      {compareItems.length === 0 ? (
        <p className="text-center py-4">No items added for comparison</p>
      ) : (
        <>
          {compareItems.map((product) => (
            <div key={product.id} className="flex items-center py-2 border-b last:border-b-0">
              <Link
                to={`/product/${product.name}`}
                className="flex-1 flex items-center hover:bg-gray-50 p-2 rounded"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-md mr-3"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{product.name}</h4>
                  <p className="text-sm text-gray-600">${product.price}</p>
                </div>
              </Link>
              <div className="flex items-center ml-2 space-x-2">
                <button
                  onClick={() => dispatch(removeFromCompare(product.id))}
                  className="p-2 rounded-md text-red-600 hover:bg-red-100"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 text-center">
            <Link
              to="/compare"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Compare Now →
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CompareDropdown;
