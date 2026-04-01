import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            {t('getInTouch')}
          </p>
          <h1 className="text-5xl md:text-6xl serif italic mb-6">{t('contactTitle')}</h1>
          <p className="text-neutral-500 max-w-xl mx-auto text-lg">
            {t('contactDescription')}
          </p>
        </motion.div>
      </section>

      {/* Contact Info + Form */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-3xl serif italic mb-8">{t('visitOurStore')}</h2>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-olive/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-4 h-4 text-olive" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">{t('address')}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    Derb Boualam 185 S.Y.B.A. 40050<br />
                    Marrakech, Morocco
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-olive/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <Phone className="w-4 h-4 text-olive" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">{t('phoneNumber')}</h3>
                  <p className="text-neutral-500 text-sm">+212 612 236 660</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-olive/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <Mail className="w-4 h-4 text-olive" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">{t('email')}</h3>
                  <p className="text-neutral-500 text-sm">sekoutiabdelaziz0@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-olive/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <Clock className="w-4 h-4 text-olive" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">{t('openingHours')}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    {t('monFri')}<br />
                    {t('saturday')}<br />
                    {t('sunday')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl serif italic mb-3">{t('messageSent')}</h3>
                <p className="text-neutral-500 max-w-sm">{t('messageSentText')}</p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                  className="mt-6 text-olive text-sm font-medium uppercase tracking-widest hover:underline"
                >
                  {t('sendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h2 className="text-3xl serif italic mb-2">{t('sendMessage')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="text-xs uppercase tracking-widest text-neutral-400 mb-2 block">{t('yourName')}</label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      required
                      placeholder={t('yourName')}
                      className="w-full bg-neutral-100 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-olive/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="text-xs uppercase tracking-widest text-neutral-400 mb-2 block">{t('yourEmail')}</label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      required
                      placeholder={t('yourEmail')}
                      className="w-full bg-neutral-100 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-olive/30"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-subject" className="text-xs uppercase tracking-widest text-neutral-400 mb-2 block">{t('subject')}</label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}
                    required
                    placeholder={t('subject')}
                    className="w-full bg-neutral-100 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-olive/30"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="text-xs uppercase tracking-widest text-neutral-400 mb-2 block">{t('message')}</label>
                  <textarea
                    id="contact-message"
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    required
                    rows={5}
                    placeholder={t('message')}
                    className="w-full bg-neutral-100 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-olive/30 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-olive text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-900 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> {t('sendMessageBtn')}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Map */}
      <section className="max-w-7xl mx-auto px-6">
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
      </section>
    </div>
  );
}
