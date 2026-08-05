import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import MenuCard from '../components/MenuCard';
import CartFloatingButton from '../components/CartFloatingButton';

export default function PublicMenu() {
  const [menuData, setMenuData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');

  // 1. Cargar el menú desde Supabase
  useEffect(() => {
    async function fetchMenuData() {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select(`
            id, 
            name, 
            menu_items (
              id, 
              name, 
              description, 
              price, 
              image_url, 
              available
            )
          `)
          .eq('active', true)
          .order('display_order', { ascending: true });

        if (error) throw error;

        if (data) {
          setMenuData(data);
          if (data.length > 0) setActiveCategory(data[0].id);
        }
      } catch (error) {
        console.error('Error cargando el menú:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMenuData();
  }, []);

  // 2. Función para Scroll Suave a las categorías
  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(`cat-${id}`);
    if (element) {
      const offset = 150; // Espacio para que el título no quede tapado por los menus fijos
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-sb-red border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sb-red font-black tracking-[0.3em] uppercase text-[10px]">Cocinando Menú...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Cabecera Visual */}
      <header className="pt-24 pb-8 px-6 bg-gradient-to-b from-sb-cream/50 to-white">
        <div className="max-w-5xl mx-auto flex flex-col items-center md:items-start">
          <img src="/logo.png" alt="Logo" className="h-20 mb-4 md:hidden" />
          <h1 className="text-4xl md:text-6xl font-black text-sb-dark tracking-tighter uppercase italic leading-none">
            Nuestra <span className="text-sb-red">Carta</span>
          </h1>
          <p className="text-gray-400 mt-2 font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase">
            San Bernardino Company • Sabores que inspiran
          </p>
        </div>
      </header>

      {/* 2. Barra de Categorías Adhesiva (Sticky) */}
      <nav className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto flex overflow-x-auto no-scrollbar py-4 px-4 gap-3">
          {menuData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat.id 
                ? 'bg-sb-red text-white shadow-lg shadow-sb-red/30 scale-105' 
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </nav>

      {/* 3. Listado de Secciones y Productos */}
      <main className="max-w-5xl mx-auto pb-32">
        {menuData.map((cat) => (
          <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-40">
            {/* Título de la Sección */}
            <div className="bg-sb-cream/20 px-6 py-3 border-y border-sb-red/5 mt-4">
              <h2 className="text-xs font-black text-sb-red uppercase tracking-[0.3em] flex items-center justify-between">
                {cat.name}
                <span className="text-[9px] text-gray-300 tracking-normal">{cat.menu_items?.length || 0} platos</span>
              </h2>
            </div>

            {/* Cuadrícula de Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {cat.menu_items && cat.menu_items.length > 0 ? (
                cat.menu_items.map((item: any) => (
                  <MenuCard 
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image_url={item.image_url}
                    available={item.available}
                  />
                ))
              ) : (
                <div className="col-span-full py-10 text-center text-gray-300 italic text-sm">
                  No hay platos disponibles en esta categoría por ahora.
                </div>
              )}
            </div>
          </section>
        ))}
      </main>

      {/* 4. Botón Flotante del Carrito (WhatsApp) */}
      <CartFloatingButton />

      {/* 5. Footer Decorativo */}
      <footer className="py-12 bg-sb-dark text-center border-t border-gray-800">
        <img src="/logo.png" alt="San Bernardino" className="h-16 mx-auto mb-4 opacity-30 grayscale" />
        <p className="text-gray-600 text-[9px] tracking-[0.3em] font-black uppercase">
          San Bernardino Company • Todos los derechos reservados 2025
        </p>
      </footer>
    </div>
  );
}