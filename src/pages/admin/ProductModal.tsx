import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { X, Upload, Loader2 } from 'lucide-react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  categories: any[];
}

export default function ProductModal({ isOpen, onClose, onSave, categories }: ProductModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    available: true
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category_id) return alert("Selecciona una categoría");
    
    setLoading(true);

    try {
      let image_url = '';

      // 1. Subir imagen a Supabase Storage
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('menu-images')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('menu-images')
          .getPublicUrl(fileName);
        
        image_url = urlData.publicUrl;
      }

      // 2. Insertar en menu_items
      const { error } = await supabase
        .from('menu_items')
        .insert([{
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price) || 0, // Evita el NaN
          category_id: formData.category_id,
          available: formData.available,
          image_url: image_url
        }]);

      if (error) throw error;

      // Limpiar y cerrar
      setForm({ name: '', description: '', price: '', category_id: '', available: true });
      setImageFile(null);
      setPreview(null);
      onSave(); // Recarga la lista en MenuManager
      onClose();
      
    } catch (error: any) {
      alert("Error al guardar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-sb-dark/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="bg-sb-cream p-8 flex justify-between items-center border-b border-sb-red/10">
          <div>
            <h3 className="text-2xl font-black text-sb-dark">NUEVO PRODUCTO</h3>
            <p className="text-[10px] text-sb-red font-bold uppercase tracking-widest">Añade una delicia al menú</p>
          </div>
          <button onClick={onClose} className="bg-white text-sb-dark w-10 h-10 rounded-full flex items-center justify-center shadow-sm hover:bg-sb-red hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="flex justify-center">
            <label className="relative cursor-pointer group">
              <div className="w-32 h-32 rounded-[2.5rem] bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center overflow-hidden group-hover:border-sb-red transition-all">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Upload className="text-gray-400 group-hover:text-sb-red" />
                    <span className="text-[10px] font-bold text-gray-400 mt-2">SUBIR FOTO</span>
                  </>
                )}
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Nombre del Plato</label>
              <input 
                required
                className="w-full px-5 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-sb-red outline-none font-bold"
                value={formData.name}
                onChange={e => setForm({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Precio (COP)</label>
              <input 
                required
                type="number"
                className="w-full px-5 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-sb-red outline-none font-bold text-sb-red"
                value={formData.price}
                onChange={e => setForm({...formData, price: e.target.value})}
              />
            </div>

            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Categoría</label>
              <select 
                required
                className="w-full px-5 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-sb-red outline-none font-bold"
                value={formData.category_id}
                onChange={e => setForm({...formData, category_id: e.target.value})}
              >
                <option value="">Seleccionar...</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Descripción</label>
              <textarea 
                className="w-full px-5 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-sb-red outline-none font-medium text-sm h-24 resize-none"
                value={formData.description}
                onChange={e => setForm({...formData, description: e.target.value})}
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-sb-dark text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl hover:bg-sb-red transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'GUARDAR PRODUCTO'}
          </button>
        </form>
      </div>
    </div>
  );
}