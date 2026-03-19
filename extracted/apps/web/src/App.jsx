import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ScrollToTop from './components/ScrollToTop.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import CookieConsent from './components/CookieConsent.jsx';
import OpeningAnimation from './components/OpeningAnimation.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import OccasionsPage from './pages/OccasionsPage.jsx';
import DecorationPage from './pages/DecorationPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import DatenschutzPage from './pages/DatenschutzPage.jsx';
import ImpressumPage from './pages/ImpressumPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AdminPage from './pages/AdminPage.jsx';

// Service Pages
import GeburtstagPage from './pages/services/GeburtstagPage.jsx';
import HochzeitPage from './pages/services/HochzeitPage.jsx';
import GeburtBabyPage from './pages/services/GeburtBabyPage.jsx';
import SchulanfangPage from './pages/services/SchulanfangPage.jsx';
import KindergeburtstagPage from './pages/services/KindergeburtstagPage.jsx';
import TaufePage from './pages/services/TaufePage.jsx';
import BabyShowerPage from './pages/services/BabyShowerPage.jsx';
import AbiturKonfirmationPage from './pages/services/AbiturKonfirmationPage.jsx';
import HalloweenPage from './pages/services/HalloweenPage.jsx';
import WeihnachtenPage from './pages/services/WeihnachtenPage.jsx';

import { Toaster } from '@/components/ui/toaster';

function App() {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const hasSeenAnimation = localStorage.getItem('ballonkunst-intro-seen');
    if (!hasSeenAnimation) {
      setShowAnimation(true);
    }
  }, []);

  const handleAnimationComplete = () => {
    localStorage.setItem('ballonkunst-intro-seen', 'true');
    setShowAnimation(false);
  };

  return (
    <>
      <Helmet>
        <title>Ballonkunst Herzog - Ballons & Geschenkideen in Lahr</title>
        <meta
          name="description"
          content="Ballonkunst Herzog in Lahr - Ihr Spezialist für Ballons, Luftballons, Ballondekoration und kreative Geschenkideen für jeden Anlass."
        />
        <meta
          name="keywords"
          content="Ballons Lahr, Luftballons Lahr, Ballondekoration Lahr, Geschenkballons, Ballon Geschenk, Hochzeitsballons, Geburtstagsballons, Ballonladen Lahr, Ballons Ortenau"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
      </Helmet>

      {showAnimation ? (
        <OpeningAnimation onComplete={handleAnimationComplete} />
      ) : (
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/uber-uns" element={<AboutPage />} />
                <Route path="/anlasse" element={<OccasionsPage />} />
                <Route path="/dekoration" element={<DecorationPage />} />
                <Route path="/galerie" element={<GalleryPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/kontakt" element={<ContactPage />} />
                <Route path="/contact" element={<ContactPage />} />
                
                {/* Legal Pages */}
                <Route path="/datenschutz" element={<DatenschutzPage />} />
                <Route path="/impressum" element={<ImpressumPage />} />

                {/* Service Pages */}
                <Route path="/services/geburtstag" element={<GeburtstagPage />} />
                <Route path="/services/hochzeit" element={<HochzeitPage />} />
                <Route path="/services/geburt-baby" element={<GeburtBabyPage />} />
                <Route path="/services/schulanfang" element={<SchulanfangPage />} />
                <Route path="/services/kindergeburtstag" element={<KindergeburtstagPage />} />
                <Route path="/services/taufe" element={<TaufePage />} />
                <Route path="/services/baby-shower" element={<BabyShowerPage />} />
                <Route path="/services/abitur-konfirmation" element={<AbiturKonfirmationPage />} />
                <Route path="/services/halloween" element={<HalloweenPage />} />
                <Route path="/services/weihnachten" element={<WeihnachtenPage />} />
                
                {/* Admin Route */}
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </main>
            <Footer />
            <CookieConsent />
            <Toaster />
          </div>
        </Router>
      )}
    </>
  );
}

export default App;