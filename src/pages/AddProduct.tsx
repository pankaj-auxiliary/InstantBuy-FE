import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SellerNavbar from "../components/seller/SellerNavbar";
import SellerSidebar from "../components/seller/SellerSidebar";
import ProductForm from "../components/ProductForm";

export default function AddProduct() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData: FormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    navigate("/seller/products");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerNavbar onMenuClick={() => setIsSidebarOpen(true)} />
      <SellerSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
          <p className="text-gray-600 mt-1">
            Fill in the details to add a new product
          </p>
        </div>

        <ProductForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
}
