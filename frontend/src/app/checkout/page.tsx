'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '@/store/cart';
import { useAuth } from '@/store/auth';
import { formatPrice } from '@/lib/utils';
import { CreditCard, MapPin, Clock, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [step, setStep] = useState(1);
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20">
          <div className="max-w-md mx-auto px-4 py-12 text-center">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <a
              href="/menu"
              className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
            >
              Browse Menu
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to place an order');
      return;
    }

    setIsProcessing(true);
    try {
      // Mock order placement - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      clearCart();
      toast.success('Order placed successfully!');
      setStep(3);
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const deliveryFee = orderType === 'delivery' ? 4.99 : 0;
  const tax = total * 0.085;
  const finalTotal = total + deliveryFee + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Order Type Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Type</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setOrderType('delivery')}
                    className={`p-4 rounded-lg border-2 transition ${
                      orderType === 'delivery'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <MapPin className="mx-auto mb-2" size={24} />
                    <span className="font-medium">Delivery</span>
                  </button>
                  <button
                    onClick={() => setOrderType('pickup')}
                    className={`p-4 rounded-lg border-2 transition ${
                      orderType === 'pickup'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Clock className="mx-auto mb-2" size={24} />
                    <span className="font-medium">Pickup</span>
                  </button>
                </div>
              </motion.div>

              {/* Delivery Address */}
              {orderType === 'delivery' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow p-6"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Address</h2>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your delivery address"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </motion.div>
              )}

              {/* Order Notes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Notes (Optional)</h2>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special instructions?"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </motion.div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.productId} className="flex items-center space-x-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow p-6 sticky top-24"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>{orderType === 'delivery' ? 'Delivery Fee' : 'Pickup'}</span>
                    <span>{formatPrice(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8.5%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-gray-900 text-lg">
                      <span>Total</span>
                      <span>{formatPrice(finalTotal)}</span>
                    </div>
                  </div>
                </div>

                {step === 1 && (
                  <button
                    onClick={() => setStep(2)}
                    className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
                  >
                    Continue to Payment
                  </button>
                )}

                {step === 2 && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-600 mb-4">
                      <CreditCard size={20} />
                      <span className="text-sm">Secure payment with Stripe</span>
                    </div>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? 'Processing...' : `Pay ${formatPrice(finalTotal)}`}
                    </button>
                    <button
                      onClick={() => setStep(1)}
                      className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                    >
                      Back
                    </button>
                  </div>
                )}

                {step === 3 && (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Order Confirmed!</h3>
                    <p className="text-gray-600 mb-4">Your order has been placed successfully.</p>
                    <a
                      href="/account/orders"
                      className="inline-block px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
                    >
                      View Orders
                    </a>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
