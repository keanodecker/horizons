'use client';

import { motion } from 'framer-motion';
import { Calendar, PartyPopper } from 'lucide-react';

export const metadata = {
  title: 'Events & Veranstaltungen',
  description: 'Entdecken Sie unsere kommenden Events, Workshops und Veranstaltungen rund um das Thema Ballons und Dekoration in Lahr.',
};

export default function EventsPage() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-pink-50 via-white to-yellow-50">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">🎈</div>
          <div className="absolute bottom-10 right-20 text-6xl opacity-20 animate-pulse">✨</div>
          <div className="absolute top-20 right-10 text-5xl opacity-20">🎊</div>
        </div>

        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center justify-center p-3 bg-pink-100 rounded-full mb-6">
              <PartyPopper className="w-8 h-8 text-pink-500" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Unsere <span className="text-primary">Events</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Seien Sie dabei! Entdecken Sie unsere kommenden Veranstaltungen, Workshops und besonderen Aktionen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events */}
      <section className="pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl p-12 text-center border border-pink-100"
          >
            <div className="text-6xl mb-4">
              <Calendar className="w-16 h-16 text-pink-300 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aktuell sind keine Events geplant</h3>
            <p className="text-gray-600 mb-6">
              Schau bald wieder vorbei oder folge uns auf Social Media für Updates!
            </p>
            <a
              href="https://www.facebook.com/profile.php?id=100066701207784"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors shadow-lg"
            >
              Auf Facebook folgen
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
