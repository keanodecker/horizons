import ServicePage from '@/components/ServicePage';
import ConsultationCTA from '@/components/ConsultationCTA';

export const metadata = {
  title: 'Kindergeburtstag',
  description: 'Bunte Motivballons für den Kindergeburtstag. Von Dinosauriern über Prinzessinnen bis zu Piraten.',
};

export default function KindergeburtstagPage() {
  return (
    <>
      <ServicePage
        serviceId="kindergeburtstag"
        title="Kindergeburtstag"
        description="Spaß und Freude für die Kleinen! Bunte Motivballons mit beliebten Charakteren, Tieren und Superhelden."
        heroImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64"
      />
      <ConsultationCTA />
    </>
  );
}
