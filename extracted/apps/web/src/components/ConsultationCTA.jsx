
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const ConsultationCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-pink-400 via-blue-400 to-yellow-400 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-10 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-2xl animate-pulse"></div>
        <div className="absolute bottom-0 right-10 w-40 h-40 bg-white rounded-full mix-blend-overlay filter blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-md">
            Lassen Sie sich beraten!
          </h2>
          <p className="text-xl text-white/95 mb-10 leading-relaxed font-medium drop-shadow-sm">
            Besuchen Sie uns in unserem Geschäft in Lahr und entdecken Sie unsere große Auswahl. Wir beraten Sie gerne persönlich!
          </p>
          <Link to="/kontakt">
            <Button 
              size="lg"
              className="bg-white text-pink-500 hover:bg-gray-50 font-bold text-lg px-10 py-7 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Kontaktieren
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ConsultationCTA;
