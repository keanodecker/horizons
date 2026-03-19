'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export const metadata = {
  title: 'Dekoration & Produkte',
  description: 'Entdecken Sie unsere Ballondekorationen, Geschenkballons, Ballonboxen und mehr. Große Auswahl bei Ballonkunst Herzog in Lahr.',
};

const products = [
  { emoji: '🎨', title: 'Ballondekorationen', description: 'Professionelle Ballondekorationen für Events, Feiern und besondere Anlässe. Von Ballonbögen über Ballonsäulen bis zu kompletten Raumdekorationen.', color: 'from-pink-400 to-purple-400' },
  { emoji: '🎁', title: 'Geschenkballons', description: 'Personalisierte Geschenkballons mit individuellen Botschaften. Das perfekte Geschenk für jeden Anlass – mit Helium gefüllt und sofort einsatzbereit.', color: 'from-blue-400 to-cyan-400' },
  { emoji: '📦', title: 'Ballonboxen', description: 'Überraschungsboxen gefüllt mit bunten Ballons. Beim Öffnen steigen die Ballons heraus – ein unvergesslicher Wow-Effekt garantiert!', color: 'from-yellow-400 to-orange-400' },
  { emoji: '💐', title: 'Ballonsträuße', description: 'Wunderschöne Ballonsträuße in verschiedenen Farben und Designs. Perfekt als Geschenk oder zur Dekoration Ihrer Feier.', color: 'from-pink-300 to-red-400' },
  { emoji: '⭐', title: 'Folienballons', description: 'Hochwertige Folienballons in vielen Formen und Motiven. Von Zahlen über Buchstaben bis zu Charakteren – langlebig und wiederverwendbar.', color: 'from-purple-400 to-pink-400' },
  { emoji: '🎈', title: 'Latexballons', description: 'Klassische Latexballons in allen Farben des Regenbogens. Biologisch abbaubar und in verschiedenen Größen erhältlich.', color: 'from-green-400 to-teal-400' },
  { emoji: '✍️', title: 'Personalisierte Ballons', description: 'Ballons mit individueller Beschriftung. Namen, Glückwünsche oder besondere Botschaften – wir gestalten Ihre Ballons nach Ihren Wünschen.', color: 'from-indigo-400 to-blue-400' },
  { emoji: '💰', title: 'Geldgeschenk-Ballons', description: 'Kreative Verpackungen für Geldgeschenke. Transparente Ballons gefüllt mit Geldscheinen – eine originelle Art, Geld zu verschenken.', color: 'from-yellow-300 to-yellow-500' },
];

export default function DecorationPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-32 bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-6xl opacity-10"
              style={{ left: `${[10, 20, 35, 50, 65, 75, 85, 95][i]}%`, top: `${[25, 55, 15, 70, 30, 65, 20, 50][i]}%` }}
              animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
            >
              🎈
            </motion.div>
          ))}
        </div>
        <div className="relative container mx-auto px-4 max-w-7xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Dekoration & Produkte
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Von klassischen Ballons bis zu kreativen Geschenkideen – entdecken Sie unsere vielfältige
              Produktpalette
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className={`h-48 bg-gradient-to-br ${product.color} flex items-center justify-center`}>
                  <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                    {product.emoji}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{product.description}</p>
                  <Link
                    href="/kontakt"
                    className="block w-full text-center py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors"
                  >
                    Anfrage stellen
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-white to-pink-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Unsere Besonderheiten</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { emoji: '🎨', title: 'Individuelle Gestaltung', description: 'Wir gestalten Ihre Ballons nach Ihren persönlichen Wünschen und Vorstellungen.' },
              { emoji: '⚡', title: 'Schnelle Verfügbarkeit', description: 'Viele Ballons sind sofort verfügbar oder können kurzfristig bestellt werden.' },
              { emoji: '💎', title: 'Premium Qualität', description: 'Wir verwenden nur hochwertige Ballons von renommierten Herstellern.' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center"
              >
                <div className="text-7xl mb-4">{feature.emoji}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary via-secondary to-accent">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Lassen Sie sich beraten!</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
              Besuchen Sie uns in unserem Geschäft in Lahr und entdecken Sie unsere große Auswahl. Wir
              beraten Sie gerne persönlich!
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-white text-primary hover:bg-gray-100 font-bold text-lg px-12 py-5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Jetzt Termin vereinbaren
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
