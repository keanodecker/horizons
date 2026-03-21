'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isDesktopServicesOpen, setIsDesktopServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    setIsDesktopServicesOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Über Uns', path: '/uber-uns' },
    { name: 'Dekoration', path: '/dekoration' },
    { name: 'Galerie', path: '/galerie' },
    { name: 'Blog', path: '/blog' },
  ];

  const serviceLinks = [
    { name: 'Geburtstag', path: '/services/geburtstag' },
    { name: 'Hochzeit', path: '/services/hochzeit' },
    { name: 'Geburt & Baby', path: '/services/geburt-baby' },
    { name: 'Schulanfang', path: '/services/schulanfang' },
    { name: 'Kindergeburtstag', path: '/services/kindergeburtstag' },
    { name: 'Taufe', path: '/services/taufe' },
    { name: 'Baby Shower', path: '/services/baby-shower' },
    { name: 'Abitur & Konfirmation', path: '/services/abitur-konfirmation' },
    { name: 'Halloween', path: '/services/halloween' },
    { name: 'Weihnachten', path: '/services/weihnachten' },
    { name: 'Liebe & Valentinstag', path: '/services/liebe-valentinstag' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src="/logo.jpg"
              alt="Ballonkunst Lahr Logo"
              className="h-10 md:h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  pathname === link.path
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDesktopServicesOpen(!isDesktopServicesOpen)}
                onBlur={() => setTimeout(() => setIsDesktopServicesOpen(false), 150)}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  pathname.includes('/services') || pathname === '/anlasse'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                Anlässe <ChevronDown className={`w-4 h-4 transition-transform ${isDesktopServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isDesktopServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white/95 backdrop-blur-md border border-gray-200 shadow-xl rounded-xl overflow-hidden z-50"
                  >
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.path}
                        href={service.path}
                        className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(2).map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  pathname === link.path
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/kontakt"
              className="ml-4 px-4 py-2 bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
            >
              Kontakt
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    pathname === link.path
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex flex-col">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    pathname.includes('/services') || isServicesOpen
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  Anlässe
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="flex flex-col pl-8 pr-4 py-2 gap-2 overflow-hidden"
                    >
                      {serviceLinks.map((service) => (
                        <Link
                          key={service.path}
                          href={service.path}
                          className={`py-2 text-sm font-medium transition-colors ${
                            pathname === service.path
                              ? 'text-primary'
                              : 'text-gray-600 hover:text-primary'
                          }`}
                        >
                          {service.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    pathname === link.path
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/kontakt"
                className="mt-2 w-full text-center px-4 py-3 bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
              >
                Kontakt
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
