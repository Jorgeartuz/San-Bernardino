import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import PublicMenu from './pages/PublicMenu';
import AdminLayout from './pages/admin/AdminLayout';
import MenuManager from './pages/admin/MenuManager';
import CartFloatingButton from './components/CartFloatingButton'; // ✅ Importado

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* 
         Renderizamos el botón aquí, fuera de Routes. 
         Recuerda que el botón solo se mostrará si hay productos en el carrito
         porque así lo programamos en su lógica interna.
      */}
      <CartFloatingButton /> 

      <Routes>
        {/* --- RUTAS PÚBLICAS (Para Clientes) --- */}
        {/* Usamos el Navbar aquí para que no salga en el panel de administrador */}
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/sobre-nosotros" element={<><Navbar /><About /></>} />
        <Route path="/menu" element={<><Navbar /><PublicMenu /></>} />
        <Route path="/login" element={<Login />} />
        
        {/* --- RUTAS PRIVADAS (Para Administrador) --- */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<div className="text-2xl font-bold">Bienvenido al Dashboard</div>} />
          <Route path="menu" element={<MenuManager />} /> 
          <Route path="mesas" element={<div>Gestión de Mesas</div>} />
          <Route path="pedidos" element={<div>Monitor de Pedidos</div>} />
        </Route>
      </Routes>

      {/* Un footer simple para las páginas públicas */}
      <footer className="bg-sb-dark py-6 text-center">
        <p className="text-gray-500 text-[10px] tracking-widest uppercase font-bold">
          © 2025 San Bernardino Company
        </p>
      </footer>
    </div>
  );
}

export default App;