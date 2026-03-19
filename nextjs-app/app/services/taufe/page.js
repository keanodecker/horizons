import ServicePage from '@/components/ServicePage';
import ConsultationCTA from '@/components/ConsultationCTA';

export const metadata = {
  title: 'Taufe',
  description: 'Festliche Ballondekoration für die Taufe. Elegante weiße und pastellfarbene Ballons für diesen besonderen Anlass.',
};

export default function TaufePage() {
  return (
    <>
      <ServicePage
        serviceId="taufe"
        title="Taufe"
        description="Festliche Ballondekoration für die Taufe. Elegante weiße und pastellfarbene Ballons für diesen besonderen kirchlichen Anlass."
        heroImage="https://images.unsplash.com/photo-1559181567-c3190ca9d222"
      />
      <ConsultationCTA />
    </>
  );
}
