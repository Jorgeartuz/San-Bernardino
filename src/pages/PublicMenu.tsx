import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import MenuCard from '../components/MenuCard';

export default function PublicMenu() {
  const [menuData, setMenuData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    async function getMenu() {
      // Traemos categorías y sus platos en una sola consulta
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

      if (!error && data) {
        setMenuData(data);
        if (data.length > 0) setActiveCategory(data[0].id);
      }
      setLoading(false);
    }
    getMenu();
  }, []);

  // Función para hacer scroll suave al hacer clic en una categoría
  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(`cat-${id}`);
    if (element) {
      const offset = 140; // Ajuste para que no quede debajo del navbar y la barra de categorías
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sb-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-serif italic text-gray-500">Preparando nuestra carta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Cabecera del Menú */}
      <header className="pt-28 pb-8 px-6 bg-sb-cream/50">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-sb-dark tracking-tighter uppercase italic">
            Nuestra <span className="text-sb-red">Carta</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium tracking-widest text-xs uppercase">
            San Bernardino Company • Sabores Tradicionales
          </p>
        </div>
      </header>

      {/* Barra de Categorías Sticky (Estilo Ola Click) */}
      <nav className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto flex overflow-x-auto no-scrollbar py-4 px-4 gap-3">
          {menuData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className={`whitespace-nowrap px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
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

      {/* Listado de Productos */}
      <main className="max-w-5xl mx-auto pb-24">
        {menuData.map((cat) => (
          <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-40">
            {/* Título de Categoría */}
            <div className="bg-gray-50/80 px-6 py-3 border-y border-gray-100">
              <h2 className="text-sm font-black text-sb-red uppercase tracking-[0.3em]">
                {cat.name}
              </h2>
            </div>

            {/* Grid de productos: 1 col en móvil, 2 cols en desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              {cat.menu_items && cat.menu_items.length > 0 ? (
                cat.menu_items.map((item: any) => (
                  <MenuCard key={item.id} {...item} />
                ))
              ) : (
                <div className="col-span-full p-10 text-center text-gray-400 italic font-light">
                  Próximamente más delicias en esta categoría.
                </div>
              )}
            </div>
          </section>
        ))}
      </main>

      {/* Botón flotante opcional (Ver Carrito/Pedido) */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <button className="bg-sb-red text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </button>
      </div>
    </div>
  );
}