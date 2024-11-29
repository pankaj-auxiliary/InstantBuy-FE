import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import { Heart } from "lucide-react";
import { fetchFavoritesRequest } from "../../features/favourites/slice";
import CartSidebar, { CartItem } from "../../components/CartSidebar";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import CheckoutPage from "../../components/CheckoutPage";
import UserProfileSidebar from "../UserProfileSidebar";

export default function Favorites() {
  const dispatch = useDispatch();
  const { items: favorites, loading } = useSelector(
    (state: RootState) => state.favorites
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const updateCartItemQuantity = (id: number, quantity: number) => {
    setCartItems((prevItems) => {
      if (quantity === 0) {
        return prevItems.filter((item) => item.id !== id);
      }
      return prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setIsCartOpen(false);
      setIsCheckoutOpen(true);
    }
  };

  useEffect(() => {
    dispatch(fetchFavoritesRequest());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onMenuClick={() => setIsSidebarOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={handleLoginClick}
        isLoggedIn={isAuthenticated}
        onProfileClick={() => {
          setProfileOpen(true);
        }}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLoginClick={handleLoginClick}
        isLoggedIn={isAuthenticated}
      />
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartItemQuantity}
        onCheckout={handleCheckout}
      />
      <CheckoutPage
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
      />
      <UserProfileSidebar
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Heart className="text-red-500" />
            My Favorites
          </h1>
          <p className="text-gray-600 mt-1">
            Products you've marked as favorites
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-medium text-gray-600">
              No favorites yet
            </h2>
            <p className="text-gray-500 mt-2">
              Start adding products to your favorites
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                coverImage={product.coverImage}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
