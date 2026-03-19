import React from 'react';
import ServicePage from '@/components/ServicePage.jsx';
import ConsultationCTA from '@/components/ConsultationCTA.jsx';

const AbiturKonfirmationPage = () => {
  return (
    <>
      <ServicePage
        serviceId="abitur-konfirmation"
        title="Abitur & Konfirmation"
        description="Besondere Momente gebührend feiern. Stilvolle Ballons für wichtige Meilensteine im Leben."
        heroImage="https://images.unsplash.com/photo-1523580494112-071d384e236c"
      />
      <ConsultationCTA />
    </>
  );
};

export default AbiturKonfirmationPage;