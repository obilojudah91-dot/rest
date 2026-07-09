'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { useCart } from '@/store/cart';
import toast from 'react-hot-toast';

const popularDishes = [
  {
    id: '4',
    name: 'Crispy Calamari',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500',
  },
  {
    id: '5',
    name: 'Chicken Parmesan',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=500',
  },
  {
    id: '6',
    name: 'Chocolate Lava Cake',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500',
  },
  {
    id: '7',
    name: 'Fresh Lemonade',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=500',
  },
];

export default function PopularDishes() {
  const { addItem } = useCart();

  const handleAddToCart = (dish: any) => {
    addItem({
      productId: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      quantity: 1,
    });
    toast.success(`${dish.name} added to cart`);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Items</h2>
          <p className="text-gray-600 text-lg">Customer favorites</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {popularDishes.map((dish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-xl overflow-hidden aspect-square mb-3">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  width={400}
                  height={256}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart size={18} className="text-gray-400 hover:text-red-500" />
                </button>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{dish.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary-600">
                  {formatPrice(dish.price)}
                </span>
                <button
                  onClick={() => handleAddToCart(dish)}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
