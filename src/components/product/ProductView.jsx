import { useState } from "react";
import { useParams } from "react-router-dom";
import { camera, gaming, gpu, laptop, monitor } from "../../Utils/images";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

const productData = {
  "HP M22F 21.5 Inch FHD IPS Monitor": {
    images: [monitor, laptop, monitor],
    category: "Monitor",
    name: "HP M22F 21.5 Inch FHD IPS Monitor",
    description: "HP M22F 21.5 Inch FHD IPS Monitor #2E2Y3AA/2D...",
    specialprice: 12300,
    regularprice: 80000,
    discount: 600,
    productId: "91.07.154.108",
    details: {
      displaySize: "24 Inch",
      resolution: "1920x1080",
      panelType: "IPS",
      refreshRate: "75Hz",
      rotatable: "No",
      hdmiPort: "1",
    },
  },
  "Dell Inspiron 15 3511": {
    images: [laptop,monitor,laptop],
    category: "Laptop",
    name: "Dell Inspiron 15 core i5 with Sata SSD",
    description: "Intel Core i5 11th Gen, 8GB RAM, 512GB SSD...",
    specialprice: 75000,
    regularprice: 80000,
    discount: 1500,
    productId: "92.04.120.207",
    details: {
      displaySize: "15.6 Inch",
      resolution: "1920x1080",
      panelType: "IPS",
      refreshRate: "60Hz",
      rotatable: "No",
      hdmiPort: "1",
    },
  },
  "GPU QSW Ew00D": {
    images: [gpu, gpu, gpu],
    category: "GPU",
    name: "GPU QSW Ew00D",
    description: "Dual Pixel, 24.1MP, CMOS AF, 4K video...",
    specialprice: 55200,
    regularprice: 55900, // 55200 + 700
    discount: 700,
    productId: "93.07.154.101",
    details: {
      displaySize: "N/A",
      resolution: "7680x4320",
      panelType: "GDDR6X",
      refreshRate: "N/A",
      rotatable: "No",
      hdmiPort: "3"
    }
  },
  "Canon EOS 200D DSLR": {
    images: [camera, camera, camera],
    category: "Camera",
    name: "Canon EOS 200D DSLR",
    description: "24.1MP, Dual Pixel CMOS AF, 4K video...",
    specialprice: 55000,
    regularprice: 57000, // 55000 + 2000
    discount: 2000,
    productId: "94.04.120.202",
    details: {
      displaySize: "3.0 Inch",
      resolution: "6000x4000",
      panelType: "CMOS",
      refreshRate: "60Hz",
      rotatable: "Yes",
      hdmiPort: "1"
    }
  },
  "Gaming POE 4s 200D": {
    images: [gaming, gaming, gaming],
    category: "Gaming",
    name: "Gaming POE 4s 200D",
    description: "4K video, 24.1MP, Dual Pixel CMOS AF...",
    specialprice: 55200,
    regularprice: 56400, // 55200 + 1200
    discount: 1200,
    productId: "95.05.130.303",
    details: {
      displaySize: "N/A",
      resolution: "3840x2160",
      panelType: "LED",
      refreshRate: "144Hz",
      rotatable: "No",
      hdmiPort: "2"
    }
  },
};

const ProductView = () => {
  const { name } = useParams();
  const product = productData[name];
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product?.images[0] || "");
  const [zoomStyle, setZoomStyle] = useState({ display: "none" });

  if (!product) {
    return <h2 className="text-center text-xl mt-6">Product Not Found</h2>;
  }

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setZoomStyle({
      backgroundImage: `url(${mainImage})`,
      backgroundSize: "200%",
      backgroundPosition: `${x}% ${y}%`,
      display: "block",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: "none" });
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success(`${product.name} added to cart!`, { duration: 2000, position: "top-right" });
  };

  return (
    <div className="p-8 flex flex-col md:flex-row-reverse gap-10">
      {/* Right Section: Product Details (Shown first on mobile) */}
      <div className="flex-col px-6 md:px-10 md:flex-1">
        <h2 className="text-md md:text-2xl font-bold">{product.name}</h2>
        <p className="text-xs md:text-sm text-gray-600">Product Id: {product.productId}</p>

        <p className="md:text-lg text-sm font-bold text-red-700 mt-2">
          Special Price: Tk {product.specialprice}
        </p>
        <p className="text-sm md:text-md font-bold text-gray-700 mt-2">
          Regular Price: Tk {product.regularprice}
        </p>
        {product.discount && (
          <p className="text-purple-600 text-xs md:text-sm">Save Tk {product.discount} on online order</p>
        )}

        <h3 className="mt-4 font-semibold text-md md:text-lg ">Quick Overview</h3>
        <ul className="list-disc pl-6 text-xs md:text-sm text-gray-700">
          <li><strong>Display Size:</strong> {product.details.displaySize}</li>
          <li><strong>Display Resolution:</strong> {product.details.resolution}</li>
          <li><strong>Panel Type:</strong> {product.details.panelType}</li>
          <li><strong>Refresh Rate:</strong> {product.details.refreshRate}</li>
          <li><strong>Rotatable:</strong> {product.details.rotatable}</li>
          <li><strong>HDMI Port:</strong> {product.details.hdmiPort}</li>
        </ul>

        {/* Quantity Selector & Add to Cart */}
        <div className="mt-4 flex items-center gap-2">
          <button className="bg-gray-300 cursor-pointer text-xs md:text-sm px-3 py-1 rounded" onClick={decreaseQuantity}>-</button>
          <span>{quantity}</span>
          <button className="bg-gray-300 cursor-pointer text-xs md:text-sm px-3 py-1 rounded" onClick={increaseQuantity}>+</button>
          <button className="bg-red-600 hover:bg-red-700 text-xs md:text-md font-medium text-white p-2 rounded cursor-pointer" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Left Section: Main Image + Thumbnails */}
      <div className="flex flex-col-reverse items-center sm:px-6 md:flex-row gap-4 sm:gap-8">
        {/* Main Image with Zoom Effect */}


        {/* Thumbnails (Below Main Image in Mobile, Left Side in Desktop) */}
        <div className="flex flex-row md:flex-col gap-2 sm:gap-3 px-2 md:px-4 mt-4 md:mt-0">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="thumbnail"
              className="w-12 h-12 sm:w-16 sm:h-16 border border-gray-500 cursor-pointer"
              onMouseEnter={() => setMainImage(img)}
            />
          ))}
        </div>
        <div className="relative w-40 h-40 sm:w-96 sm:h-96 border border-gray-400 overflow-hidden flex-1"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img src={mainImage} alt={product.name} className="w-full h-full" />
          <div className="absolute top-0 left-0 w-full h-full cursor-zoom-in" style={zoomStyle}></div>
        </div>

      </div>

      <Toaster />
    </div>

  );
};

export default ProductView;
