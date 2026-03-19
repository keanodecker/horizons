import React from 'react';
import ServicePage from '@/components/ServicePage.jsx';
import ConsultationCTA from '@/components/ConsultationCTA.jsx';

const SchulanfangPage = () => {
  return (
    <>
      <ServicePage
        serviceId="schulanfang"
        title="Schulanfang"
        description="Motivierende Ballons für den ersten Schultag. Bunte Schulballons mit Schultüten-Motiven und motivierenden Sprüchen."
        heroImage="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
      />
      <ConsultationCTA />
    </>
  );
};

export default SchulanfangPage;