import React from "react";
import Navbar from "../../components/Navbar";
import {
  Settings as SettingsIcon,
  Bell,
  Lock,
  Shield,
  Phone,
  Globe,
  HelpCircle,
} from "lucide-react";

const settingsSections = [
  {
    title: "Account",
    items: [
      {
        icon: Bell,
        label: "Notifications",
        description: "Manage your notification preferences",
      },
      {
        icon: Lock,
        label: "Password & Security",
        description: "Update your password and security settings",
      },
      {
        icon: Shield,
        label: "Privacy",
        description: "Control your privacy settings",
      },
    ],
  },
  {
    title: "Preferences",
    items: [
      {
        icon: Phone,
        label: "Mobile Number",
        description: "Update your contact information",
      },
      {
        icon: Globe,
        label: "Language",
        description: "Choose your preferred language",
      },
      {
        icon: HelpCircle,
        label: "Help & Support",
        description: "Get help with your account",
      },
    ],
  },
];

export default function Settings() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onMenuClick={() => {}}
        onCartClick={() => {}}
        onLoginClick={() => {}}
        isLoggedIn={true}
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <SettingsIcon className="text-green-500" />
            Settings
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your account settings and preferences
          </p>
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
