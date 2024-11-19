import { Apple, Coffee, Beef, Milk, Cookie, Sandwich } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { fetchUsersRequest } from "../features/user/slice";

const categories = [
  { name: "Fruits", icon: Apple },
  { name: "Beverages", icon: Coffee },
  { name: "Meat", icon: Beef },
  { name: "Dairy", icon: Milk },
  { name: "Snacks", icon: Cookie },
  { name: "Ready to Eat", icon: Sandwich },
];

export default function CategoryBar() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.items);
  console.log("users", users);
  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-12 py-4 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => dispatch(fetchUsersRequest())}
              className="flex flex-col items-center min-w-fit hover:text-green-500 transition-colors"
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
