import { Scale, MapPin, Phone, Mail, FileText } from 'lucide-react';

export const metadata = {
  title: 'Impressum',
  description: 'Impressum und rechtliche Hinweise von Ballonkunst Lahr in Lahr.',
};

export default function ImpressumPage() {
  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Impressum</h1>
          <p className="text-lg text-gray-600">Rechtliche Informationen und Anbieterkennzeichnung</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-gray-900">Angaben gemäß § 5 TMG</h2>
            </div>
            <div className="space-y-2 text-gray-700">
              <p className="font-semibold text-lg">Ballonkunst Lahr</p>
              <p>Inh. Sezer Ülker</p>
              <div className="flex items-start gap-2 mt-4">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p>Kaiserstr. 25</p>
                  <p>77933 Lahr</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Phone className="w-6 h-6 text-secondary" />
              <h2 className="text-2xl font-bold text-gray-900">Kontakt</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <p>+49 (0) 7821 32 70 82</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <a href="mailto:info@ballonkunst-lahr.de" className="text-primary hover:underline">
                  info@ballonkunst-lahr.de
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Umsatzsteuer-ID</h2>
            <p className="text-gray-700">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
              <br />
              <span className="font-mono bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                DE2835 013 19
              </span>
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-accent" />
              <h2 className="text-xl font-bold text-gray-900">EU-Streitschlichtung</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline break-all"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              .
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
              Verbraucherstreitbeilegung/Universalschlichtungsstelle
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Haftung für Inhalte</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach
              den allgemeinen Gesetzen verantwortlich.
            </p>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Haftung für Links</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
              Einfluss haben.
            </p>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Urheberrecht</h2>
            <p className="text-gray-700 leading-relaxed">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
              dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung
              des jeweiligen Autors bzw. Erstellers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
