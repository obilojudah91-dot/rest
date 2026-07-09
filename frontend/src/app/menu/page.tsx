'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/store/cart';
import { Search, Filter, Heart, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const products = [
  {
    id: '1',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with seasonal vegetables',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500',
    category: 'Mains',
    rating: 4.8,
    prepTime: 25,
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Ribeye Steak',
    description: 'Premium 12oz ribeye with mashed potatoes',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500',
    category: 'Mains',
    rating: 4.9,
    prepTime: 30,
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Chicken Parmesan',
    description: 'Breaded chicken with marinara and mozzarella',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=500',
    category: 'Mains',
    rating: 4.6,
    prepTime: 25,
    isAvailable: true,
  },
  {
    id: '4',
    name: 'Crispy Calamari',
    description: 'Golden fried calamari with marinara sauce',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500',
    category: 'Appetizers',
    rating: 4.7,
    prepTime: 15,
    isAvailable: true,
  },
  {
    id: '5',
    name: 'Bruschetta',
    description: 'Toasted bread with fresh tomatoes and basil',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=500',
    category: 'Appetizers',
    rating: 4.5,
    prepTime: 10,
    isAvailable: true,
  },
  {
    id: '6',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with mascarpone',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500',
    category: 'Desserts',
    rating: 4.8,
    prepTime: 5,
    isAvailable: true,
  },
  {
    id: '7',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with vanilla ice cream',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500',
    category: 'Desserts',
    rating: 4.9,
    prepTime: 15,
    isAvailable: true,
  },
  {
    id: '8',
    name: 'Signature Cocktail',
    description: 'Our house special cocktail',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500',
    category: 'Beverages',
    rating: 4.7,
    prepTime: 5,
    isAvailable: true,
  },
];

const categories = ['All', 'Appetizers', 'Mains', 'Desserts', 'Beverages'];

export default function MenuPage() {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: any) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h1>
            <p className="text-gray-600 tex-lg">Discover our delicious offerings</p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-lg whitespace-nowrap transition ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-2 right-2 p-2 bg-white rounded-full">
                    <Heart size={18} className="text-gray-400 hover:text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-primary-600 font-medium">{product.category}</span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock size={14} className="mr-1" />
                      {product.prepTime} min
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary-600">
                      {formatPrice(product.price)}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-sm font-medium"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No dishes found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
