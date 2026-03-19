import React from 'react';
import ServicePage from '@/components/ServicePage.jsx';
import ConsultationCTA from '@/components/ConsultationCTA.jsx';

const KindergeburtstagPage = () => {
  return (
    <>
      <ServicePage
        serviceId="kindergeburtstag"
        title="Kindergeburtstag"
        description="Spaß und Freude für die Kleinen. Bunte Motivballons mit beliebten Charakteren, Tieren und Superhelden."
        heroImage="https://images.unsplash.com/photo-1530103862676-de8892b07439"
      />
      <ConsultationCTA />
    </>
  );
};

export default KindergeburtstagPage;