'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/store/auth';
import { Clock, Check, X, AlertCircle, LogOut } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function ChefDashboard() {
  const { user, logout } = useAuth();

  const orders = [
    { id: 'ORD-002', customer: 'Jane Smith', items: ['Grilled Salmon x1', 'Caesar Salad x1'], time: '12:30', status: 'preparing', priority: 'normal' },
    { id: 'ORD-003', customer: 'Bob Johnson', items: ['Ribeye Steak x1', 'Mashed Potatoes x1', 'Green Beans x1'], time: '12:45', status: 'pending', priority: 'high' },
    { id: 'ORD-006', customer: 'Diana Prince', items: ['Chicken Parmesan x2', 'Spaghetti x2'], time: '13:00', status: 'pending', priority: 'normal' },
  ];

  const completedOrders = [
    { id: 'ORD-001', customer: 'John Doe', items: ['Burger x1', 'Fries x1'], time: '12:15', completedAt: '12:45' },
  ];

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    console.log(`Order ${orderId} status updated to ${newStatus}`);
  };

  if (!user || user.role !== 'CHEF') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20">
          <div className="max-w-md mx-auto px-4 py-12 text-center">
            <p className="text-gray-600 mb-4">Access denied. Chef privileges required.</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Chef Dashboard</h1>
              <p className="text-gray-600">Manage cooking queue</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Active Orders */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Orders ({orders.length})</h2>
              <div className="space-y-4">
                {orders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white rounded-xl shadow p-6 border-l-4 ${
                      order.priority === 'high' ? 'border-red-500' : 'border-blue-500'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                          {order.priority === 'high' && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                              Priority
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600">{order.customer}</p>
                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                          <Clock size={14} />
                          <span>Order time: {order.time}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'preparing' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Items:</h4>
                      <ul className="space-y-1">
                        {order.items.map((item, i) => (
                          <li key={i} className="text-sm text-gray-600">• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleStatusUpdate(order.id, 'preparing')}
                          className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                        >
                          Start Cooking
                        </button>
                      )}
                      {order.status === 'preparing' && (
                        <button
                          onClick={() => handleStatusUpdate(order.id, 'ready')}
                          className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-sm flex items-center justify-center gap-2"
                        >
                          <Check size={16} />
                          Mark Ready
                        </button>
                      )}
                      <button
                        onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                        className="py-2 px-4 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition font-medium text-sm"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {orders.length === 0 && (
                <div className="bg-white rounded-xl shadow p-12 text-center">
                  <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No active orders</p>
                </div>
              )}
            </div>

            {/* Completed Orders */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Completed Today ({completedOrders.length})</h2>
              <div className="space-y-4">
                {completedOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow p-6 border-l-4 border-green-500 opacity-75"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                        <p className="text-gray-600">{order.customer}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <Check size={16} />
                        <span>Completed</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <ul className="space-y-1">
                        {order.items.map((item, i) => (
                          <li key={i} className="text-sm text-gray-600 line-through">• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-sm text-gray-500">Completed at {order.completedAt}</p>
                  </motion.div>
                ))}
              </div>

              {completedOrders.length === 0 && (
                <div className="bg-white rounded-xl shadow p-12 text-center">
                  <p className="text-gray-500">No completed orders today</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
