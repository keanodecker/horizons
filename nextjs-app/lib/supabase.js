import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lbdhcdtbysbriejwaagb.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiZGhjZHRieXNicmllandhYWdiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDM2MDgwMSwiZXhwIjoyMDg5OTM2ODAxfQ.4l8ZP0ocbaGIDoVcBIwBrfqBwbyc0BDwqeZlsUVnpIQ';

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
  const { error } = await supabase.from('site_settings').upsert(rows, { onConflict: 'key' });
  if (error) throw new Error(error.message);
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
