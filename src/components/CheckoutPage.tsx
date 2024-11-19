import  { useState, useRef, useEffect } from 'react';
import { X, Clock, MapPin, Wallet, CreditCard } from 'lucide-react';

interface CheckoutPageProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    weight: string;
  }>;
}

export default function CheckoutPage({ isOpen, onClose, cartItems }: CheckoutPageProps) {
  const [deliveryTime, setDeliveryTime] = useState('10');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const modalRef = useRef<HTMLDivElement>(null);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  const deliveryTimes = [
    { value: '10', label: '10 minutes', extra: 0 },
    { value: '20', label: '20 minutes', extra: -1 },
    { value: '30', label: '30 minutes', extra: -2 },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div 
            ref={modalRef}
            className="bg-white w-full max-w-2xl rounded-xl shadow-xl max-h-[85vh] flex flex-col"
          >
            {/* Header - Fixed */}
            <div className="border-b border-gray-200 p-4 flex items-center justify-between shrink-0">
              <h2 className="text-xl font-semibold text-gray-800">Checkout</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 p-4">
              {/* Delivery Address */}
              <div className="mb-6">
                <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                  <MapPin size={18} className="text-green-500" />
                  Delivery Address
                </h3>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium text-gray-800">Home</p>
                  <p className="text-sm text-gray-600">123 Main Street, Apt 4B</p>
                  <p className="text-sm text-gray-600">New York, NY 10001</p>
                </div>
              </div>

              {/* Delivery Time */}
              <div className="mb-6">
                <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                  <Clock size={18} className="text-green-500" />
                  Delivery Time
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {deliveryTimes.map((time) => (
                    <button
                      key={time.value}
                      onClick={() => setDeliveryTime(time.value)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        deliveryTime === time.value
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-200'
                      }`}
                    >
                      <p className="font-medium text-sm text-gray-800">{time.label}</p>
                      {time.extra !== 0 && (
                        <p className="text-xs text-green-600">
                          Save ${Math.abs(time.extra).toFixed(2)}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                  <Wallet size={18} className="text-green-500" />
                  Payment Method
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
                      paymentMethod === 'card'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-200'
                    }`}
                  >
                    <CreditCard size={20} className="text-gray-600" />
                    <div className="text-left">
                      <p className="font-medium text-sm text-gray-800">Credit Card</p>
                      <p className="text-xs text-gray-600">**** 1234</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
                      paymentMethod === 'cash'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-200'
                    }`}
                  >
                    <Wallet size={20} className="text-gray-600" />
                    <div className="text-left">
                      <p className="font-medium text-sm text-gray-800">Cash</p>
                      <p className="text-xs text-gray-600">Pay on delivery</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="mb-6">
                <h3 className="text-base font-semibold mb-3">Order Summary</h3>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-600">
                          {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-medium text-sm text-gray-800">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer - Fixed */}
            <div className="border-t border-gray-200 p-4 shrink-0">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                {deliveryTime !== '10' && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Time Discount</span>
                    <span>-${deliveryTimes.find(t => t.value === deliveryTime)?.extra}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>${(total - (deliveryTimes.find(t => t.value === deliveryTime)?.extra || 0)).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  alert('Order placed successfully!');
                  onClose();
                }}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}