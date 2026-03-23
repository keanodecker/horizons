import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rrblntehwdzyuqlpcshi.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyYmxudGVod2R6eXVxbHBjc2hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNjM1NzgsImV4cCI6MjA4ODgzOTU3OH0.B1n4t-ropIz8h556OSeibhgSLAL-xR5brncEOcMylUk';

export const supabase = createClient(supabaseUrl, supabaseKey);

// ─── Site settings helpers ────────────────────────────────────────────────────

export async function loadSettings(keys) {
  const { data } = await supabase
    .from('site_settings')
    .select('key, value')
    .in('key', keys);
  const result = {};
  data?.forEach(({ key, value }) => {
    result[key] = value;
  });
  return result;
}

export async function saveSetting(key, value) {
  await supabase
    .from('site_settings')
    .upsert({ key, value: String(value), updated_at: new Date().toISOString() });
}

export async function saveSettings(obj) {
  const rows = Object.entries(obj).map(([key, value]) => ({
    key,
    value: String(value ?? ''),
    updated_at: new Date().toISOString(),
  }));
  await supabase.from('site_settings').upsert(rows);
}

// ─── Storage helper ───────────────────────────────────────────────────────────

export async function uploadImage(file, folder = 'general') {
  const ext = file.name.split('.').pop();
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage
    .from('site-images')
    .upload(path, file, { upsert: true });
  if (error) throw error;
  const {
    data: { publicUrl },
  } = supabase.storage.from('site-images').getPublicUrl(path);
  return publicUrl;
}
