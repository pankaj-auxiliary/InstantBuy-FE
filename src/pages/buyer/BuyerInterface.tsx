import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import CategoryBar from "../../components/CategoryBar";
import ProductCard from "../../components/ProductCard";
import Sidebar from "../../components/Sidebar";
import CartSidebar from "../../components/CartSidebar";
import CheckoutPage from "../../components/CheckoutPage";
import { useNavigate } from "react-router-dom";
import { localStorageService } from "../../services/LocalStorageService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { fetchProductsRequest } from "../../features/products/slice";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  coverImage: string;
}

export default function BuyerInterface() {
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProductsRequest({ page: 1, limit: 10 }));
    }
  }, [isAuthenticated]);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setIsCartOpen(false);
      setIsCheckoutOpen(true);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const products = useSelector((state: RootState) => state.products.items);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onMenuClick={() => setIsSidebarOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={handleLoginClick}
        isLoggedIn={isAuthenticated}
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
      <CategoryBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Trending Products
          </h2>
          <p className="text-gray-600 mt-1">
            Get your daily needs delivered in minutes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(products && Array.isArray(products) ? products : []).map(
            (product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={() => {
                  const existingItem = cartItems.find(
                    (item) => item.id === product.id
                  );
                  if (existingItem) {
                    updateCartItemQuantity(
                      product.id,
                      existingItem.quantity + 1
                    );
                  } else {
                    setCartItems([...cartItems, { ...product, quantity: 1 }]);
                  }
                  setIsCartOpen(true);
                }}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
}
