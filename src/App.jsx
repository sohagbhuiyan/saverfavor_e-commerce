import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
import Printer from './components/user/body/category/Printer';
import Monitor from './components/user/body/category/Monitor';
import Camera from './components/user/body/category/Camera';
import Notebook from './components/user/body/category/Notebook';
import Projector from './components/user/body/category/Projector';
import Soundsystem from './components/user/body/category/SoundSystems';
import Desktop from './components/user/body/category/Desktop';
import ProductviewPage from './components/user/product/ProductviewPage';
import Photocopier from './components/user/body/category/Photocopier';
import LaptopHP from './components/user/menu_Submeu/laptop/LaptopHP';
import Network from './components/user/menu_Submeu/network/Network';
import Accessories from './components/user/menu_Submeu/accessories/Accessories';
import DailyLife from './components/user/menu_Submeu/dailylife/DailyLife';
import Store from './components/user/menu_Submeu/store/Store';
import ProfileEdit from './components/user/registration/profile/ProfileEdit';
import AboutUs from './components/user/footer/AboutUs';
import AboutCEO from './components/user/footer/AboutCEO';
import Specialty from './components/user/footer/Specialty';
import ServiceCenter from './components/user/footer/ServiceCenter';
import ProfileView from './components/user/registration/profile/ProfileView';
import WishlistPage from './components/user/navbar/WishlistPage';
import CartPage from './components/user/navbar/CartPage';
import ComparePage from './components/user/navbar/ComparePage';

// Admin Pages
import Dashboard from './components/admin/Dashboard';
import ProductManagement from './components/admin/ProductManagement';
import OrderManagement from './components/admin/OrderManagement';
import CustomerManagement from './components/admin/CustomerManagement';
import ViewProduct from './components/admin/ViewProduct';
import AddProduct from './components/admin/AddProduct';
import PaymentManagement from './components/admin/PaymentManagement';

// Protected Routes
import UserProtectedRoute from './components/Protected/UserProtectedRoute';
import AdminProtectedRoute from './components/Protected/AdminProtectedRoute';

function App() {
  const { loading } = useSelector((state) => state.auth); // assuming you have auth slice

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* PUBLIC ROUTES */}
          <Route path="registration" element={<Registration />} />
          <Route path="login" element={<Login />} />

          {/* USER PROTECTED ROUTES */}
          <Route
            index
            element={
              <UserProtectedRoute>
                <Home />
              </UserProtectedRoute>
            }
          />
          <Route
            path="all-categories"
            element={
              <UserProtectedRoute>
                <AllCategories />
              </UserProtectedRoute>
            }
          />
          <Route
            path="exclusive-offers"
            element={
              <UserProtectedRoute>
                <ExclusiveOffer />
              </UserProtectedRoute>
            }
          />
          <Route
            path="news-media"
            element={
              <UserProtectedRoute>
                <NewsMedia />
              </UserProtectedRoute>
            }
          />
          <Route
            path="contact"
            element={
              <UserProtectedRoute>
                <Contact />
              </UserProtectedRoute>
            }
          />
          <Route
            path="wishlist"
            element={
              <UserProtectedRoute>
                <WishlistPage />
              </UserProtectedRoute>
            }
          />
          <Route
            path="cart"
            element={
              <UserProtectedRoute>
                <CartPage />
              </UserProtectedRoute>
            }
          />
          <Route
            path="compare"
            element={
              <UserProtectedRoute>
                <ComparePage />
              </UserProtectedRoute>
            }
          />
          <Route
            path="product/:name"
            element={
              <UserProtectedRoute>
                <ProductviewPage />
              </UserProtectedRoute>
            }
          />

          {/* User Profile Routes */}
          <Route
            path="view-profile"
            element={
              <UserProtectedRoute>
                <ProfileView />
              </UserProtectedRoute>
            }
          />
          <Route
            path="profileedit"
            element={
              <UserProtectedRoute>
                <ProfileEdit />
              </UserProtectedRoute>
            }
          />

          {/* User Categories */}
          <Route path="notebook" element={<UserProtectedRoute><Notebook /></UserProtectedRoute>} />
          <Route path="desktops" element={<UserProtectedRoute><Desktop /></UserProtectedRoute>} />
          <Route path="monitors" element={<UserProtectedRoute><Monitor /></UserProtectedRoute>} />
          <Route path="cameras" element={<UserProtectedRoute><Camera /></UserProtectedRoute>} />
          <Route path="printers" element={<UserProtectedRoute><Printer /></UserProtectedRoute>} />
          <Route path="projectors" element={<UserProtectedRoute><Projector /></UserProtectedRoute>} />
          <Route path="photocopiers" element={<UserProtectedRoute><Photocopier /></UserProtectedRoute>} />
          <Route path="soundsystems" element={<UserProtectedRoute><Soundsystem /></UserProtectedRoute>} />

          {/* Submenus */}
          <Route path="all-notebook/hp" element={<UserProtectedRoute><LaptopHP /></UserProtectedRoute>} />
          <Route path="network" element={<UserProtectedRoute><Network /></UserProtectedRoute>} />
          <Route path="daily-life" element={<UserProtectedRoute><DailyLife /></UserProtectedRoute>} />
          <Route path="storage" element={<UserProtectedRoute><Store /></UserProtectedRoute>} />
          <Route path="accessories" element={<UserProtectedRoute><Accessories /></UserProtectedRoute>} />

          {/* About Pages */}
          <Route path="about-us" element={<UserProtectedRoute><AboutUs /></UserProtectedRoute>} />
          <Route path="about-ceo" element={<UserProtectedRoute><AboutCEO /></UserProtectedRoute>} />
          <Route path="specialty" element={<UserProtectedRoute><Specialty /></UserProtectedRoute>} />
          <Route path="service-center" element={<UserProtectedRoute><ServiceCenter /></UserProtectedRoute>} />

          {/* ADMIN PROTECTED ROUTES */}
          <Route
            path="admin/dashboard"
            element={
              <AdminProtectedRoute>
                <Dashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="admin/products"
            element={
              <AdminProtectedRoute>
                <ProductManagement />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="admin/products/view-product"
            element={
              <AdminProtectedRoute>
                <ViewProduct />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="admin/products/add-product"
            element={
              <AdminProtectedRoute>
                <AddProduct />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="admin/orders"
            element={
              <AdminProtectedRoute>
                <OrderManagement />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="admin/customers"
            element={
              <AdminProtectedRoute>
                <CustomerManagement />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="admin/payments"
            element={
              <AdminProtectedRoute>
                <PaymentManagement />
              </AdminProtectedRoute>
            }
          />

          {/* DEFAULT ROUTE */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
