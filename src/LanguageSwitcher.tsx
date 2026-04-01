import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { LANGUAGES } from './translations';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find(l => l.code === language)!;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium uppercase tracking-widest hover:bg-neutral-100 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLang.nativeName}</span>
        <span className="sm:hidden">{currentLang.code.toUpperCase()}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-xl border border-neutral-100 py-2 min-w-[200px] z-[70]"
          >
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-5 py-2.5 text-sm flex items-center justify-between hover:bg-neutral-50 transition-colors ${
                  language === lang.code ? 'text-olive font-medium' : 'text-neutral-700'
                }`}
              >
                <span>{lang.nativeName}</span>
                <span className="text-xs text-neutral-400">{lang.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
