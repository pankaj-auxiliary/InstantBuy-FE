import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SellerNavbar from '../components/SellerNavbar';
import SellerSidebar from '../components/SellerSidebar';
import ProductForm from '../components/ProductForm';

export default function EditProduct() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Simulate API call to fetch product
    const fetchProduct = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setProduct({
        name: "Fresh Organic Bananas",
        price: 2.99,
        stock: 50,
        category: "Fruits",
        status: "active",
        description: "Fresh and organic bananas sourced directly from farmers.",
        weight: "1 bunch (5-7 pieces)",
        image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=800",
        discount: 10
      });
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (formData: FormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate('/seller/products');
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerNavbar onMenuClick={() => setIsSidebarOpen(true)} />
      <SellerSidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
          <p className="text-gray-600 mt-1">Update product information</p>
        </div>

        <ProductForm 
          onSubmit={handleSubmit}
          initialData={product}
        />
      </main>
    </div>
  );
}