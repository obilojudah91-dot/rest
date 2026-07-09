'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { Star, Clock } from 'lucide-react';

const featuredDishes = [
  {
    id: '1',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with seasonal vegetables',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500',
    rating: 4.8,
    prepTime: 25,
  },
  {
    id: '2',
    name: 'Ribeye Steak',
    description: 'Premium 12oz ribeye with mashed potatoes',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500',
    rating: 4.9,
    prepTime: 30,
  },
  {
    id: '3',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with mascarpone',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500',
    rating: 4.7,
    prepTime: 5,
  },
];

export default function FeaturedDishes() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Dishes</h2>
          <p className="text-gray-600 text-lg">Chef&apos;s signature creations</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredDishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  width={400}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{dish.name}</h3>
                  <div className="flex items-center text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    <span className="ml-1 text-sm">{dish.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{dish.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock size={16} className="mr-1" />
                    {dish.prepTime} min
                  </div>
                  <span className="text-2xl font-bold text-primary-600">
                    {formatPrice(dish.price)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/menu"
            className="inline-flex items-center px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
