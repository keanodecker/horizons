
import React from 'react';
import { Helmet } from 'react-helmet';
import { Shield, Lock, Database, Mail } from 'lucide-react';

const DatenschutzPage = () => {
  return (
    <>
      <Helmet>
        <title>Datenschutzerklärung - Ballonkunst Herzog Lahr</title>
        <meta name="description" content="Datenschutzerklärung von Ballonkunst Herzog in Lahr. Informationen zur Erhebung und Verarbeitung Ihrer Daten." />
      </Helmet>

      <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Datenschutzerklärung</h1>
            <p className="text-lg text-gray-600">Informationen über die Verarbeitung Ihrer personenbezogenen Daten</p>
          </div>

          <div className="space-y-8">
            {/* Section 1 */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold text-gray-900">1. Datenschutz auf einen Blick</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800">Allgemeine Hinweise</h3>
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
                </p>
                <h3 className="text-xl font-semibold text-gray-800 mt-6">Datenerfassung auf dieser Website</h3>
                <p><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong></p>
                <p>
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-8 h-8 text-secondary" />
                <h2 className="text-2xl font-bold text-gray-900">2. Allgemeine Hinweise und Pflichtinformationen</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800">Hinweis zur verantwortlichen Stelle</h3>
                <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 my-4">
                  <p className="font-semibold">Doris Herzog</p>
                  <p>Ballonkunst Herzog</p>
                  <p>Kaiserstr. 25</p>
                  <p>77933 Lahr</p>
                  <p className="mt-2">Telefon: +49 (0) 7821 32 70 82</p>
                  <p>E-Mail: info@ballonkunst-herzog.de</p>
                </div>
                <p>
                  Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-8 h-8 text-accent" />
                <h2 className="text-2xl font-bold text-gray-900">3. Datenerfassung auf dieser Website</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800">Cookies</h3>
                <p>
                  Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
                </p>
                <h3 className="text-xl font-semibold text-gray-800 mt-6">Server-Log-Dateien</h3>
                <p>
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
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
                  Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold text-gray-900">4. SSL- bzw. TLS-Verschlüsselung</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                </p>
                <p>
                  Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default DatenschutzPage;
