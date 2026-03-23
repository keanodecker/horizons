import { loadSettings } from '@/lib/supabase';
import HomePageClient from './HomePageClient';

export const revalidate = 60; // ISR: alle 60 Sekunden neu laden

export default async function HomePage() {
  const settings = await loadSettings([
    'hero_headline', 'hero_subtext', 'hero_cta1', 'hero_cta2',
    'about_text', 'about_image_url',
    'offer_visible', 'offer_text', 'offer_banner_url',
    'contact_phone', 'contact_address',
    'hours_mo_di_do_fr_vm', 'hours_mo_di_do_fr_nm',
    'hours_mi_closed', 'hours_sa', 'hours_so_closed',
  ]);

  return <HomePageClient settings={settings} />;
}
