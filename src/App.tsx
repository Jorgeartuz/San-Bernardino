import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import PublicMenu from './pages/PublicMenu'; // El nuevo menú estilo Ola Click
import AdminLayout from './pages/admin/AdminLayout';
import MenuManager from './pages/admin/MenuManager';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        {/* --- RUTAS PÚBLICAS (Para Clientes) --- */}
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/sobre-nosotros" element={<><Navbar /><About /></>} />
        <Route path="/menu" element={<><Navbar /><PublicMenu /></>} />
        <Route path="/login" element={<Login />} />
        
        {/* --- RUTAS PRIVADAS (Para Administrador) --- */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Fíjate que aquí los 'path' NO llevan "/" al principio */}
          <Route index element={<div className="text-2xl font-bold">Bienvenido al Dashboard</div>} />
          
          {/* Esta es la página para EDITAR el menú */}
          <Route path="menu" element={<MenuManager />} /> 
          
          <Route path="mesas" element={<div>Gestión de Mesas</div>} />
          <Route path="pedidos" element={<div>Monitor de Pedidos</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;