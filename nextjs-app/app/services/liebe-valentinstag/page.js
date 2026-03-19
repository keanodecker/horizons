import ServicePage from '@/components/ServicePage';
import ConsultationCTA from '@/components/ConsultationCTA';

export const metadata = {
  title: 'Liebe & Valentinstag',
  description: 'Romantische Ballons und Dekorationen für Valentinstag und besondere Liebesmomente. Herzballons, personalisierte Liebesballons und mehr.',
};

export default function LiebeValentinstagPage() {
  return (
    <>
      <ServicePage
        serviceId="liebe-valentinstag"
        title="Liebe & Valentinstag"
        description="Herzballons in Rot und Rosa, personalisierte Liebesballons und romantische Dekorationen für Valentinstag, Hochzeitstag oder einfach um zu zeigen, wie sehr Sie jemanden lieben."
        heroImage="https://images.unsplash.com/photo-1518199266791-5375a83190b7"
      />
      <ConsultationCTA />
    </>
  );
}
