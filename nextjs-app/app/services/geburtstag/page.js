import ServicePage from '@/components/ServicePage';
import ConsultationCTA from '@/components/ConsultationCTA';

export const metadata = {
  title: 'Geburtstag',
  description: 'Feiern Sie Ihren besonderen Tag mit bunten Ballons. Von klassischen Zahlenballons bis zu personalisierten Geburtstagsballons.',
};

export default function GeburtstagPage() {
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
}
