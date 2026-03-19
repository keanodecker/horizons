import ServicePage from '@/components/ServicePage';
import ConsultationCTA from '@/components/ConsultationCTA';

export const metadata = {
  title: 'Hochzeit',
  description: 'Romantische Ballondekoration für den schönsten Tag. Elegante Dekorationen in Weiß, Gold und Rosé für Ihre Traumhochzeit.',
};

export default function HochzeitPage() {
  return (
    <>
      <ServicePage
        serviceId="hochzeit"
        title="Hochzeit"
        description="Romantische Ballondekoration für den schönsten Tag. Elegante Dekorationen in Weiß, Gold und Rosé für Ihre Traumhochzeit."
        heroImage="https://images.unsplash.com/photo-1574913746706-39f69232f7f5"
      />
      <ConsultationCTA />
    </>
  );
}
