import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout
import Layout from './components/layout/Layout';

// User Pages
import Home from './components/user/pages/Home';
import AllCategories from './components/user/body/AllCategories';
import Registration from './components/user/registration/Registration';
import Login from './components/user/registration/Login';
import ExclusiveOffer from './components/user/topbar/ExclusiveOffer';
import NewsMedia from './components/user/topbar/NewsMedia';
import Contact from './components/user/footer/Contact';
import ProductviewPage from './components/user/product/ProductviewPage';
import AboutUs from './components/user/footer/AboutUs';
import AboutCEO from './components/user/footer/AboutCEO';
import Specialty from './components/user/footer/Specialty';
import ServiceCenter from './components/user/footer/ServiceCenter';
import WishlistPage from './components/user/navbar/WishlistPage';
import CartPage from './components/user/navbar/CartPage';
import ComparePage from './components/user/navbar/ComparePage';

// Category Components
import Printer from './components/user/body/category/Printer';
import Monitor from './components/user/body/category/Monitor';
import Camera from './components/user/body/category/Camera';
import Notebook from './components/user/body/category/Notebook';
import Projector from './components/user/body/category/Projector';
import Soundsystem from './components/user/body/category/SoundSystems';
import Desktop from './components/user/body/category/Desktop';
import Photocopier from './components/user/body/category/Photocopier';

// Submenu Components
import LaptopHP from './components/user/menu_Submeu/laptop/LaptopHP';
import Network from './components/user/menu_Submeu/network/Network';
import Accessories from './components/user/menu_Submeu/accessories/Accessories';
import DailyLife from './components/user/menu_Submeu/dailylife/DailyLife';
import Store from './components/user/menu_Submeu/store/Store';

// User Profile
import ProfileEdit from './components/user/registration/profile/ProfileEdit';
import ProfileView from './components/user/registration/profile/ProfileView';

// Admin Pages
import Dashboard from './components/admin/Dashboard';
import ProductManagement from './components/admin/ProductManagement';
import OrderManagement from './components/admin/OrderManagement';
import CustomerManagement from './components/admin/CustomerManagement';
import ViewProduct from './components/admin/ViewProduct';
import AddProduct from './components/admin/products/AddProduct';
import AddCategory from './components/admin/products/AddCategory';
import PaymentManagement from './components/admin/PaymentManagement';

// Protected Routes
import UserProtectedRoute from './components/Protected/UserProtectedRoute';
import AdminProtectedRoute from './components/Protected/AdminProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          {/* Public Routes */}
          <Route index path="/" element={<Home />} />
          <Route path="registration" element={<Registration />} />
          <Route path="login" element={<Login />} />
          <Route path="all-categories" element={<AllCategories />} />
          <Route path="exclusive-offers" element={<ExclusiveOffer />} />
          <Route path="news-media" element={<NewsMedia />} />
          <Route path="contact" element={<Contact />} />
          <Route path="product/:name" element={<ProductviewPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="compare" element={<ComparePage />} />

          {/* Category Routes */}
          <Route path="notebook" element={<Notebook />} />
          <Route path="desktops" element={<Desktop />} />
          <Route path="monitors" element={<Monitor />} />
          <Route path="cameras" element={<Camera />} />
          <Route path="printers" element={<Printer />} />
          <Route path="projectors" element={<Projector />} />
          <Route path="photocopiers" element={<Photocopier />} />
          <Route path="soundsystems" element={<Soundsystem />} />

          {/* Submenu Routes */}
          <Route path="all-notebook/hp" element={<LaptopHP />} />
          <Route path="network" element={<Network />} />
          <Route path="daily-life" element={<DailyLife />} />
          <Route path="storage" element={<Store />} />
          <Route path="accessories" element={<Accessories />} />

          {/* About Routes */}
          <Route path="about-us" element={<AboutUs />} />
          <Route path="about-ceo" element={<AboutCEO />} />
          <Route path="specialty" element={<Specialty />} />
          <Route path="service-center" element={<ServiceCenter />} />

          {/* User Protected Routes */}
          <Route element={<UserProtectedRoute />}>
            <Route path="view-profile" element={<ProfileView />} />
            <Route path="profileedit" element={<ProfileEdit />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<AdminProtectedRoute />}>
            <Route path="admin/dashboard" element={<Dashboard />} />
            <Route path="admin/products" element={<ProductManagement />} />
            <Route path="admin/products/add-category" element={<AddCategory />} />
            <Route path="admin/products/view-product" element={<ViewProduct />} />
            <Route path="admin/products/add-product" element={<AddProduct />} />
            <Route path="admin/orders" element={<OrderManagement />} />
            <Route path="admin/customers" element={<CustomerManagement />} />
            <Route path="admin/payments" element={<PaymentManagement />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;





// import './App.css';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// // Layout
// import Layout from './components/layout/Layout';

// // User Pages
// import Home from './components/user/pages/Home';
// import Registration from './components/user/registration/Registration';
// import Login from './components/user/registration/Login';
// import ProductviewPage from './components/user/product/ProductviewPage';
// // import UserViewProduct from './components/user/ViewProduct'; // Add this for normal users

// // Admin Pages
// import Dashboard from './components/admin/Dashboard';
// import ProductManagement from './components/admin/ProductManagement';
// import ViewProduct from './components/admin/ViewProduct';
// import AddProduct from './components/admin/products/AddProduct';
// import ProfileView from './components/user/registration/profile/ProfileView';
// // Others (Footer, Contact, etc.)
// import Contact from './components/user/footer/Contact';
// import AboutUs from './components/user/footer/AboutUs';
// import AddCategory from './components/admin/products/AddCategory';
// import ProductDetails from './components/user/product/ProductDetails';
// import CartPage from './components/user/navbar/CartPage';
// import OrderManagement from './components/admin/OrderManagement';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Global Layout (Navbar + Footer + Content) */}
//         <Route element={<Layout />}>

//           {/* Public Routes */}
//           <Route path="/registration" element={<Registration />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/" element={<Home />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/about-us" element={<AboutUs />} />

//           {/* User Routes */}
//           <Route path="/product/:id" element={<ProductviewPage />} />
//           <Route path="/cart" element={ <CartPage /> }/>
//           <Route path="/product/:id" element={<ProductDetails />} />
//           <Route path="view-profile" element={ <ProfileView /> } />
//           {/* Admin Routes */}
//           <Route path="/admin/dashboard" element={<Dashboard />} />
//           <Route path="/admin/products" element={<ProductManagement />} />
//           <Route path="/admin/orders" element={<OrderManagement />} />
//           <Route path="/admin/products/view-product" element={<ViewProduct />} />
//           <Route path="/admin/products/add-product" element={<AddProduct />} />
//           <Route path="/admin/products/add-category" element={<AddCategory />} />
//           {/* Catch All */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;
