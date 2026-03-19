'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '491781510567';

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hallo%20Ballonkunst%20Lahr%2C%20ich%20interessiere%20mich%20f%C3%BCr%20Ihre%20Ballons!`;

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Kontaktieren Sie uns
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Haben Sie Fragen zu unseren Ballons oder möchten Sie eine Dekoration vorbestellen?
            Schreiben Sie uns einfach auf WhatsApp – wir antworten schnell!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Map & Info */}
          <div className="relative h-[400px] lg:h-auto bg-gray-100 flex flex-col">
            <div className="flex-grow w-full h-full min-h-[300px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2654.688744848484!2d7.8688!3d48.3388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47912e0000000000%3A0x0!2sKaiserstra%C3%9Fe%2025%2C%2077933%20Lahr%2FSchwarzwald!5e0!3m2!1sde!2sde!4v1600000000000!5m2!1sde!2sde"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Standort Ballonkunst Lahr"
                className="absolute inset-0"
              ></iframe>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-6 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Adresse</h4>
                    <p className="text-sm text-gray-600">Kaiserstraße 25<br />77933 Lahr</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Telefon</h4>
                    <a href="tel:+4978213270082" className="text-sm text-gray-600 hover:text-primary transition-colors">
                      +49 (0) 7821 32 70 82
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:col-span-2">
                  <Clock className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Öffnungszeiten</h4>
                    <p className="text-sm text-gray-600">
                      Mo, Di, Do, Fr: 09:30–12:30 &amp; 14:30–18:00<br />
                      Sa: 09:30–13:00 | Mi &amp; So: Geschlossen
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Schreiben Sie uns auf WhatsApp
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8 max-w-sm mx-auto">
                Für Bestellungen, Anfragen oder Fragen – wir sind auf WhatsApp erreichbar und
                antworten so schnell wie möglich!
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-10 py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full max-w-xs mx-auto"
              >
                <MessageCircle className="w-6 h-6" />
                WhatsApp öffnen
              </a>

              <p className="text-sm text-gray-400 mt-6">
                Oder rufen Sie uns an:{' '}
                <a href="tel:+4978213270082" className="text-primary hover:underline font-medium">
                  +49 (0) 7821 32 70 82
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
