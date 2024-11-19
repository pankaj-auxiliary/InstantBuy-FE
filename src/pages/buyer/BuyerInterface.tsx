import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import CategoryBar from '../../components/CategoryBar';
import ProductCard from '../../components/ProductCard';
import Sidebar from '../../components/Sidebar';
import CartSidebar from '../../components/CartSidebar';
import CheckoutPage from '../../components/CheckoutPage';
import { useNavigate } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: "Fresh Organic Bananas",
    price: 2.99,
    weight: "1 bunch (5-7 pieces)",
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=800",
    discount: 10
  },
  {
    id: 2,
    name: "Premium Whole Milk",
    price: 3.49,
    weight: "1 gallon",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=800"
  },
  // Add more products as needed
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  weight: string;
}

export default function BuyerInterface() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const updateCartItemQuantity = (id: number, quantity: number) => {
    setCartItems(prevItems => {
      if (quantity === 0) {
        return prevItems.filter(item => item.id !== id);
      }
      return prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setIsCartOpen(false);
      setIsCheckoutOpen(true);
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

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
          <h2 className="text-2xl font-bold text-gray-800">Trending Products</h2>
          <p className="text-gray-600 mt-1">Get your daily needs delivered in minutes</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              {...product}
              onAddToCart={() => {
                const existingItem = cartItems.find(item => item.id === product.id);
                if (existingItem) {
                  updateCartItemQuantity(product.id, existingItem.quantity + 1);
                } else {
                  setCartItems([...cartItems, { ...product, quantity: 1 }]);
                }
                setIsCartOpen(true);
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
}