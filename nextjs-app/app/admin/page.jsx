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

// ─── Settings Tab ────────────────────────────────────────────────
function SettingsTab({ settings, onChange, onSave, saving }) {
  const Field = ({ label, fieldKey, type = 'text', rows }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      {rows ? (
        <textarea
          rows={rows}
          value={settings[fieldKey] ?? ''}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 resize-none transition"
        />
      ) : (
        <input
          type={type}
          value={settings[fieldKey] ?? ''}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
        />
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          🎈 Hero-Bereich (Startseite)
        </h2>
        <div className="grid gap-4">
          <Field label="Überschrift" fieldKey="hero_headline" />
          <Field label="Untertext" fieldKey="hero_subtext" rows={3} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Button 1 Text" fieldKey="hero_cta1" />
            <Field label="Button 2 Text" fieldKey="hero_cta2" />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">ℹ️ Über uns / Ballons-Abschnitt</h2>
        <div className="grid gap-4">
          <Field label="Text" fieldKey="about_text" rows={4} />
          <Field label="Bild-URL" fieldKey="about_image_url" />
        </div>
      </section>

      {/* Hours */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">🕐 Öffnungszeiten</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Mo, Di, Do, Fr – Vormittag" fieldKey="hours_mo_di_do_fr_vm" />
          <Field label="Mo, Di, Do, Fr – Nachmittag" fieldKey="hours_mo_di_do_fr_nm" />
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
          <Field label="Samstag" fieldKey="hours_sa" />
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
          <Field label="Banner-Text" fieldKey="offer_text" rows={2} />
          <Field label="Banner-Bild-URL (optional)" fieldKey="offer_banner_url" />
        </div>
      </section>

      {/* Contact */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">📞 Kontaktdaten</h2>
        <div className="grid gap-4">
          <Field label="Telefon" fieldKey="contact_phone" />
          <Field label="E-Mail" fieldKey="contact_email" type="email" />
          <Field label="Adresse" fieldKey="contact_address" />
        </div>
      </section>

      <button
        onClick={onSave}
        disabled={saving}
        className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-lg"
      >
        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
        {saving ? 'Wird gespeichert...' : 'Alle Einstellungen speichern'}
      </button>
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
    setSaving(false);
    if (error) return toast('Fehler beim Speichern', 'error');
    toast('Beitrag erstellt!', 'success');
    setForm({ title: '', content: '', image_url: '', post_date: new Date().toISOString().split('T')[0] });
    setShowForm(false);
    loadPosts();
  }

  async function deletePost(id) {
    if (!confirm('Beitrag wirklich löschen?')) return;
    await supabase.from('news_posts').delete().eq('id', id);
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
  const fileRef = useRef();

  useEffect(() => { loadImages(); }, []);

  async function loadImages() {
    setLoading(true);
    const { data } = await supabase.from('gallery_images').select('*').order('created_at', { ascending: false });
    setImages(data ?? []);
    setLoading(false);
  }

  async function handleUpload(file) {
    setUploading(true);
    try {
      const url = await uploadImage(file, 'gallery');
      await supabase.from('gallery_images').insert([{ image_url: url, caption: caption.trim() || null }]);
      toast('Bild hochgeladen!', 'success');
      setCaption('');
      loadImages();
    } catch {
      toast('Upload fehlgeschlagen', 'error');
    }
    setUploading(false);
  }

  async function deleteImage(id, imageUrl) {
    if (!confirm('Bild wirklich löschen?')) return;
    await supabase.from('gallery_images').delete().eq('id', id);
    // Remove from storage
    const path = imageUrl.split('/site-images/')[1];
    if (path) await supabase.storage.from('site-images').remove([path]);
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
        <button
          onClick={() => fileRef.current.click()}
          disabled={uploading}
          className="w-full border-2 border-dashed border-pink-300 hover:border-pink-500 hover:bg-pink-50 rounded-xl py-8 flex flex-col items-center gap-3 text-pink-500 font-medium transition disabled:opacity-50"
        >
          {uploading ? (
            <><Loader2 className="w-8 h-8 animate-spin" /><span>Wird hochgeladen...</span></>
          ) : (
            <><Upload className="w-8 h-8" /><span>Bild auswählen</span><span className="text-xs text-gray-400">JPG, PNG, WebP</span></>
          )}
        </button>
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

// ─── Main Admin Page ─────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState('settings');
  const [settings, setSettings] = useState({});
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === '1') setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) loadAllSettings();
  }, [authed]);

  async function loadAllSettings() {
    setLoadingSettings(true);
    const { data } = await supabase.from('site_settings').select('key, value');
    const obj = {};
    data?.forEach(({ key, value }) => { obj[key] = value; });
    setSettings(obj);
    setLoadingSettings(false);
  }

  function handleSettingChange(key, value) {
    setSettings(prev => ({ ...prev, [key]: value }));
  }

  async function handleSaveSettings() {
    setSaving(true);
    try {
      await saveSettings(settings);
      showToast('Einstellungen gespeichert!', 'success');
    } catch {
      showToast('Fehler beim Speichern', 'error');
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

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {activeTab === 'settings' && (
          loadingSettings ? (
            <div className="text-center py-20 text-gray-400">
              <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3" />
              Einstellungen werden geladen...
            </div>
          ) : (
            <SettingsTab
              settings={settings}
              onChange={handleSettingChange}
              onSave={handleSaveSettings}
              saving={saving}
            />
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
