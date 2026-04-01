import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ArrowRight, 
  Star, 
  Heart, 
  Instagram, 
  Twitter, 
  Facebook,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

// --- Types ---
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  isNew?: boolean;
}

// --- Mock Data ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Hand-Thrown Ceramic Vase",
    price: 85,
    category: "Decor",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    isNew: true
  },
  {
    id: 2,
    name: "Organic Linen Throw",
    price: 120,
    category: "Textiles",
    image: "https://images.unsplash.com/photo-1580305751101-6df6ec73f1f2?auto=format&fit=crop&q=80&w=800",
    rating: 4.9
  },
  {
    id: 3,
    name: "Brass Taper Holders",
    price: 45,
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
    isNew: true
  },
  {
    id: 4,
    name: "Woven Rattan Basket",
    price: 65,
    category: "Storage",
    image: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=800",
    rating: 4.6
  },
  {
    id: 5,
    name: "Sculptural Oak Stool",
    price: 240,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=800",
    rating: 5.0
  },
  {
    id: 6,
    name: "Matte Black Tea Set",
    price: 95,
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800",
    rating: 4.9
  }
];

const CATEGORIES = ["All", "Decor", "Textiles", "Lighting", "Storage", "Furniture", "Kitchen"];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-paper/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium uppercase tracking-widest">
            <a href="#" className="hover:text-olive transition-colors">Shop</a>
            <a href="#" className="hover:text-olive transition-colors">Collections</a>
            <a href="#" className="hover:text-olive transition-colors">About</a>
          </div>
        </div>

        <a href="/" className="text-2xl serif font-semibold tracking-tight absolute left-1/2 -translate-x-1/2">
          STITCHED <span className="italic font-light">home</span>
        </a>

        <div className="flex items-center gap-6">
          <button className="hidden sm:block">
            <Search className="w-5 h-5" />
          </button>
          <button className="relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-olive text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-paper z-[60] p-8 flex flex-col"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col gap-8 mt-12 text-4xl serif italic">
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Shop All</a>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>New Arrivals</a>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Furniture</a>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Decor</a>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>About Us</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=2000" 
          alt="Beautiful interior" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      
      <div className="relative z-10 text-center text-white px-6">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="uppercase tracking-[0.3em] text-xs mb-6 font-medium"
        >
          Curated Living for the Modern Soul
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-6xl md:text-8xl serif font-light leading-tight mb-8"
        >
          The Art of <br /> <span className="italic">Slow Living</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button className="bg-white text-neutral-900 px-10 py-4 rounded-full text-sm font-medium uppercase tracking-widest hover:bg-olive hover:text-white transition-all duration-500 group">
            Explore Collection
            <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/60">
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
          />
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4 bg-neutral-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-white text-neutral-900 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
            New
          </span>
        )}
        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
          <Heart className="w-4 h-4" />
        </button>
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <button className="w-full bg-neutral-900 text-white py-3 rounded-xl text-xs font-medium uppercase tracking-widest hover:bg-olive transition-colors">
            Quick Add
          </button>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-1">{product.category}</p>
          <h3 className="text-sm font-medium group-hover:text-olive transition-colors">{product.name}</h3>
        </div>
        <p className="text-sm font-semibold">${product.price}</p>
      </div>
    </motion.div>
  );
};

const CategorySection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div>
          <h2 className="text-4xl serif italic mb-4">Shop by Category</h2>
          <p className="text-neutral-500 max-w-md">Discover our curated selection of objects designed to bring beauty and intention to your daily rituals.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-medium uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-olive text-white' : 'bg-white text-neutral-500 hover:bg-neutral-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {filteredProducts.map(product => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

const FeaturedSection = () => {
  return (
    <section className="bg-olive text-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="uppercase tracking-[0.3em] text-[10px] mb-6 opacity-60">The Artisan Series</p>
          <h2 className="text-5xl md:text-6xl serif italic mb-8 leading-tight">Handcrafted with <br /> Soul & Purpose</h2>
          <p className="text-white/70 mb-10 text-lg leading-relaxed">
            Every piece in our collection is sourced from independent artisans who prioritize traditional techniques and sustainable materials. We believe that the objects we surround ourselves with should tell a story.
          </p>
          <button className="border border-white/30 px-8 py-4 rounded-full text-xs font-medium uppercase tracking-widest hover:bg-white hover:text-olive transition-all duration-500">
            Meet the Makers
          </button>
        </motion.div>
        
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-square rounded-full overflow-hidden border-8 border-white/10"
          >
            <img 
              src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=1000" 
              alt="Artisan at work" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute -bottom-8 -left-8 bg-paper text-neutral-900 p-8 rounded-2xl shadow-2xl max-w-[240px]">
            <p className="serif italic text-xl mb-2">"Quality is not an act, it is a habit."</p>
            <p className="uppercase tracking-widest text-[10px] font-bold opacity-40">— Aristotle</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          <div className="lg:col-span-1">
            <a href="/" className="text-2xl serif font-semibold tracking-tight mb-6 block">
              STITCHED <span className="italic font-light">home</span>
            </a>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              Creating spaces that inspire peace, presence, and purpose. Our curated collection brings the beauty of the natural world into your home.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><Facebook className="w-4 h-4" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="uppercase tracking-widest text-xs font-bold mb-8">Shop</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Furniture</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Decor & Objects</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Textiles</a></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-widest text-xs font-bold mb-8">Support</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Care Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-widest text-xs font-bold mb-8">Newsletter</h4>
            <p className="text-sm text-white/50 mb-6">Join our community for early access to new collections and interior inspiration.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-sm focus:outline-none focus:border-white/30 transition-colors"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-neutral-900 p-2 rounded-full hover:bg-olive hover:text-white transition-all">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-white/30">
          <p>© 2026 STITCHED HOME. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-olive selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <CategorySection />
        <FeaturedSection />
        
        {/* Newsletter Banner */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto bg-neutral-100 rounded-[3rem] p-12 md:p-24 text-center">
            <h2 className="text-4xl md:text-5xl serif italic mb-6">Join the Collective</h2>
            <p className="text-neutral-500 mb-10 max-w-lg mx-auto">Sign up for our newsletter and receive 10% off your first order, plus exclusive access to new arrivals.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 bg-white rounded-full px-8 py-4 text-sm focus:outline-none shadow-sm"
              />
              <button className="bg-neutral-900 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-olive transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* Instagram Feed Mockup */}
        <section className="pb-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="uppercase tracking-widest text-[10px] font-bold text-neutral-400 mb-2">Follow Us</p>
              <h2 className="text-3xl serif italic">@stitchedhome</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden group cursor-pointer relative">
                  <img 
                    src={`https://picsum.photos/seed/home${i}/600/600`} 
                    alt="Instagram post" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Instagram className="text-white w-6 h-6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
