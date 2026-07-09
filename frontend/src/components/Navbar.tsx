'use client';

import Link from 'next/link';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAuth } from '@/store/auth';
import { useCart } from '@/store/cart';
import { useState } from 'react';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { items } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            Smart Foods
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition">
              Home
            </Link>
            <Link href="/menu" className="text-gray-700 hover:text-primary-600 transition">
              Menu
            </Link>
            <Link href="/reservations" className="text-gray-700 hover:text-primary-600 transition">
              Reservations
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 transition">
              About
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-primary-600 transition">
              <ShoppingCart size={24} />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link href="/account" className="p-2 text-gray-700 hover:text-primary-600 transition">
                  <User size={24} />
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm text-gray-700 hover:text-primary-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
              >
                Login
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            <Link href="/" className="block text-gray-700 hover:text-primary-600">
              Home
            </Link>
            <Link href="/menu" className="block text-gray-700 hover:text-primary-600">
              Menu
            </Link>
            <Link href="/reservations" className="block text-gray-700 hover:text-primary-600">
              Reservations
            </Link>
            <Link href="/about" className="block text-gray-700 hover:text-primary-600">
              About
            </Link>
            <Link href="/cart" className="block text-gray-700 hover:text-primary-600">
              Cart ({items.length})
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/account" className="block text-gray-700 hover:text-primary-600">
                  Account
                </Link>
                <button onClick={logout} className="block text-gray-700 hover:text-primary-600">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="block text-primary-600 font-semibold">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
