import { Link } from 'react-router-dom';

export default function Home() {
  // Configura aquí el número de WhatsApp para contacto directo
  const whatsappNumber = "573104028647"; 

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      
      {/* 1. HERO SECTION: Impacto Visual Principal */}
      <section className="relative h-screen w-full flex items-center justify-center bg-sb-dark px-4">
        
        {/* Fondo con Imagen y Gradiente */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070" 
            className="w-full h-full object-cover opacity-30 scale-105"
            alt="Fondo Restaurante San Bernardino"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-sb-dark"></div>
        </div>
        
        {/* Contenido Central */}
        <div className="relative z-10 text-center w-full max-w-3xl flex flex-col items-center gap-6 animate-fade-in">

          {/* Logo con Tamaño Controlado */}
          <div className="flex justify-center items-center">
            <img 
              src="/logo.png" 
              alt="San Bernardino Logo" 
              style={{ height: "150px", width: "auto" }} 
              className="object-contain drop-shadow-[0_15px_40px_rgba(164,29,29,0.5)] transition-transform duration-500 hover:scale-110"
            />
          </div>
          
          {/* Título Principal */}
          <h1 className="text-4xl md:text-7xl font-serif text-white mb-2 leading-[1.1] tracking-tight">
            Tradición que se <span className="text-sb-red italic">Siente</span>
          </h1>
          
          {/* Descripción Breve */}
          <p className="text-gray-300 text-sm md:text-lg font-light mb-6 max-w-lg mx-auto leading-relaxed px-4">
            Desde la cocina de San Bernardino hasta tu mesa, llevamos el sabor auténtico de la pasión culinaria en cada ingrediente.
          </p>
          
          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row gap-4 w-full px-6 justify-center items-center">

            {/* Ir al Menú */}
            <Link 
              to="/menu" 
              className="w-full sm:w-auto px-10 py-4 bg-sb-red text-white font-black rounded-full shadow-2xl 
                         hover:bg-white hover:text-sb-red 
                         transition-all duration-300 
                         transform hover:scale-110 hover:shadow-red-500/40 tracking-widest text-sm uppercase"
            >
              VER CARTA COMPLETA
            </Link>

            {/* Contacto Directo WhatsApp */}
            <a 
              href={`https://wa.me/${whatsappNumber}?text=Hola!%20Quisiera%20más%20información%20sobre%20el%20restaurante`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-10 py-4 border-2 border-white text-white font-black rounded-full 
                         hover:bg-white/10 hover:scale-105 
                         transition-all duration-300 backdrop-blur-md tracking-widest text-sm uppercase text-center"
            >
              WHATSAPP DIRECTO
            </a>

          </div>
        </div>
      </section>

      {/* 2. INFO CARDS: Por qué elegir San Bernardino */}
      <section className="py-24 bg-sb-cream relative">
        {/* Decoración de fondo suave */}
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
            <img src="/logo.png" alt="watermark" className="w-1/2 grayscale" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          
          <div className="text-center mb-16">
            <h2 className="text-sb-red font-black tracking-[0.4em] text-xs mb-4 uppercase">Nuestra Excelencia</h2>
            <p className="text-3xl md:text-5xl font-serif text-sb-dark italic">Compromiso con el Sabor</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                t: "Recetas Únicas", 
                d: "Sabores desarrollados por nuestro chef con años de experiencia en la alta cocina artesanal.", 
                icon: "👨‍🍳" 
              },
              { 
                t: "Ambiente Familiar", 
                d: "Un espacio diseñado para que cada comida se convierta en un recuerdo inolvidable.", 
                icon: "🏠" 
              },
              { 
                t: "Ingredientes Premium", 
                d: "Seleccionamos diariamente los productos más frescos para garantizar la calidad San Bernardino.", 
                icon: "🥩" 
              }
            ].map((item, i) => (
              
              <div 
                key={i} 
                className="group bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 text-center
                           hover:shadow-2xl hover:-translate-y-3 
                           transition-all duration-500 ease-out"
              >
                
                <div className="text-5xl mb-6 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6 inline-block">
                  {item.icon}
                </div>

                <h4 className="text-xl font-black mb-4 text-sb-dark uppercase tracking-tight">
                  {item.t}
                </h4>

                <p className="text-gray-500 font-light text-sm leading-relaxed">
                  {item.d}
                </p>

                <div className="mt-6 w-12 h-1 bg-sb-red/20 mx-auto rounded-full group-hover:w-24 group-hover:bg-sb-red transition-all duration-500"></div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. CTA FINAL: Invitación al Menú */}
      <section className="py-20 bg-sb-dark flex flex-col items-center text-center px-6">
          <h3 className="text-white text-3xl font-serif mb-8 italic">¿Listo para una experiencia inolvidable?</h3>
          <Link 
            to="/menu" 
            className="px-12 py-4 bg-white text-sb-dark font-black rounded-full hover:bg-sb-red hover:text-white transition-all shadow-xl"
          >
            EXPLORAR LA CARTA
          </Link>
      </section>

    </div>
  );
}