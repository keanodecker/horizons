import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Info, 
  Clock, 
  Newspaper, 
  Image as ImageIcon, 
  Phone, 
  LogOut,
  CheckCircle2,
  Trash2,
  Plus,
  Edit2,
  Loader2,
  AlertCircle,
  CalendarDays,
  Pencil
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/lib/supabaseClient.js';
import ImageUploadZone from '@/components/ImageUploadZone.jsx';

const ADMIN_PASSWORD = 'SpecialAdmindashboard';

// Helper component for inline editing
const InlineEdit = ({ value, onSave, type = 'text', label, placeholder }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value || '');

  useEffect(() => {
    setTempValue(value || '');
  }, [value]);

  const handleSave = () => {
    onSave(tempValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-2 bg-pink-50/50 p-4 rounded-lg border border-pink-100">
        <Label className="text-pink-700">{label}</Label>
        {type === 'textarea' ? (
          <Textarea 
            value={tempValue} 
            onChange={(e) => setTempValue(e.target.value)} 
            rows={4}
            className="bg-white"
            placeholder={placeholder}
          />
        ) : (
          <Input 
            value={tempValue} 
            onChange={(e) => setTempValue(e.target.value)} 
            className="bg-white"
            placeholder={placeholder}
          />
        )}
        <div className="flex gap-2 pt-2">
          <Button size="sm" onClick={handleSave} className="bg-pink-500 hover:bg-pink-600">Speichern</Button>
          <Button size="sm" variant="outline" onClick={() => { setTempValue(value); setIsEditing(false); }}>Abbrechen</Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => setIsEditing(true)} 
      className="group relative p-4 rounded-lg border border-transparent hover:border-pink-200 hover:bg-pink-50/30 cursor-pointer transition-all"
    >
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Pencil className="w-4 h-4 text-pink-400" />
      </div>
      <Label className="text-gray-500 mb-1 block">{label}</Label>
      <div className={`text-gray-900 ${type === 'textarea' ? 'whitespace-pre-wrap' : ''}`}>
        {value || <span className="text-gray-400 italic">{placeholder || 'Klicken zum Bearbeiten...'}</span>}
      </div>
    </div>
  );
};

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('startseite');
  const [saveStatus, setSaveStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Content State
  const [content, setContent] = useState({
    hero_title: '', hero_subtitle: '', hero_image: '', cta_button_1: '', cta_button_2: '', cta_button_3: '',
    about_text: '', about_image: '',
    hours_montag_v: '09:30–12:30', hours_montag_n: '14:30–18:00', 
    hours_dienstag_v: '09:30–12:30', hours_dienstag_n: '14:30–18:00',
    hours_mittwoch_closed: true, 
    hours_donnerstag_v: '09:30–12:30', hours_donnerstag_n: '14:30–18:00',
    hours_freitag_v: '09:30–12:30', hours_freitag_n: '14:30–18:00', 
    hours_samstag: '09:30–13:00', 
    hours_sonntag_closed: true,
    gallery_images: [],
    news: [], // Storing news in content table as JSON array
    contact_phone: '+49 7821 327082', contact_email: 'info@ballonkunst-herzog.at', contact_address: 'Kaiserstraße 25, 77933 Lahr'
  });

  // Events State (Separate Table)
  const [events, setEvents] = useState([]);
  const [eventForm, setEventForm] = useState({ 
    id: null, title: '', date: '', time: '', location: '', 
    short_description: '', full_description: '', cover_image: '', is_published: true 
  });
  const [isEditingEvent, setIsEditingEvent] = useState(false);

  // News State (Local form state before saving to content)
  const [newsForm, setNewsForm] = useState({ id: null, title: '', date: '', description: '' });
  const [isEditingNews, setIsEditingNews] = useState(false);

  // Check session on load
  useEffect(() => {
    const session = sessionStorage.getItem('admin_auth');
    if (session === 'true') {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError('');
    try {
      // Fetch Content
      const { data: contentData, error: contentError } = await supabase
        .from('content')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      if (contentError) throw contentError;
      if (contentData) {
        setContent(prev => ({ 
          ...prev, 
          ...contentData, 
          gallery_images: contentData.gallery_images || [],
          news: contentData.news || []
        }));
      }

      // Fetch Events
      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false });

      if (eventsError) throw eventsError;
      if (eventsData) {
        setEvents(eventsData);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Fehler beim Laden der Daten. Bitte überprüfen Sie die Datenbankverbindung.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setLoginError('');
      fetchData();
    } else {
      setLoginError('Falsches Passwort. Bitte erneut versuchen.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
    setPassword('');
  };

  const showSaveSuccess = () => {
    setSaveStatus('Gespeichert ✓');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleSaveContent = async (newContent = content) => {
    setIsLoading(true);
    setError('');
    try {
      const { error } = await supabase
        .from('content')
        .upsert({ id: 1, ...newContent });

      if (error) throw error;
      setContent(newContent);
      showSaveSuccess();
    } catch (err) {
      console.error('Error saving content:', err);
      setError('Fehler beim Speichern. Bitte versuchen Sie es erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentChange = (field, value) => {
    const updated = { ...content, [field]: value };
    setContent(updated);
    handleSaveContent(updated); // Auto-save on inline edit
  };

  // --- Event Handlers ---
  const handleSaveEvent = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const eventData = {
        title: eventForm.title,
        date: eventForm.date,
        time: eventForm.time,
        location: eventForm.location,
        short_description: eventForm.short_description,
        full_description: eventForm.full_description,
        cover_image: eventForm.cover_image,
        is_published: eventForm.is_published
      };

      if (isEditingEvent && eventForm.id) {
        const { error } = await supabase.from('events').update(eventData).eq('id', eventForm.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('events').insert([eventData]);
        if (error) throw error;
      }

      setEventForm({ id: null, title: '', date: '', time: '', location: '', short_description: '', full_description: '', cover_image: '', is_published: true });
      setIsEditingEvent(false);
      showSaveSuccess();
      fetchData();
    } catch (err) {
      console.error('Error saving event:', err);
      setError('Fehler beim Speichern des Events.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditEvent = (event) => {
    setEventForm(event);
    setIsEditingEvent(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Möchten Sie dieses Event wirklich löschen?')) return;
    setIsLoading(true);
    try {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) throw error;
      showSaveSuccess();
      fetchData();
    } catch (err) {
      console.error('Error deleting event:', err);
      setError('Fehler beim Löschen des Events.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- News Handlers ---
  const handleSaveNews = async (e) => {
    e.preventDefault();
    let updatedNews = [...(content.news || [])];
    
    if (isEditingNews && newsForm.id) {
      updatedNews = updatedNews.map(n => n.id === newsForm.id ? { ...newsForm } : n);
    } else {
      updatedNews.unshift({ ...newsForm, id: Date.now().toString() });
    }

    const updatedContent = { ...content, news: updatedNews };
    await handleSaveContent(updatedContent);
    
    setNewsForm({ id: null, title: '', date: '', description: '' });
    setIsEditingNews(false);
  };

  const handleEditNews = (newsItem) => {
    setNewsForm(newsItem);
    setIsEditingNews(true);
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm('Möchten Sie diesen Beitrag wirklich löschen?')) return;
    const updatedNews = content.news.filter(n => n.id !== id);
    await handleSaveContent({ ...content, news: updatedNews });
  };

  // --- Gallery Handlers ---
  const handleAddGalleryImage = async (url) => {
    if (!url) return;
    const updatedImages = [...content.gallery_images, url];
    await handleSaveContent({ ...content, gallery_images: updatedImages });
  };

  const handleDeleteGalleryImage = async (index) => {
    if (!window.confirm('Bild wirklich entfernen?')) return;
    const updatedImages = content.gallery_images.filter((_, i) => i !== index);
    await handleSaveContent({ ...content, gallery_images: updatedImages });
  };

  // --- Render Login ---
  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Admin Login - Ballonkunst Herzog</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center relative overflow-hidden font-['Inter']">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md z-10 border border-gray-100"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 font-['Nunito'] mb-2">Ballonkunst Herzog</h1>
              <p className="text-pink-500 font-semibold tracking-widest uppercase text-sm">Admin Dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password">Passwort</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus-visible:ring-pink-500"
                  placeholder="••••••••"
                />
                {loginError && <p className="text-red-500 text-sm mt-1">{loginError}</p>}
              </div>
              <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white transition-all duration-300 hover:scale-[1.02]">
                Einloggen
              </Button>
            </form>
          </motion.div>
        </div>
      </>
    );
  }

  // --- Render Dashboard ---
  const tabs = [
    { id: 'startseite', label: 'Startseite', icon: Home },
    { id: 'uber-uns', label: 'Über Uns', icon: Info },
    { id: 'dekoration', label: 'Dekoration', icon: ImageIcon },
    { id: 'galerie', label: 'Galerie', icon: ImageIcon },
    { id: 'oeffnungszeiten', label: 'Öffnungszeiten', icon: Clock },
    { id: 'aktuelles', label: 'Aktuelles', icon: Newspaper },
    { id: 'kontaktdaten', label: 'Kontaktdaten', icon: Phone },
    { id: 'events', label: 'Events', icon: CalendarDays },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Ballonkunst Herzog</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-['Inter']">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-20">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 font-['Nunito']">Admin Panel</h2>
            <p className="text-xs text-gray-500 mt-1">Ballonkunst Herzog</p>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-pink-50 text-pink-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-100">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Ausloggen
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Topbar */}
          <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 shadow-sm z-10">
            <h1 className="text-lg font-semibold text-gray-800 font-['Nunito']">
              {tabs.find(t => t.id === activeTab)?.label}
            </h1>
            <div className="flex items-center gap-4">
              {isLoading && <Loader2 className="w-5 h-5 text-pink-500 animate-spin" />}
              <AnimatePresence>
                {saveStatus && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-1.5 rounded-full text-sm font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {saveStatus}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </header>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            {error && (
              <div className="max-w-4xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8"
            >
              
              {/* 1. STARTSEITE */}
              {activeTab === 'startseite' && (
                <div className="space-y-8">
                  <div className="grid gap-6">
                    <InlineEdit 
                      label="Hauptüberschrift (Hero)" 
                      value={content.hero_title} 
                      onSave={(val) => handleContentChange('hero_title', val)} 
                      placeholder="Für jeden Anlass den perfekten Ballon"
                    />
                    <InlineEdit 
                      label="Untertext" 
                      type="textarea"
                      value={content.hero_subtitle} 
                      onSave={(val) => handleContentChange('hero_subtitle', val)} 
                      placeholder="Willkommen bei Ballonkunst Herzog..."
                    />
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 font-['Nunito']">Hintergrundbild</h3>
                    <ImageUploadZone 
                      currentUrl={content.hero_image} 
                      onUpload={(url) => handleContentChange('hero_image', url)} 
                      label="Hero Bild"
                    />
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 font-['Nunito']">Buttons</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <InlineEdit label="Button 1" value={content.cta_button_1} onSave={(val) => handleContentChange('cta_button_1', val)} placeholder="Jetzt vorbeikommen" />
                      <InlineEdit label="Button 2" value={content.cta_button_2} onSave={(val) => handleContentChange('cta_button_2', val)} placeholder="Ballons vorbestellen" />
                      <InlineEdit label="Button 3" value={content.cta_button_3} onSave={(val) => handleContentChange('cta_button_3', val)} placeholder="Mehr Anzeigen" />
                    </div>
                  </div>
                </div>
              )}

              {/* 2. ÜBER UNS */}
              {activeTab === 'uber-uns' && (
                <div className="space-y-8">
                  <InlineEdit 
                    label="Über Uns Text" 
                    type="textarea"
                    value={content.about_text} 
                    onSave={(val) => handleContentChange('about_text', val)} 
                    placeholder="Wir sind Ihr Spezialist für Ballons in Lahr..."
                  />
                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 font-['Nunito']">Über Uns Bild</h3>
                    <ImageUploadZone 
                      currentUrl={content.about_image} 
                      onUpload={(url) => handleContentChange('about_image', url)} 
                      label="Bild hochladen"
                    />
                  </div>
                </div>
              )}

              {/* 3. DEKORATION */}
              {activeTab === 'dekoration' && (
                <div className="space-y-8">
                  <p className="text-gray-600">Verwalten Sie hier die Bilder für die Dekorations-Seite.</p>
                  <ImageUploadZone 
                    currentUrl={content.deco_image} 
                    onUpload={(url) => handleContentChange('deco_image', url)} 
                    label="Dekoration Hauptbild"
                  />
                </div>
              )}

              {/* 4. GALERIE */}
              {activeTab === 'galerie' && (
                <div className="space-y-8">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-4">Neues Bild zur Galerie hinzufügen</h3>
                    <ImageUploadZone 
                      onUpload={handleAddGalleryImage} 
                      label="Bild hochladen"
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4">Vorhandene Bilder</h3>
                    {content.gallery_images.length === 0 ? (
                      <p className="text-center text-gray-500 py-8 border-2 border-dashed border-gray-200 rounded-xl">Keine Bilder in der Galerie.</p>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {content.gallery_images.map((url, index) => (
                          <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square">
                            <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button variant="destructive" size="sm" onClick={() => handleDeleteGalleryImage(index)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 5. ÖFFNUNGSZEITEN */}
              {activeTab === 'oeffnungszeiten' && (
                <div className="space-y-6">
                  {/* Montag */}
                  <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                    <div className="w-24 font-semibold uppercase text-gray-700">Montag</div>
                    <div className="flex gap-2 flex-1">
                      <Input placeholder="Vormittag (z.B. 09:30-12:30)" value={content.hours_montag_v} onChange={e => setContent({...content, hours_montag_v: e.target.value})} />
                      <Input placeholder="Nachmittag (z.B. 14:30-18:00)" value={content.hours_montag_n} onChange={e => setContent({...content, hours_montag_n: e.target.value})} />
                    </div>
                  </div>
                  {/* Dienstag */}
                  <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                    <div className="w-24 font-semibold uppercase text-gray-700">Dienstag</div>
                    <div className="flex gap-2 flex-1">
                      <Input placeholder="Vormittag" value={content.hours_dienstag_v} onChange={e => setContent({...content, hours_dienstag_v: e.target.value})} />
                      <Input placeholder="Nachmittag" value={content.hours_dienstag_n} onChange={e => setContent({...content, hours_dienstag_n: e.target.value})} />
                    </div>
                  </div>
                  {/* Mittwoch */}
                  <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                    <div className="w-24 font-semibold uppercase text-gray-700">Mittwoch</div>
                    <div className="flex items-center gap-2">
                      <Switch checked={content.hours_mittwoch_closed} onCheckedChange={checked => setContent({...content, hours_mittwoch_closed: checked})} />
                      <Label>Geschlossen</Label>
                    </div>
                  </div>
                  {/* Donnerstag */}
                  <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                    <div className="w-24 font-semibold uppercase text-gray-700">Donnerstag</div>
                    <div className="flex gap-2 flex-1">
                      <Input placeholder="Vormittag" value={content.hours_donnerstag_v} onChange={e => setContent({...content, hours_donnerstag_v: e.target.value})} />
                      <Input placeholder="Nachmittag" value={content.hours_donnerstag_n} onChange={e => setContent({...content, hours_donnerstag_n: e.target.value})} />
                    </div>
                  </div>
                  {/* Freitag */}
                  <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                    <div className="w-24 font-semibold uppercase text-gray-700">Freitag</div>
                    <div className="flex gap-2 flex-1">
                      <Input placeholder="Vormittag" value={content.hours_freitag_v} onChange={e => setContent({...content, hours_freitag_v: e.target.value})} />
                      <Input placeholder="Nachmittag" value={content.hours_freitag_n} onChange={e => setContent({...content, hours_freitag_n: e.target.value})} />
                    </div>
                  </div>
                  {/* Samstag */}
                  <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                    <div className="w-24 font-semibold uppercase text-gray-700">Samstag</div>
                    <div className="flex gap-2 flex-1">
                      <Input placeholder="Zeit (z.B. 09:30-13:00)" value={content.hours_samstag} onChange={e => setContent({...content, hours_samstag: e.target.value})} />
                    </div>
                  </div>
                  {/* Sonntag */}
                  <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                    <div className="w-24 font-semibold uppercase text-gray-700">Sonntag</div>
                    <div className="flex items-center gap-2">
                      <Switch checked={content.hours_sonntag_closed} onCheckedChange={checked => setContent({...content, hours_sonntag_closed: checked})} />
                      <Label>Geschlossen</Label>
                    </div>
                  </div>
                  <Button onClick={() => handleSaveContent(content)} disabled={isLoading} className="bg-pink-500 hover:bg-pink-600">Öffnungszeiten Speichern</Button>
                </div>
              )}

              {/* 6. AKTUELLES */}
              {activeTab === 'aktuelles' && (
                <div className="space-y-8">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-4">{isEditingNews ? 'Beitrag bearbeiten' : 'Neuen Beitrag hinzufügen'}</h3>
                    <form onSubmit={handleSaveNews} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Titel</Label>
                          <Input required value={newsForm.title} onChange={e => setNewsForm({...newsForm, title: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <Label>Datum</Label>
                          <Input type="date" required value={newsForm.date} onChange={e => setNewsForm({...newsForm, date: e.target.value})} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Text</Label>
                        <Textarea required rows={4} value={newsForm.description} onChange={e => setNewsForm({...newsForm, description: e.target.value})} />
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit" disabled={isLoading} className="bg-pink-500 hover:bg-pink-600">
                          {isEditingNews ? 'Aktualisieren' : 'Hinzufügen'}
                        </Button>
                        {isEditingNews && (
                          <Button type="button" variant="outline" onClick={() => { setIsEditingNews(false); setNewsForm({ id: null, title: '', date: '', description: '' }); }}>
                            Abbrechen
                          </Button>
                        )}
                      </div>
                    </form>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4">Vorhandene Beiträge</h3>
                    {(!content.news || content.news.length === 0) ? (
                      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                        <p className="text-gray-500">Noch keine Beiträge vorhanden.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {content.news.map((item) => (
                          <div key={item.id} className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900">{item.title}</h4>
                              <p className="text-sm text-gray-500 mb-2">{new Date(item.date).toLocaleDateString('de-DE')}</p>
                              <p className="text-gray-700 text-sm line-clamp-2">{item.description}</p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <Button variant="outline" size="sm" onClick={() => handleEditNews(item)}>
                                <Edit2 className="w-4 h-4 mr-1" /> Bearbeiten
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleDeleteNews(item.id)}>
                                <Trash2 className="w-4 h-4 mr-1" /> Löschen
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 7. KONTAKTDATEN */}
              {activeTab === 'kontaktdaten' && (
                <div className="space-y-6">
                  <InlineEdit 
                    label="Telefonnummer" 
                    value={content.contact_phone} 
                    onSave={(val) => handleContentChange('contact_phone', val)} 
                  />
                  <InlineEdit 
                    label="E-Mail Adresse" 
                    value={content.contact_email} 
                    onSave={(val) => handleContentChange('contact_email', val)} 
                  />
                  <InlineEdit 
                    label="Adresse" 
                    value={content.contact_address} 
                    onSave={(val) => handleContentChange('contact_address', val)} 
                  />
                </div>
              )}

              {/* 8. EVENTS */}
              {activeTab === 'events' && (
                <div className="space-y-8">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-4">{isEditingEvent ? 'Event bearbeiten' : 'Neues Event hinzufügen'}</h3>
                    <form onSubmit={handleSaveEvent} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Titel</Label>
                          <Input required value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <Label>Datum</Label>
                          <Input type="date" required value={eventForm.date} onChange={e => setEventForm({...eventForm, date: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <Label>Uhrzeit (Optional)</Label>
                          <Input value={eventForm.time} onChange={e => setEventForm({...eventForm, time: e.target.value})} placeholder="z.B. 14:00 - 18:00 Uhr" />
                        </div>
                        <div className="space-y-2">
                          <Label>Ort (Optional)</Label>
                          <Input value={eventForm.location} onChange={e => setEventForm({...eventForm, location: e.target.value})} placeholder="z.B. Lahr Marktplatz" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Kurzbeschreibung</Label>
                        <Textarea required rows={2} value={eventForm.short_description} onChange={e => setEventForm({...eventForm, short_description: e.target.value})} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Ausführliche Beschreibung (Optional)</Label>
                        <Textarea rows={5} value={eventForm.full_description} onChange={e => setEventForm({...eventForm, full_description: e.target.value})} />
                      </div>

                      <div className="space-y-2">
                        <Label>Cover Bild</Label>
                        <ImageUploadZone 
                          currentUrl={eventForm.cover_image} 
                          onUpload={(url) => setEventForm({...eventForm, cover_image: url})} 
                          label="Event Bild hochladen"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <Switch checked={eventForm.is_published} onCheckedChange={checked => setEventForm({...eventForm, is_published: checked})} />
                        <Label>Veröffentlicht (Sichtbar auf Website)</Label>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button type="submit" disabled={isLoading} className="bg-pink-500 hover:bg-pink-600">
                          {isEditingEvent ? 'Aktualisieren' : 'Hinzufügen'}
                        </Button>
                        {isEditingEvent && (
                          <Button type="button" variant="outline" onClick={() => { setIsEditingEvent(false); setEventForm({ id: null, title: '', date: '', time: '', location: '', short_description: '', full_description: '', cover_image: '', is_published: true }); }}>
                            Abbrechen
                          </Button>
                        )}
                      </div>
                    </form>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4">Vorhandene Events</h3>
                    {events.length === 0 ? (
                      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                        <p className="text-gray-500">Noch keine Events vorhanden. Ersten Event hinzufügen!</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {events.map((item) => (
                          <div key={item.id} className={`p-4 border rounded-lg bg-white shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center justify-between ${!item.is_published ? 'border-gray-200 opacity-75' : 'border-pink-100'}`}>
                            <div className="flex items-center gap-4 flex-1">
                              {item.cover_image && (
                                <img src={item.cover_image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                              )}
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-bold text-gray-900">{item.title}</h4>
                                  {!item.is_published && <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Entwurf</span>}
                                </div>
                                <p className="text-sm text-gray-500 mb-1">{new Date(item.date).toLocaleDateString('de-DE')} {item.time && `| ${item.time}`}</p>
                                <p className="text-gray-700 text-sm line-clamp-1">{item.short_description}</p>
                              </div>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <Button variant="outline" size="sm" onClick={() => handleEditEvent(item)}>
                                <Edit2 className="w-4 h-4 mr-1" /> Bearbeiten
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleDeleteEvent(item.id)}>
                                <Trash2 className="w-4 h-4 mr-1" /> Löschen
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminPage;