import React from "react";
import Navbar from "../../components/Navbar";
import { Gift, Clock, Tag } from "lucide-react";

const offers = [
  {
    id: 1,
    code: "FIRST50",
    discount: "50% OFF",
    description: "Get 50% off on your first order",
    minOrder: 30,
    maxDiscount: 15,
    validUntil: "2024-03-31",
  },
  {
    id: 2,
    code: "FREESHIP",
    discount: "FREE DELIVERY",
    description: "Free delivery on orders above $25",
    minOrder: 25,
    validUntil: "2024-03-25",
  },
];

export default function Offers() {
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
            <Gift className="text-green-500" />
            Offers & Promotions
          </h1>
          <p className="text-gray-600 mt-1">
            Available offers and discount coupons
          </p>
        </div>

        <div className="space-y-4">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium mb-2">
                    {offer.discount}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {offer.description}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center">
                      <Tag size={16} className="mr-2" />
                      Use code:{" "}
                      <span className="font-medium text-gray-800 ml-1">
                        {offer.code}
                      </span>
                    </p>
                    <p className="flex items-center">
                      <Clock size={16} className="mr-2" />
                      Valid until {offer.validUntil}
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  Apply
                </button>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                <p>• Minimum order value: ${offer.minOrder}</p>
                {offer.maxDiscount && (
                  <p>• Maximum discount: ${offer.maxDiscount}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
