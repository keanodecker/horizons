
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ballonkunst-cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('ballonkunst-cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('ballonkunst-cookie-consent', 'declined');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-4 border-primary shadow-2xl"
        >
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  🍪 Cookie-Hinweis
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Wir verwenden Cookies, um Ihnen die beste Erfahrung auf unserer Website zu bieten. 
                  Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies zu. 
                  Weitere Informationen finden Sie in unserer{' '}
                  <a href="/datenschutz" className="text-primary hover:underline font-semibold">
                    Datenschutzerklärung
                  </a>.
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Button
                  onClick={handleDecline}
                  variant="outline"
                  className="border-2 border-gray-300 hover:bg-gray-100"
                >
                  Ablehnen
                </Button>
                <Button
                  onClick={handleAccept}
                  className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg"
                >
                  Akzeptieren
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
