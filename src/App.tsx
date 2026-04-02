import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
  MessageCircle,
  ChevronUp,
  MapPin,
  Phone,
  Mail,
  Youtube,
  BookOpen,
  Send,
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import FurniturePage from './pages/Furniture';
import WelcomePreloader from './components/WelcomePreloader';

type Page = 'home' | 'blog' | 'contact' | 'about' | 'furniture';

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
    image: "https://images.unsplash.com/photo-1618120574495-9ed2bd011b48?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=800",
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

const Navbar = ({ cartCount, cartItems, onRemoveFromCart, onClearCart, onNavigate, currentPage }: { cartCount: number; cartItems: Product[]; onRemoveFromCart: (id: number) => void; onClearCart: () => void; onNavigate: (page: Page) => void; currentPage: Page }) => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(p =>
        t(p.nameKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-paper/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu">
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium uppercase tracking-widest">
            <button onClick={() => { onNavigate('home'); setTimeout(() => scrollToSection('shop'), 100); }} className={`hover:text-olive transition-colors ${currentPage === 'home' ? 'text-olive' : ''}`}>{t('shop')}</button>
            <button onClick={() => { onNavigate('home'); setTimeout(() => scrollToSection('collections'), 100); }} className="hover:text-olive transition-colors">{t('collections')}</button>
            <button onClick={() => onNavigate('blog')} className={`hover:text-olive transition-colors ${currentPage === 'blog' ? 'text-olive' : ''}`}>{t('blog')}</button>
            <button onClick={() => onNavigate('about')} className={`hover:text-olive transition-colors ${currentPage === 'about' ? 'text-olive' : ''}`}>{t('about')}</button>
          </div>
        </div>

        <button onClick={() => onNavigate('home')} className="text-2xl serif font-semibold tracking-tight absolute left-1/2 -translate-x-1/2">
          Home <span className="italic font-light">Str</span>
        </button>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button className="hidden sm:block" onClick={() => setIsSearchOpen(true)} aria-label="Search">
            <Search className="w-5 h-5" />
          </button>
          <button className="relative" onClick={() => setIsCartOpen(true)} aria-label="Open cart">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-olive text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-medium"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
        </div>
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-65"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 w-full max-w-md bg-paper z-70 flex flex-col shadow-2xl"
              style={{ top: 0, height: '100dvh' }}
            >
              <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                <h3 className="text-lg font-medium uppercase tracking-widest">{t('shopFooter')} ({cartCount})</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-1 hover:bg-neutral-100 rounded-full transition-colors" aria-label="Close cart">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-neutral-500">
                    <ShoppingBag className="w-12 h-12 mb-4 opacity-30" />
                    <p className="text-sm">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {cartItems.map((item, i) => (
                      <div key={`${item.id}-${i}`} className="flex items-center gap-4 bg-white rounded-xl p-3">
                          <img src={item.image} alt={t(item.nameKey)} className="w-16 h-16 rounded-lg object-cover" width="64" height="64" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{t(item.nameKey)}</p>
                          <p className="text-xs text-neutral-500">{item.category}</p>
                          <p className="text-sm font-semibold mt-1">${item.price}</p>
                        </div>
                        <button onClick={() => onRemoveFromCart(item.id)} className="p-1 hover:bg-neutral-100 rounded-full transition-colors shrink-0" aria-label="Remove item">
                          <X className="w-4 h-4 text-neutral-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-neutral-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm uppercase tracking-widest text-neutral-500">Total</span>
                    <span className="text-lg font-semibold">${cartItems.reduce((sum, item) => sum + item.price, 0)}</span>
                  </div>
                  <button
                    onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
                    className="w-full bg-olive text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-900 transition-colors"
                  >
                    Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      {createPortal(
      <AnimatePresence>
        {isCheckoutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-75 flex items-center justify-center p-4"
            onClick={() => { setIsCheckoutOpen(false); setOrderPlaced(false); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-paper rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {orderPlaced ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-2xl serif italic mb-3">Order Confirmed!</h3>
                  <p className="text-neutral-500 mb-8">Thank you for your purchase. Your order has been placed successfully.</p>
                  <button
                    onClick={() => { setIsCheckoutOpen(false); setOrderPlaced(false); }}
                    className="bg-olive text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-900 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                    <h3 className="text-lg font-medium uppercase tracking-widest">Checkout</h3>
                    <button onClick={() => { setIsCheckoutOpen(false); }} className="p-1 hover:bg-neutral-100 rounded-full transition-colors" aria-label="Close checkout">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col gap-3 mb-6">
                      {cartItems.map((item, i) => (
                        <div key={`${item.id}-${i}`} className="flex items-center gap-3">
                          <img src={item.image} alt={t(item.nameKey)} className="w-12 h-12 rounded-lg object-cover" width="48" height="48" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{t(item.nameKey)}</p>
                            <p className="text-xs text-neutral-500">{item.category}</p>
                          </div>
                          <p className="text-sm font-semibold">${item.price}</p>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-neutral-200 pt-4 mb-6 space-y-2">
                      <div className="flex justify-between text-sm text-neutral-500">
                        <span>Subtotal</span>
                        <span>${cartItems.reduce((sum, item) => sum + item.price, 0)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-neutral-500">
                        <span>Shipping</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      <div className="flex justify-between text-base font-semibold pt-2 border-t border-neutral-200">
                        <span>Total</span>
                        <span>${cartItems.reduce((sum, item) => sum + item.price, 0)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => { setOrderPlaced(true); onClearCart(); }}
                      className="w-full bg-olive text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-900 transition-colors"
                    >
                      Place Order — ${cartItems.reduce((sum, item) => sum + item.price, 0)}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      , document.body)}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed z-60 p-8 flex flex-col items-center justify-center lg:hidden overflow-hidden"
            style={{ backgroundColor: '#8D6854', top: 0, left: 0, right: 0, height: '100dvh' }}
          >
            <div className="absolute top-6 right-6">
              <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                <X className="w-8 h-8 text-white" />
              </button>
            </div>
            <div className="flex flex-col items-center gap-6 sm:gap-8 text-3xl sm:text-4xl serif italic text-white/90 overflow-hidden text-center">
              <button onClick={() => { setIsMobileMenuOpen(false); onNavigate('home'); setTimeout(() => scrollToSection('shop'), 100); }} className="hover:text-white transition-colors block">{t('shopAll')}</button>
              <button onClick={() => { setIsMobileMenuOpen(false); onNavigate('home'); setTimeout(() => scrollToSection('shop'), 100); }} className="hover:text-white transition-colors block">{t('newArrivals')}</button>
              <button onClick={() => { setIsMobileMenuOpen(false); onNavigate('furniture'); }} className="hover:text-white transition-colors block">{t('furniture')}</button>
              <button onClick={() => { setIsMobileMenuOpen(false); onNavigate('blog'); }} className="hover:text-white transition-colors block">{t('blog')}</button>
              <button onClick={() => { setIsMobileMenuOpen(false); onNavigate('about'); }} className="hover:text-white transition-colors block">{t('aboutUs')}</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>

    {/* Search Modal */}
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-70 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
          onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-paper rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 p-6 border-b border-neutral-200">
              <Search className="w-5 h-5 text-neutral-500" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 bg-transparent text-lg focus:outline-none placeholder:text-neutral-500"
              />
              <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className="p-1 hover:bg-neutral-100 rounded-full transition-colors" aria-label="Close search">
                <X className="w-5 h-5" />
              </button>
            </div>
            {searchQuery.trim() && (
              <div className="max-h-80 overflow-y-auto p-4">
                {searchResults.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {searchResults.map(product => (
                      <div key={product.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer">
                        <img src={product.image} alt={t(product.nameKey)} className="w-14 h-14 rounded-lg object-cover" width="56" height="56" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{t(product.nameKey)}</p>
                          <p className="text-xs text-neutral-500">{product.category} — ${product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-neutral-500 py-8">No products found</p>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const { t } = useLanguage();
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=2000" 
          alt="Beautiful interior" 
          className="w-full h-full object-cover"
          width="2000"
          height="1333"
          decoding="async"
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
          <button onClick={() => scrollToSection('shop')} className="bg-white text-neutral-900 px-10 py-4 rounded-full text-sm font-medium uppercase tracking-widest hover:bg-olive hover:text-white transition-all duration-500 group">
            {t('exploreCollection')}
            <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/60">
        <span className="text-[10px] uppercase tracking-widest">{t('scroll')}</span>
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
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

const ProductCard = ({ product, onQuickAdd }: { product: Product; onQuickAdd: (product: Product) => void }) => {
  const { t } = useLanguage();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-3/4 overflow-hidden rounded-2xl mb-4 bg-neutral-100">
        <img 
          src={product.image} 
          alt={t(product.nameKey)} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          width="800"
          height="1067"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-white text-neutral-900 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
            {t('new')}
          </span>
        )}
        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 hover:bg-white" aria-label="Add to wishlist">
          <Heart className="w-4 h-4" />
        </button>
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-0 lg:translate-y-full lg:group-hover:translate-y-0 transition-transform duration-500">
          <button 
            onClick={(e) => { e.stopPropagation(); onQuickAdd(product); }}
            className="w-full bg-neutral-900 text-white py-3 rounded-xl text-xs font-medium uppercase tracking-widest hover:bg-olive transition-colors"
          >
            {t('quickAdd')}
          </button>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">{t(product.category.toLowerCase())}</p>
          <h3 className="text-sm font-medium group-hover:text-olive transition-colors">{t(product.nameKey)}</h3>
        </div>
        <p className="text-sm font-semibold">${product.price}</p>
      </div>
    </motion.div>
  );
};

const CategorySection = ({ onQuickAdd }: { onQuickAdd: (product: Product) => void }) => {
  const { t } = useLanguage();
  const [activeCategoryKey, setActiveCategoryKey] = useState("all");

  const activeCategoryValue = CATEGORY_MAP[activeCategoryKey];
  const filteredProducts = activeCategoryValue === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategoryValue);

  return (
    <section id="shop" className="max-w-7xl mx-auto px-6 py-24">
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
            <ProductCard product={product} onQuickAdd={onQuickAdd} />
          </div>
        ))}
      </div>
    </section>
  );
};

const FeaturedSection = ({ onNavigate }: { onNavigate: (page: Page) => void }) => {
  const { t } = useLanguage();
  return (
    <section id="collections" className="bg-olive text-white py-24 overflow-hidden">
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
          <button onClick={() => onNavigate('about')} className="border border-white/30 px-8 py-4 rounded-full text-xs font-medium uppercase tracking-widest hover:bg-white hover:text-olive transition-all duration-500">
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
              width="1000"
              height="1000"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute -bottom-8 -left-8 bg-paper text-neutral-900 p-8 rounded-2xl shadow-2xl max-w-60">
            <p className="serif italic text-xl mb-2">{t('aristotleQuote')}</p>
            <p className="uppercase tracking-widest text-[10px] font-bold opacity-40">{t('aristotleName')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      window.open(`https://wa.me/212612236660?text=${encodeURIComponent(message)}`, '_blank');
      setMessage('');
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl w-80 overflow-hidden"
          >
            <div className="bg-[#25D366] text-white p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Home Str</p>
                <p className="text-xs opacity-80">Typically replies instantly</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="ml-auto p-1 hover:bg-white/20 rounded-full transition-colors" aria-label="Close chat">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <div className="bg-[#e9f7e8] rounded-xl p-3 mb-3 text-sm text-neutral-700">
                <p>Hi there! Welcome to Home Str. How can we help you today?</p>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 bg-neutral-100 rounded-full px-4 py-2 text-sm focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  className="bg-[#25D366] text-white p-2 rounded-full hover:bg-[#20bd5a] transition-colors"
                  aria-label="Send message"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:bg-[#20bd5a] transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

const SocialSidebar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socials = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -60, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1"
        >
          {socials.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 6, backgroundColor: 'rgba(90, 90, 64, 0.9)' }}
              className="bg-neutral-900/80 backdrop-blur-sm text-white p-3 rounded-r-lg hover:text-white transition-colors flex items-center gap-2 group"
              aria-label={social.label}
            >
              <social.icon className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pr-1">{social.label}</span>
            </motion.a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-olive text-white rounded-full flex items-center justify-center shadow-lg hover:bg-olive/90 transition-colors"
          aria-label="Scroll to top"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronUp className="w-5 h-5" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const ParallaxSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight && rect.bottom > 0) {
          const newOffset = (windowHeight - rect.top) * 0.15;
          sectionRef.current.style.setProperty('--parallax-offset', `${newOffset}px`);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[60vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform parallax-image"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="uppercase tracking-[0.3em] text-[10px] mb-4 font-medium opacity-70"
        >
          {t('collections')}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl serif italic font-light mb-6"
        >
          {t('heroTitle')} <span className="not-italic">{t('heroTitleItalic')}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-lg text-white/70 text-lg"
        >
          {t('categoryDescription')}
        </motion.p>
      </div>
    </section>
  );
};

const MapSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="uppercase tracking-widest text-[10px] font-bold text-neutral-500 mb-2">{t('contactUs')}</p>
          <h2 className="text-3xl serif italic mb-4">Visit Our Store</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-neutral-500">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-olive" /> Derb Boualam 185 S.Y.B.A. 40050, Marrakech, Morocco</span>
            <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-olive" /> +212 612 236 660</span>
            <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-olive" /> sekoutiabdelaziz0@gmail.com</span>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg h-100">
          <iframe
            title="Store Location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-8.01%2C31.62%2C-7.98%2C31.64&layer=mapnik&marker=31.6295%2C-7.9811"
            width="100%"
            height="100%"
            className="map-iframe"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onNavigate }: { onNavigate: (page: Page) => void }) => {
  const { t } = useLanguage();
  return (
    <footer className="bg-neutral-900 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          <div className="lg:col-span-1">
            <a href="/" className="text-2xl serif font-semibold tracking-tight mb-6 block">
              Home <span className="italic font-light">Str</span>
            </a>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              {t('footerDescription')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors" aria-label="Twitter"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors" aria-label="YouTube"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="uppercase tracking-widest text-xs font-bold mb-8">{t('shopFooter')}</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/50">
              <li><button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">{t('newArrivals')}</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">{t('bestSellers')}</button></li>
              <li><button onClick={() => onNavigate('furniture')} className="hover:text-white transition-colors">{t('furniture')}</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">{t('decorObjects')}</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">{t('textiles')}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-widest text-xs font-bold mb-8">{t('support')}</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/50">
              <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">{t('shippingReturns')}</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">{t('careGuide')}</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">{t('contactUs')}</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">{t('faq')}</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">{t('privacyPolicy')}</button></li>
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
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-neutral-900 p-2 rounded-full hover:bg-olive hover:text-white transition-all" aria-label="Subscribe">
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

const scrollToSection = (sectionId: string) => {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

export default function App() {
  const { t } = useLanguage();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [preloaderDone, setPreloaderDone] = useState(false);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => {
      const idx = prev.findIndex(item => item.id === id);
      if (idx === -1) return prev;
      const updated = [...prev];
      updated.splice(idx, 1);
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <>
      {!preloaderDone && <WelcomePreloader onComplete={() => setPreloaderDone(true)} />}
    <div className="min-h-screen selection:bg-olive selection:text-white">
      <Navbar cartCount={cartItems.length} cartItems={cartItems} onRemoveFromCart={removeFromCart} onClearCart={clearCart} onNavigate={navigateTo} currentPage={currentPage} />
      <SocialSidebar />
      <ScrollToTop />
      <WhatsAppWidget />
      <main>
        {currentPage === 'blog' && <Blog />}
        {currentPage === 'contact' && <Contact />}
        {currentPage === 'about' && <AboutUs />}
        {currentPage === 'furniture' && <FurniturePage onQuickAdd={addToCart} />}
        {currentPage === 'home' && (
          <>
        <Hero />
        <CategorySection onQuickAdd={addToCart} />
        <FeaturedSection onNavigate={navigateTo} />
        <ParallaxSection />
        
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

        <MapSection />

        {/* Instagram Feed Mockup */}
        <section className="pb-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="uppercase tracking-widest text-[10px] font-bold text-neutral-500 mb-2">{t('followUs')}</p>
              <h2 className="text-3xl serif italic">@homestr</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden group cursor-pointer relative">
                  <img 
                    src={`https://picsum.photos/seed/home${i}/600/600`} 
                    alt="Instagram post" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    width="600"
                    height="600"
                    loading="lazy"
                    decoding="async"
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
          </>
        )}
      </main>
      <Footer onNavigate={navigateTo} />
    </div>
    </>
  );
}
