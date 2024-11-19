import React from 'react';
import Navbar from '../../components/Navbar';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

const orders = [
  {
    id: '#ORD-123456',
    date: '2024-03-15',
    total: 45.98,
    status: 'delivered',
    items: [
      {
        name: 'Fresh Organic Bananas',
        quantity: 2,
        price: 2.99,
        image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Premium Whole Milk',
        quantity: 1,
        price: 3.49,
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=800'
      }
    ]
  }
];

export default function Orders() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onMenuClick={() => {}}
        onCartClick={() => {}}
        onLoginClick={() => {}}
        isLoggedIn={true}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
          <p className="text-gray-600 mt-1">Track and manage your orders</p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{order.id}</h3>
                    <p className="text-sm text-gray-500">Ordered on {order.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {order.status === 'delivered' ? (
                      <CheckCircle size={20} className="text-green-500" />
                    ) : (
                      <Clock size={20} className="text-orange-500" />
                    )}
                    <span className="text-sm font-medium capitalize">{order.status}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-medium text-gray-800">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-b-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">Total Amount</span>
                  <span className="text-lg font-bold text-gray-800">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}