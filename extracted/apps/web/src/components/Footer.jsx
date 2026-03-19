import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, Award, Layers, Gift } from 'lucide-react';

const Footer = () => {
  const balloons = [
    { emoji: '🎈', delay: 0, x: '10%' },
    { emoji: '🎈', delay: 2, x: '30%' },
    { emoji: '🎈', delay: 4, x: '50%' },
    { emoji: '🎈', delay: 1, x: '70%' },
    { emoji: '🎈', delay: 3, x: '90%' },
  ];

  return (
    <footer className="relative bg-white border-t-4 border-primary overflow-hidden">
      {/* Floating Balloons Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {balloons.map((balloon, index) => (
          <motion.div
            key={index}
            className="absolute text-4xl opacity-10"
            style={{ left: balloon.x, bottom: '-50px' }}
            animate={{
              y: [0, -800],
              x: [0, Math.sin(index) * 50],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15,
              delay: balloon.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {balloon.emoji}
          </motion.div>
        ))}
      </div>

      <div className="relative container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <div className="mb-6">
              <Link to="/" className="inline-block group">
                <img 
                  src="https://horizons-cdn.hostinger.com/910c39d7-e020-4090-a4fa-0fc83bdc8598/ee4d9a60f6e9d6601c17357f1d78081f.png" 
                  alt="Ballonkunst Herzog Logo" 
                  className="h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Ihr Spezialist für Ballons und kreative Geschenkideen in Lahr. 
              Wir bringen Farbe in jeden Anlass!
            </p>
            
            {/* Business Info Highlights */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Award className="w-4 h-4 text-primary" />
                <span className="font-semibold">19 Jahre Erfahrung</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Layers className="w-4 h-4 text-secondary" />
                <span className="font-semibold">600+ Themenballons</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-700">
                <Gift className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="font-semibold">Geschenke & Dekoration<br/><span className="text-xs font-normal text-gray-500">bitte rechtzeitig vorbestellen</span></span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-4">Kontakt</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700 font-medium">Kaiserstraße 25</p>
                  <p className="text-gray-600">77933 Lahr</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <a href="tel:+4978213270082" className="text-gray-700 hover:text-secondary transition-colors">
                  +49 7821 327082
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="mailto:info@ballonkunst-herzog.de" className="text-gray-700 hover:text-accent transition-colors">
                  info@ballonkunst-herzog.de
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Öffnungszeiten
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Mo, Di, Do, Fr:</span>
                <span className="text-gray-600">09:30–12:30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium"></span>
                <span className="text-gray-600">14:30–18:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Mi:</span>
                <span className="text-gray-600">Geschlossen</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Sa:</span>
                <span className="text-gray-600">09:30–13:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">So:</span>
                <span className="text-gray-600">Geschlossen</span>
              </div>
            </div>
          </div>

          {/* Quick Links & Social */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-4">Folgen Sie uns</h4>
            <div className="flex gap-4 mb-6">
              <a
                href="https://www.facebook.com/profile.php?id=100066701207784"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <div className="space-y-2">
              <Link to="/impressum" className="block text-gray-600 hover:text-primary transition-colors">
                Impressum
              </Link>
              <Link to="/datenschutz" className="block text-gray-600 hover:text-primary transition-colors">
                Datenschutzerklärung
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Ballonkunst Herzog. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;