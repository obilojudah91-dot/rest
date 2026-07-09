'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Image
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800"
              alt="Our Chef"
              width={600}
              height={400}
              className="rounded-2xl shadow-xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 text-lg mb-6">
              Founded in 2010, Smart Foods has been serving exceptional cuisine with passion and
              dedication. Our commitment to quality ingredients and innovative cooking techniques has
              made us a beloved destination for food enthusiasts.
            </p>
            <p className="text-gray-600 text-lg mb-8">
              Every dish is crafted with care, combining traditional recipes with modern culinary
              artistry. We source our ingredients from local farms and sustainable suppliers to ensure
              the freshest experience for our guests.
            </p>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">14+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
                <div className="text-gray-600">Menu Items</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">10k+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
