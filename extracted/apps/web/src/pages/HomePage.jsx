import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Phone, Mail, Award, Layers, Clock } from 'lucide-react';

const HomePage = () => {
  const occasions = [
    { emoji: '🎂', title: 'Geburtstag', description: 'Feiern Sie mit bunten Ballons', path: '/services/geburtstag' },
    { emoji: '💍', title: 'Hochzeit', description: 'Romantische Ballondekoration', path: '/services/hochzeit' },
    { emoji: '👶', title: 'Geburt & Baby', description: 'Süße Ballons für den Nachwuchs', path: '/services/geburt-baby' },
    { emoji: '🎒', title: 'Schulanfang', description: 'Motivierende Schulballons', path: '/services/schulanfang' },
    { emoji: '🎊', title: 'Kindergeburtstag', description: 'Spaß für die Kleinen', path: '/services/kindergeburtstag' },
    { emoji: '✝️', title: 'Taufe', description: 'Festliche Ballondekoration', path: '/services/taufe' },
    { emoji: '🚿', title: 'Baby Shower', description: 'Zauberhafte Babyparty-Ballons', path: '/services/baby-shower' },
    { emoji: '📚', title: 'Abitur & Konfirmation', description: 'Besondere Momente feiern', path: '/services/abitur-konfirmation' },
    { emoji: '🎃', title: 'Halloween', description: 'Gruselige Ballondeko', path: '/services/halloween' },
    { emoji: '🎄', title: 'Weihnachten', description: 'Festliche Weihnachtsballons', path: '/services/weihnachten' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Balloon configuration for background animation
  const balloonColors = [
    'text-pink-400', 'text-blue-400', 'text-yellow-400', 
    'text-green-400', 'text-orange-400', 'text-purple-400'
  ];
  const balloonShapes = ['balloon-shape-round', 'balloon-shape-heart', 'balloon-shape-star'];

  return (
    <>
      <Helmet>
        <title>Ballonkunst Herzog - Ballons & Geschenkideen in Lahr</title>
        <meta
          name="description"
          content="Ballonkunst Herzog in Lahr - Ihr Spezialist für Ballons, Luftballons, Ballondekoration und kreative Geschenkideen für jeden Anlass. Geburtstag, Hochzeit, Baby, Schulanfang und mehr."
        />
        <meta
          name="keywords"
          content="Ballons Lahr, Luftballons Lahr, Ballondekoration Lahr, Geschenkballons, Ballon Geschenk, Hochzeitsballons, Geburtstagsballons, Ballonladen Lahr, Ballons Ortenau"
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50">
        {/* Floating CSS Balloons Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => {
            const color = balloonColors[i % balloonColors.length];
            const shape = balloonShapes[i % balloonShapes.length];
            const left = `${Math.random() * 90 + 5}%`;
            const duration = `${15 + Math.random() * 15}s`;
            const delay = `${Math.random() * 10}s`;
            const scale = 0.6 + Math.random() * 0.6;

            return (
              <div
                key={i}
                className={`balloon-wrapper ${color}`}
                style={{
                  left,
                  animationDuration: duration,
                  animationDelay: delay,
                  transform: `scale(${scale})`
                }}
              >
                <div className={shape}>
                  <div className="balloon-string"></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative container mx-auto px-4 py-32 max-w-7xl text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-9xl mb-8 inline-block"
            >
              🎈
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Für jeden Anlass den{' '}
              <span className="text-primary">perfekten Ballon</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              Willkommen bei Ballonkunst Herzog – Ihrem Spezialgeschäft für Ballons und 
              kreative Geschenkideen im Herzen von Lahr. Wir bringen Farbe in Ihr Leben!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kontakt">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  Jetzt vorbeikommen <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/anlasse">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-bold text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Ballons vorbestellen
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Business Info Banner */}
      <section className="relative -mt-16 z-20 container mx-auto px-4 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100"
        >
          <div className="flex flex-col items-center text-center px-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">19 Jahre Erfahrung</h3>
            <p className="text-gray-600">mit Ballons und Dekorationen in Lahr</p>
          </div>
          <div className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
              <Layers className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">600+ Themenballons</h3>
            <p className="text-gray-600">riesige Auswahl für jeden Anlass</p>
          </div>
          <div className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Geschenke & Deko</h3>
            <p className="text-gray-600 font-medium text-primary">Bitte rechtzeitig vorbestellen!</p>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Unsere Ballons
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Bei Ballonkunst Herzog finden Sie eine riesige Auswahl an Ballons für jeden Anlass. 
              Von klassischen Latexballons über elegante Folienballons bis hin zu personalisierten 
              Ballons mit Beschriftung – wir haben alles, was Ihr Herz begehrt. Lassen Sie sich 
              von unserer Vielfalt inspirieren und finden Sie das perfekte Geschenk!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Occasions Grid */}
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
              Ballons für jeden Anlass
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Entdecken Sie unsere vielfältige Auswahl für alle besonderen Momente
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {occasions.map((occasion, index) => (
              <Link to={occasion.path} key={index}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 text-center cursor-pointer group h-full flex flex-col justify-center"
                >
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {occasion.emoji}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{occasion.title}</h3>
                  <p className="text-sm text-gray-600">{occasion.description}</p>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link to="/galerie">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Mehr Anzeigen <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gift Ideas Section */}
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
              Kreative Geschenkideen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Überraschen Sie Ihre Liebsten mit einzigartigen Ballongeschenken! Von Ballonboxen 
              über Ballonsträuße bis hin zu Geldgeschenk-Ballons – bei uns finden Sie das 
              perfekte Geschenk für jeden Anlass.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Ballonboxen',
                description: 'Überraschungsboxen gefüllt mit bunten Ballons',
                icon: '🎁',
              },
              {
                title: 'Ballonsträuße',
                description: 'Wunderschöne Arrangements für besondere Momente',
                icon: '💐',
              },
              {
                title: 'Geldgeschenke',
                description: 'Kreative Verpackungen für Geldgeschenke',
                icon: '💰',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center"
              >
                <div className="text-7xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/dekoration">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-gray-900 font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Zur Dekoration <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
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
              Impressionen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Lassen Sie sich von unseren kreativen Ballondekorationen inspirieren
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="aspect-square bg-gradient-to-br from-pink-200 to-blue-200 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  🎈
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/galerie">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Zur Galerie <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-primary via-secondary to-accent">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Besuchen Sie uns in Lahr!
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
              Wir freuen uns auf Ihren Besuch in unserem Geschäft. Lassen Sie sich persönlich 
              beraten und entdecken Sie unsere große Auswahl an Ballons und Geschenkideen.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center">
                <MapPin className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Adresse</h3>
                <p>Kaiserstraße 25</p>
                <p>77933 Lahr</p>
              </div>
              <div className="flex flex-col items-center">
                <Phone className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Telefon</h3>
                <a href="tel:+4978213270082" className="hover:underline">
                  +49 7821 327082
                </a>
              </div>
              <div className="flex flex-col items-center">
                <Mail className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">E-Mail</h3>
                <a href="mailto:info@ballonkunst-herzog.de" className="hover:underline">
                  info@ballonkunst-herzog.de
                </a>
              </div>
            </div>

            <Link to="/kontakt">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 font-bold text-lg px-12 py-6 rounded-full shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-105"
              >
                Jetzt Termin vereinbaren <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;