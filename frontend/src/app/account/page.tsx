'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/store/auth';
import { User, MapPin, CreditCard, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AccountPage() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20">
          <div className="max-w-md mx-auto px-4 py-12 text-center">
            <p className="text-gray-600 mb-4">Please log in to view your account</p>
            <Link
              href="/login"
              className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
            >
              Login
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const menuItems = [
    { icon: User, label: 'Profile Information', href: '/account/profile' },
    { icon: MapPin, label: 'Addresses', href: '/account/addresses' },
    { icon: CreditCard, label: 'Payment Methods', href: '/account/payment' },
    { icon: Settings, label: 'Settings', href: '/account/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                      <User size={32} className="text-primary-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {user.firstName} {user.lastName}
                      </h2>
                      <p className="text-gray-600">{user.email}</p>
                    </div>
                  </div>

                  <button
                    onClick={logout}
                    className="w-full flex items-center justify-center space-x-2 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="bg-white rounded-xl shadow p-6 flex items-center space-x-4 hover:shadow-lg transition"
                    >
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <item.icon size={24} className="text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{item.label}</h3>
                      </div>
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: menuItems.length * 0.1 }}
                >
                  <Link
                    href="/account/orders"
                    className="bg-white rounded-xl shadow p-6 flex items-center space-x-4 hover:shadow-lg transition"
                  >
                    <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                      <CreditCard size={24} className="text-secondary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">Order History</h3>
                      <p className="text-gray-600 text-sm">View your past orders</p>
                    </div>
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
