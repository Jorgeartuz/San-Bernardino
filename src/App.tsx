import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import PublicMenu from './pages/PublicMenu';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard'; // ✅ Nuevo
import MenuManager from './pages/admin/MenuManager'; // ✅ Rediseñado abajo
import CartFloatingButton from './components/CartFloatingButton';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <CartFloatingButton /> 

      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/sobre-nosotros" element={<><Navbar /><About /></>} />
        <Route path="/menu" element={<><Navbar /><PublicMenu /></>} />
        <Route path="/login" element={<Login />} />
        
        {/* RUTAS ADMINISTRATIVAS */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="menu" element={<MenuManager />} />
          
          {/* Placeholders para futuras fases */}
          <Route path="pedidos" element={<div className="p-10 text-2xl font-bold italic text-gray-300">Módulo de Pedidos en construcción...</div>} />
          <Route path="inventario" element={<div className="p-10 text-2xl font-bold italic text-gray-300">Módulo de Inventario en construcción...</div>} />
          <Route path="ventas" element={<div className="p-10 text-2xl font-bold italic text-gray-300">Módulo de Ventas en construcción...</div>} />
          <Route path="clientes" element={<div className="p-10 text-2xl font-bold italic text-gray-300">Módulo de Clientes en construcción...</div>} />
          <Route path="config" element={<div className="p-10 text-2xl font-bold italic text-gray-300">Configuración en construcción...</div>} />
        </Route>
      </Routes>

      <footer className="bg-sb-dark py-6 text-center border-t border-white/5">
        <p className="text-gray-500 text-[10px] tracking-widest uppercase font-bold">
          © 2025 San Bernardino Company
        </p>
      </footer>
    </div>
  );
}

export default App;