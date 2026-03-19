import ServicePage from '@/components/ServicePage';
import ConsultationCTA from '@/components/ConsultationCTA';

export const metadata = {
  title: 'Weihnachten',
  description: 'Festliche Weihnachtsballons in Rot, Grün und Gold für eine stimmungsvolle Weihnachtsatmosphäre.',
};

export default function WeihnachtenPage() {
  return (
    <>
      <ServicePage
        serviceId="weihnachten"
        title="Weihnachten"
        description="Festliche Weihnachtsballons in Rot, Grün und Gold. Von Weihnachtsmann-Ballons bis zu eleganten Christbaumkugel-Ballons."
        heroImage="https://images.unsplash.com/photo-1512389142860-9c449e58a543"
      />
      <ConsultationCTA />
    </>
  );
}
