import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ShoppingBag, 
  BarChart3, 
  Boxes, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const menuItems = [
    { path: '/admin', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/pedidos', name: 'Pedidos', icon: ShoppingBag },
    { path: '/admin/menu', name: 'Menú', icon: UtensilsCrossed },
    { path: '/admin/inventario', name: 'Inventario', icon: Boxes },
    { path: '/admin/ventas', name: 'Ventas', icon: BarChart3 },
    { path: '/admin/clientes', name: 'Clientes', icon: Users },
    { path: '/admin/config', name: 'Configuración', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Fijo */}
      <aside className="w-72 bg-sb-dark text-white flex flex-col shadow-2xl z-50">
        <div className="p-8 border-b border-white/5">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
            <div>
              <h2 className="text-lg font-black leading-none text-sb-red uppercase">San Bernardino</h2>
              <p className="text-[9px] tracking-[0.2em] text-gray-400 font-bold uppercase mt-1">Admin Panel</p>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path}
                to={item.path} 
                className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${
                  isActive 
                  ? 'bg-sb-red text-white shadow-lg shadow-sb-red/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <Icon size={20} />
                  <span className="text-sm font-bold uppercase tracking-widest">{item.name}</span>
                </div>
                {isActive && <ChevronRight size={16} />}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 text-gray-400 hover:text-red-400 transition-colors font-bold uppercase tracking-widest text-xs"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Área de Contenido */}
      <main className="flex-1 h-screen overflow-y-auto no-scrollbar">
        <header className="bg-white border-b border-gray-100 px-10 py-6 flex justify-between items-center sticky top-0 z-40 backdrop-blur-md bg-white/80">
           <h1 className="text-sm font-black text-sb-dark uppercase tracking-[0.3em]">
             Panel Administrativo <span className="text-gray-300 mx-2">/</span> 
             <span className="text-sb-red">{menuItems.find(i => i.path === location.pathname)?.name || 'Detalle'}</span>
           </h1>
           
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full border border-green-100">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black uppercase">Restaurante Abierto</span>
              </div>
           </div>
        </header>

        <div className="p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}