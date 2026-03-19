
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const OpeningAnimation = ({ onComplete }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => setShowLogo(true), 3000);
    const buttonTimer = setTimeout(() => setShowButton(true), 4000);
    const autoCompleteTimer = setTimeout(() => onComplete(), 8000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(buttonTimer);
      clearTimeout(autoCompleteTimer);
    };
  }, [onComplete]);

  const balloons = [
    { emoji: '🎂', label: 'Geburtstag', color: 'from-red-400 to-red-600', delay: 0, x: 15 },
    { emoji: '💍', label: 'Hochzeit', color: 'from-white to-yellow-200', delay: 0.3, x: 25 },
    { emoji: '👶', label: 'Geburt & Baby', color: 'from-pink-300 to-blue-300', delay: 0.6, x: 35 },
    { emoji: '🎒', label: 'Schulanfang', color: 'from-yellow-400 to-yellow-600', delay: 0.9, x: 50 },
    { emoji: '⭐', label: 'Jubiläum & Erfolg', color: 'from-yellow-300 to-yellow-500', delay: 1.2, x: 65 },
    { emoji: '🎄', label: 'Weihnachten', color: 'from-green-500 to-green-700', delay: 1.5, x: 75 },
    { emoji: '🦋', label: 'Dekoration', color: 'from-purple-400 to-pink-400', delay: 1.8, x: 85 },
  ];

  const confetti = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-50 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 overflow-hidden"
      >
        {/* Skip Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={onComplete}
          className="absolute top-6 right-6 text-white/70 hover:text-white text-sm font-medium transition-colors z-10"
        >
          Überspringen →
        </motion.button>

        {/* Confetti Particles */}
        {confetti.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-60"
            style={{ left: `${particle.x}%`, top: '100%' }}
            animate={{
              y: [0, -1000],
              x: [0, Math.sin(particle.id) * 100],
              rotate: [0, 360],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}

        {/* Sparkle Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-yellow-300 text-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: Math.random() * 3,
              repeat: Infinity,
            }}
          >
            ✨
          </motion.div>
        ))}

        {/* Floating Balloons */}
        {balloons.map((balloon, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{ left: `${balloon.x}%`, bottom: '-100px' }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: -window.innerHeight - 200,
              x: [0, 30, -20, 40, 0],
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{
              duration: 8,
              delay: balloon.delay,
              ease: 'easeInOut',
            }}
          >
            <div className="relative">
              {/* Balloon */}
              <div className={`w-24 h-28 rounded-full bg-gradient-to-br ${balloon.color} shadow-2xl relative`}>
                <div className="absolute inset-0 flex items-center justify-center text-4xl">
                  {balloon.emoji}
                </div>
                {/* Shine effect */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-white/40 rounded-full blur-sm" />
              </div>
              {/* String */}
              <div className="absolute top-full left-1/2 w-0.5 h-32 bg-gray-400/50 -translate-x-1/2" />
              {/* Label Tag */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
                <span className="text-xs font-bold text-gray-800">{balloon.label}</span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Logo */}
          <AnimatePresence>
            {showLogo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="text-center mb-8"
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-8xl mb-4"
                >
                  🎈
                </motion.div>
                <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
                  Ballonkunst Herzog
                </h1>
                <p className="text-2xl text-white/90 font-medium">
                  Lahr im Schwarzwald
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Button */}
          <AnimatePresence>
            {showButton && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Button
                    onClick={onComplete}
                    size="lg"
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-xl px-12 py-6 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105"
                  >
                    Entdecken Sie uns ✨
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OpeningAnimation;
