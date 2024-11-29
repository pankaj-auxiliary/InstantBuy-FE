import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  Share2,
  ShoppingCart,
  ArrowLeft,
} from "lucide-react";
import { RootState } from "../app/store";
import { fetchProductByIdRequest } from "../features/products/slice";
import Navbar from "../components/Navbar";
import CartSidebar, { CartItem } from "./CartSidebar";
import UserProfileSidebar from "../pages/UserProfileSidebar";
import CheckoutPage from "./CheckoutPage";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";
import CategoryBar from "./CategoryBar";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedProduct: product, loading } = useSelector(
    (state: RootState) => state.products
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (id) {
      dispatch(fetchProductByIdRequest(parseInt(id, 10)));
    }
  }, [dispatch, id]);

  const nextImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product?.images) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + product.images.length) % product.images.length
      );
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Product not found</p>
      </div>
    );
  }

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
      <CategoryBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={handleBack}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span className="font-medium">Back</span>
        </button>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <img
                  src={
                    product.images?.[currentImageIndex] || product.coverImage
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 ${
                        currentImageIndex === index
                          ? "border-green-500"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {product.name}
                </h1>
                {product.rating && (
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star
                        className="text-yellow-400 fill-current"
                        size={20}
                      />
                      <span className="ml-1 font-medium">{product.rating}</span>
                      <span className="ml-1 text-gray-500">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <span className="text-green-600">
                      {product.stock} in stock
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.discount && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      $
                      {(product.price * (1 + product.discount / 100)).toFixed(
                        2
                      )}
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-600">{product.description}</p>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{product.category}</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => {
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
                  className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center"
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </button>
                <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart size={20} className="text-gray-600" />
                </button>
                <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          {/* {(product.nutritionFacts || product.features) && (
            <div className="border-t border-gray-100 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {product.nutritionFacts && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      Nutrition Facts
                    </h2>
                    <div className="space-y-2">
                      {Object.entries(product.nutritionFacts).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between py-2 border-b border-gray-100"
                          >
                            <span className="text-gray-600 capitalize">
                              {key}
                            </span>
                            <span className="font-medium">{value}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {product.features && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Features</h2>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center text-gray-600"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )} */}
        </div>
      </main>
    </div>
  );
}
