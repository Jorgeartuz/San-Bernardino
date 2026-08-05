import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Error: " + error.message);
    } else {
      navigate('/admin');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-sb-dark px-4">

      {/* Fondo visual */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-sb-dark"></div>
      </div>

      {/* Card */}
      <div className="relative z-10 max-w-md w-full 
      bg-white/90 backdrop-blur-xl 
      p-10 rounded-3xl 
      shadow-[0_20px_60px_rgba(0,0,0,0.3)] 
      border border-white/20">

        {/* Header */}
        <div className="text-center mb-10">
          <img 
            src="/logo.png" 
            alt="logo" 
            className="h-16 mx-auto mb-4 drop-shadow-md"
          />
          <h2 className="text-3xl font-serif font-bold text-sb-dark">
            Acceso Staff
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Área restringida · Solo personal autorizado
          </p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Email
            </label>
            <input 
              type="email" 
              className="w-full px-4 py-3 rounded-xl 
              border border-gray-200 
              bg-white/70
              focus:border-sb-red focus:ring-2 focus:ring-sb-red/20 
              outline-none transition-all"
              placeholder="admin@sanbernardino.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Contraseña
            </label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-xl 
              border border-gray-200 
              bg-white/70
              focus:border-sb-red focus:ring-2 focus:ring-sb-red/20 
              outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Button */}
          <button 
            disabled={loading}
            className="w-full relative overflow-hidden 
            bg-sb-red text-white py-4 rounded-xl font-bold tracking-wide
            shadow-lg transition-all duration-300
            hover:scale-[1.02] hover:shadow-2xl active:scale-95"
          >
            <span className="relative z-10">
              {loading ? 'Entrando...' : 'INICIAR SESIÓN'}
            </span>
            <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-all"></span>
          </button>

        </form>

        {/* Footer vibe */}
        <p className="text-center text-[11px] text-gray-400 mt-8 tracking-wider">
          San Bernardino © Experiencia culinaria
        </p>
      </div>
    </div>
  );
}