'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-24">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600">
              Reach out for reservations, catering, partnerships, or support.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <MapPin className="text-primary-600 mb-4" size={28} />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Visit</h2>
              <p className="text-gray-600">Smart Foods Restaurant, Lagos, Nigeria</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <Phone className="text-primary-600 mb-4" size={28} />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Call</h2>
              <a href="tel:+2348139993462" className="text-gray-600 hover:text-primary-600">
                +234 813 999 3462
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <Mail className="text-primary-600 mb-4" size={28} />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Email</h2>
              <a href="mailto:Obilojudah91@gmail.com" className="text-gray-600 hover:text-primary-600">
                Obilojudah91@gmail.com
              </a>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/reservations"
              className="inline-flex items-center rounded-full bg-primary-600 px-6 py-3 text-white font-semibold hover:bg-primary-700 transition"
            >
              Book a table
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
