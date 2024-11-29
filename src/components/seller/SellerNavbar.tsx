import { Link } from "react-router-dom";
import { Menu, Bell, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface SellerNavbarProps {
  onMenuClick: () => void;
}

export default function SellerNavbar({ onMenuClick }: SellerNavbarProps) {
  const { user } = useAuth();
  console.log("users", user);
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
            <Link to="/seller" className="flex-shrink-0">
              <span className="text-2xl font-bold text-green-500">blink</span>
              <span className="text-2xl font-bold text-gray-700">it</span>
              <span className="ml-2 text-sm font-medium text-gray-500">
                Seller
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100">
              <User size={20} className="text-gray-600" />
              <span className="font-medium">{`${user?.firstName}'s Store`}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
