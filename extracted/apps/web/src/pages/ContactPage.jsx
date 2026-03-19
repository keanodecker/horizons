import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value) => {
    setFormData(prev => ({ ...prev, service: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Fehler",
        description: "Bitte füllen Sie alle Pflichtfelder aus.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate sending email to info@ballonkunst-herzog.de
    setTimeout(() => {
      try {
        // Store locally for demo purposes
        const existingContacts = JSON.parse(localStorage.getItem('ballonkunst_contacts') || '[]');
        const newContact = {
          ...formData,
          id: Date.now(),
          date: new Date().toISOString()
        };
        localStorage.setItem('ballonkunst_contacts', JSON.stringify([...existingContacts, newContact]));

        toast({
          title: "Erfolg!",
          description: "Ihre Nachricht wurde erfolgreich an info@ballonkunst-herzog.de gesendet. Wir melden uns in Kürze bei Ihnen.",
        });

        // Clear form
        setFormData({
          name: '',
          email: '',
          service: '',
          message: ''
        });
      } catch (error) {
        toast({
          title: "Fehler",
          description: "Es gab ein Problem beim Senden Ihrer Nachricht.",
          variant: "destructive"
        });
      } finally {
        setIsSubmitting(false);
      }
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Kontakt - Ballonkunst Herzog Lahr</title>
        <meta name="description" content="Kontaktieren Sie Ballonkunst Herzog in Lahr. Wir freuen uns auf Ihre Anfrage für Ballondekorationen und Geschenke." />
      </Helmet>

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
              Schreiben Sie uns oder besuchen Sie uns direkt in Lahr.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl overflow-hidden">
            
            {/* Left Column: Map & Info */}
            <div className="relative h-[400px] lg:h-auto bg-gray-100 flex flex-col">
              <div className="flex-grow w-full h-full min-h-[300px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2654.688744848484!2d7.8688!3d48.3388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47912e0000000000%3A0x0!2sKaiserstra%C3%9Fe%2025%2C%2077933%20Lahr%2FSchwarzwald!5e0!3m2!1sde!2sde!4v1600000000000!5m2!1sde!2sde" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Standort Ballonkunst Herzog"
                  className="absolute inset-0"
                ></iframe>
              </div>
              
              {/* Overlay Info Card */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-6 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Adresse</h4>
                      <p className="text-sm text-gray-600">Kaiserstraße 25<br/>77933 Lahr</p>
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
                        Mo, Di, Do, Fr: 09:30–12:30 & 14:30–18:00<br/>
                        Sa: 09:30–13:00 | Mi & So: Geschlossen
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="p-8 md:p-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Schreiben Sie uns</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ihr vollständiger Name" 
                    required 
                    className="text-gray-900"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail <span className="text-red-500">*</span></Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ihre.email@beispiel.de" 
                    required 
                    className="text-gray-900"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Anlass (Optional)</Label>
                  <Select value={formData.service} onValueChange={handleServiceChange}>
                    <SelectTrigger className="text-gray-900">
                      <SelectValue placeholder="Bitte wählen Sie einen Anlass" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="geburtstag">Geburtstag</SelectItem>
                      <SelectItem value="hochzeit">Hochzeit</SelectItem>
                      <SelectItem value="geburt-baby">Geburt & Baby</SelectItem>
                      <SelectItem value="schulanfang">Schulanfang</SelectItem>
                      <SelectItem value="kindergeburtstag">Kindergeburtstag</SelectItem>
                      <SelectItem value="taufe">Taufe</SelectItem>
                      <SelectItem value="baby-shower">Baby Shower</SelectItem>
                      <SelectItem value="abitur-konfirmation">Abitur & Konfirmation</SelectItem>
                      <SelectItem value="halloween">Halloween</SelectItem>
                      <SelectItem value="weihnachten">Weihnachten</SelectItem>
                      <SelectItem value="andere">Andere</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Nachricht <span className="text-red-500">*</span></Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Wie können wir Ihnen helfen?" 
                    rows={5} 
                    required 
                    className="resize-none text-gray-900"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Wird gesendet...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" /> Nachricht senden
                    </span>
                  )}
                </Button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;