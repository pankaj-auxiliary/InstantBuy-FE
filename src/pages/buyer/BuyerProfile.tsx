import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import { User, Phone, Mail, MapPin, Edit2 } from 'lucide-react';

export default function BuyerProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onMenuClick={() => {}}
        onCartClick={() => {}}
        onLoginClick={() => {}}
        isLoggedIn={true}
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg"
              >
                <Edit2 size={16} className="mr-2" />
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <User size={32} className="text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{user?.name}</h2>
                <p className="text-gray-500">Buyer Account</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                <div className="flex items-center space-x-3">
                  <Phone size={20} className="text-gray-400" />
                  {isEditing ? (
                    <input
                      type="tel"
                      defaultValue={user?.phone}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <span className="text-gray-800">{user?.phone}</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Email Address</label>
                <div className="flex items-center space-x-3">
                  <Mail size={20} className="text-gray-400" />
                  <span className="text-gray-800">{user?.email}</span>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-600">Delivery Address</label>
                <div className="flex items-center space-x-3">
                  <MapPin size={20} className="text-gray-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue="123 Main Street, Apt 4B, New York, NY 10001"
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <span className="text-gray-800">123 Main Street, Apt 4B, New York, NY 10001</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}