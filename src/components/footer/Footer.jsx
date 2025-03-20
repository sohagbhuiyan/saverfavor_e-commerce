import { FaFacebook, FaTwitter, FaInstagram, } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 px-4 md:px-16 pb-15 sm:pb-5">
      <div className=" mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-6">

          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-lg font-semibold">JS Computer</h2>
            <div className="flex gap-3 md:gap-6 mt-2">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-xl cursor-pointer hover:text-gray-400" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-xl cursor-pointer hover:text-gray-400" />
              </a>
           
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-xl cursor-pointer hover:text-gray-400" />
              </a>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 text-xs md:text-sm text-center md:text-left">
            <div className="flex flex-col gap-1 cursor-pointer">
            <Link to="/about-us">
                <p className="cursor-pointer hover:text-gray-400">About Us</p>
              </Link>
              <Link to="news-media">
                <p className="cursor-pointer hover:text-gray-400">Media</p>
              </Link>
              <Link to="/contact">
                <p className="cursor-pointer hover:text-gray-400">Contact</p>
              </Link>
            </div>
            <div className="flex flex-col gap-1">
              <Link to="/about-ceo">
                <p className="cursor-pointer hover:text-gray-400">About Our CEO</p>
              </Link>
              <Link to="/specialty">
                <p className="cursor-pointer hover:text-gray-400">Our Specialty</p>
              </Link>
              <Link to="/service-center">
                <p className="cursor-pointer hover:text-gray-400">Service Center</p>
              </Link>
            </div>
          </div>

          <div className="text-xs md:text-sm text-center md:text-left mb-10 md:mb-2 ">
            <h3 className="font-semibold">Contact Us</h3>
            <p>42/6 Ram Babu Rd, Mymensingh-2200, Bangladesh</p>
            <p>+88 01762691654</p>
            <p>info@jscomputersbd.com</p>
            <p>JS Computer</p>
            <p>Saturday – Thursday 09 AM – 08 PM</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
