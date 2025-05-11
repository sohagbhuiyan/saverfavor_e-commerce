import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../../store/productSlice";
import CollectionCard from "./CollectionCard";
import { useSearchParams } from "react-router-dom";

const Collections = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const productParam = searchParams.get("product") || "";
  const searchParam = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(searchParam);

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Sync searchQuery with searchParam when URL changes
  useEffect(() => {
    setSearchQuery(searchParam);
  }, [searchParam]);

  // Filter products based on category, product, or search
  const filteredProducts = products.filter((product) => {
    // If productParam exists, filter by product.product?.name
    if (productParam) {
      return (
        product.product?.name?.toLowerCase() === productParam.toLowerCase() ||
        product.name?.toLowerCase() === productParam.toLowerCase()
      );
    }
    // If categoryParam exists, filter by category name
    if (categoryParam) {
      return product.catagory?.name?.toLowerCase() === categoryParam.toLowerCase();
    }
    // If searchParam exists, filter by searchQuery
    if (searchQuery) {
      return (
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.catagory?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.product?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // If no params, show all products
    return true;
  });

  if (loading) return <div className="text-center py-4"><span>Loading...</span></div>;
  if (error) return <div className="text-center text-red-500 py-4">Error: {error}</div>;

  return (
    <div className="py-5 px-3 md:px-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 md:gap-6 lg:gap-8 mb-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <CollectionCard
              key={product.id}
              id={product.id}
              imagea={product.imagea}
              category={product.catagory?.name || "Uncategorized"}
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

// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../../../../store/productSlice";
// import CollectionCard from "./CollectionCard";
// import { useSearchParams } from "react-router-dom";

// const Collections = () => {
//   const [searchParams] = useSearchParams();
//   const categoryParam = searchParams.get("category") || "";
//   const productParam = searchParams.get("product") || "";
//   const [searchQuery, setSearchQuery] = useState("");

//   const dispatch = useDispatch();
//   const { products, loading, error } = useSelector((state) => state.products);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   // Filter products based on category or product
//   const filteredProducts = products.filter((product) => {
//     // If productParam exists, filter by product title or ID
//     if (productParam) {
//       return (
//         product.title?.toLowerCase() === productParam.toLowerCase() ||
//         product.id?.toLowerCase() === productParam.toLowerCase()
//       );
//     }
//     // If categoryParam exists, filter by category name
//     if (categoryParam) {
//       return product.catagory?.name?.toLowerCase() === categoryParam.toLowerCase();
//     }
//     // If searchQuery exists, filter by search
//     return (
//       product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       product.catagory?.name?.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   });

//   if (loading) return <div className="text-center py-4"><span>Loading...</span></div>;
//   if (error) return <div className="text-center text-red-500 py-4">Error: {error}</div>;

//   return (
//     <div className="py-1 px-3 md:px-10">
//       <input
//         type="text"
//         placeholder="Search products or categories..."
//         className="w-full px-4 py-2 mb-2 md:mb-4 text-black border border-gray-300 rounded-md outline-none"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 md:gap-6 lg:gap-8 mb-4">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <CollectionCard
//               key={product.id}
//               id={product.id}
//               imagea={product.imagea}
//               category={product.catagory?.name || "Uncategorized"}
//               product={product.product?.name}
//               name={product.name}
//               regularprice={product.regularprice}
//               specialprice={product.specialprice}
//               title={product.title}
//               details={product.details}
//               specification={product.specification}
//             />
//           ))
//         ) : (
//           <p className="text-center text-gray-500 col-span-full">No products found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Collections;
