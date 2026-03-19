
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OccasionsPage = () => {
  const [selectedOccasion, setSelectedOccasion] = useState(null);

  const occasions = [
    {
      emoji: '🎂',
      title: 'Geburtstag',
      description: 'Feiern Sie Ihren besonderen Tag mit bunten Ballons',
      details: 'Von klassischen Zahlenballons bis zu personalisierten Geburtstagsballons – wir haben alles für Ihre Geburtstagsfeier. Ob runder Geburtstag oder Kindergeburtstag, bei uns finden Sie die perfekte Dekoration.',
      color: 'from-red-400 to-red-600',
    },
    {
      emoji: '💍',
      title: 'Hochzeit',
      description: 'Romantische Ballondekoration für den schönsten Tag',
      details: 'Elegante Ballondekorationen in Weiß, Gold und Rosé für Ihre Traumhochzeit. Von Herzballons über Ballonbögen bis zu stilvollen Tischdekorationen – wir machen Ihren großen Tag unvergesslich.',
      color: 'from-pink-300 to-pink-500',
    },
    {
      emoji: '👶',
      title: 'Geburt & Baby',
      description: 'Süße Ballons für den Nachwuchs',
      details: 'Zarte Pastellfarben in Rosa und Blau für die Ankunft Ihres kleinen Wunders. Personalisierte Ballons mit Namen, süße Motivballons und liebevolle Ballonsträuße.',
      color: 'from-blue-300 to-pink-300',
    },
    {
      emoji: '🎒',
      title: 'Schulanfang',
      description: 'Motivierende Ballons für den ersten Schultag',
      details: 'Bunte Schulballons mit Schultüten-Motiven, Zahlen und motivierenden Sprüchen. Der perfekte Begleiter für den aufregenden ersten Schultag!',
      color: 'from-yellow-400 to-yellow-600',
    },
    {
      emoji: '🎊',
      title: 'Kindergeburtstag',
      description: 'Spaß und Freude für die Kleinen',
      details: 'Bunte Motivballons mit beliebten Charakteren, Tieren und Superhelden. Von Dinosauriern über Prinzessinnen bis zu Piraten – wir haben die Lieblingsballons Ihrer Kinder!',
      color: 'from-purple-400 to-pink-400',
    },
    {
      emoji: '✝️',
      title: 'Taufe',
      description: 'Festliche Ballondekoration für die Taufe',
      details: 'Elegante weiße und pastellfarbene Ballons für diesen besonderen kirchlichen Anlass. Dezente und stilvolle Dekorationen, die den feierlichen Charakter unterstreichen.',
      color: 'from-blue-200 to-white',
    },
    {
      emoji: '🚿',
      title: 'Baby Shower',
      description: 'Zauberhafte Babyparty-Ballons',
      details: 'Niedliche Ballondekorationen für die Babyparty. Von "It\'s a Boy/Girl" Ballons über Ballongirlanden bis zu süßen Motivballons – perfekt für die Feier vor der Geburt.',
      color: 'from-pink-200 to-blue-200',
    },
    {
      emoji: '📚',
      title: 'Abitur & Konfirmation',
      description: 'Besondere Momente gebührend feiern',
      details: 'Stilvolle Ballons für wichtige Meilensteine im Leben. Elegante Zahlenballons, Glückwunschballons und festliche Dekorationen für Abitur, Konfirmation und Kommunion.',
      color: 'from-blue-400 to-purple-400',
    },
    {
      emoji: '🎃',
      title: 'Halloween',
      description: 'Gruselige und lustige Ballondeko',
      details: 'Schaurig-schöne Halloween-Ballons mit Kürbissen, Geistern und Fledermäusen. Perfekt für Ihre Halloween-Party in Orange und Schwarz!',
      color: 'from-orange-500 to-black',
    },
    {
      emoji: '🎄',
      title: 'Weihnachten',
      description: 'Festliche Weihnachtsballons',
      details: 'Weihnachtliche Ballons in Rot, Grün und Gold. Von Weihnachtsmann-Ballons über Schneemann-Motive bis zu eleganten Christbaumkugel-Ballons – für eine festliche Atmosphäre.',
      color: 'from-red-600 to-green-600',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Anlässe - Ballonkunst Herzog Lahr</title>
        <meta
          name="description"
          content="Ballons für jeden Anlass - Geburtstag, Hochzeit, Baby, Schulanfang, Taufe und mehr. Große Auswahl bei Ballonkunst Herzog in Lahr."
        />
      </Helmet>

      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative py-32 bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-6xl opacity-10"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                🎈
              </motion.div>
            ))}
          </div>

          <div className="relative container mx-auto px-4 max-w-7xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Ballons für jeden Anlass
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Entdecken Sie unsere vielfältige Auswahl an Ballons für alle besonderen 
                Momente in Ihrem Leben
              </p>
            </motion.div>
          </div>
        </section>

        {/* Occasions Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {occasions.map((occasion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => setSelectedOccasion(occasion)}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
                >
                  <div className={`h-48 bg-gradient-to-br ${occasion.color} flex items-center justify-center`}>
                    <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                      {occasion.emoji}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {occasion.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {occasion.description}
                    </p>
                    <div className="mt-4 text-primary font-semibold group-hover:translate-x-2 transition-transform duration-300 inline-block">
                      Mehr erfahren →
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal */}
        <AnimatePresence>
          {selectedOccasion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOccasion(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
              >
                <div className={`h-64 bg-gradient-to-br ${selectedOccasion.color} flex items-center justify-center relative`}>
                  <button
                    onClick={() => setSelectedOccasion(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                  <div className="text-9xl">
                    {selectedOccasion.emoji}
                  </div>
                </div>
                <div className="p-8">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    {selectedOccasion.title}
                  </h2>
                  <p className="text-xl text-gray-700 leading-relaxed mb-6">
                    {selectedOccasion.details}
                  </p>
                  <Button
                    onClick={() => setSelectedOccasion(null)}
                    className="bg-primary hover:bg-primary/90 text-white font-semibold"
                  >
                    Schließen
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default OccasionsPage;
