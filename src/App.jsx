import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import AllCategories from './components/body/AllCategories';
import Printer from './components/body/category/Printer';
import Gaming from './components/body/category/Gaming';
import Software from './components/body/category/Software';
import GPU from './components/body/category/GPU';
import Monitor from './components/body/category/Monitor';
import Camera from './components/body/category/Camera';
import Speaker from './components/body/category/Speaker';
import ProductviewPage from './components/product/ProductviewPage';
import Registration from './components/registration/Registration';
import Login from './components/registration/Login';
import LaptopHP from './components/menu_Submeu/laptop/LaptopHP';
import Network from './components/menu_Submeu/network/Network';
import Accessories from './components/menu_Submeu/accessories/Accessories';
import DailyLife from './components/menu_Submeu/dailylife/DailyLife';
import Store from './components/menu_Submeu/store/Store';
import ProfileEdit from './components/registration/profile/ProfileEdit';
import AllLaptop from './components/body/category/AllLaptop';
import AboutUs from './components/footer/AboutUs';
import Media from './components/footer/Media';
import Contact from './components/footer/Contact';
import AboutCEO from './components/footer/AboutCEO';
import Specialty from './components/footer/Specialty';
import ServiceCenter from './components/footer/ServiceCenter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/laptop/hp" element={<LaptopHP />} />
        {/* <Route path="/gaming" element={<Gaming />} /> */}
        <Route path="/software" element={<Software />} />
     
        <Route path="/network" element={<Network />} />
      
        <Route path="/speaker" element={<Speaker />} />
        <Route path="/software" element={<Software />} />
        <Route path="/daily-life" element={<DailyLife />} />
        <Route path="/storage" element={<Store />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/all-categories" element={<AllCategories />} />
        <Route path="/product/:name" element={<ProductviewPage />} />
        <Route path="/profileedit" element={<ProfileEdit />} />

        {/* footer section */}
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/media" element={<Media />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about-ceo" element={<AboutCEO />} />
        <Route path="/specialty" element={<Specialty />} />
        <Route path="/service-center" element={<ServiceCenter />} />

      </Routes>
    </Router>
  );
}

export default App;
