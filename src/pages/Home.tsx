import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center bg-sb-dark px-4">
        
        {/* Fondo */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070" 
            className="w-full h-full object-cover opacity-30 scale-105"
            alt="Fondo Restaurante"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-sb-dark"></div>
        </div>
        
        {/* Contenido */}
        <div className="relative z-10 text-center w-full max-w-3xl flex flex-col items-center gap-6 animate-fade-in">

          {/* 🔴 LOGO CONTROLADO DE VERDAD */}
          <div className="flex justify-center items-center">
            <img 
              src="/logo.png" 
              alt="San Bernardino Logo" 
              style={{ height: "140px", width: "auto" }}  // 👈 ESTO MANDA
              className="object-contain drop-shadow-[0_15px_40px_rgba(164,29,29,0.5)] transition-transform duration-500 hover:scale-105"
            />
          </div>
          
          {/* Título */}
          <h1 className="text-4xl md:text-7xl font-serif text-white mb-2 leading-[1.1] tracking-tight">
            Tradición que se <span className="text-sb-red italic">Siente</span>
          </h1>
          
          {/* Descripción */}
          <p className="text-gray-300 text-sm md:text-lg font-light mb-6 max-w-lg mx-auto leading-relaxed">
            Desde la cocina de San Bernardino hasta tu mesa, llevamos el sabor auténtico de la pasión culinaria.
          </p>
          
          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">

            <Link 
              to="/menu" 
              className="w-full sm:w-auto px-10 py-4 bg-sb-red text-white font-black rounded-full shadow-2xl 
                         hover:bg-white hover:text-sb-red 
                         transition-all duration-300 
                         transform hover:scale-110 hover:shadow-red-500/40 tracking-wide"
            >
              VER MENÚ
            </Link>

            <button 
              className="w-full sm:w-auto px-10 py-4 border-2 border-white text-white font-black rounded-full 
                         hover:bg-white/10 hover:scale-105 
                         transition-all duration-300 backdrop-blur-md tracking-wide"
            >
              RESERVACIONES
            </button>

          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-24 bg-sb-cream">
        <div className="container mx-auto px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { t: "Recetas Únicas", d: "Sabores desarrollados por nuestro chef con años de experiencia.", icon: "👨‍🍳" },
              { t: "Ambiente Familiar", d: "El lugar perfecto para crear recuerdos con tus seres queridos.", icon: "🏠" },
              { t: "Ingredientes Premium", d: "Solo usamos productos locales frescos y de la más alta calidad.", icon: "🥩" }
            ].map((item, i) => (
              
              <div 
                key={i} 
                className="group bg-white p-10 rounded-3xl shadow-xl border border-gray-100 text-center
                           hover:shadow-2xl hover:-translate-y-3 
                           transition-all duration-300"
              >
                
                <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-125">
                  {item.icon}
                </div>

                <h4 className="text-lg font-extrabold mb-3 text-sb-dark uppercase tracking-wide">
                  {item.t}
                </h4>

                <p className="text-gray-500 font-light text-sm leading-relaxed">
                  {item.d}
                </p>

              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}