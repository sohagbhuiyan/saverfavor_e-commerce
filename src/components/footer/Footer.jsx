import { FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 px-4 md:px-16 pb-15 sm:pb-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-6">

          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-lg font-semibold">SAVERFAVOR</h2>
            <div className="flex gap-3 mt-2">
              <FaFacebook className="text-xl cursor-pointer hover:text-gray-400" />
              <FaTwitter className="text-xl cursor-pointer hover:text-gray-400" />
              <FaYoutube className="text-xl cursor-pointer hover:text-gray-400" />
              <FaInstagram className="text-xl cursor-pointer hover:text-gray-400" />
              <FaLinkedin className="text-xl cursor-pointer hover:text-gray-400" />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 text-xs md:text-sm text-center md:text-left">
            <div className="flex flex-col gap-1">
              <p>About Us</p>
              <p>Branches & Pickup Points</p>
              <p>Warranty</p>
              <p>Repair and Services</p>
              <p>EMI</p>
              <p>Glossary</p>
              <p>Blog</p>
            </div>
            <div className="flex flex-col gap-1">
              <p>Order Procedure</p>
              <p>Return, Refund & Cancelation</p>
              <p>Payment Method</p>
              <p>Terms & Conditions</p>
              <p>Privacy Policy</p>
              <p>Cookie Policy</p>
            </div>
          </div>

          <div className="text-xs md:text-sm text-center md:text-left">
            <h3 className="font-semibold">Contact Us</h3>
            <p>Head Office</p>
            <p>Saverfavor Limited</p>
            <p>Asighhon Schhls, Dhaka-1229</p>
            <p>16 810, 09609016810, +8801755513900</p>
            <p>( Message only )</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
