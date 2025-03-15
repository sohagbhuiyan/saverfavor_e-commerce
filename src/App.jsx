import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import AllCategories from './components/body/AllCategories';
import Printer from './components/body/category/Printer';
import Gaming from './components/body/category/Gaming';
import Laptop from './components/body/category/Laptop';
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/laptop" element={<Laptop />} />
        <Route path="/laptop/hp" element={<LaptopHP />} />
        <Route path="/gaming" element={<Gaming />} />
        <Route path="/printer" element={<Printer />} />
        <Route path="/software" element={<Software />} />
        <Route path="/gpu" element={<GPU />} />
        <Route path="/monitor" element={<Monitor />} />
        <Route path="/network" element={<Network />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/speaker" element={<Speaker />} />
        <Route path="/software" element={<Software />} />
        <Route path="/daily-life" element={<DailyLife />} />
        <Route path="/store" element={<Store />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/all-categories" element={<AllCategories />} />
        <Route path="/product/:name" element={<ProductviewPage />} />
        <Route path="/profileedit" element={<ProfileEdit />} />

      </Routes>
    </Router>
  );
}

export default App;
