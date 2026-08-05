import { Link } from 'react-router-dom';

export default function Home() {
  // Configuración del número de WhatsApp del restaurante
  const whatsappNumber = "573100000000"; 
  const whatsappWelcomeMessage = encodeURIComponent("¡Hola! 👋 Vengo de la web y quiero probar las delicias de San Bernardino. ¿Me ayudan con mi pedido? 🍔");

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      
      {/* 1. HERO SECTION: Impacto Visual y Conversión Directa */}
      <section className="relative h-screen w-full flex items-center justify-center bg-sb-dark px-4 overflow-hidden">
        
        {/* Fondo con Efecto Ken Burns (Zoom Lento) */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070" 
            className="w-full h-full object-cover opacity-30 animate-ken-burns"
            alt="Fondo Gourmet San Bernardino"
          />
          {/* Overlay gradiente para mejorar legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-sb-dark"></div>
        </div>
        
        {/* Contenido Central Animado */}
        <div className="relative z-10 text-center w-full max-w-3xl flex flex-col items-center gap-6 animate-fade-in">

          {/* Logo Central con Sombra de Marca */}
          <div className="flex justify-center items-center">
            <img 
              src="/logo.png" 
              alt="San Bernardino Logo" 
              style={{ height: "150px", width: "auto" }} 
              className="object-contain drop-shadow-[0_15px_40px_rgba(164,29,29,0.5)] transition-transform duration-700 hover:scale-110"
            />
          </div>
          
          {/* Título de Alto Impacto */}
          <div className="space-y-2">
            <h1 className="text-5xl md:text-8xl font-serif text-white leading-[0.9] tracking-tighter">
              Tradición que se <br />
              <span className="text-sb-red italic font-normal">Siente</span>
            </h1>
            <p className="text-sb-red font-black tracking-[0.5em] text-[10px] md:text-xs uppercase mt-4">
              San Bernardino Company
            </p>
          </div>
          
          {/* Descripción Persuasiva */}
          <p className="text-gray-300 text-sm md:text-lg font-light mb-4 max-w-lg mx-auto leading-relaxed px-4">
            No solo cocinamos, creamos momentos memorables. <br className="hidden md:block" /> 
            Llevamos el sabor auténtico de la pasión artesanal hasta tu mesa.
          </p>
          
          {/* CTAs Agresivos (Call To Action) */}
          <div className="flex flex-col sm:flex-row gap-4 w-full px-6 justify-center items-center">

            {/* CTA Principal: Comprar */}
            <Link 
              to="/menu" 
              className="w-full sm:w-auto px-12 py-5 bg-sb-red text-white font-black rounded-full shadow-2xl 
                         hover:bg-white hover:text-sb-red 
                         transition-all duration-300 
                         transform hover:scale-110 hover:shadow-red-500/40 tracking-widest text-xs uppercase"
            >
              PEDIR AHORA 🍔
            </Link>

            {/* CTA Secundario: Contacto Humano */}
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${whatsappWelcomeMessage}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-10 py-5 border-2 border-white text-white font-black rounded-full 
                         hover:bg-white/10 hover:scale-105 
                         transition-all duration-300 backdrop-blur-md tracking-widest text-xs uppercase text-center"
            >
              HABLAR CON EL CHEF
            </a>

          </div>
        </div>

        {/* Scroll Indicator Animado */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
            <div className="w-1 h-12 rounded-full bg-gradient-to-b from-sb-red to-transparent"></div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION: Por qué somos los mejores */}
      <section className="py-24 bg-sb-cream relative">
        <div className="container mx-auto px-6 relative z-10">
          
          <div className="text-center mb-20">
            <h2 className="text-sb-red font-black tracking-[0.4em] text-[10px] mb-4 uppercase">La Diferencia San Bernardino</h2>
            <p className="text-4xl md:text-6xl font-serif text-sb-dark italic leading-tight">Compromiso con la Excelencia</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                t: "Recetas Únicas", 
                d: "Sabores desarrollados por nuestro chef con ingredientes secretos que no encontrarás en otro lugar.", 
                icon: "👨‍🍳" 
              },
              { 
                t: "Ambiente Familiar", 
                d: "El lugar ideal donde cada comida se convierte en una celebración inolvidable.", 
                icon: "🏠" 
              },
              { 
                t: "Ingredientes Premium", 
                d: "Selección diaria de los mejores cortes y productos locales para garantizar frescura absoluta.", 
                icon: "🥩" 
              }
            ].map((item, i) => (
              
              <div 
                key={i} 
                className="group bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 text-center
                           hover:shadow-2xl hover:-translate-y-3 
                           transition-all duration-500 ease-out"
              >
                
                <div className="text-6xl mb-8 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12 inline-block drop-shadow-lg">
                  {item.icon}
                </div>

                <h4 className="text-xl font-black mb-4 text-sb-dark uppercase tracking-tight">
                  {item.t}
                </h4>

                <p className="text-gray-500 font-light text-sm leading-relaxed mb-6">
                  {item.d}
                </p>

                <Link to="/menu" className="text-sb-red font-black text-[10px] uppercase tracking-widest border-b-2 border-sb-red/10 group-hover:border-sb-red transition-all">
                    Ver platos →
                </Link>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. CTA FINAL: Cierre de Venta */}
      <section className="py-24 bg-sb-dark relative overflow-hidden flex flex-col items-center text-center px-6">
          <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
            <img src="/logo.png" alt="watermark" className="w-1/2" />
          </div>
          
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-white text-4xl md:text-6xl font-serif mb-10 italic leading-tight">¿Tienes hambre? <br /> Nosotros el sabor.</h3>
            <Link 
              to="/menu" 
              className="px-16 py-6 bg-sb-red text-white font-black rounded-full hover:bg-white hover:text-sb-red transition-all shadow-2xl transform hover:scale-110 uppercase tracking-widest text-sm"
            >
              ORDENAR AHORA MISMO
            </Link>
          </div>
      </section>

    </div>
  );
}