import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAndProducts } from "../../../store/categorySlice";

const AllCategories = () => {
  const dispatch = useDispatch();
  const { categoriesWithSub, loading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategoriesAndProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching products:", error);
    }
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">All Products</h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4 animate-pulse">
              <div className="w-full h-6 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-gray-200 rounded"></div>
                    <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {categoriesWithSub.map((category, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <Link
                to={category.path}
                className="text-lg font-semibold text-gray-900 hover:text-blue-600"
              >
                {category.name}
              </Link>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.subMenu
                  .filter((subItem) => subItem.name && subItem.path && subItem.image)
                  .map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subItem.path}
                      className="flex flex-col items-center p-2 rounded-md hover:bg-gray-100"
                    >
                      <img
                        src={subItem.image}
                        alt={subItem.name}
                        className="w-16 h-16 object-cover rounded mb-2"
                        loading="lazy"
                      />
                      <span className="text-sm text-gray-700 text-center">{subItem.name}</span>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCategories;
