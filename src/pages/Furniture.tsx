import { motion } from 'motion/react';
import { Heart, ArrowRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface FurnitureItem {
  id: number;
  nameKey: string;
  price: number;
  image: string;
  rating: number;
  isNew?: boolean;
  materialKey: string;
  dimensionsKey: string;
  descriptionKey: string;
}

const FURNITURE_ITEMS: FurnitureItem[] = [
  {
    id: 5,
    nameKey: 'product5',
    price: 240,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    materialKey: 'product5Material',
    dimensionsKey: 'product5Dimensions',
    descriptionKey: 'product5',
  },
  {
    id: 7,
    nameKey: 'product7',
    price: 320,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    isNew: true,
    materialKey: 'product7Material',
    dimensionsKey: 'product7Dimensions',
    descriptionKey: 'product7',
  },
  {
    id: 8,
    nameKey: 'product8',
    price: 185,
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    materialKey: 'product8Material',
    dimensionsKey: 'product8Dimensions',
    descriptionKey: 'product8',
  },
  {
    id: 9,
    nameKey: 'product9',
    price: 450,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    materialKey: 'product9Material',
    dimensionsKey: 'product9Dimensions',
    descriptionKey: 'product9',
  },
  {
    id: 10,
    nameKey: 'product10',
    price: 175,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    materialKey: 'product10Material',
    dimensionsKey: 'product10Dimensions',
    descriptionKey: 'product10',
  },
  {
    id: 11,
    nameKey: 'product11',
    price: 290,
    image: 'https://images.unsplash.com/photo-1551298370-9d3d08a71e0b?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    isNew: true,
    materialKey: 'product11Material',
    dimensionsKey: 'product11Dimensions',
    descriptionKey: 'product11',
  },
];

export default function Furniture({ onQuickAdd }: { onQuickAdd?: (product: { id: number; nameKey: string; price: number; category: string; image: string; rating: number; isNew?: boolean }) => void }) {
  const { t } = useLanguage();

  return (
    <div className="pt-32 pb-24">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="uppercase tracking-[0.3em] text-[10px] mb-4 font-medium text-neutral-400">
            {t('furniture')}
          </p>
          <h1 className="text-5xl md:text-6xl serif italic mb-6">{t('furnitureTitle')}</h1>
          <p className="text-neutral-500 max-w-xl mx-auto text-lg">
            {t('furnitureDescription')}
          </p>
        </motion.div>
      </section>

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative aspect-21/9 rounded-3xl overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=2000"
            alt="Furniture collection"
            className="w-full h-full object-cover"
            width="2000"
            height="857"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <p className="uppercase tracking-[0.3em] text-[10px] mb-2 opacity-70">{t('collections')}</p>
            <h2 className="text-4xl serif italic">{t('furnitureTitle')}</h2>
          </div>
        </motion.div>
      </section>

      {/* Furniture Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {FURNITURE_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-3/4 overflow-hidden rounded-2xl mb-4 bg-neutral-100">
                <img
                  src={item.image}
                  alt={t(item.nameKey)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  width="800"
                  height="1067"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                {item.isNew && (
                  <span className="absolute top-4 left-4 bg-white text-neutral-900 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {t('new')}
                  </span>
                )}
                <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 hover:bg-white" aria-label="Add to wishlist">
                  <Heart className="w-4 h-4" />
                </button>
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-0 lg:translate-y-full lg:group-hover:translate-y-0 transition-transform duration-500">
                  {onQuickAdd && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickAdd({
                          id: item.id,
                          nameKey: item.nameKey,
                          price: item.price,
                          category: 'Furniture',
                          image: item.image,
                          rating: item.rating,
                          isNew: item.isNew,
                        });
                      }}
                      className="w-full bg-neutral-900 text-white py-3 rounded-xl text-xs font-medium uppercase tracking-widest hover:bg-olive transition-colors"
                    >
                      {t('quickAdd')}
                    </button>
                  )}
                </div>
              </div>
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">{t('furniture')}</p>
                    <h3 className="text-sm font-medium group-hover:text-olive transition-colors">{t(item.nameKey)}</h3>
                  </div>
                  <p className="text-sm font-semibold">${item.price}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-neutral-400 mt-2">
                  <span>{t('material')}: {t(item.materialKey)}</span>
                  <span>{t('dimensions')}: {t(item.dimensionsKey)}</span>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} className={`w-3 h-3 ${j < Math.floor(item.rating) ? 'text-yellow-400' : 'text-neutral-200'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs text-neutral-400 ml-1">{item.rating}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <div className="bg-olive text-white rounded-3xl p-12 md:p-16 text-center">
          <h2 className="text-4xl serif italic mb-4">{t('blogNewsletterTitle')}</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">{t('blogNewsletterText')}</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('yourEmail')}
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
            />
            <button className="bg-white text-olive px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-100 transition-colors">
              {t('subscribe')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
