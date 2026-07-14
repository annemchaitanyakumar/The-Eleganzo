import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import useStore from '../store/useStore';

const galleryImages = [
  { id: 1, src: '/images/gallery-1.jpg', alt: 'Valley sunrise panorama', span: 'col-span-2 row-span-2' },
  { id: 2, src: '/images/gallery-2.jpg', alt: 'Luxury bedroom interior', span: 'col-span-1 row-span-1' },
  { id: 3, src: '/images/gallery-3.jpg', alt: 'Morning mist over the forest', span: 'col-span-1 row-span-1' },
  { id: 4, src: '/images/gallery-4.jpg', alt: 'Private dining setup', span: 'col-span-1 row-span-2' },
  { id: 5, src: '/images/gallery-5.jpg', alt: 'Stone fireplace glowing', span: 'col-span-1 row-span-1' },
  { id: 6, src: '/images/gallery-6.jpg', alt: 'Forest trail through pines', span: 'col-span-2 row-span-1' },
  { id: 7, src: '/images/gallery-7.jpg', alt: 'Bonfire under the stars', span: 'col-span-1 row-span-1' },
  { id: 8, src: '/images/gallery-8.jpg', alt: 'Balcony view at golden hour', span: 'col-span-1 row-span-1' },
  { id: 9, src: '/images/gallery-9.jpg', alt: 'Mountain landscape panorama', span: 'col-span-2 row-span-1' },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const setCursor = useStore((state) => state.setCursor);
  const resetCursor = useStore((state) => state.resetCursor);

  return (
    <>
      <Helmet>
        <title>Gallery | The Eleganzo — Kodaikanal</title>
        <meta name="description" content="Visual journey through The Eleganzo — valley views, luxury interiors, mountain forests, and curated experiences in Kodaikanal." />
      </Helmet>

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/gallery-hero.jpg"
            alt="Gallery — The Eleganzo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
        </div>

        <div className="relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-label text-[#FAF9F6] mb-4 block"
          >
            Visual Stories
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="font-heading text-5xl md:text-7xl font-light text-[#FAF9F6] tracking-[0.05em]"
          >
            Gallery
          </motion.h1>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding px-4 md:px-8 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] md:auto-rows-[250px] lg:auto-rows-[280px] gap-3 md:gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.06, ease: [0.76, 0, 0.24, 1] }}
              className={`${image.span} relative overflow-hidden rounded-sm cursor-pointer group`}
              onClick={() => setSelectedImage(image)}
              onMouseEnter={() => setCursor('text', 'View')}
              onMouseLeave={resetCursor}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.08]"
                loading="lazy"
              />
              {/* Glass caption overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-[#FAF9F6] text-xs tracking-[0.1em] uppercase">
                  {image.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors p-2"
              aria-label="Close lightbox"
            >
              <HiX size={24} />
            </button>

            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />

            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-[0.15em] uppercase">
              {selectedImage.alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
