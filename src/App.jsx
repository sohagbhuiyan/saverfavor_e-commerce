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

// User Profile
import ProfileEdit from './components/user/registration/profile/ProfileEdit';
import ProfileView from './components/user/registration/profile/ProfileView';

// Admin Pages
import Dashboard from './components/admin/Dashboard';
import OrderManagement from './components/admin/OrderManagement';
import CustomerManagement from './components/admin/CustomerManagement';
import ViewProduct from './components/admin/ViewProduct';
import AddProduct from './components/admin/products/AddProduct';
import AddCategory from './components/admin/products/AddCategory';
import PaymentManagement from './components/admin/PaymentManagement';

// Protected Routes
import UserProtectedRoute from './components/Protected/UserProtectedRoute';
import AdminProtectedRoute from './components/Protected/AdminProtectedRoute';
import Collections from './components/user/body/collection/Collections';
import PCBuilder from './components/admin/PCBuilder';
import PCBuilderPage from './components/user/pcbuilder/PCBuilderPage';
// import ComponentProductsPage from './components/user/pcbuilder/ComponentProductsPage';
import ViewCategories from './components/admin/products/ViewCategories';
import ViewSystemBuilder from './components/admin/ViewSystemBuilder';
import CheckoutPage from './components/user/product/CheckOutPage';
import OrderConfirmation from './components/user/product/OrderConfirmation';
import UserOrders from './components/user/product/UserOrders';
import AdminProfileView from './components/admin/AdminProfileView';

function App() {    
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="all-categories" element={<AllCategories />} />
          <Route path="exclusive-offers" element={<ExclusiveOffer />} />
          <Route path="news-media" element={<NewsMedia />} />
          <Route path="contact" element={<Contact />} />
          <Route path="product/:id" element={<ProductviewPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="compare" element={<ComparePage />} />
          <Route path="/pc-builder" element={<PCBuilderPage />} />
          {/* <Route path="/pc-builder/:componentType" element={<ComponentProductsPage />} /> */}

          {/* About Routes */}
          <Route path="about-us" element={<AboutUs />} />
          <Route path="about-ceo" element={<AboutCEO />} />
          <Route path="specialty" element={<Specialty />} />
          <Route path="service-center" element={<ServiceCenter />} />

          {/* User Protected Routes */}
          <Route element={<UserProtectedRoute />}>
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/view-orders" element={<UserOrders />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<AdminProtectedRoute />}>

            <Route path="/admin/view-profile" element={<AdminProfileView />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="admin/products/add-category" element={<AddCategory />} />
            <Route path="/admin/products/view-categories" element={<ViewCategories />} />
            <Route path="admin/products/view-product" element={<ViewProduct />} />
            <Route path="admin/products/add-product" element={<AddProduct />} />
            <Route path="admin/orders" element={<OrderManagement />} />
            <Route path="admin/customers" element={<CustomerManagement />} />
            <Route path="admin/payments" element={<PaymentManagement />} />
            <Route path="admin/Pc-Builder" element={<PCBuilder />} />
            <Route path="admin/Pc-builder/ViewSystemBuilder" element={<ViewSystemBuilder />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
