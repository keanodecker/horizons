import ServicePage from '@/components/ServicePage';
import ConsultationCTA from '@/components/ConsultationCTA';

export const metadata = {
  title: 'Geburt & Baby',
  description: 'Süße Ballons für den Nachwuchs. Zarte Pastellfarben für die Ankunft Ihres kleinen Wunders.',
};

export default function GeburtBabyPage() {
  return (
    <>
      <ServicePage
        serviceId="geburt-baby"
        title="Geburt & Baby"
        description="Süße Ballons für den Nachwuchs. Zarte Pastellfarben in Rosa und Blau für die Ankunft Ihres kleinen Wunders."
        heroImage="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4"
      />
      <ConsultationCTA />
    </>
  );
}
