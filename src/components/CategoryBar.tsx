import { Apple, Coffee, Beef, Milk, Cookie, Sandwich } from "lucide-react";
import { useDispatch } from "react-redux";
import { fetchProductsByCategoryRequest } from "../features/products/slice";
import { useSearchParams } from "react-router-dom";
import { getSearchParams } from "../services/helpers";

const categories = [
  { name: "fruits", icon: Apple },
  { name: "beverages", icon: Coffee },
  { name: "meat", icon: Beef },
  { name: "dairy", icon: Milk },
  { name: "snacks", icon: Cookie },
  { name: "ready-to-eat", icon: Sandwich },
];

export default function CategoryBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-12 py-4 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => {
                dispatch(fetchProductsByCategoryRequest(category.name));
                setSearchParams({
                  ...getSearchParams(searchParams),
                  category: category.name,
                });
              }}
              className="flex flex-col capitalize items-center min-w-fit hover:text-green-500 transition-colors"
            >
              <category.icon size={24} className="mb-1" />
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
