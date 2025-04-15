// src/components/navbar/CompareDropdown.jsx
import { FaExchangeAlt, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCompare } from "../../store/compareSlice"; // Assuming you have this slice

const CompareDropdown = ({ isOpen, onClose, position }) => {
  const dispatch = useDispatch();
  const compareItems = useSelector((state) => state.compare.items);

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`z-50 shadow-lg rounded-lg bg-white text-black ${
        position === "mobile"
          ? "fixed bottom-16 left-10 right-10 p-3 max-h-64 overflow-y-auto"
          : "absolute top-8 right-0 p-3 w-80 max-h-96 overflow-y-auto"
      }`}
    >
      <h3 className="text-lg font-bold flex items-center mb-4">
        <FaExchangeAlt className="text-blue-500 mr-2" />
        Compare Items ({compareItems.length})
      </h3>

      {compareItems.length === 0 ? (
        <p className="text-gray-600 text-center py-4">No items added for comparison.</p>
      ) : (
        <>
          {compareItems.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between border-b py-2 last:border-b-0"
            >
              <Link
                to={`/product/${product.name}`}
                className="flex items-center flex-1 hover:bg-gray-50 p-2 rounded"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-md mr-3"
                />
                <div className="min-w-0">
                  <h4 className="font-medium truncate">{product.name}</h4>
                  <p className="text-sm text-gray-600">${product.price}</p>
                </div>
              </Link>
              <button
                onClick={() => dispatch(removeFromCompare(product.id))}
                className="p-2 rounded-md text-red-600 hover:bg-red-100 ml-2"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>
          ))}
          <div className="mt-4 text-center">
            <Link
              to="/compare"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
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
