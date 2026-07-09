'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="py-20 bg-primary-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Mail size={48} className="mx-auto mb-4 text-white" />
          <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, new menu items, and special events.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
