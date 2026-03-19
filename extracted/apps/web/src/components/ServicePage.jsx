import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Upload, Image as ImageIcon, Award, Layers, Clock } from 'lucide-react';
const ServicePage = ({
  serviceId,
  title,
  description,
  heroImage
}) => {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const {
    toast
  } = useToast();
  useEffect(() => {
    const storedImages = localStorage.getItem(`ballonkunst_images_${serviceId}`);
    if (storedImages) {
      try {
        setImages(JSON.parse(storedImages));
      } catch (e) {
        console.error('Failed to parse stored images', e);
      }
    }
  }, [serviceId]);
  const handleImageUpload = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: 'Ungültiges Format',
        description: 'Bitte nur JPG, PNG oder WEBP Dateien hochladen.',
        variant: 'destructive'
      });
      return;
    }

    // Check file size (e.g., max 2MB to save localStorage space)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: 'Datei zu groß',
        description: 'Bitte Bilder unter 2MB hochladen.',
        variant: 'destructive'
      });
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      try {
        const newImages = [...images, reader.result];
        localStorage.setItem(`ballonkunst_images_${serviceId}`, JSON.stringify(newImages));
        setImages(newImages);
        toast({
          title: 'Erfolg',
          description: 'Bild wurde erfolgreich hochgeladen.'
        });
      } catch (err) {
        toast({
          title: 'Speicher voll',
          description: 'Der lokale Speicher ist voll. Bitte löschen Sie einige Bilder.',
          variant: 'destructive'
        });
      }
    };
    reader.readAsDataURL(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const handleDeleteImage = indexToDelete => {
    const newImages = images.filter((_, index) => index !== indexToDelete);
    try {
      localStorage.setItem(`ballonkunst_images_${serviceId}`, JSON.stringify(newImages));
      setImages(newImages);
      toast({
        title: 'Gelöscht',
        description: 'Bild wurde entfernt.'
      });
    } catch (err) {
      console.error('Failed to update storage after deletion', err);
    }
  };
  return <>
      <Helmet>
        <title>{`${title} - Ballonkunst Herzog Lahr`}</title>
        <meta name="description" content={description} />
      </Helmet>

      <div className="pt-20 min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImage} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.h1 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {title}
            </motion.h1>
            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.1
          }} className="text-lg md:text-xl text-white/90 drop-shadow-md">
              {description}
            </motion.p>
          </div>
        </section>

        {/* Business Info Banner */}
        <section className="bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 max-w-7xl py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
              <div className="flex flex-col items-center justify-center p-4">
                <Award className="w-8 h-8 text-primary mb-2" />
                <span className="font-semibold text-gray-900">19 Jahre Erfahrung</span>
                <span className="text-sm text-gray-500">mit Ballons</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4">
                <Layers className="w-8 h-8 text-secondary mb-2" />
                <span className="font-semibold text-gray-900">600+ Themenballons</span>
                <span className="text-sm text-gray-500">verschiedene zur Auswahl</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4">
                <Clock className="w-8 h-8 text-accent mb-2" />
                <span className="font-semibold text-gray-900">Geschenke & Dekoration</span>
                <span className="text-sm text-gray-500">bitte rechtzeitig vorbestellen</span>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <ImageIcon className="w-8 h-8 text-primary" />
              Galerie
            </h2>
            
            <div className="flex items-center gap-4">
              <Input type="file" accept=".jpg,.jpeg,.png,.webp" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
              <Button onClick={() => fileInputRef.current?.click()} className="bg-secondary hover:bg-secondary/90 text-white shadow-md">
                <Upload className="w-4 h-4 mr-2" />
                Foto hochladen
              </Button>
            </div>
          </div>

          {images.length === 0 ? <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-300">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Noch keine Bilder vorhanden</h3>
              <p className="text-gray-500 mb-6">Laden Sie das erste Bild für diese Kategorie hoch.</p>
              <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                Jetzt hochladen
              </Button>
            </div> : <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
              <AnimatePresence>
                {images.map((imgSrc, index) => <motion.div key={`${imgSrc.substring(0, 20)}-${index}`} initial={{
              opacity: 0,
              scale: 0.9
            }} animate={{
              opacity: 1,
              scale: 1
            }} exit={{
              opacity: 0,
              scale: 0.9
            }} className="relative group break-inside-avoid rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                    <img src={imgSrc} alt={`Galerie Bild ${index + 1}`} className="w-full h-auto object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Button variant="destructive" size="icon" onClick={() => handleDeleteImage(index)} className="rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </motion.div>)}
              </AnimatePresence>
            </div>}
        </section>
      </div>
    </>;
};
export default ServicePage;