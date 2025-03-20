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
  { name: "Photocopier", icon: <FaPrint size={30} />, path: "/photocopiers" },
  { name: "Printer", icon: <FaPrint size={30} />, path: "/printers" },
  { name: "Soundsystem", icon: <FaSpeakerDeck size={30} />, path: "/soundsystems" },
];

const Categories = () => {
  return (
    
    <div className="mt-1 pb-12">
      <div className="bg-[#CF212B] flex justify-between px-10 text-white text-xs md:text-lg font-semibold py-2">
       <p>Top Categories</p> 
       <p 
          className="underline cursor-pointer"
          onClick={() => window.location.href = "/all-categories"}
        >
          See all categories
        </p>
      </div>
      <div className="bg-white shadow-xs p-4 flex justify-around items-center flex-wrap gap-4">
        {categories.map((category, index) => (
          <Link to={category.path} key={index} className="md:flex flex-col items-center text-center cursor-pointer">
            <div className="text-green-600">{category.icon}</div>
            <span className="text-xs md:text-sm font-medium text-center">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
