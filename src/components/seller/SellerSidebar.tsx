import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  BarChart2,
  Settings,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

interface SellerSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/seller" },
  { icon: Package, label: "Products", path: "/seller/products", badge: "45" },
  { icon: ShoppingBag, label: "Orders", path: "/seller/orders", badge: "12" },
  { icon: Users, label: "Customers", path: "/seller/customers" },
  { icon: BarChart2, label: "Analytics", path: "/seller/analytics" },
];

const bottomMenuItems = [
  { icon: Settings, label: "Settings", path: "/seller/settings" },
  { icon: HelpCircle, label: "Help & Support", path: "/seller/support" },
];

export default function SellerSidebar({ isOpen, onClose }: SellerSidebarProps) {
  const location = useLocation();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`
        fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-xl font-semibold">JS</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">John's Store</h3>
                <p className="text-sm text-green-100">Premium Seller</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`
                    w-full px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors
                    ${
                      location.pathname === item.path
                        ? "bg-green-50 text-green-600"
                        : ""
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon
                      size={20}
                      className={
                        location.pathname === item.path
                          ? "text-green-600"
                          : "text-gray-600"
                      }
                    />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 py-4">
            {bottomMenuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="w-full px-6 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors"
              >
                <item.icon size={20} className="text-gray-600" />
                <span className="font-medium text-gray-700">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
