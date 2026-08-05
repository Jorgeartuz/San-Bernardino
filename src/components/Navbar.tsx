import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] 
    bg-white/80 backdrop-blur-xl 
    shadow-[0_8px_30px_rgba(0,0,0,0.05)] 
    border-b border-white/20">

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-12 md:h-14 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col leading-none">
              <span className="text-lg md:text-xl font-black tracking-tight text-sb-red">
                SAN BERNARDINO
              </span>
              <span className="text-[9px] tracking-[0.35em] font-bold text-gray-400 uppercase">
                Company
              </span>
            </div>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-10 font-semibold text-xs uppercase tracking-widest text-sb-dark">
            
            {["Inicio", "Menú", "Nosotros"].map((item, i) => (
              <Link
                key={i}
                to={item === "Inicio" ? "/" : `/${item.toLowerCase().replace("ú","u")}`}
                className="relative group"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-sb-red transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            <Link 
              to="/login" 
              className="relative overflow-hidden bg-sb-red text-white px-6 py-2.5 rounded-full shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span className="relative z-10">INGRESO</span>
              <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-all"></span>
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-sb-dark transition-transform duration-300 hover:scale-110"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isOpen 
                    ? "M6 18L18 6M6 6l12 12" 
                    : "M4 6h16M4 12h16m-7 6h7"} 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden 
        bg-white/95 backdrop-blur-xl 
        border-t border-gray-100 
        animate-slide-down">

          <div className="px-6 py-8 space-y-6 text-center">
            
            {["Inicio", "Menú", "Nosotros"].map((item, i) => (
              <Link 
                key={i}
                to={item === "Inicio" ? "/" : `/${item.toLowerCase().replace("ú","u")}`}
                onClick={() => setIsOpen(false)} 
                className="block text-xl font-bold text-sb-dark hover:text-sb-red transition-all"
              >
                {item}
              </Link>
            ))}

            <Link 
              to="/login" 
              onClick={() => setIsOpen(false)} 
              className="block text-xl font-bold text-white bg-sb-red py-3 rounded-full shadow-md hover:shadow-xl transition-all"
            >
              Ingreso Staff
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
}