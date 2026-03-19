import React from 'react';
import ServicePage from '@/components/ServicePage.jsx';
import ConsultationCTA from '@/components/ConsultationCTA.jsx';

const GeburtstagPage = () => {
  return (
    <>
      <ServicePage
        serviceId="geburtstag"
        title="Geburtstag"
        description="Feiern Sie Ihren besonderen Tag mit bunten Ballons. Von klassischen Zahlenballons bis zu personalisierten Geburtstagsballons – wir haben alles für Ihre Feier."
        heroImage="https://images.unsplash.com/photo-1485707302660-6ca974f1ae0a"
      />
      <ConsultationCTA />
    </>
  );
};

export default GeburtstagPage;