import { useEffect } from "react";
import { useProducts } from "../hooks";

export default function ProductList() {
  const { products, loading, error, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts({ page: 1, limit: 10 });
  }, [fetchProducts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white outline p-4 rounded-lg shadow-sm border border-gray-100"
        >
          <img
            src={product.coverImage}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="font-medium text-gray-800">{product.name}</h3>
          <p className="text-green-600 font-medium">${product.price}</p>
        </div>
      ))}
    </div>
  );
}
