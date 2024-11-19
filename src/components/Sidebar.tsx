import { 
  Home, 
  Clock, 
  Heart, 
  Gift, 
  Wallet, 
  Settings, 
  HelpCircle,
  ChevronRight,
  Receipt,
  MapPin,
  LogIn
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  isLoggedIn: boolean;
}

const menuItems = [
  { icon: Home, label: 'Home', badge: '' },
  { icon: Clock, label: 'Order History', badge: '12', requiresAuth: true },
  { icon: Heart, label: 'Favorites', badge: '24', requiresAuth: true },
  { icon: Gift, label: 'Offers', badge: 'New' },
  { icon: Wallet, label: 'Wallet', badge: '$249.50', requiresAuth: true },
  { icon: Receipt, label: 'My Lists', badge: '3', requiresAuth: true },
];

const bottomMenuItems = [
  { icon: MapPin, label: 'Delivery Address', requiresAuth: true },
  { icon: Settings, label: 'Settings', requiresAuth: true },
  { icon: HelpCircle, label: 'Help & Support' },
];

export default function Sidebar({ isOpen, onClose, onLoginClick, isLoggedIn }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
          onClick={onClose}
        />
      )}

      <div className={`
        fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          {isLoggedIn ? (
            <div className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-xl font-semibold">JD</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">John Doe</h3>
                  <p className="text-sm text-green-100">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
              <button
                onClick={() => {
                  onClose();
                  onLoginClick();
                }}
                className="flex items-center space-x-2 text-white"
              >
                <LogIn size={24} />
                <span className="text-lg font-semibold">Login / Sign Up</span>
              </button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1">
              {menuItems.map((item) => {
                if (item.requiresAuth && !isLoggedIn) return null;
                return (
                  <button
                    key={item.label}
                    className="w-full px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon size={20} className="text-gray-600" />
                      <span className="font-medium text-gray-700">{item.label}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.badge && (
                        <span className={`
                          px-2 py-1 rounded-full text-xs font-medium
                          ${item.badge === 'New' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}
                        `}>
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-gray-200 py-4">
            {bottomMenuItems.map((item) => {
              if (item.requiresAuth && !isLoggedIn) return null;
              return (
                <button
                  key={item.label}
                  className="w-full px-6 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors"
                >
                  <item.icon size={20} className="text-gray-600" />
                  <span className="font-medium text-gray-700">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}