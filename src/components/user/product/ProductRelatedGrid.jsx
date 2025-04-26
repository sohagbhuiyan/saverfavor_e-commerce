import { camera, gaming, gpu, laptop, monitor } from "../../../Utils/images";
import CollectionCard from "../../user/body/collection/CollectionCard";

const products = [
  {
    image: monitor,
    category: "Monitor",
    name: "HP M22F 21.5 Inch FHD IPS Monitor",
    description: "HP M22F 21.5 Inch FHD IPS Monitor #2E2Y3AA/2D ...",
    price: 12300,
    discount: 600
  },
  {
    image: laptop,
    category: "Laptop",
    name: "Dell Inspiron 15 3511",
    description: "Intel Core i5 11th Gen, 8GB RAM, 512GB SSD...",
    price: 75000,
    discount: 1500
  },
  {
    image: gpu,
    category: "GPU",
    name: "GPU QSW Ew00D",
    description: "Dual Pixel, 24.1MP, CMOS AF, 4K video...",
    price: 55200,
    discount: 700
  },
  {
    image: camera,
    category: "Camera",
    name: "Canon EOS 200D DSLR",
    description: "24.1MP, Dual Pixel CMOS AF, 4K video...",
    price: 55000,
    discount: 2000
  },
  {
    image: gaming,
    category: "Gaming",
    name: "Gaming POE 4s 200D",
    description: "4K video, 24.1MP, Dual Pixel CMOS AF...",
    price: 55200,
    discount: 1200
  },
  {
    image: monitor,
    category: "Monitor",
    name: "HP M22F 21.5 Inch FHD IPS Monitor",
    description: "HP M22F 21.5 Inch FHD IPS Monitor #2E2Y3AA/2D ...",
    price: 12300,
    discount: 600
  },
  {
    image: laptop,
    category: "Laptop",
    name: "Dell Inspiron 15 3511",
    description: "Intel Core i5 11th Gen, 8GB RAM, 512GB SSD...",
    price: 75000,
    discount: 1500
  },
];

const ProductRelatedGrid = () => {
  return (
    <div className="p-4 md:px-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 md:gap-6 lg:gap-8">
        {products.map((product, index) => (
          <CollectionCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductRelatedGrid;