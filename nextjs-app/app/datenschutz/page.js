import { Shield, Lock, Database, Mail } from 'lucide-react';

export const metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung von Ballonkunst Lahr in Lahr.',
};

export default function DatenschutzPage() {
  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Datenschutzerklärung</h1>
          <p className="text-lg text-gray-600">
            Informationen über die Verarbeitung Ihrer personenbezogenen Daten
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold text-gray-900">1. Datenschutz auf einen Blick</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <h3 className="text-xl font-semibold text-gray-800">Allgemeine Hinweise</h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
                Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6">Datenerfassung auf dieser Website</h3>
              <p>
                <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
              </p>
              <p>
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
                Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser
                Datenschutzerklärung entnehmen.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-8 h-8 text-secondary" />
              <h2 className="text-2xl font-bold text-gray-900">
                2. Allgemeine Hinweise und Pflichtinformationen
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <h3 className="text-xl font-semibold text-gray-800">Hinweis zur verantwortlichen Stelle</h3>
              <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 my-4">
                <p className="font-semibold">Ballonkunst Lahr</p>
                <p>Inh. Sezer Ülker</p>
                <p>Kaiserstr. 25</p>
                <p>77933 Lahr</p>
                <p className="mt-2">Telefon: +49 (0) 7821 32 70 82</p>
                <p>E-Mail: info@ballonkunst-lahr.de</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-8 h-8 text-accent" />
              <h2 className="text-2xl font-bold text-gray-900">3. Datenerfassung auf dieser Website</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <h3 className="text-xl font-semibold text-gray-800">Cookies</h3>
              <p>
                Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Textdateien
                und richten auf Ihrem Endgerät keinen Schaden an.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6">Server-Log-Dateien</h3>
              <p>
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten
                Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <h3 className="text-xl font-semibold text-gray-800 mt-6">Anfrage per E-Mail oder Telefon</h3>
              <p>
                Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller
                daraus hervorgehenden personenbezogenen Daten zum Zwecke der Bearbeitung Ihres Anliegens
                bei uns gespeichert und verarbeitet.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold text-gray-900">4. SSL- bzw. TLS-Verschlüsselung</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher
                Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
                daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an
                dem Schloss-Symbol in Ihrer Browserzeile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
