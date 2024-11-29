import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, Settings, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface UserProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function UserProfileSidebar({
  isOpen,
  onClose,
}: UserProfileSidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/login");
  };
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
        fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <User size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{user?.firstName}</h3>
                <p className="text-sm text-green-100">{user?.email}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto py-6">
            <div className="px-6 space-y-6">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-500">
                  CONTACT INFORMATION
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Mail size={20} />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone size={20} />
                    <span>{user?.phoneNumber || "Add phone number"}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <MapPin size={20} />
                    <span>Add address</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Settings size={20} className="text-gray-600" />
                    <span className="font-medium">Edit Profile</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 p-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
