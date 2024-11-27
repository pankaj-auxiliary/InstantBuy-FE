import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { MapPin, Plus, Home, Briefcase, Edit2, Trash } from "lucide-react";

const addresses = [
  {
    id: 1,
    type: "home",
    address: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001",
    isDefault: true,
  },
  {
    id: 2,
    type: "work",
    address: "456 Business Ave, Suite 200",
    city: "New York",
    state: "NY",
    zip: "10002",
    isDefault: false,
  },
];

export default function DeliveryAddress() {
  const [isAddingNew, setIsAddingNew] = useState(false);

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
            <MapPin className="text-green-500" />
            Delivery Addresses
          </h1>
          <p className="text-gray-600 mt-1">Manage your delivery addresses</p>
        </div>

        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {address.type === "home" ? (
                      <Home size={24} className="text-gray-600" />
                    ) : (
                      <Briefcase size={24} className="text-gray-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-800 capitalize">
                        {address.type}
                      </h3>
                      {address.isDefault && (
                        <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mt-1">{address.address}</p>
                    <p className="text-gray-600">
                      {address.city}, {address.state} {address.zip}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit2 size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Trash size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => setIsAddingNew(true)}
            className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors"
          >
            <Plus size={20} className="text-green-500" />
            <span className="font-medium text-green-500">Add New Address</span>
          </button>
        </div>
      </main>
    </div>
  );
}
