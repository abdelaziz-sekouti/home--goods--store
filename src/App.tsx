import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ArrowRight, 
  Heart, 
  Instagram, 
  Twitter, 
  Facebook,
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

// --- Types ---
interface Product {
  id: number;
  nameKey: string;
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
    nameKey: "product1",
    price: 85,
    category: "Decor",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    isNew: true
  },
  {
    id: 2,
    nameKey: "product2",
    price: 120,
    category: "Textiles",
    image: "https://images.unsplash.com/photo-1580305751101-6df6ec73f1f2?auto=format&fit=crop&q=80&w=800",
    rating: 4.9
  },
  {
    id: 3,
    nameKey: "product3",
    price: 45,
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
    isNew: true
  },
  {
    id: 4,
    nameKey: "product4",
    price: 65,
    category: "Storage",
    image: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=800",
    rating: 4.6
  },
  {
    id: 5,
    nameKey: "product5",
    price: 240,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=800",
    rating: 5.0
  },
  {
    id: 6,
    nameKey: "product6",
    price: 95,
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800",
    rating: 4.9
  }
];

const CATEGORY_KEYS = ["all", "decor", "textiles", "lighting", "storage", "furniture", "kitchen"];
const CATEGORY_MAP: Record<string, string> = {
  all: "All",
  decor: "Decor",
  textiles: "Textiles",
  lighting: "Lighting",
  storage: "Storage",
  furniture: "Furniture",
  kitchen: "Kitchen",
};

// --- Components ---

const Navbar = () => {
  const { t } = useLanguage();
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
            <a href="#" className="hover:text-olive transition-colors">{t('shop')}</a>
            <a href="#" className="hover:text-olive transition-colors">{t('collections')}</a>
            <a href="#" className="hover:text-olive transition-colors">{t('about')}</a>
          </div>
        </div>

        <a href="/" className="text-2xl serif font-semibold tracking-tight absolute left-1/2 -translate-x-1/2">
          STITCHED <span className="italic font-light">home</span>
        </a>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
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
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>{t('shopAll')}</a>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>{t('newArrivals')}</a>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>{t('furniture')}</a>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>{t('decor')}</a>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>{t('aboutUs')}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { t } = useLanguage();
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
          {t('heroSubtitle')}
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-6xl md:text-8xl serif font-light leading-tight mb-8"
        >
          {t('heroTitle')} <br /> <span className="italic">{t('heroTitleItalic')}</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button className="bg-white text-neutral-900 px-10 py-4 rounded-full text-sm font-medium uppercase tracking-widest hover:bg-olive hover:text-white transition-all duration-500 group">
            {t('exploreCollection')}
            <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/60">
        <span className="text-[10px] uppercase tracking-widest">{t('scroll')}</span>
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
  const { t } = useLanguage();
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
          alt={t(product.nameKey)} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-white text-neutral-900 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
            {t('new')}
          </span>
        )}
        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
          <Heart className="w-4 h-4" />
        </button>
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <button className="w-full bg-neutral-900 text-white py-3 rounded-xl text-xs font-medium uppercase tracking-widest hover:bg-olive transition-colors">
            {t('quickAdd')}
          </button>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-1">{t(product.category.toLowerCase())}</p>
          <h3 className="text-sm font-medium group-hover:text-olive transition-colors">{t(product.nameKey)}</h3>
        </div>
        <p className="text-sm font-semibold">${product.price}</p>
      </div>
    </motion.div>
  );
};

const CategorySection = () => {
  const { t } = useLanguage();
  const [activeCategoryKey, setActiveCategoryKey] = useState("all");

  const activeCategoryValue = CATEGORY_MAP[activeCategoryKey];
  const filteredProducts = activeCategoryValue === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategoryValue);

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div>
          <h2 className="text-4xl serif italic mb-4">{t('shopByCategory')}</h2>
          <p className="text-neutral-500 max-w-md">{t('categoryDescription')}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {CATEGORY_KEYS.map(catKey => (
            <button 
              key={catKey}
              onClick={() => setActiveCategoryKey(catKey)}
              className={`px-6 py-2 rounded-full text-xs font-medium uppercase tracking-widest transition-all ${activeCategoryKey === catKey ? 'bg-olive text-white' : 'bg-white text-neutral-500 hover:bg-neutral-100'}`}
            >
              {t(catKey)}
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
  const { t } = useLanguage();
  return (
    <section className="bg-olive text-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="uppercase tracking-[0.3em] text-[10px] mb-6 opacity-60">{t('artisanSeries')}</p>
          <h2 className="text-5xl md:text-6xl serif italic mb-8 leading-tight">{t('handcraftedTitle')} <br /> {t('handcraftedTitleItalic')}</h2>
          <p className="text-white/70 mb-10 text-lg leading-relaxed">
            {t('artisanDescription')}
          </p>
          <button className="border border-white/30 px-8 py-4 rounded-full text-xs font-medium uppercase tracking-widest hover:bg-white hover:text-olive transition-all duration-500">
            {t('meetMakers')}
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
            <p className="serif italic text-xl mb-2">{t('aristotleQuote')}</p>
            <p className="uppercase tracking-widest text-[10px] font-bold opacity-40">{t('aristotleName')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-neutral-900 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          <div className="lg:col-span-1">
            <a href="/" className="text-2xl serif font-semibold tracking-tight mb-6 block">
              STITCHED <span className="italic font-light">home</span>
            </a>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              {t('footerDescription')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><Facebook className="w-4 h-4" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="uppercase tracking-widest text-xs font-bold mb-8">{t('shopFooter')}</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">{t('newArrivals')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('bestSellers')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('furniture')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('decorObjects')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('textiles')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-widest text-xs font-bold mb-8">{t('support')}</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">{t('shippingReturns')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('careGuide')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('contactUs')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('faq')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('privacyPolicy')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-widest text-xs font-bold mb-8">{t('newsletter')}</h4>
            <p className="text-sm text-white/50 mb-6">{t('footerNewsletter')}</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder={t('emailAddress')} 
                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-sm focus:outline-none focus:border-white/30 transition-colors"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-neutral-900 p-2 rounded-full hover:bg-olive hover:text-white transition-all">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-white/30">
          <p>{t('copyright')}</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">{t('terms')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('cookies')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const { t } = useLanguage();
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
            <h2 className="text-4xl md:text-5xl serif italic mb-6">{t('joinCollective')}</h2>
            <p className="text-neutral-500 mb-10 max-w-lg mx-auto">{t('newsletterDescription')}</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder={t('yourEmail')} 
                className="flex-1 bg-white rounded-full px-8 py-4 text-sm focus:outline-none shadow-sm"
              />
              <button className="bg-neutral-900 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-olive transition-colors">
                {t('subscribe')}
              </button>
            </div>
          </div>
        </section>

        {/* Instagram Feed Mockup */}
        <section className="pb-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="uppercase tracking-widest text-[10px] font-bold text-neutral-400 mb-2">{t('followUs')}</p>
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
