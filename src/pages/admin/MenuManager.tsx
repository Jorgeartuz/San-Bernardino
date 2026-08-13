import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { formatCurrency } from '../../lib/constants';
import { Plus, Edit3, Power, PowerOff, Image as ImageIcon } from 'lucide-react';
import ProductModal from './ProductModal'; // ✅ Importado correctamente

export default function MenuManager() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ Control del modal

  const fetchMenu = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('categories')
      .select(`
        *,
        menu_items (*)
      `)
      .order('display_order', { ascending: true });

    if (!error && data) setCategories(data);
    setLoading(false);
  };

  useEffect(() => { fetchMenu(); }, []);

  const toggleAvailability = async (itemId: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('menu_items')
      .update({ available: !currentStatus })
      .eq('id', itemId);
    
    if (!error) fetchMenu(); // Recargar lista para ver el cambio
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <div className="w-10 h-10 border-4 border-sb-red border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Cargando Menú Administrativo...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-sb-dark uppercase italic">Gestión de Menú</h2>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">Control total de la carta</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsModalOpen(true)} // ✅ Ahora el botón abre el modal
            className="flex items-center gap-2 bg-sb-red text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-sb-red/20 hover:scale-105 transition-all"
          >
            <Plus size={18} /> Nuevo Producto
          </button>
        </div>
      </div>

      {/* --- LISTADO POR CATEGORÍAS --- */}
      <div className="space-y-12">
        {categories.map((cat) => (
          <div key={cat.id} className="space-y-4">
            <div className="flex items-center gap-4">
              <h3 className="text-sm font-black text-sb-red uppercase tracking-[0.3em]">{cat.name}</h3>
              <div className="flex-1 h-px bg-gray-100"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {cat.menu_items?.map((item: any) => (
                <div key={item.id} className={`bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4 transition-all ${!item.available ? 'bg-gray-50 opacity-60 grayscale-[0.5]' : ''}`}>
                  
                  {/* Miniatura Imagen */}
                  <div className="w-20 h-20 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-50">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ImageIcon size={24} />
                      </div>
                    )}
                  </div>

                  {/* Info del Plato */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sb-dark truncate uppercase text-sm">{item.name}</h4>
                      {!item.available && (
                        <span className="text-[8px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-black uppercase">Agotado</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-1 mb-2">{item.description}</p>
                    <p className="font-black text-sb-red">{formatCurrency(item.price)}</p>
                  </div>

                  {/* Acciones Rápidas */}
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => toggleAvailability(item.id, item.available)}
                      className={`p-2 rounded-xl border transition-all ${item.available ? 'border-green-100 text-green-500 hover:bg-green-50' : 'border-red-100 text-red-500 hover:bg-red-50'}`}
                    >
                      {item.available ? <Power size={18} /> : <PowerOff size={18} />}
                    </button>
                    <button className="p-2 rounded-xl border border-gray-100 text-gray-400 hover:bg-sb-dark hover:text-white transition-all">
                      <Edit3 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              
              {(!cat.menu_items || cat.menu_items.length === 0) && (
                <div className="col-span-full py-8 text-center border-2 border-dashed border-gray-100 rounded-[2rem]">
                  <p className="text-gray-300 text-sm italic">No hay productos en esta categoría.</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* --- EL COMPONENTE MODAL (DEBE IR AQUÍ) --- */}
      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={fetchMenu} // Recarga la lista cuando guardas un plato nuevo
        categories={categories} // Le pasa las categorías para el select
      />
    </div>
  );
}