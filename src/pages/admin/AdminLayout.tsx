import { Outlet, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-[#0f1115] text-white">

      {/* Sidebar */}
      <aside className="w-64 
      bg-gradient-to-b from-[#14161c] to-[#0f1115] 
      border-r border-white/5 
      p-6 flex flex-col">

        {/* Logo / Brand */}
        <div className="mb-12">
          <h2 className="text-xl font-black tracking-tight leading-tight">
            SAN <span className="text-sb-red">BERNARDINO</span>
          </h2>
          <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">
            Panel Admin
          </span>
        </div>
        
        {/* Nav */}
        <nav className="flex-1 space-y-2 text-sm font-medium">
          
          {[
            { name: "Dashboard", path: "/admin" },
            { name: "Menú", path: "/admin/menu" },
            { name: "Mesas", path: "/admin/mesas" },
            { name: "Pedidos", path: "/admin/pedidos" },
          ].map((item, i) => (
            <Link 
              key={i}
              to={item.path} 
              className="block px-4 py-3 rounded-xl 
              text-gray-300 
              hover:text-white hover:bg-white/5 
              transition-all duration-200"
            >
              {item.name}
            </Link>
          ))}

        </nav>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="mt-auto px-4 py-3 rounded-xl 
          text-red-400 
          hover:bg-red-500/10 hover:text-red-300 
          transition-all font-semibold text-sm"
        >
          Cerrar Sesión
        </button>

      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">

        {/* Topbar */}
        <div className="h-20 flex items-center justify-between px-10 
        border-b border-white/5 
        bg-[#0f1115]/80 backdrop-blur-md">

          <h1 className="text-lg font-semibold tracking-tight text-gray-200">
            Panel de Administración
          </h1>

          <div className="text-xs text-gray-500">
            Sistema interno · San Bernardino
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-10 overflow-y-auto bg-[#0f1115]">
          <Outlet />
        </div>

      </main>
    </div>
  );
}