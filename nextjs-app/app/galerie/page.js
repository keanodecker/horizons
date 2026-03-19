'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter } from 'lucide-react';
import ConsultationCTA from '@/components/ConsultationCTA';

export const metadata = {
  title: 'Galerie',
  description: 'Entdecken Sie unsere Galerie mit Ballondekorationen für Geburtstag, Hochzeit, Baby, Schulanfang und mehr. Ballonkunst Herzog in Lahr.',
};

const categories = ['Alle', 'Geburtstag', 'Hochzeit', 'Baby', 'Schulanfang', 'Dekoration'];

const galleryItems = [
  { id: 1, emoji: '🎂', category: 'Geburtstag', label: 'Geburtstagsballons' },
  { id: 2, emoji: '💍', category: 'Hochzeit', label: 'Hochzeitsdekoration' },
  { id: 3, emoji: '👶', category: 'Baby', label: 'Baby Dekoration' },
  { id: 4, emoji: '🎒', category: 'Schulanfang', label: 'Schulanfang Ballons' },
  { id: 5, emoji: '🎈', category: 'Dekoration', label: 'Ballondekoration' },
  { id: 6, emoji: '🎊', category: 'Geburtstag', label: 'Party Dekoration' },
  { id: 7, emoji: '💐', category: 'Hochzeit', label: 'Ballonstrauß' },
  { id: 8, emoji: '🍼', category: 'Baby', label: 'Baby Shower' },
  { id: 9, emoji: '📚', category: 'Schulanfang', label: 'Schulstart Ballons' },
  { id: 10, emoji: '⭐', category: 'Dekoration', label: 'Folienballons' },
  { id: 11, emoji: '🎁', category: 'Geburtstag', label: 'Geschenkballons' },
  { id: 12, emoji: '💒', category: 'Hochzeit', label: 'Trauungsdekoration' },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('Alle');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = activeFilter === 'Alle'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <div className="pt-24 min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Unsere Galerie</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lassen Sie sich von unseren bisherigen Arbeiten und Ballondekorationen inspirieren.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-20 z-30 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Filter className="w-5 h-5 text-gray-600 mr-2 hidden sm:block" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 border-2 ${
                  activeFilter === category
                    ? 'bg-primary text-white border-primary shadow-md'
                    : 'border-gray-200 text-gray-700 hover:border-primary hover:text-primary bg-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 flex-grow">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedItem(item)}
                  className="aspect-square bg-gradient-to-br from-pink-100 via-blue-100 to-yellow-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-6xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {item.emoji}
                  </div>
                  <p className="text-sm font-medium text-gray-600 px-2 text-center">{item.label}</p>
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-12 bg-white rounded-2xl p-8 text-center border border-gray-200 shadow-sm">
            <div className="text-5xl mb-4">📸</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Mehr Bilder auf Facebook</h3>
            <p className="text-gray-600 mb-4">
              Entdecken Sie noch mehr Inspirationen auf unserer Facebook-Seite!
            </p>
            <a
              href="https://www.facebook.com/profile.php?id=100066701207784"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors"
            >
              Zu Facebook
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-gradient-to-br from-pink-100 to-blue-100 rounded-2xl p-16 text-center shadow-2xl"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
              <div className="text-9xl mb-4">{selectedItem.emoji}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{selectedItem.label}</h3>
              <span className="text-sm font-semibold text-primary">{selectedItem.category}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConsultationCTA />
    </div>
  );
}
