import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, ChevronDown, ChevronUp, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient.js';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedEventId, setExpandedEventId] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('is_published', true)
          .order('date', { ascending: true });

        if (error) throw error;
        setEvents(data || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const toggleExpand = (id) => {
    setExpandedEventId(expandedEventId === id ? null : id);
  };

  return (
    <>
      <Helmet>
        <title>Events & Veranstaltungen - Ballonkunst Herzog</title>
        <meta name="description" content="Entdecken Sie unsere kommenden Events, Workshops und Veranstaltungen rund um das Thema Ballons und Dekoration in Lahr." />
      </Helmet>

      <div className="pt-20 min-h-screen bg-gradient-to-br from-pink-50 via-white to-yellow-50">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">🎈</div>
            <div className="absolute bottom-10 right-20 text-6xl opacity-20 animate-pulse">✨</div>
            <div className="absolute top-20 right-10 text-5xl opacity-20 animate-spin-slow">🎊</div>
          </div>

          <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-pink-100 rounded-full mb-6">
                <PartyPopper className="w-8 h-8 text-pink-500" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-['Nunito']">
                Unsere <span className="text-pink-500">Events</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Seien Sie dabei! Entdecken Sie unsere kommenden Veranstaltungen, Workshops und besonderen Aktionen.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Events List */}
        <section className="pb-24">
          <div className="container mx-auto px-4 max-w-4xl">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
              </div>
            ) : events.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl shadow-xl p-12 text-center border border-pink-100"
              >
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-['Nunito']">Aktuell sind keine Events geplant</h3>
                <p className="text-gray-600">Schau bald wieder vorbei oder folge uns auf Social Media für Updates!</p>
              </motion.div>
            ) : (
              <div className="space-y-8">
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
                  >
                    {event.cover_image && (
                      <div className="relative h-64 md:h-80 w-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                        <img 
                          src={event.cover_image} 
                          alt={event.title} 
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute bottom-6 left-6 right-6 z-20">
                          <h2 className="text-3xl md:text-4xl font-bold text-white font-['Nunito'] drop-shadow-md">
                            {event.title}
                          </h2>
                        </div>
                      </div>
                    )}

                    <div className="p-6 md:p-8">
                      {!event.cover_image && (
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 font-['Nunito']">
                          {event.title}
                        </h2>
                      )}

                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center gap-2 bg-pink-50 text-pink-700 px-4 py-2 rounded-full font-medium text-sm">
                          <Calendar className="w-4 h-4" />
                          {new Date(event.date).toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        {event.time && (
                          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium text-sm">
                            <Clock className="w-4 h-4" />
                            {event.time}
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full font-medium text-sm">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </div>
                        )}
                      </div>

                      <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        {event.short_description}
                      </p>

                      {event.full_description && (
                        <div className="border-t border-gray-100 pt-6">
                          <AnimatePresence>
                            {expandedEventId === event.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden mb-6"
                              >
                                <div className="prose prose-pink max-w-none text-gray-600 whitespace-pre-wrap">
                                  {event.full_description}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <Button 
                            onClick={() => toggleExpand(event.id)}
                            variant="ghost" 
                            className="w-full text-pink-500 hover:text-pink-600 hover:bg-pink-50 font-semibold"
                          >
                            {expandedEventId === event.id ? (
                              <>Weniger anzeigen <ChevronUp className="w-4 h-4 ml-2" /></>
                            ) : (
                              <>Mehr erfahren <ChevronDown className="w-4 h-4 ml-2" /></>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default EventsPage;