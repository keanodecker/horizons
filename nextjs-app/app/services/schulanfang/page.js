import ServicePage from '@/components/ServicePage';
import ConsultationCTA from '@/components/ConsultationCTA';

export const metadata = {
  title: 'Schulanfang',
  description: 'Motivierende Schulballons für den ersten Schultag. Bunte Ballons mit Schultüten-Motiven für Ihren ABC-Schützen.',
};

export default function SchulanfangPage() {
  return (
    <>
      <ServicePage
        serviceId="schulanfang"
        title="Schulanfang"
        description="Motivierende Ballons für den ersten Schultag! Bunte Schulballons mit Schultüten-Motiven für Ihren ABC-Schützen."
        heroImage="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
      />
      <ConsultationCTA />
    </>
  );
}
