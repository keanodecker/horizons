import React from 'react';
import ServicePage from '@/components/ServicePage.jsx';
import ConsultationCTA from '@/components/ConsultationCTA.jsx';

const HalloweenPage = () => {
  return (
    <>
      <ServicePage
        serviceId="halloween"
        title="Halloween"
        description="Gruselige und lustige Ballondeko. Schaurig-schöne Halloween-Ballons mit Kürbissen, Geistern und Fledermäusen."
        heroImage="https://images.unsplash.com/photo-1508361001413-7a9dca21d08a"
      />
      <ConsultationCTA />
    </>
  );
};

export default HalloweenPage;