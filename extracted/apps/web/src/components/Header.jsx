import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Über Uns', path: '/uber-uns' },
    { name: 'Dekoration', path: '/dekoration' },
    { name: 'Galerie', path: '/galerie' },
    { name: 'Events', path: '/events' },
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
          <Link to="/" className="flex items-center group">
            <img 
              src="https://horizons-cdn.hostinger.com/910c39d7-e020-4090-a4fa-0fc83bdc8598/ee4d9a60f6e9d6601c17357f1d78081f.png" 
              alt="Ballonkunst Herzog Logo" 
              className="h-10 md:h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`flex items-center gap-1 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  location.pathname.includes('/services')
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                }`}>
                  Anlässe <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56 bg-white/95 backdrop-blur-md border-gray-200 shadow-xl">
                {serviceLinks.map((service) => (
                  <DropdownMenuItem key={service.path} asChild>
                    <Link 
                      to={service.path}
                      className="w-full cursor-pointer hover:bg-primary/10 hover:text-primary font-medium py-2"
                    >
                      {service.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.slice(2).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <Link to="/kontakt">
              <Button className="ml-4 bg-secondary hover:bg-secondary/90 text-white font-semibold shadow-lg">
                Kontakt
              </Button>
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
                  to={link.path}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Services Accordion */}
              <div className="flex flex-col">
                <button 
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    location.pathname.includes('/services') || isServicesOpen
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  Anlässe
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
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
                          to={service.path}
                          className={`py-2 text-sm font-medium transition-colors ${
                            location.pathname === service.path
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
                  to={link.path}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/kontakt" className="mt-2">
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold shadow-lg">
                  Kontakt
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;