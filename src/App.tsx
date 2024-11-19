import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Buyer Pages
import BuyerInterface from './pages/buyer/BuyerInterface';
import BuyerProfile from './pages/buyer/BuyerProfile';
import Orders from './pages/buyer/Orders';

// Seller Pages
import SellerDashboard from './pages/SellerDashboard';
import SellerProducts from './pages/SellerProducts';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';

// Auth Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Other Pages
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Buyer Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <BuyerInterface />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <BuyerProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* Seller Routes */}
        <Route
          path="/seller"
          element={
            <ProtectedRoute allowedRoles={['seller']}>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/products"
          element={
            <ProtectedRoute allowedRoles={['seller']}>
              <SellerProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/products/add"
          element={
            <ProtectedRoute allowedRoles={['seller']}>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/products/edit/:id"
          element={
            <ProtectedRoute allowedRoles={['seller']}>
              <EditProduct />
            </ProtectedRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;