import { Plus } from 'lucide-react';

interface ProductCardProps {
  name: string;
  price: number;
  weight: string;
  image: string;
  discount?: number;
  onAddToCart?: () => void;
}

export default function ProductCard({ name, price, weight, image, discount, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="relative">
        {discount && (
          <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {discount}% OFF
          </span>
        )}
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      </div>
      <div className="space-y-2">
        <h3 className="font-medium text-gray-800 line-clamp-2">{name}</h3>
        <p className="text-sm text-gray-500">{weight}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold">${price.toFixed(2)}</span>
            {discount && (
              <span className="ml-2 text-sm text-gray-400 line-through">
                ${(price * (1 + discount / 100)).toFixed(2)}
              </span>
            )}
          </div>
          <button 
            onClick={onAddToCart}
            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}