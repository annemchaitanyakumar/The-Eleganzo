import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail } from 'react-icons/hi';
import { FaInstagram, FaFacebookF, FaTripadvisor } from 'react-icons/fa';
import MagneticButton from '../Buttons/MagneticButton';

const footerLinks = [
  { label: 'Rooms', path: '/rooms' },
  { label: 'Experience', path: '/experience' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];

const socialLinks = [
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaTripadvisor, href: '#', label: 'TripAdvisor' },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#080D0A] to-[#040605] border-t border-accent-gold/10 text-text-primary relative overflow-hidden">
      {/* Subtle glowing orb in the footer background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-gold/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Top CTA Section */}
      <div className="border-b border-white/5 relative z-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-24 md:py-32 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-label text-[10px] mb-6 block"
          >
            Begin Your Journey
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.03em] mb-8 text-text-primary"
          >
            Your Sanctuary Awaits
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MagneticButton
              variant="outline"
              href="/contact"
            >
              Reserve Your Stay
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="font-heading text-2xl tracking-[0.2em] font-medium text-text-primary">
                THE ELEGANZO
              </span>
            </Link>
            <p className="text-sm text-text-muted/80 leading-relaxed max-w-xs">
              A luxury mountain homestay in Kodaikanal, where the clouds meet comfort and nature whispers serenity.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-accent-gold mb-6">Explore</h4>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-text-muted hover:text-accent-gold transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-accent-gold mb-6">Contact</h4>
            <div className="flex flex-col gap-4">
              <a
                href="https://maps.app.goo.gl/WqkCWEEkDBNM4sLb7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-text-muted hover:text-accent-gold transition-colors duration-300"
              >
                <HiOutlineLocationMarker className="text-accent-gold mt-0.5 shrink-0" />
                <span>Naidupuram, Kodaikanal,<br />Tamil Nadu 624101</span>
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-sm text-text-muted hover:text-accent-gold transition-colors duration-300"
              >
                <HiOutlinePhone className="text-accent-gold shrink-0" />
                +91 98765 43210
              </a>
              <a
                href="mailto:stay@theeleganzo.com"
                className="flex items-center gap-3 text-sm text-text-muted hover:text-accent-gold transition-colors duration-300"
              >
                <HiOutlineMail className="text-accent-gold shrink-0" />
                stay@theeleganzo.com
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-accent-gold mb-6">Follow</h4>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-white/5 rounded-full flex items-center justify-center text-text-muted/60 hover:text-accent-gold hover:border-accent-gold/30 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>

            <a
              href="https://maps.app.goo.gl/WqkCWEEkDBNM4sLb7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 text-xs tracking-[0.15em] uppercase text-text-muted/40 hover:text-accent-gold transition-colors duration-300"
            >
              <HiOutlineLocationMarker />
              Open in Maps
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-text-muted/40 tracking-wide">
            © {new Date().getFullYear()} The Eleganzo. All rights reserved.
          </p>
          <p className="text-[11px] text-text-muted/40 tracking-wide">
            Kodaikanal, Western Ghats · 7,000 ft
          </p>
        </div>
      </div>
    </footer>
  );
}
