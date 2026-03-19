import ServicePage from '@/components/ServicePage';
import ConsultationCTA from '@/components/ConsultationCTA';

export const metadata = {
  title: 'Baby Shower',
  description: 'Zauberhafte Babyparty-Ballons für die Baby Shower. Niedliche Dekorationen für die Feier vor der Geburt.',
};

export default function BabyShowerPage() {
  return (
    <>
      <ServicePage
        serviceId="baby-shower"
        title="Baby Shower"
        description="Zauberhafte Babyparty-Ballons für Ihre Baby Shower. Niedliche Dekorationen für die Feier vor der Geburt."
        heroImage="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4"
      />
      <ConsultationCTA />
    </>
  );
}
