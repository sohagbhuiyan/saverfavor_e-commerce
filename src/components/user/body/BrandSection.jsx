import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../../../store/brandSlice'; // adjust path as needed

const BrandSection = () => {
  const dispatch = useDispatch();
  const { items: brands, loading, error } = useSelector((state) => state.brands);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  if (loading) return <p>Loading brands...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 md:px-10">
      <h2 className="text-md md:text-2xl text-white bg-gray-800 font-semibold mb-4">All Brands</h2>
      <div className="flex flex-wrap gap-6 cursor-pointer">
        {brands.map((brand) => (
          <div key={brand.id} className="px-6 py-3 font-semibold bg-gray-300 rounded  shadow-md">
            {brand.brandname}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandSection;
