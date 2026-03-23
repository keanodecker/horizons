'use client';

import { motion } from 'framer-motion';
import { BookOpen, Instagram, CalendarDays, Image } from 'lucide-react';

export default function EventsPage({ posts = [] }) {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-pink-50 via-white to-yellow-50">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">🎈</div>
          <div className="absolute bottom-10 right-20 text-6xl opacity-20 animate-pulse">✨</div>
          <div className="absolute top-20 right-10 text-5xl opacity-20">🎊</div>
        </div>

        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center justify-center p-3 bg-pink-100 rounded-full mb-6">
              <BookOpen className="w-8 h-8 text-pink-500" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Unser <span className="text-primary">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Neuigkeiten, Tipps und Inspirationen rund um Ballons und Dekoration von Ballonkunst Lahr.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts */}
      <section className="pb-24">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          {posts.length > 0 ? (
            posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-pink-50"
              >
                {post.image_url && (
                  <div className="w-full h-56 overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                    <CalendarDays className="w-4 h-4" />
                    {new Date(post.post_date).toLocaleDateString('de-DE', {
                      day: '2-digit', month: 'long', year: 'numeric',
                    })}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h2>
                  {post.content && (
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{post.content}</p>
                  )}
                </div>
              </motion.article>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-xl p-12 text-center border border-pink-100"
            >
              <div className="mb-4">
                <Instagram className="w-16 h-16 text-pink-300 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Bald gibt es hier Neuigkeiten!</h3>
              <p className="text-gray-600 mb-6">
                Folgen Sie uns auf Instagram für aktuelle Bilder, Tipps und Inspirationen.
              </p>
              <a
                href="https://www.instagram.com/ballonkunst_lahr/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors shadow-lg"
              >
                Auf Instagram folgen
              </a>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
