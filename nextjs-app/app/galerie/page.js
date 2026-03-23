import { supabase } from '@/lib/supabase';
import GalleryPage from './PageContent';

export const revalidate = 60;

export const metadata = {
  title: 'Galerie',
  description: 'Entdecken Sie unsere Galerie mit Ballondekorationen für Geburtstag, Hochzeit, Baby, Schulanfang und mehr. Ballonkunst Lahr in Lahr.',
};

export default async function Page() {
  const { data: images } = await supabase
    .from('gallery_images')
    .select('*')
    .order('created_at', { ascending: false });

  return <GalleryPage dbImages={images ?? []} />;
}
