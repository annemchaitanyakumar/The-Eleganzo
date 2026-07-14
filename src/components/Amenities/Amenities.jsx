import { motion } from 'framer-motion';
import { GiMountainRoad, GiCampfire, GiCookingPot, GiMeditation, GiForest, GiHealing } from 'react-icons/gi';
import SectionHeading from '../Common/SectionHeading';
import { amenities } from '../../data/amenities';
import useStore from '../../store/useStore';

const iconMap = {
  mountain: GiMountainRoad,
  campfire: GiCampfire,
  dining: GiCookingPot,
  meditation: GiMeditation,
  forest: GiForest,
  healing: GiHealing,
};

function AmenityCard({ amenity, index }) {
  const setCursor = useStore((state) => state.setCursor);
  const resetCursor = useStore((state) => state.resetCursor);
  const Icon = iconMap[amenity.icon] || GiForest;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
      onMouseEnter={() => setCursor('hover')}
      onMouseLeave={resetCursor}
      className="group relative p-8 md:p-10 bg-background-cream border border-transparent hover:border-accent-gold/20 rounded-sm transition-all duration-700 hover:shadow-[0_20px_60px_-15px_rgba(182,149,91,0.1)]"
    >
      {/* Icon */}
      <div className="mb-6 relative">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Icon className="text-3xl text-accent-gold transition-transform duration-500 group-hover:scale-110" />
        </motion.div>
        {/* Glow behind icon */}
        <div className="absolute -inset-3 bg-accent-gold/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      {/* Title */}
      <h3 className="font-heading text-xl md:text-2xl font-normal text-text-primary mb-3 group-hover:text-accent-gold transition-colors duration-500">
        {amenity.title}
      </h3>

      {/* Description */}
      <p className="text-body text-sm leading-relaxed">
        {amenity.description}
      </p>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-8 right-8 h-px bg-accent-gold/0 group-hover:bg-accent-gold/30 transition-all duration-700" />
    </motion.div>
  );
}

export default function Amenities() {
  return (
    <section className="section-padding px-6 md:px-12 max-w-[1440px] mx-auto">
      <SectionHeading
        label="Amenities"
        title="Curated for Tranquility"
        subtitle="Every detail has been considered to create moments of wonder, comfort, and connection with nature."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {amenities.map((amenity, index) => (
          <AmenityCard key={amenity.id} amenity={amenity} index={index} />
        ))}
      </div>
    </section>
  );
}
