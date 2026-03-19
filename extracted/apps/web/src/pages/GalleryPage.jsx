import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConsultationCTA from '@/components/ConsultationCTA.jsx';

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Alle');
  const [images, setImages] = useState([]);

  const categories = ['Alle', 'Geburtstag', 'Hochzeit', 'Baby', 'Schulanfang', 'Dekoration'];

  useEffect(() => {
    const loadImages = () => {
      // Map service IDs to gallery categories
      const categoryMap = {
        'geburtstag': 'Geburtstag',
        'kindergeburtstag': 'Geburtstag',
        'hochzeit': 'Hochzeit',
        'geburt-baby': 'Baby',
        'taufe': 'Baby',
        'baby-shower': 'Baby',
        'schulanfang': 'Schulanfang',
        'abitur-konfirmation': 'Schulanfang',
        'halloween': 'Dekoration',
        'weihnachten': 'Dekoration'
      };

      let allImages = [];
      let idCounter = 0;

      Object.entries(categoryMap).forEach(([serviceId, category]) => {
        const stored = localStorage.getItem(`ballonkunst_images_${serviceId}`);
        if (stored) {
          try {
            const urls = JSON.parse(stored);
            urls.forEach(url => {
              allImages.push({
                id: idCounter++,
                src: url,
                category: category,
                title: `${category} Dekoration`
              });
            });
          } catch (e) {
            console.error(`Failed to parse images for ${serviceId}`, e);
          }
        }
      });

      // Shuffle array slightly for a better masonry look if desired, or just set it
      setImages(allImages.reverse()); // Reverse to show newest first assuming they were appended
    };

    loadImages();
  }, []);

  const filteredImages = activeFilter === 'Alle' 
    ? images 
    : images.filter(img => img.category === activeFilter);

  return (
    <>
      <Helmet>
        <title>Galerie - Ballonkunst Herzog Lahr</title>
        <meta
          name="description"
          content="Entdecken Sie unsere Galerie mit Ballondekorationen für Geburtstag, Hochzeit, Baby, Schulanfang und mehr. Ballonkunst Herzog in Lahr."
        />
      </Helmet>

      <div className="pt-24 min-h-screen bg-gray-50 flex flex-col">
        
        {/* Header Section */}
        <section className="py-12 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Unsere Galerie
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Lassen Sie sich von unseren bisherigen Arbeiten und Ballondekorationen inspirieren.
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-6 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-20 z-30 shadow-sm">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-gray-600 mr-2 hidden sm:block" />
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  variant={activeFilter === category ? 'default' : 'outline'}
                  className={`rounded-full font-semibold transition-all duration-300 ${
                    activeFilter === category
                      ? 'bg-primary text-white hover:bg-primary/90 shadow-md'
                      : 'border-2 border-gray-200 hover:border-primary hover:text-primary bg-white'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 flex-grow">
          <div className="container mx-auto px-4 max-w-7xl">
            {filteredImages.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-300">
                <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Keine Bilder gefunden</h3>
                <p className="text-gray-500">
                  Für diese Kategorie wurden noch keine Bilder hochgeladen. 
                  Sie können Bilder auf den jeweiligen Anlass-Seiten hinzufügen.
                </p>
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                <AnimatePresence>
                  {filteredImages.map((image) => (
                    <motion.div
                      key={image.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setSelectedImage(image)}
                      className="relative group break-inside-avoid rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
                    >
                      <img 
                        src={image.src} 
                        alt={image.title} 
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
                        <span className="text-white font-medium bg-black/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          {image.category}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </section>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 md:-right-12 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-colors z-50"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.title}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-2 rounded-full">
                  <p className="text-white font-medium">
                    {selectedImage.category}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <ConsultationCTA />
      </div>
    </>
  );
};

export default GalleryPage;