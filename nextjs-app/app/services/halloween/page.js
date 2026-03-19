import ServicePage from '@/components/ServicePage';
import ConsultationCTA from '@/components/ConsultationCTA';

export const metadata = {
  title: 'Halloween',
  description: 'Gruselige Halloween-Ballons mit Kürbissen, Geistern und Fledermäusen für Ihre Halloween-Party.',
};

export default function HalloweenPage() {
  return (
    <>
      <ServicePage
        serviceId="halloween"
        title="Halloween"
        description="Gruselig-schöne Halloween-Ballons! Mit Kürbissen, Geistern und Fledermäusen – perfekt für Ihre Halloween-Party in Orange und Schwarz."
        heroImage="https://images.unsplash.com/photo-1509557965875-b88c97052f0e"
      />
      <ConsultationCTA />
    </>
  );
}
