import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart, Star, Users, Award } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: <Heart className="w-12 h-12" />,
      title: 'Leidenschaft',
      description: 'Wir lieben Ballons und bringen diese Begeisterung in jeden Auftrag ein.',
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: 'Qualität',
      description: 'Nur die besten Ballons und Materialien für unsere Kunden.',
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Persönliche Beratung',
      description: 'Individuelle Beratung für Ihre perfekte Ballondekoration.',
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: 'Erfahrung',
      description: 'Jahrelange Expertise in der Ballonkunst und Dekoration.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Über Uns - Ballonkunst Herzog Lahr</title>
        <meta
          name="description"
          content="Erfahren Sie mehr über Ballonkunst Herzog - Ihr lokaler Spezialist für Ballons und Geschenkideen in Lahr. Persönliche Beratung und große Auswahl."
        />
      </Helmet>

      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative py-32 bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
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
                Über Ballonkunst Herzog
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Ihr beliebtes Spezialgeschäft für Ballons und kreative Geschenkideen 
                im Herzen von Lahr
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Unsere Geschichte
                </h2>
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                  <p>
                    Willkommen bei Ballonkunst Herzog – Ihrem Spezialgeschäft für Ballons 
                    und kreative Geschenkideen in Lahr! Seit vielen Jahren sind wir stolz 
                    darauf, die Menschen in unserer Region mit bunten Ballons und 
                    einzigartigen Dekorationen zu begeistern.
                  </p>
                  <p>
                    In unserem Geschäft in der Kaiserstraße 25 finden Sie eine riesige 
                    Auswahl an Ballons für jeden Anlass – von Geburtstagen über Hochzeiten 
                    bis hin zu Firmenevents. Wir legen großen Wert auf Qualität und 
                    persönliche Beratung.
                  </p>
                  <p>
                    Unser Team steht Ihnen mit Rat und Tat zur Seite, um die perfekte 
                    Ballondekoration für Ihren besonderen Anlass zu finden. Lassen Sie 
                    sich von unserer Leidenschaft für Ballonkunst inspirieren!
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="aspect-square bg-gradient-to-br from-pink-200 via-blue-200 to-yellow-200 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-9xl">
                    🎈
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-full opacity-20 blur-2xl" />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary rounded-full opacity-20 blur-2xl" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gradient-to-br from-pink-50 via-white to-blue-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Unsere Werte
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Was uns auszeichnet und antreibt
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center"
                >
                  <div className="text-primary mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Unser Team
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Freundlich, kompetent und immer für Sie da
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl shadow-xl p-12 text-center"
            >
              <div className="text-8xl mb-6">👥</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Persönliche Beratung vor Ort
              </h3>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Unser erfahrenes Team steht Ihnen mit Rat und Tat zur Seite. Wir nehmen 
                uns Zeit für Ihre Wünsche und helfen Ihnen, die perfekte Ballondekoration 
                für Ihren Anlass zu finden. Besuchen Sie uns in unserem Geschäft in Lahr 
                und lassen Sie sich inspirieren!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="py-20 bg-gradient-to-br from-yellow-50 via-white to-pink-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Warum Ballonkunst Herzog?
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  emoji: '🎨',
                  title: 'Große Auswahl',
                  description: 'Riesige Auswahl an Ballons, Folienballons und Dekorationen',
                },
                {
                  emoji: '💡',
                  title: 'Kreative Ideen',
                  description: 'Einzigartige Geschenkideen und individuelle Beratung',
                },
                {
                  emoji: '🏪',
                  title: 'Lokales Geschäft',
                  description: 'Ihr vertrauensvoller Partner in Lahr seit vielen Jahren',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center"
                >
                  <div className="text-7xl mb-4">{item.emoji}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;