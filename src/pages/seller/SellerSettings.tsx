import { useState } from "react";
import SellerNavbar from "../../components/seller/SellerNavbar";
import SellerSidebar from "../../components/seller/SellerSidebar";
import {
  Settings as SettingsIcon,
  Store,
  CreditCard,
  Bell,
  Lock,
  Users,
  Globe,
} from "lucide-react";

const settingsSections = [
  {
    title: "Store Settings",
    items: [
      {
        icon: Store,
        label: "Store Information",
        description: "Update your store details",
      },
      {
        icon: CreditCard,
        label: "Payment Methods",
        description: "Manage payment options",
      },
      {
        icon: Bell,
        label: "Notifications",
        description: "Configure notification preferences",
      },
    ],
  },
  {
    title: "Account Settings",
    items: [
      {
        icon: Lock,
        label: "Security",
        description: "Update password and security settings",
      },
      { icon: Users, label: "Team Members", description: "Manage store staff" },
      {
        icon: Globe,
        label: "Language & Region",
        description: "Set your local preferences",
      },
    ],
  },
];

export default function SellerSettings() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerNavbar onMenuClick={() => setIsSidebarOpen(true)} />
      <SellerSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <SettingsIcon className="text-green-500" />
            Settings
          </h1>
          <p className="text-gray-600 mt-1">Manage your store settings</p>
        </div>

        <div className="space-y-8">
          {settingsSections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <button
                    key={item.label}
                    className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center space-x-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <item.icon size={24} className="text-gray-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-gray-800">
                        {item.label}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
