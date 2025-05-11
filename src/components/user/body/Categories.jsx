import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAndProducts } from "../../../store/categorySlice";

const Categories = () => {
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

  // Flatten all products from subMenu across all categories
  const allProducts = categoriesWithSub
    .flatMap((category) => category.subMenu)
    .filter((subItem) => subItem.name && subItem.path && subItem.image)
    .slice(0, 9); // Take only the first 9 products

  return (
    <div className="mt-1 pb-1 md:pb-3">
      <div className="bg-[#CF212B] flex justify-between px-4 md:px-10 text-white text-xs md:text-lg font-semibold py-2">
        <p>Top Products</p>
        <Link to="/all-categories" className="underline cursor-pointer">
          See all products
        </Link>
      </div>
      <div className="bg-white shadow-xs p-2 md:p-4 grid grid-cols-3 md:grid-cols-9 gap-2 md:gap-4">
        {loading ? (
          Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-2 animate-pulse"
            >
              <div className="w-16 h-16 bg-gray-200 rounded mb-1 md:mb-2"></div>
              <div className="w-20 h-4 bg-gray-200 rounded"></div>
            </div>
          ))
        ) : (
          allProducts.map((product, index) => (
            <Link
              key={index}
              to={product.path}
              className="flex flex-col items-center justify-center p-2 hover:scale-105 transition-transform"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded mb-1 md:mb-2"
                loading="lazy"
              />
              <span className="text-[10px] md:text-sm font-medium text-center leading-tight">
                {product.name}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;
