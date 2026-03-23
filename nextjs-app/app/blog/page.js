import { supabase } from '@/lib/supabase';
import EventsPage from './PageContent';

export const revalidate = 60;

export const metadata = {
  title: 'Blog',
  description: 'Neuigkeiten, Tipps und Inspirationen rund um Ballons und Dekoration von Ballonkunst Lahr in Lahr.',
};

export default async function Page() {
  const { data: posts } = await supabase
    .from('news_posts')
    .select('*')
    .order('post_date', { ascending: false });

  return <EventsPage posts={posts ?? []} />;
}
