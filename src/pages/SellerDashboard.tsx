import { useState } from "react";
import SellerNavbar from "../components/seller/SellerNavbar";
import SellerSidebar from "../components/seller/SellerSidebar";
import {
  BarChart2,
  ShoppingBag,
  Package,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

export default function SellerDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const stats = [
    {
      label: "Total Sales",
      value: "$12,345",
      change: "+12.5%",
      icon: BarChart2,
      color: "bg-blue-500",
    },
    {
      label: "Orders",
      value: "156",
      change: "+8.2%",
      icon: ShoppingBag,
      color: "bg-green-500",
    },
    {
      label: "Products",
      value: "45",
      change: "+2",
      icon: Package,
      color: "bg-purple-500",
    },
    {
      label: "Conversion Rate",
      value: "3.2%",
      change: "+0.8%",
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerNavbar onMenuClick={() => setIsSidebarOpen(true)} />
      <SellerSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, John's Store</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <span className="flex items-center text-sm font-medium text-green-600">
                  {stat.change}
                  <ArrowUpRight size={16} className="ml-1" />
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Add more dashboard content here */}
      </main>
    </div>
  );
}
