import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: {
    default: 'Ballonkunst Lahr - Ballons & Geschenkideen in Lahr',
    template: '%s | Ballonkunst Lahr',
  },
  description:
    'Ballonkunst Lahr in Lahr – Ihr Spezialist für Ballons, Luftballons, Ballondekoration und kreative Geschenkideen für jeden Anlass.',
  keywords: [
    'Ballons Lahr',
    'Luftballons Lahr',
    'Ballondekoration Lahr',
    'Geschenkballons',
    'Ballon Geschenk',
    'Hochzeitsballons',
    'Geburtstagsballons',
    'Ballonladen Lahr',
    'Ballons Ortenau',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
