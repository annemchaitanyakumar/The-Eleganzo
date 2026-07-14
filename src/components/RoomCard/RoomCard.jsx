import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import useStore from '../../store/useStore';

export default function RoomCard({ room, index = 0 }) {
  const cardRef = useRef(null);
  const setCursor = useStore((state) => state.setCursor);
  const resetCursor = useStore((state) => state.resetCursor);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (y - 0.5) * -8;
    const rotateY = (x - 0.5) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    resetCursor();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.76, 0, 0.24, 1] }}
    >
      <Link
        to={`/rooms/${room.id}`}
        className="block group"
        onMouseEnter={() => setCursor('text', 'Explore')}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={cardRef}
          className="relative glass-panel gold-glow rounded-sm overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] hover:shadow-[0_25px_80px_-15px_rgba(212,178,111,0.08)]"
          onMouseMove={handleMouseMove}
          style={{
            transition: 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.6s ease',
          }}
        >
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={room.images[0]}
              alt={room.title}
              className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.08]"
              loading="lazy"
            />
            {/* Gold border overlay on hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent-gold/20 transition-all duration-700 pointer-events-none" />
            {/* Glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080D0A]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            {/* Price tag */}
            <div className="absolute top-4 right-4 glass-panel px-4 py-2 rounded-sm relative z-10">
              <span className="text-accent-gold text-sm font-heading font-semibold">{room.price}</span>
              <span className="text-text-muted/60 text-[10px] ml-1">/ night</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 relative z-10">
            {/* Subtitle */}
            <span className="text-label text-[10px] mb-2 block">{room.subtitle}</span>

            {/* Title */}
            <h3 className="font-heading text-2xl md:text-3xl font-normal text-text-primary mb-3 group-hover:text-accent-gold transition-colors duration-500">
              {room.title}
            </h3>

            {/* Description */}
            <p className="text-text-muted text-sm mb-6 line-clamp-2 leading-relaxed">{room.shortDescription}</p>

            {/* Meta (Capsules) */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] tracking-[0.1em] uppercase px-3 py-1 bg-white/5 border border-white/5 text-text-muted/80 rounded-full">{room.size}</span>
              <span className="text-[10px] tracking-[0.1em] uppercase px-3 py-1 bg-white/5 border border-white/5 text-text-muted/80 rounded-full">{room.occupancy}</span>
            </div>

            {/* Amenities pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {room.amenities.slice(0, 4).map((amenity) => (
                <span
                  key={amenity}
                  className="text-[10px] tracking-[0.1em] uppercase px-3 py-1 border border-accent-gold/15 text-text-muted/80 rounded-sm bg-[#0F1A13]/30"
                >
                  {amenity}
                </span>
              ))}
              {room.amenities.length > 4 && (
                <span className="text-[10px] tracking-[0.1em] uppercase px-2 py-1 text-accent-gold font-medium">
                  +{room.amenities.length - 4} more
                </span>
              )}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-2 text-accent-gold text-xs tracking-[0.2em] uppercase group-hover:gap-4 transition-all duration-500">
              <span>Explore</span>
              <HiArrowRight className="text-sm transition-transform duration-500 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
