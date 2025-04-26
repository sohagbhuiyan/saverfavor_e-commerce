import { useState } from "react";
import { camera, gaming, gpu, laptop, monitor } from "../../../../Utils/images";
import CollectionCard from "./CollectionCard";

const products = [
  {
    id: 1,
    image: monitor,
    category: "Monitor",
    name: "HP M22F 21.5 Inch FHD IPS Monitor",
    description: "HP M22F 21.5 Inch FHD IPS Monitor #2E2Y3AA/2D ...",
    price: 12300,
    discount: 600
  },
  {
    id: 2,
    image: laptop,
    category: "Laptop",
    name: "Dell Inspiron 15 3511",
    description: "Intel Core i5 11th Gen, 8GB RAM, 512GB SSD...",
    price: 75000,
    discount: 1500
  },
  {
    id: 3,
    image: gpu,
    category: "GPU",
    name: "GPU QSW Ew00D",
    description: "Dual Pixel, 24.1MP, CMOS AF, 4K video...",
    price: 55200,
    discount: 700
  },
  {
    id: 4,
    image: camera,
    category: "Camera",
    name: "Canon EOS 200D DSLR",
    description: "24.1MP, Dual Pixel CMOS AF, 4K video...",
    price: 55000,
    discount: 2000
  },
  {
    id: 5,
    image: gaming,
    category: "Gaming",
    name: "Gaming POE 4s 200D",
    description: "4K video, 24.1MP, Dual Pixel CMOS AF...",
    price: 55200,
    discount: 1200
  },
  {
    id: 6,
    image: monitor,
    category: "Monitor",
    name: "HP M22F 21.5 Inch FHD IPS Monitor",
    description: "HP M22F 21.5 Inch FHD IPS Monitor #2E2Y3AA/2D ...",
    price: 12300,
    discount: 600
  },
  {
    id: 7,
    image: laptop,
    category: "Laptop",
    name: "Dell Inspiron 15 3511",
    description: "Intel Core i5 11th Gen, 8GB RAM, 512GB SSD...",
    price: 75000,
    discount: 1500
  },
];

const Collections = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          filteredProducts.map((product, index) => (
            <CollectionCard key={index} {...product} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No products found</p>
        )}
      </div>
    </div>
  );
};

export default Collections;
