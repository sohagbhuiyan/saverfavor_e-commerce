import { Link } from "react-router-dom";
import {
  FaLaptop,
  FaDesktop,
  FaTv,
  FaCamera,
  FaPrint,
  FaVideo,
  FaSpeakerDeck,
} from "react-icons/fa";

const categories = [
  { name: "Notebook", icon: <FaLaptop size={30} />, path: "/notebook" },
  { name: "Desktop", icon: <FaDesktop size={30} />, path: "/desktops" },
  { name: "Projector", icon: <FaVideo size={30} />, path: "/projectors" },
  { name: "Monitor", icon: <FaTv size={30} />, path: "/monitors" },
  { name: "Camera", icon: <FaCamera size={30} />, path: "/cameras" },
  { name: "Photocopiers", icon: <FaPrint size={30} />, path: "/photocopiers" },
  { name: "Printer", icon: <FaPrint size={30} />, path: "/printers" },
  { name: "Soundsystem", icon: <FaSpeakerDeck size={30} />, path: "/soundsystems" },
];

const Categories = () => {
  return (
    <div className="mt-1 pb-12">
      <div className="bg-[#CF212B] flex justify-between px-4 md:px-10 text-white text-xs md:text-lg font-semibold py-2">
        <p>Top Categories</p> 
        <Link 
          to="/all-categories"
          className="underline cursor-pointer"
        >
          See all categories
        </Link>
      </div>
      <div className="bg-white shadow-xs p-4 grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-4">
        {categories.map((category, index) => (
          <Link 
            to={category.path} 
            key={index} 
            className="flex flex-col items-center justify-center p-2 hover:scale-105 transition-transform"
          >
            <div className="text-green-600 mb-1 md:mb-2">{category.icon}</div>
            <span className="text-[10px] md:text-sm font-medium text-center leading-tight">
              {category.name}
            </span>
          </Link>
        ))}
      </div>  
    </div>
  );
};  

export default Categories;
