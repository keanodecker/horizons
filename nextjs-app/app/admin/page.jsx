'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase, saveSettings, uploadImage } from '@/lib/supabase';
import {
  Settings, Image, Newspaper, LogOut, Save, Plus, Trash2,
  Eye, EyeOff, Upload, CheckCircle, AlertCircle, X, Loader2
} from 'lucide-react';

// ─── Simple password gate ────────────────────────────────────────
const ADMIN_PASSWORD = 'ballonlahr2024';

function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', '1');
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎈</div>
          <h1 className="text-2xl font-bold text-gray-900">Admin-Bereich</h1>
          <p className="text-gray-500 text-sm mt-1">Ballonkunst Lahr</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            placeholder="Passwort"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className={`w-full border-2 rounded-xl px-4 py-3 text-gray-900 outline-none transition-colors ${
              error ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-pink-400'
            }`}
            autoFocus
          />
          {error && <p className="text-red-500 text-sm text-center">Falsches Passwort</p>}
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition-colors"
          >
            Anmelden
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Toast notification ──────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl text-white font-medium transition-all ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`}>
      {type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
      {message}
      <button onClick={onClose}><X className="w-4 h-4" /></button>
    </div>
  );
}

// ─── Reusable Field component (defined OUTSIDE SettingsTab to prevent focus loss) ──
function Field({ label, fieldKey, type, rows, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      {rows ? (
        <textarea
          rows={rows}
          value={value ?? ''}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 resize-none transition"
        />
      ) : (
        <input
          type={type || 'text'}
          value={value ?? ''}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
        />
      )}
    </div>
  );
}

// ─── Settings Tab ────────────────────────────────────────────────
function SettingsTab({ settings, onChange, onSave, onReset, saving }) {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          🎈 Hero-Bereich (Startseite)
        </h2>
        <div className="grid gap-4">
          <Field label="Überschrift" fieldKey="hero_headline" value={settings['hero_headline']} onChange={onChange} />
          <Field label="Untertext" fieldKey="hero_subtext" rows={3} value={settings['hero_subtext']} onChange={onChange} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Button 1 Text" fieldKey="hero_cta1" value={settings['hero_cta1']} onChange={onChange} />
            <Field label="Button 2 Text" fieldKey="hero_cta2" value={settings['hero_cta2']} onChange={onChange} />
          </div>
        </div>
      </section>

      {/* Info Box */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">ℹ️ Info-Box (unter Hero)</h2>
        <p className="text-sm text-gray-500 mb-4">
          Die Info-Box zeigt "19 Jahre Erfahrung", "600+ Themenballons", "Nachhaltigkeit" und "Geschenke & Deko".
        </p>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Info-Box anzeigen?</label>
          <select
            value={settings['info_box_visible'] ?? 'true'}
            onChange={(e) => onChange('info_box_visible', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-pink-400 transition"
          >
            <option value="true">Ja – anzeigen</option>
            <option value="false">Nein – versteckt</option>
          </select>
        </div>
      </section>

      {/* About */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">🎈 Über uns / Ballons-Abschnitt</h2>
        <div className="grid gap-4">
          <Field label="Text" fieldKey="about_text" rows={4} value={settings['about_text']} onChange={onChange} />
          <Field label="Bild-URL" fieldKey="about_image_url" value={settings['about_image_url']} onChange={onChange} />
        </div>
      </section>

      {/* Hours */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">🕐 Öffnungszeiten</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Mo, Di, Do, Fr – Vormittag" fieldKey="hours_mo_di_do_fr_vm" value={settings['hours_mo_di_do_fr_vm']} onChange={onChange} />
          <Field label="Mo, Di, Do, Fr – Nachmittag" fieldKey="hours_mo_di_do_fr_nm" value={settings['hours_mo_di_do_fr_nm']} onChange={onChange} />
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Mittwoch geschlossen?</label>
            <select
              value={settings['hours_mi_closed'] ?? 'true'}
              onChange={(e) => onChange('hours_mi_closed', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-pink-400 transition"
            >
              <option value="true">Ja – geschlossen</option>
              <option value="false">Nein – Zeiten angeben</option>
            </select>
          </div>
          <Field label="Samstag" fieldKey="hours_sa" value={settings['hours_sa']} onChange={onChange} />
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Sonntag geschlossen?</label>
            <select
              value={settings['hours_so_closed'] ?? 'true'}
              onChange={(e) => onChange('hours_so_closed', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-pink-400 transition"
            >
              <option value="true">Ja – geschlossen</option>
              <option value="false">Nein – Zeiten angeben</option>
            </select>
          </div>
        </div>
      </section>

      {/* Offer Banner */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">📣 Aktions-Banner (Homepage)</h2>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Banner anzeigen?</label>
            <select
              value={settings['offer_visible'] ?? 'false'}
              onChange={(e) => onChange('offer_visible', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-pink-400 transition"
            >
              <option value="false">Nein – versteckt</option>
              <option value="true">Ja – anzeigen</option>
            </select>
          </div>
          <Field label="Banner-Text" fieldKey="offer_text" rows={2} value={settings['offer_text']} onChange={onChange} />
          <Field label="Banner-Bild-URL (optional)" fieldKey="offer_banner_url" value={settings['offer_banner_url']} onChange={onChange} />
        </div>
      </section>

      {/* Contact */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">📞 Kontaktdaten</h2>
        <div className="grid gap-4">
          <Field label="Telefon" fieldKey="contact_phone" value={settings['contact_phone']} onChange={onChange} />
          <Field label="E-Mail" fieldKey="contact_email" type="email" value={settings['contact_email']} onChange={onChange} />
          <Field label="Adresse" fieldKey="contact_address" value={settings['contact_address']} onChange={onChange} />
        </div>
      </section>

      <div className="flex gap-3">
        <button
          onClick={onSave}
          disabled={saving}
          className="flex-1 bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-lg"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {saving ? 'Wird gespeichert...' : 'Speichern'}
        </button>
        <button
          onClick={onReset}
          disabled={saving}
          className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-4 px-6 rounded-2xl transition-all"
          title="Auf Standardwerte zurücksetzen"
        >
          Zurücksetzen
        </button>
      </div>
    </div>
  );
}

// ─── Blog/News Tab ───────────────────────────────────────────────
function BlogTab({ toast }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', content: '', image_url: '', post_date: new Date().toISOString().split('T')[0] });
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const fileRef = useRef();

  useEffect(() => { loadPosts(); }, []);

  async function loadPosts() {
    setLoading(true);
    const { data } = await supabase.from('news_posts').select('*').order('post_date', { ascending: false });
    setPosts(data ?? []);
    setLoading(false);
  }

  async function handleImageUpload(file) {
    try {
      const url = await uploadImage(file, 'blog');
      setForm(f => ({ ...f, image_url: url }));
      toast('Bild hochgeladen!', 'success');
    } catch {
      toast('Bild-Upload fehlgeschlagen', 'error');
    }
  }

  async function createPost() {
    if (!form.title.trim()) return toast('Titel ist pflicht', 'error');
    setSaving(true);
    const { error } = await supabase.from('news_posts').insert([form]);
    if (error) {
      setSaving(false);
      return toast('Fehler beim Speichern', 'error');
    }
    await fetch('/api/revalidate', { method: 'POST' });
    setSaving(false);
    toast('Beitrag erstellt!', 'success');
    setForm({ title: '', content: '', image_url: '', post_date: new Date().toISOString().split('T')[0] });
    setShowForm(false);
    loadPosts();
  }

  async function deletePost(id) {
    if (!confirm('Beitrag wirklich löschen?')) return;
    await supabase.from('news_posts').delete().eq('id', id);
    await fetch('/api/revalidate', { method: 'POST' });
    toast('Beitrag gelöscht', 'success');
    loadPosts();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Blog / Neuigkeiten</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-xl transition"
        >
          <Plus className="w-4 h-4" />
          Neuer Beitrag
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h3 className="font-bold text-gray-900">Neuer Beitrag</h3>
          <input
            placeholder="Titel *"
            value={form.title}
            onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
          />
          <textarea
            placeholder="Inhalt (optional)"
            rows={4}
            value={form.content}
            onChange={(e) => setForm(f => ({ ...f, content: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 resize-none transition"
          />
          <input
            type="date"
            value={form.post_date}
            onChange={(e) => setForm(f => ({ ...f, post_date: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pink-400 transition"
          />
          <div className="flex gap-3 items-center">
            <input
              placeholder="Bild-URL (optional)"
              value={form.image_url}
              onChange={(e) => setForm(f => ({ ...f, image_url: e.target.value }))}
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pink-400 transition"
            />
            <input type="file" ref={fileRef} className="hidden" accept="image/*" onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0])} />
            <button onClick={() => fileRef.current.click()} className="flex items-center gap-2 border-2 border-pink-300 text-pink-600 hover:bg-pink-50 px-4 py-3 rounded-xl transition font-medium">
              <Upload className="w-4 h-4" /> Hochladen
            </button>
          </div>
          {form.image_url && (
            <img src={form.image_url} alt="Vorschau" className="h-32 w-auto rounded-xl object-cover" />
          )}
          <div className="flex gap-3">
            <button onClick={createPost} disabled={saving} className="flex-1 bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Speichern
            </button>
            <button onClick={() => setShowForm(false)} className="px-6 py-3 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition">
              Abbrechen
            </button>
          </div>
        </div>
      )}

      {/* Posts list */}
      {loading ? (
        <div className="text-center py-12 text-gray-400"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />Lade...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100">
          <Newspaper className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Noch keine Beiträge</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex gap-4">
              {post.image_url && (
                <img src={post.image_url} alt={post.title} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-gray-900 truncate">{post.title}</h3>
                  <button onClick={() => deletePost(post.id)} className="text-red-400 hover:text-red-600 flex-shrink-0 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">{post.post_date}</p>
                {post.content && <p className="text-sm text-gray-600 mt-2 line-clamp-2">{post.content}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Gallery Tab ─────────────────────────────────────────────────
function GalleryTab({ toast }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef();

  useEffect(() => { loadImages(); }, []);

  async function loadImages() {
    setLoading(true);
    const { data } = await supabase.from('gallery_images').select('*').order('created_at', { ascending: false });
    setImages(data ?? []);
    setLoading(false);
  }

  async function handleUpload(file) {
    if (!file || !file.type.startsWith('image/')) {
      toast('Nur Bilddateien erlaubt', 'error');
      return;
    }
    setUploading(true);
    try {
      const url = await uploadImage(file, 'gallery');
      const { error } = await supabase.from('gallery_images').insert([{ image_url: url, caption: caption.trim() || null }]);
      if (error) throw new Error(error.message);
      await fetch('/api/revalidate', { method: 'POST' });
      toast('Bild hochgeladen!', 'success');
      setCaption('');
      loadImages();
    } catch (err) {
      toast(`Upload fehlgeschlagen: ${err.message}`, 'error');
    }
    setUploading(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  }

  async function deleteImage(id, imageUrl) {
    if (!confirm('Bild wirklich löschen?')) return;
    await supabase.from('gallery_images').delete().eq('id', id);
    const path = imageUrl.split('/site-images/')[1];
    if (path) await supabase.storage.from('site-images').remove([path]);
    await fetch('/api/revalidate', { method: 'POST' });
    toast('Bild gelöscht', 'success');
    loadImages();
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-900">Galerie</h2>

      {/* Upload area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Neues Bild hochladen</h3>
        <input
          placeholder="Bildunterschrift (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-3 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
        />
        <input
          type="file"
          ref={fileRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => e.target.files[0] && handleUpload(e.target.files[0])}
        />
        <div
          onClick={() => !uploading && fileRef.current.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`w-full border-2 border-dashed rounded-xl py-10 flex flex-col items-center gap-3 font-medium transition cursor-pointer select-none ${
            uploading
              ? 'border-pink-200 text-pink-300 cursor-not-allowed opacity-60'
              : dragOver
              ? 'border-pink-500 bg-pink-100 text-pink-600 scale-[1.01]'
              : 'border-pink-300 hover:border-pink-500 hover:bg-pink-50 text-pink-500'
          }`}
        >
          {uploading ? (
            <><Loader2 className="w-8 h-8 animate-spin" /><span>Wird hochgeladen...</span></>
          ) : dragOver ? (
            <><Upload className="w-8 h-8" /><span>Loslassen zum Hochladen</span></>
          ) : (
            <><Upload className="w-8 h-8" /><span>Bild hierher ziehen oder klicken</span><span className="text-xs text-gray-400">JPG, PNG, WebP</span></>
          )}
        </div>
      </div>

      {/* Images grid */}
      {loading ? (
        <div className="text-center py-12 text-gray-400"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />Lade...</div>
      ) : images.length === 0 ? (
        <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100">
          <Image className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Noch keine Bilder</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="group relative rounded-xl overflow-hidden aspect-square bg-gray-100 shadow-sm">
              <img src={img.image_url} alt={img.caption ?? ''} className="w-full h-full object-cover" />
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-2 py-1 truncate">
                  {img.caption}
                </div>
              )}
              <button
                onClick={() => deleteImage(img.id, img.image_url)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const DEFAULT_SETTINGS = {
  hero_headline:        'Für jeden Anlass den perfekten Ballon',
  hero_subtext:         'Willkommen bei Ballonkunst Lahr – Ihrem Spezialgeschäft für Ballons und kreative Geschenkideen im Herzen von Lahr. Wir bringen Farbe in Ihr Leben!',
  hero_cta1:            'Jetzt vorbeikommen',
  hero_cta2:            'Ballons vorbestellen',
  about_text:           'Bei Ballonkunst Lahr finden Sie eine riesige Auswahl an Ballons für jeden Anlass. Von klassischen Latexballons über elegante Folienballons bis hin zu personalisierten Ballons mit Beschriftung – wir haben alles, was Ihr Herz begehrt.',
  about_image_url:      '',
  hours_mo_di_do_fr_vm: '09:30 – 12:30',
  hours_mo_di_do_fr_nm: '14:30 – 18:00',
  hours_mi_closed:      'true',
  hours_sa:             '09:30 – 13:00',
  hours_so_closed:      'true',
  offer_text:           '',
  offer_visible:        'false',
  offer_banner_url:     '',
  contact_phone:        '+49 7821 327082',
  contact_email:        'info@ballonkunst-lahr.de',
  contact_address:      'Kaiserstraße 25, 77933 Lahr',
  info_box_visible:     'true',
};

// ─── Main Admin Page ─────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState('settings');
  const [settings, setSettings] = useState({});
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [dbStatus, setDbStatus] = useState(null); // 'ok' | 'error' | null

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === '1') setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) loadAllSettings();
  }, [authed]);

  async function loadAllSettings() {
    setLoadingSettings(true);
    const { data, error } = await supabase.from('site_settings').select('key, value');
    if (error) {
      setDbStatus('error');
    } else {
      setDbStatus('ok');
      const obj = {};
      data?.forEach(({ key, value }) => { obj[key] = value; });
      setSettings(obj);
    }
    setLoadingSettings(false);
  }

  function handleSettingChange(key, value) {
    setSettings(prev => ({ ...prev, [key]: value }));
  }

  async function handleSaveSettings() {
    setSaving(true);
    try {
      await saveSettings(settings);
      try { await fetch('/api/revalidate', { method: 'POST' }); } catch (_) {}
      showToast('Einstellungen gespeichert! Website wird aktualisiert.', 'success');
    } catch (err) {
      showToast(`Fehler beim Speichern: ${err.message}`, 'error');
    }
    setSaving(false);
  }

  async function handleResetToDefaults() {
    if (!confirm('Alle Einstellungen auf Standardwerte zurücksetzen? Eigene Texte gehen verloren.')) return;
    setSaving(true);
    try {
      await saveSettings(DEFAULT_SETTINGS);
      setSettings(DEFAULT_SETTINGS);
      try { await fetch('/api/revalidate', { method: 'POST' }); } catch (_) {}
      showToast('Auf Standardwerte zurückgesetzt!', 'success');
    } catch (err) {
      showToast(`Fehler: ${err.message}`, 'error');
    }
    setSaving(false);
  }

  function showToast(message, type) {
    setToastMsg({ message, type });
  }

  function logout() {
    sessionStorage.removeItem('admin_auth');
    setAuthed(false);
  }

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  const tabs = [
    { id: 'settings', label: 'Einstellungen', icon: Settings },
    { id: 'blog', label: 'Blog', icon: Newspaper },
    { id: 'gallery', label: 'Galerie', icon: Image },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎈</span>
            <div>
              <span className="font-bold text-gray-900">Admin</span>
              <span className="text-gray-400 text-sm ml-2">Ballonkunst Lahr</span>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Abmelden
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 flex gap-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === id
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* DB Status Banner */}
      {dbStatus === 'error' && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-3">
          <div className="max-w-5xl mx-auto flex items-center gap-3 text-red-700 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span><strong>Datenbankverbindung fehlgeschlagen.</strong> Änderungen können nicht gespeichert werden. Bitte prüfe die Supabase RLS-Richtlinien und ob die Tabellen existieren.</span>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {activeTab === 'settings' && (
          loadingSettings ? (
            <div className="text-center py-20 text-gray-400">
              <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3" />
              Einstellungen werden geladen...
            </div>
          ) : (
            <>
              {dbStatus === 'error' && (
                <div className="mb-6 bg-orange-50 border border-orange-200 rounded-2xl p-5">
                  <p className="font-bold text-orange-800 mb-2">⚠️ Datenbank nicht erreichbar</p>
                  <p className="text-sm text-orange-700 mb-3">Führe dieses SQL in Supabase aus um die Verbindung zu reparieren:</p>
                  <pre className="text-xs bg-white border border-orange-200 rounded-lg p-3 overflow-auto text-gray-800 select-all">{`ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY "allow_all_site_settings" ON site_settings
  FOR ALL USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;`}</pre>
                </div>
              )}
              <SettingsTab
                settings={settings}
                onChange={handleSettingChange}
                onSave={handleSaveSettings}
                onReset={handleResetToDefaults}
                saving={saving}
              />
            </>
          )
        )}
        {activeTab === 'blog' && <BlogTab toast={showToast} />}
        {activeTab === 'gallery' && <GalleryTab toast={showToast} />}
      </main>

      {/* Toast */}
      {toastMsg && (
        <Toast
          message={toastMsg.message}
          type={toastMsg.type}
          onClose={() => setToastMsg(null)}
        />
      )}
    </div>
  );
}
