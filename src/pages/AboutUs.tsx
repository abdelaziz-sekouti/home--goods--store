import { motion } from 'motion/react';
import { Heart, Leaf, Shield, Users } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function AboutUs() {
  const { t } = useLanguage();

  const values = [
    { icon: Heart, titleKey: 'value1Title', textKey: 'value1Text' },
    { icon: Leaf, titleKey: 'value2Title', textKey: 'value2Text' },
    { icon: Shield, titleKey: 'value3Title', textKey: 'value3Text' },
    { icon: Users, titleKey: 'value4Title', textKey: 'value4Text' },
  ];

  const team = [
    { name: 'Amina El Fassi', roleKey: 'teamMember1', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400' },
    { name: 'Youssef Benali', roleKey: 'teamMember2', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
    { name: 'Sara Mansouri', roleKey: 'teamMember3', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400' },
  ];

  const milestones = [
    { year: '2020', titleKey: 'journey2020', textKey: 'journey2020Text' },
    { year: '2022', titleKey: 'journey2022', textKey: 'journey2022Text' },
    { year: '2024', titleKey: 'journey2024', textKey: 'journey2024Text' },
    { year: '2026', titleKey: 'journey2026', textKey: 'journey2026Text' },
  ];

  return (
    <div className="pt-32 pb-24">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="uppercase tracking-[0.3em] text-[10px] mb-4 font-medium text-neutral-400">
            {t('aboutUs')}
          </p>
          <h1 className="text-5xl md:text-6xl serif italic mb-6">{t('aboutUsTitle')}</h1>
          <p className="text-neutral-500 max-w-2xl mx-auto text-lg leading-relaxed">
            {t('aboutUsDescription')}
          </p>
        </motion.div>
      </section>

      {/* Hero Image */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="aspect-4/3 rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1000"
              alt="Our workshop"
              className="w-full h-full object-cover"
              width="1000"
              height="750"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="aspect-4/3 rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=1000"
              alt="Artisan at work"
              className="w-full h-full object-cover"
              width="1000"
              height="750"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </section>

      {/* Mission */}
      <section className="bg-olive text-white py-24 mb-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="uppercase tracking-[0.3em] text-[10px] mb-4 opacity-60">{t('ourMission')}</p>
            <h2 className="text-4xl md:text-5xl serif italic mb-8 max-w-3xl mx-auto leading-tight">
              {t('ourMissionText')}
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl serif italic">{t('ourValues')}</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, i) => (
            <motion.div
              key={value.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-8 bg-white rounded-2xl shadow-sm"
            >
              <div className="w-14 h-14 bg-olive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <value.icon className="w-6 h-6 text-olive" />
              </div>
              <h3 className="text-lg font-medium mb-3">{t(value.titleKey)}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{t(value.textKey)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl serif italic">{t('meetTeam')}</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-neutral-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  width="400"
                  height="400"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-lg font-medium mb-1">{member.name}</h3>
              <p className="text-sm text-neutral-500">{t(member.roleKey)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl serif italic">{t('ourJourney')}</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {milestones.map((milestone, i) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-8 border-l-2 border-olive/20"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-olive rounded-full" />
              <span className="text-3xl serif italic text-olive mb-2 block">{milestone.year}</span>
              <h3 className="font-medium mb-2">{t(milestone.titleKey)}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{t(milestone.textKey)}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
