import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands, fetchProductsByBrand, clearProductsByBrand } from '../../../store/brandSlice';
import Collections from '../../user/body/collection/Collections'; // Adjust path to your Collections component
import { Link } from 'react-router-dom';

const BrandSection = () => {
  const dispatch = useDispatch();
  const { items: brands, productsByBrand, loading, error } = useSelector((state) => state.brands);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleBrandClick = (brandId) => {
    dispatch(fetchProductsByBrand({ id: brandId }));
  };

  const handleShowAllBrands = () => {
    dispatch(clearProductsByBrand());
  };

  if (loading && !productsByBrand.length) return <p className="text-center py-4">Loading brands...</p>;
  if (error && !productsByBrand.length) return <p className="text-center text-red-500 py-4">Error: {error}</p>;

  return (
    <div className="p-4 md:px-10">
      <h2 className="text-md md:text-2xl text-white bg-gray-800 font-semibold mb-4">All Brands</h2>
     <div className="flex flex-wrap gap-6 cursor-pointer">
  {brands.map((brand) => (
    <Link
      key={brand.id}
      to={`/brand/${brand.id}`}
      className="px-6 py-3 font-semibold bg-gray-300 rounded shadow-md hover:bg-gray-400 transition-colors"
    >
      {brand.brandname}
    </Link>
  ))}
</div>
      {productsByBrand.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg md:text-xl font-semibold mb-4">
            Products for {brands.find((b) => b.id === productsByBrand[0]?.brand?.id)?.brandname || 'Selected Brand'}
          </h3>
          {loading ? (
            <p className="text-center py-4">Loading products...</p>
          ) : error ? (
            <p className="text-center text-red-500 py-4">Error: {error}</p>
          ) : (
            <Collections product={productsByBrand} />
          )}
        </div>
      )}
    </div>
  );
};

export default BrandSection;