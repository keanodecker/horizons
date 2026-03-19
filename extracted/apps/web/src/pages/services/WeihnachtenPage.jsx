import React from 'react';
import ServicePage from '@/components/ServicePage.jsx';
import ConsultationCTA from '@/components/ConsultationCTA.jsx';

const WeihnachtenPage = () => {
  return (
    <>
      <ServicePage
        serviceId="weihnachten"
        title="Weihnachten"
        description="Festliche Weihnachtsballons. Weihnachtliche Ballons in Rot, Grün und Gold für eine festliche Atmosphäre."
        heroImage="https://images.unsplash.com/photo-1554719686-90d6f4923dc7"
      />
      <ConsultationCTA />
    </>
  );
};

export default WeihnachtenPage;