import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Buyer Pages
import BuyerInterface from "./pages/buyer/BuyerInterface";
import BuyerProfile from "./pages/buyer/BuyerProfile";
import Orders from "./pages/buyer/Orders";
import Wallet from "./pages/buyer/Wallet";
import Offers from "./pages/buyer/Offers";
import DeliveryAddress from "./pages/buyer/DeliveryAddress";
import Settings from "./pages/buyer/Settings";
import Support from "./pages/buyer/Support";

// Seller Pages
import SellerDashboard from "./pages/SellerDashboard";
import SellerProducts from "./pages/SellerProducts";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

// Auth Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// Other Pages
import NotFound from "./pages/NotFound";

import Favorites from "./pages/buyer/Favourites";
import SellerOrders from "./pages/seller/SellerOrders";
import SellerAnalytics from "./pages/seller/SellerAnalytics";
import SellerCustomers from "./pages/seller/SellerCustomer";
import SellerSupport from "./pages/seller/SellerSupport";
import SellerSettings from "./pages/seller/SellerSettings";
import { UserRole } from "./features/user/types";
import ProductDetails from "./components/ProductDetails";
import HomePage from "./pages/auth/HomePage";
function App() {
  const { isAuthenticated, user } = useAuth();

  console.log("App rendered", isAuthenticated, user);
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={[UserRole.BUYER, UserRole.SELLER]}>
            <HomePage />{" "}
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/product/:id/details" element={<ProductDetails />} />
      {/* Buyer Routes */}
      <Route
        path="/buyer"
        element={
          <ProtectedRoute allowedRoles={[UserRole.BUYER]}>
            <BuyerInterface />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={[UserRole.BUYER]}>
            <BuyerProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute allowedRoles={[UserRole.BUYER]}>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/delivery-address"
        element={
          <ProtectedRoute allowedRoles={[UserRole.BUYER]}>
            <DeliveryAddress />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute allowedRoles={[UserRole.BUYER]}>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/support"
        element={
          <ProtectedRoute allowedRoles={[UserRole.BUYER]}>
            <Support />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute allowedRoles={[UserRole.BUYER]}>
            <Favorites />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wallet"
        element={
          <ProtectedRoute allowedRoles={[UserRole.BUYER]}>
            <Wallet />
          </ProtectedRoute>
        }
      />{" "}
      <Route
        path="/offers"
        element={
          <ProtectedRoute allowedRoles={[UserRole.BUYER]}>
            <Offers />
          </ProtectedRoute>
        }
      />
      {/* Seller Routes */}
      <Route
        path="/seller"
        element={
          <ProtectedRoute allowedRoles={[UserRole.SELLER]}>
            <SellerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller"
        element={
          <ProtectedRoute allowedRoles={[UserRole.SELLER]}>
            <SellerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/products"
        element={
          <ProtectedRoute allowedRoles={[UserRole.SELLER]}>
            <SellerProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute allowedRoles={[UserRole.BUYER]}>
            <Favorites />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/products/add"
        element={
          <ProtectedRoute allowedRoles={[UserRole.SELLER]}>
            <AddProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/products/edit/:id"
        element={
          <ProtectedRoute allowedRoles={[UserRole.SELLER]}>
            <EditProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/orders"
        element={
          <ProtectedRoute allowedRoles={[UserRole.SELLER]}>
            <SellerOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/analytics"
        element={
          <ProtectedRoute allowedRoles={[UserRole.SELLER]}>
            <SellerAnalytics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/customers"
        element={
          <ProtectedRoute allowedRoles={[UserRole.SELLER]}>
            <SellerCustomers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/settings"
        element={
          <ProtectedRoute allowedRoles={[UserRole.SELLER]}>
            <SellerSettings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/support"
        element={
          <ProtectedRoute allowedRoles={[UserRole.SELLER]}>
            <SellerSupport />
          </ProtectedRoute>
        }
      />
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
