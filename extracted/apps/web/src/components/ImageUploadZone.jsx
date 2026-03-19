import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Loader2, X } from 'lucide-react';
import { uploadImage } from '@/lib/supabaseStorage.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ImageUploadZone = ({ currentUrl, onUpload, label = "Bild hochladen" }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [manualUrl, setManualUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      await processUpload(file);
    }
  };

  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await processUpload(file);
    }
  };

  const processUpload = async (file) => {
    setIsUploading(true);
    const { url, error } = await uploadImage(file);
    setIsUploading(false);
    
    if (error) {
      alert('Fehler beim Hochladen des Bildes: ' + error.message);
    } else if (url) {
      onUpload(url);
    }
  };

  const handleManualUrlSubmit = (e) => {
    e.preventDefault();
    if (manualUrl) {
      onUpload(manualUrl);
      setManualUrl('');
      setShowUrlInput(false);
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-xs text-pink-500 hover:text-pink-600"
        >
          {showUrlInput ? 'Abbrechen' : 'URL manuell eingeben'}
        </Button>
      </div>

      {showUrlInput && (
        <form onSubmit={handleManualUrlSubmit} className="flex gap-2">
          <Input 
            value={manualUrl} 
            onChange={(e) => setManualUrl(e.target.value)} 
            placeholder="https://example.com/image.jpg" 
            className="flex-1"
          />
          <Button type="submit" variant="secondary">Einfügen</Button>
        </form>
      )}

      <div 
        className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden min-h-[160px]
          ${isDragging ? 'border-pink-500 bg-pink-50' : 'border-gray-300 hover:border-pink-400 hover:bg-gray-50'}
          ${currentUrl ? 'border-none p-0' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !currentUrl && fileInputRef.current?.click()}
      >
        {isUploading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
            <Loader2 className="w-8 h-8 text-pink-500 animate-spin mb-2" />
            <p className="text-sm font-medium text-gray-600">Wird hochgeladen...</p>
          </div>
        )}

        {currentUrl ? (
          <div className="relative w-full h-full group">
            <img src={currentUrl} alt="Preview" className="w-full h-48 object-cover rounded-xl" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 rounded-xl">
              <Button 
                type="button" 
                variant="secondary" 
                size="sm" 
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              >
                <Upload className="w-4 h-4 mr-2" /> Ersetzen
              </Button>
              <Button 
                type="button" 
                variant="destructive" 
                size="sm" 
                onClick={(e) => { e.stopPropagation(); onUpload(''); }}
              >
                <X className="w-4 h-4 mr-2" /> Entfernen
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-3">
              <ImageIcon className="w-6 h-6 text-pink-500" />
            </div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              Bild hierher ziehen oder klicken
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, WEBP bis zu 5MB
            </p>
          </>
        )}
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileInput} 
          accept="image/*" 
          className="hidden" 
        />
      </div>
    </div>
  );
};

export default ImageUploadZone;