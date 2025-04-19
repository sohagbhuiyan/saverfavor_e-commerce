import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import AllCategories from './components/body/AllCategories';
import Registration from './components/registration/Registration';
import Login from './components/registration/Login';
import ExclusiveOffer from './components/topbar/ExclusiveOffer';
import NewsMedia from './components/topbar/NewsMedia';
import Contact from './components/footer/Contact';
// categories 
import Printer from './components/body/category/Printer';
import Monitor from './components/body/category/Monitor';
import Camera from './components/body/category/Camera';
import Notebook from './components/body/category/Notebook';
import Projector from './components/body/category/Projector';
import Soundsystem from './components/body/category/SoundSystems';
import Desktop from './components/body/category/Desktop';
import ProductviewPage from './components/product/ProductviewPage';
import Photocopier from './components/body/category/Photocopier';

import LaptopHP from './components/menu_Submeu/laptop/LaptopHP';
import Network from './components/menu_Submeu/network/Network';
import Accessories from './components/menu_Submeu/accessories/Accessories';
import DailyLife from './components/menu_Submeu/dailylife/DailyLife';
import Store from './components/menu_Submeu/store/Store';
import ProfileEdit from './components/registration/profile/ProfileEdit';
import AboutUs from './components/footer/AboutUs';
import AboutCEO from './components/footer/AboutCEO';
import Specialty from './components/footer/Specialty';
import ServiceCenter from './components/footer/ServiceCenter';
import Layout from './components/layout/Layout';
import ProfileView from './components/registration/profile/ProfileView';
import WishlistPage from './components/navbar/WishlistPage';
import CartPage from './components/navbar/CartPage';



function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap all routes that need Layout with a parent Route */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          {/* profile view-edit  */}
          <Route path="/view-profile" element={<ProfileView />} />
          {/* TOPBAR  */}
          <Route path="/exclusive-offers" element={<ExclusiveOffer/>} />
          <Route path="/news-media" element={<NewsMedia/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          {/* Categories  */}
          <Route path="/notebook" element={<Notebook />} />
          <Route path="/desktops" element={<Desktop/>} />
          <Route path="/monitors" element={<Monitor/>} />
          <Route path="/cameras" element={<Camera/>} />
          <Route path="/printers" element={<Printer/>} />
          <Route path="/projectors" element={<Projector />} />
          <Route path="/photocopiers" element={<Photocopier />} />
          <Route path="/soundsystems" element={<Soundsystem/>} />
          {/* menu and submenu  */}
          <Route path="/all-notebook/hp" element={<LaptopHP />} />
          <Route path="/network" element={<Network />} />
          <Route path="/daily-life" element={<DailyLife />} />
          <Route path="/storage" element={<Store />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/all-categories" element={<AllCategories />} />
          <Route path="/product/:name" element={<ProductviewPage />} />
          <Route path="/profileedit" element={<ProfileEdit />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/news-media" element={<NewsMedia />} />
          <Route path="/about-ceo" element={<AboutCEO />} />
          <Route path="/specialty" element={<Specialty />} />
          <Route path="/service-center" element={<ServiceCenter />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
