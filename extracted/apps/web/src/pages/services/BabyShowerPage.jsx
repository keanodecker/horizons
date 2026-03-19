import React from 'react';
import ServicePage from '@/components/ServicePage.jsx';
import ConsultationCTA from '@/components/ConsultationCTA.jsx';

const BabyShowerPage = () => {
  return (
    <>
      <ServicePage
        serviceId="baby-shower"
        title="Baby Shower"
        description="Zauberhafte Babyparty-Ballons. Niedliche Ballondekorationen für die Feier vor der Geburt."
        heroImage="https://images.unsplash.com/photo-1674570979140-9adb58d4c194"
      />
      <ConsultationCTA />
    </>
  );
};

export default BabyShowerPage;