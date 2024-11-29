import {
  Search,
  ShoppingCart,
  MapPin,
  ChevronDown,
  Menu,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onMenuClick: () => void;
  onCartClick: () => void;
  onLoginClick: () => void;
  onProfileClick: () => void;
  isLoggedIn: boolean;
}

export default function Navbar({
  onMenuClick,
  onCartClick,
  onLoginClick,
  onProfileClick,
  isLoggedIn,
}: NavbarProps) {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-6">
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={24} className="text-gray-600" />
            </button>
            <div
              className="flex-shrink-0"
              role="button"
              onClick={() => {
                navigate("/");
              }}
            >
              <span className="text-2xl font-bold text-green-500">blink</span>
              <span className="text-2xl font-bold text-gray-700">it</span>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-gray-600">
              <MapPin size={20} />
              <span className="font-medium">Deliver to:</span>
              <span className="font-semibold">Dehradun</span>
              <ChevronDown size={20} />
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for groceries, electronics, etc"
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <button
                onClick={onLoginClick}
                className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                <User size={20} className="text-gray-600 mr-2" />
                <span className="font-medium">Login</span>
              </button>
            ) : (
              <button
                onClick={onProfileClick}
                className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                <User size={20} className="text-gray-600 mr-2" />
                <span className="ml-2 font-medium">Profile</span>
              </button>
            )}
            <button
              onClick={onCartClick}
              className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <ShoppingCart size={20} className="text-gray-600" />
              <span className="ml-2 font-medium">Cart</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
