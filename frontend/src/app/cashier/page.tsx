'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/store/auth';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/store/cart';
import { Search, Plus, Minus, Trash2, CreditCard, DollarSign, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function CashierDashboard() {
  const { user, logout } = useAuth();
  const { items, total, addItem, updateQuantity, removeItem, clearCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [cashReceived, setCashReceived] = useState('');

  const products = [
    { id: '1', name: 'Grilled Salmon', price: 28.99, category: 'Mains' },
    { id: '2', name: 'Ribeye Steak', price: 34.99, category: 'Mains' },
    { id: '3', name: 'Chicken Parmesan', price: 22.99, category: 'Mains' },
    { id: '4', name: 'Crispy Calamari', price: 14.99, category: 'Appetizers' },
    { id: '5', name: 'Caesar Salad', price: 11.99, category: 'Appetizers' },
    { id: '6', name: 'Tiramisu', price: 10.99, category: 'Desserts' },
    { id: '7', name: 'Chocolate Lava Cake', price: 12.99, category: 'Desserts' },
    { id: '8', name: 'Coca-Cola', price: 2.99, category: 'Beverages' },
    { id: '9', name: 'Sparkling Water', price: 3.99, category: 'Beverages' },
    { id: '10', name: 'Coffee', price: 4.99, category: 'Beverages' },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product: any) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: '',
      quantity: 1,
    });
    toast.success(`${product.name} added`);
  };

  const handleProcessPayment = () => {
    if (items.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    if (paymentMethod === 'cash') {
      const received = parseFloat(cashReceived);
      if (isNaN(received) || received < total) {
        toast.error('Insufficient cash amount');
        return;
      }
    }

    toast.success('Payment processed successfully!');
    clearCart();
    setCashReceived('');
  };

  const change = paymentMethod === 'cash' ? parseFloat(cashReceived) - total : 0;

  if (!user || user.role !== 'CASHIER') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20">
          <div className="max-w-md mx-auto px-4 py-12 text-center">
            <p className="text-gray-600 mb-4">Access denied. Cashier privileges required.</p>
            <Link href="/" className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Point of Sale</h1>
              <p className="text-gray-600">Process in-person orders</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Grid */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow p-6 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <motion.button
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => handleAddToCart(product)}
                    className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition text-left"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs text-primary-600 font-medium">{product.category}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-lg font-bold text-primary-600">{formatPrice(product.price)}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Cart & Payment */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Current Order</h2>

                {items.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No items in cart</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.productId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                            <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-6 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 mb-6">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setPaymentMethod('cash')}
                            className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition ${
                              paymentMethod === 'cash'
                                ? 'border-primary-600 bg-primary-50 text-primary-600'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <DollarSign size={20} />
                            <span>Cash</span>
                          </button>
                          <button
                            onClick={() => setPaymentMethod('card')}
                            className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition ${
                              paymentMethod === 'card'
                                ? 'border-primary-600 bg-primary-50 text-primary-600'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <CreditCard size={20} />
                            <span>Card</span>
                          </button>
                        </div>
                      </div>

                      {paymentMethod === 'cash' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Cash Received</label>
                          <input
                            type="number"
                            value={cashReceived}
                            onChange={(e) => setCashReceived(e.target.value)}
                            placeholder="0.00"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                          {change > 0 && (
                            <p className="mt-2 text-sm text-green-600 font-medium">
                              Change: {formatPrice(change)}
                            </p>
                          )}
                        </div>
                      )}

                      <button
                        onClick={handleProcessPayment}
                        className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
                      >
                        Process Payment
                      </button>

                      <button
                        onClick={clearCart}
                        className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                      >
                        Clear Order
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
