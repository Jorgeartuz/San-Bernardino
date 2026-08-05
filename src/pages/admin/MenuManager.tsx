import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function MenuManager() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const { data } = await supabase.from('categories').select('*');
      if (data) setCategories(data);
    };
    fetchMenu();
  }, []);

  return (
    <div className="text-white">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Gestionar Menú
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Administra categorías y platos del restaurante
          </p>
        </div>

        <button className="bg-sb-red px-5 py-3 rounded-xl font-semibold 
        shadow-lg hover:shadow-xl hover:scale-105 
        transition-all duration-300">
          + Nuevo Plato
        </button>
      </div>

      {/* Categories */}
      <div className="grid gap-6">

        {categories.map(cat => (
          <div 
            key={cat.id} 
            className="bg-white/5 backdrop-blur-md 
            border border-white/10 
            rounded-2xl p-6 
            hover:border-sb-red/30 
            transition-all duration-300"
          >

            {/* Category title */}
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <h2 className="text-lg font-semibold tracking-tight text-white">
                {cat.name}
              </h2>

              <span className="text-xs text-gray-500">
                0 platos
              </span>
            </div>

            {/* Empty state */}
            <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
              <div className="text-3xl mb-3 opacity-40">🍽️</div>
              <p className="text-sm italic">
                No hay platos en esta categoría todavía
              </p>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}