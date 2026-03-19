import ServicePage from '@/components/ServicePage';
import ConsultationCTA from '@/components/ConsultationCTA';

export const metadata = {
  title: 'Abitur & Konfirmation',
  description: 'Stilvolle Ballons für wichtige Meilensteine im Leben – Abitur, Konfirmation und Kommunion.',
};

export default function AbiturKonfirmationPage() {
  return (
    <>
      <ServicePage
        serviceId="abitur-konfirmation"
        title="Abitur & Konfirmation"
        description="Stilvolle Ballons für wichtige Meilensteine im Leben. Elegante Glückwunschballons für Abitur, Konfirmation und Kommunion."
        heroImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
      />
      <ConsultationCTA />
    </>
  );
}
