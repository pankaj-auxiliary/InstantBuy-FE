import React from "react";
import Navbar from "../../components/Navbar";
import { Wallet as WalletIcon, CreditCard, History, Plus } from "lucide-react";

const transactions = [
  {
    id: 1,
    type: "credit",
    amount: 50.0,
    date: "2024-03-15",
    description: "Added money to wallet",
  },
  {
    id: 2,
    type: "debit",
    amount: 32.5,
    date: "2024-03-14",
    description: "Order #ORD-123456",
  },
];

export default function Wallet() {
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
            <WalletIcon className="text-green-500" />
            My Wallet
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your wallet balance and transactions
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-600">Available Balance</p>
                <h2 className="text-3xl font-bold text-gray-800">$249.50</h2>
              </div>
              <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                <Plus size={20} className="mr-2" />
                Add Money
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <CreditCard size={24} className="text-gray-600 mb-2" />
                <h3 className="font-medium">Linked Cards</h3>
                <p className="text-sm text-gray-500">2 cards linked</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <History size={24} className="text-gray-600 mb-2" />
                <h3 className="font-medium">Transactions</h3>
                <p className="text-sm text-gray-500">View history</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                  <span
                    className={`font-medium ${
                      transaction.type === "credit"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}$
                    {transaction.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
