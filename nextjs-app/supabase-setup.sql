-- ══════════════════════════════════════════════════════════════════
-- Ballonkunst Lahr – Supabase Setup
-- Dieses Script einmal im Supabase SQL-Editor ausführen.
-- ══════════════════════════════════════════════════════════════════

-- 0. Alte Tabellen löschen (falls vorhanden)
-- ─────────────────────────────────────────────────────────────────

DROP TABLE IF EXISTS content CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS news_posts CASCADE;
DROP TABLE IF EXISTS gallery_images CASCADE;

-- 1. Tabellen erstellen
-- ─────────────────────────────────────────────────────────────────

CREATE TABLE site_settings (
  key         TEXT PRIMARY KEY,
  value       TEXT,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE news_posts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  content     TEXT,
  image_url   TEXT,
  post_date   DATE DEFAULT CURRENT_DATE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE gallery_images (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url   TEXT NOT NULL,
  caption     TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Row Level Security aktivieren & Richtlinien setzen
-- ─────────────────────────────────────────────────────────────────

ALTER TABLE site_settings   ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_posts       ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images   ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all_site_settings"  ON site_settings  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_news_posts"     ON news_posts      FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_gallery_images" ON gallery_images  FOR ALL USING (true) WITH CHECK (true);

-- 3. Standard-Werte einfügen
-- ─────────────────────────────────────────────────────────────────

INSERT INTO site_settings (key, value) VALUES
  ('hero_headline',         'Für jeden Anlass den perfekten Ballon'),
  ('hero_subtext',          'Willkommen bei Ballonkunst Lahr – Ihrem Spezialgeschäft für Ballons und kreative Geschenkideen im Herzen von Lahr. Wir bringen Farbe in Ihr Leben!'),
  ('hero_cta1',             'Jetzt vorbeikommen'),
  ('hero_cta2',             'Ballons vorbestellen'),
  ('about_text',            'Bei Ballonkunst Lahr finden Sie eine riesige Auswahl an Ballons für jeden Anlass. Von klassischen Latexballons über elegante Folienballons bis hin zu personalisierten Ballons mit Beschriftung – wir haben alles, was Ihr Herz begehrt.'),
  ('about_image_url',       ''),
  ('hours_mo_di_do_fr_vm',  '09:30 – 12:30'),
  ('hours_mo_di_do_fr_nm',  '14:30 – 18:00'),
  ('hours_mi_closed',       'true'),
  ('hours_sa',              '09:30 – 13:00'),
  ('hours_so_closed',       'true'),
  ('offer_text',            ''),
  ('offer_visible',         'false'),
  ('offer_banner_url',      ''),
  ('contact_phone',         '+49 7821 327082'),
  ('contact_email',         'info@ballonkunst-lahr.de'),
  ('contact_address',       'Kaiserstraße 25, 77933 Lahr');

-- 4. Storage Bucket
-- ─────────────────────────────────────────────────────────────────
-- Manuell im Supabase Dashboard anlegen:
-- Storage → "New bucket" → Name: "site-images" → Public: JA
