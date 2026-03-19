'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Layers, Clock, Image as ImageIcon } from 'lucide-react';

const ServicePage = ({ serviceId, title, description, heroImage }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryPlaceholders = [
    { emoji: '🎈', label: 'Ballondekoration' },
    { emoji: '🎀', label: 'Geschenkballon' },
    { emoji: '🎊', label: 'Party Dekoration' },
    { emoji: '💐', label: 'Ballonstrauß' },
    { emoji: '⭐', label: 'Folienballon' },
    { emoji: '🎁', label: 'Überraschungsbox' },
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/90 drop-shadow-md"
          >
            {description}
          </motion.p>
        </div>
      </section>

      {/* Business Info Banner */}
      <section className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="flex flex-col items-center justify-center p-4">
              <Award className="w-8 h-8 text-primary mb-2" />
              <span className="font-semibold text-gray-900">19 Jahre Erfahrung</span>
              <span className="text-sm text-gray-500">mit Ballons</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <Layers className="w-8 h-8 text-secondary mb-2" />
              <span className="font-semibold text-gray-900">600+ Themenballons</span>
              <span className="text-sm text-gray-500">verschiedene zur Auswahl</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <Clock className="w-8 h-8 text-accent mb-2" />
              <span className="font-semibold text-gray-900">Geschenke & Dekoration</span>
              <span className="text-sm text-gray-500">bitte rechtzeitig vorbestellen</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <ImageIcon className="w-8 h-8 text-primary" />
            Galerie
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryPlaceholders.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="aspect-square bg-gradient-to-br from-pink-100 to-blue-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center justify-center group"
            >
              <div className="text-6xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {item.emoji}
              </div>
              <p className="text-sm font-medium text-gray-600">{item.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl p-8 text-center border-2 border-dashed border-primary/30">
          <div className="text-6xl mb-4">📸</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Besuchen Sie uns!</h3>
          <p className="text-gray-600 max-w-xl mx-auto">
            Für aktuelle Bilder unserer {title}-Dekorationen besuchen Sie uns in unserem Geschäft in Lahr
            oder folgen Sie uns auf Facebook.
          </p>
          <a
            href="https://www.facebook.com/profile.php?id=100066701207784"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors"
          >
            Facebook besuchen
          </a>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
