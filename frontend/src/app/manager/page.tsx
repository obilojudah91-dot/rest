'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/store/auth';
import { formatPrice } from '@/lib/utils';
import { TrendingUp, Users, DollarSign, ShoppingBag, Calendar, LogOut, Download, Filter } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function ManagerDashboard() {
  const { user, logout } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Mock analytics data
  const metrics = {
    revenue: { current: 45678, previous: 38456, change: 18.8 },
    orders: { current: 1234, previous: 1089, change: 13.3 },
    customers: { current: 567, previous: 456, change: 24.3 },
    avgOrder: { current: 37.02, previous: 35.32, change: 4.8 },
  };

  const topProducts = [
    { name: 'Grilled Salmon', sales: 234, revenue: 6784.66 },
    { name: 'Ribeye Steak', sales: 189, revenue: 6613.11 },
    { name: 'Chicken Parmesan', sales: 167, revenue: 3839.33 },
    { name: 'Crispy Calamari', sales: 145, revenue: 2173.55 },
    { name: 'Tiramisu', sales: 123, revenue: 1351.77 },
  ];

  const staffPerformance = [
    { name: 'John Chef', role: 'Chef', orders: 156, rating: 4.8 },
    { name: 'Jane Server', role: 'Server', orders: 89, rating: 4.9 },
    { name: 'Bob Chef', role: 'Chef', orders: 134, rating: 4.7 },
    { name: 'Alice Server', role: 'Server', orders: 76, rating: 4.6 },
  ];

  const recentActivity = [
    { action: 'New order placed', details: 'Order #ORD-008 - $45.99', time: '5 min ago' },
    { action: 'Reservation confirmed', details: 'Sarah Connor - 4 guests', time: '12 min ago' },
    { action: 'Staff shift started', details: 'John Chef - Kitchen', time: '1 hour ago' },
    { action: 'Inventory alert', details: 'Salmon stock low (5 units)', time: '2 hours ago' },
  ];

  if (!user || user.role !== 'MANAGER') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20">
          <div className="max-w-md mx-auto px-4 py-12 text-center">
            <p className="text-gray-600 mb-4">Access denied. Manager privileges required.</p>
            <Link href="/" className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentMetric = metrics[selectedMetric as keyof typeof metrics];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
              <p className="text-gray-600">Reports and analytics</p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Object.entries(metrics).map(([key, metric], index) => (
              <motion.button
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedMetric(key)}
                className={`bg-white rounded-xl shadow p-6 text-left hover:shadow-lg transition ${
                  selectedMetric === key ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    {key === 'revenue' && <DollarSign size={20} className="text-primary-600" />}
                    {key === 'orders' && <ShoppingBag size={20} className="text-primary-600" />}
                    {key === 'customers' && <Users size={20} className="text-primary-600" />}
                    {key === 'avgOrder' && <TrendingUp size={20} className="text-primary-600" />}
                  </div>
                  <span className={`text-sm font-medium ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change >= 0 ? '+' : ''}{metric.change}%
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {key === 'revenue' || key === 'avgOrder' ? formatPrice(metric.current) : metric.current}
                </h3>
                <p className="text-gray-600 text-sm capitalize">{key.replace('avgOrder', 'Avg Order')}</p>
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Top Products */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 bg-white rounded-xl shadow"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Top Performing Products</h2>
                  <button className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium">
                    <Download size={16} />
                    Export
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={product.name} className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.sales} orders</p>
                      </div>
                      <p className="font-semibold text-gray-900">{formatPrice(product.revenue)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Staff Performance */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Staff Performance</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {staffPerformance.map((staff, index) => (
                    <div key={staff.name} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{staff.name}</span>
                        <span className="text-sm text-gray-600">{staff.role}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{staff.orders} orders</span>
                        <span className="text-yellow-600">★ {staff.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.details}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Reports */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Quick Reports</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <Link
                    href="/manager/reports/sales"
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center space-x-3">
                      <DollarSign size={20} className="text-primary-600" />
                      <span>Sales Report</span>
                    </div>
                    <Filter size={18} className="text-gray-400" />
                  </Link>
                  <Link
                    href="/manager/reports/orders"
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center space-x-3">
                      <ShoppingBag size={20} className="text-primary-600" />
                      <span>Order Analysis</span>
                    </div>
                    <Filter size={18} className="text-gray-400" />
                  </Link>
                  <Link
                    href="/manager/reports/staff"
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center space-x-3">
                      <Users size={20} className="text-primary-600" />
                      <span>Staff Report</span>
                    </div>
                    <Filter size={18} className="text-gray-400" />
                  </Link>
                  <Link
                    href="/manager/reports/inventory"
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center space-x-3">
                      <Calendar size={20} className="text-primary-600" />
                      <span>Inventory Report</span>
                    </div>
                    <Filter size={18} className="text-gray-400" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
