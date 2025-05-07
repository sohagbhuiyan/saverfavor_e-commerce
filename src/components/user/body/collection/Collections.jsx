import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../../store/productSlice";
import CollectionCard from "./CollectionCard";
import { useSearchParams } from "react-router-dom";

const Collections = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Sync search query if the URL search param changes (Back/Forward navigation)
  useEffect(() => {
    setSearchQuery(initialSearch);
  }, [initialSearch]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.catagory?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="text-center py-4"><span>Loading...</span></div>;
  if (error) return <div className="text-center text-red-500 py-4">Error: {error}</div>;

  return (
    <div className="py-1 px-3 md:px-10">
      <input
        type="text"
        placeholder="Search products or categories..."
        className="w-full px-4 py-2 mb-2 md:mb-4 text-black border border-gray-300 rounded-md outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 md:gap-6 lg:gap-8 mb-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <CollectionCard 
              key={product.id}
              id={product.id}
              imagea={product.imagea}
              category={product.catagory?.name || 'Uncategorized'}
              product={product.product?.name}
              name={product.name}
              regularprice={product.regularprice}
              specialprice={product.specialprice}
              title={product.title}
              details={product.details}
              specification={product.specification}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No products found</p>
        )}
      </div>
    </div>
  );
};

export default Collections;
