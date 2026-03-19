import React from 'react';
import ServicePage from '@/components/ServicePage.jsx';
import ConsultationCTA from '@/components/ConsultationCTA.jsx';

const TaufePage = () => {
  return (
    <>
      <ServicePage
        serviceId="taufe"
        title="Taufe"
        description="Festliche Ballondekoration für die Taufe. Elegante weiße und pastellfarbene Ballons für diesen besonderen Anlass."
        heroImage="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3"
      />
      <ConsultationCTA />
    </>
  );
};

export default TaufePage;