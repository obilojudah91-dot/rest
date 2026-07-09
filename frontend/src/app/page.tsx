import Hero from '@/components/Hero';
import FeaturedDishes from '@/components/FeaturedDishes';
import PopularDishes from '@/components/PopularDishes';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedDishes />
      <PopularDishes />
      <About />
      <Gallery />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}
