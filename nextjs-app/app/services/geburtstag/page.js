import ServicePage from '@/components/ServicePage';
import ConsultationCTA from '@/components/ConsultationCTA';

export const metadata = {
  title: 'Geburtstag',
  description: 'Feiern Sie Ihren besonderen Tag mit bunten Ballons. Von klassischen Zahlenballons bis zu personalisierten Geburtstagsballons – wir haben alles für Ihre Feier.',
};

export default function GeburtstagPage() {
  return (
    <>
      <ServicePage
        serviceId="geburtstag"
        title="Geburtstag"
        description="Feiern Sie Ihren besonderen Tag mit bunten Ballons. Von klassischen Zahlenballons bis zu personalisierten Geburtstagsballons – wir haben alles für Ihre Feier. (Auswahl an Servietten, Tellern, Bechern…)"
        heroImage="https://images.unsplash.com/photo-1485707302660-6ca974f1ae0a"
      />

      {/* Individuelle Dekoration Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 via-white to-blue-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Individuelle Geburtstag Dekoration
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Jeder Anlass ist einzigartig, und so sollte auch die Dekoration sein. Wir gestalten Ihre
            Ballondekoration ganz nach Ihren persönlichen Wünschen und Vorstellungen. Kontaktieren
            Sie uns für eine individuelle Beratung!
          </p>
        </div>
      </section>

      <ConsultationCTA />
    </>
  );
}
