import { motion } from 'motion/react';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface BlogPost {
  id: number;
  titleKey: string;
  excerptKey: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    titleKey: 'blog1Title',
    excerptKey: 'blog1Excerpt',
    date: '2026-03-28',
    readTime: '5 min',
    category: 'Living',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    titleKey: 'blog2Title',
    excerptKey: 'blog2Excerpt',
    date: '2026-03-21',
    readTime: '4 min',
    category: 'Craftsmanship',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    titleKey: 'blog3Title',
    excerptKey: 'blog3Excerpt',
    date: '2026-03-14',
    readTime: '6 min',
    category: 'Sustainability',
    image: 'https://images.unsplash.com/photo-1580305751101-6df6ec73f1f2?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 4,
    titleKey: 'blog4Title',
    excerptKey: 'blog4Excerpt',
    date: '2026-03-07',
    readTime: '4 min',
    category: 'Lighting',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 5,
    titleKey: 'blog5Title',
    excerptKey: 'blog5Excerpt',
    date: '2026-02-28',
    readTime: '7 min',
    category: 'Marrakech',
    image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 6,
    titleKey: 'blog6Title',
    excerptKey: 'blog6Excerpt',
    date: '2026-02-21',
    readTime: '5 min',
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=800',
  },
];

export default function Blog() {
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
            {t('blog')}
          </p>
          <h1 className="text-5xl md:text-6xl serif italic mb-6">{t('blogTitle')}</h1>
          <p className="text-neutral-500 max-w-xl mx-auto text-lg">
            {t('blogDescription')}
          </p>
        </motion.div>
      </section>

      {/* Featured Post */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden shadow-sm group cursor-pointer"
        >
          <div className="aspect-4/3 lg:aspect-auto overflow-hidden">
            <img
              src={BLOG_POSTS[0].image}
              alt={t(BLOG_POSTS[0].titleKey)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              width="800"
              height="600"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                <Calendar className="w-3.5 h-3.5" />
                {BLOG_POSTS[0].date}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                <Clock className="w-3.5 h-3.5" />
                {BLOG_POSTS[0].readTime}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-olive font-medium">
                <Tag className="w-3.5 h-3.5" />
                {BLOG_POSTS[0].category}
              </span>
            </div>
            <h2 className="text-3xl serif italic mb-4 group-hover:text-olive transition-colors">
              {t(BLOG_POSTS[0].titleKey)}
            </h2>
            <p className="text-neutral-500 leading-relaxed mb-6">
              {t(BLOG_POSTS[0].excerptKey)}
            </p>
            <button className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-olive group-hover:gap-3 transition-all">
              {t('readMore')} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.slice(1).map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-4/3 rounded-2xl overflow-hidden mb-5 bg-neutral-100">
                <img
                  src={post.image}
                  alt={t(post.titleKey)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs text-neutral-400">{post.date}</span>
                <span className="text-xs text-neutral-400">·</span>
                <span className="text-xs text-neutral-400">{post.readTime}</span>
                <span className="text-[10px] uppercase tracking-widest text-olive font-medium bg-olive/10 px-2 py-0.5 rounded-full">
                  {post.category}
                </span>
              </div>
              <h3 className="text-xl serif italic mb-2 group-hover:text-olive transition-colors">
                {t(post.titleKey)}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
                {t(post.excerptKey)}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
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
