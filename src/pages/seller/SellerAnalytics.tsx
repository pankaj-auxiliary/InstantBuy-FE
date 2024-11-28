import { useState } from "react";
import {
  BarChart2,
  TrendingUp,
  Users,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";
import SellerNavbar from "../../components/seller/SellerNavbar";
import SellerSidebar from "../../components/seller/SellerSidebar";

const analyticsData = {
  revenue: {
    current: 12345.67,
    previous: 10234.56,
    growth: 20.6,
  },
  orders: {
    current: 156,
    previous: 142,
    growth: 9.8,
  },
  customers: {
    current: 89,
    previous: 76,
    growth: 17.1,
  },
  averageOrder: {
    current: 79.14,
    previous: 72.07,
    growth: 9.8,
  },
};

export default function SellerAnalytics() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerNavbar onMenuClick={() => setIsSidebarOpen(true)} />
      <SellerSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
          <p className="text-gray-600 mt-1">Track your store's performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign size={24} className="text-blue-600" />
              </div>
              <span className="flex items-center text-sm font-medium text-green-600">
                {analyticsData.revenue.growth}%
                <ArrowUpRight size={16} className="ml-1" />
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              ${analyticsData.revenue.current.toLocaleString()}
            </h3>
            <p className="text-gray-600">Total Revenue</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <BarChart2 size={24} className="text-green-600" />
              </div>
              <span className="flex items-center text-sm font-medium text-green-600">
                {analyticsData.orders.growth}%
                <ArrowUpRight size={16} className="ml-1" />
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {analyticsData.orders.current}
            </h3>
            <p className="text-gray-600">Total Orders</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users size={24} className="text-purple-600" />
              </div>
              <span className="flex items-center text-sm font-medium text-green-600">
                {analyticsData.customers.growth}%
                <ArrowUpRight size={16} className="ml-1" />
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {analyticsData.customers.current}
            </h3>
            <p className="text-gray-600">New Customers</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp size={24} className="text-orange-600" />
              </div>
              <span className="flex items-center text-sm font-medium text-green-600">
                {analyticsData.averageOrder.growth}%
                <ArrowUpRight size={16} className="ml-1" />
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              ${analyticsData.averageOrder.current.toFixed(2)}
            </h3>
            <p className="text-gray-600">Average Order Value</p>
          </div>
        </div>
      </main>
    </div>
  );
}
