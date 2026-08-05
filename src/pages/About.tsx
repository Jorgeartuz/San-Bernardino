export default function About() {
  return (
    <div className="pt-32 pb-24 bg-sb-cream/30 relative overflow-hidden">

      {/* Fondo sutil */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_rgba(164,29,29,0.08),transparent_70%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">

          {/* Heading */}
          <h2 className="text-sb-red text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-4">
            Nuestra Historia
          </h2>

          <h3 className="text-4xl md:text-6xl font-serif mb-10 leading-tight text-sb-dark">
            Más de 20 años cultivando el arte del buen comer.
          </h3>

        </div>

        {/* Texto */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-700 leading-relaxed font-light text-sm md:text-base">
          
          <p className="hover:text-sb-dark transition-colors duration-300">
            San Bernardino nació de un sueño familiar: crear un refugio donde la comida no sea solo sustento, sino una celebración de la vida. Desde nuestros humildes comienzos, hemos mantenido la promesa de tratar a cada cliente como un invitado de honor en nuestra propia casa.
          </p>

          <p className="hover:text-sb-dark transition-colors duration-300">
            Hoy, combinamos recetas tradicionales con técnicas contemporáneas para ofrecer una carta que evoluciona con las estaciones, siempre respetando la esencia de nuestros ingredientes originales.
          </p>

        </div>
        
        {/* Imagen con impacto */}
        <div className="mt-16 max-w-6xl mx-auto relative group">
          
          <div className="overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
            <img 
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070" 
              className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="Cocina"
            />
          </div>

          {/* Overlay elegante */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

          {/* Frase flotante */}
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white max-w-sm">
            <p className="text-lg md:text-2xl font-serif leading-snug drop-shadow-lg">
              Donde cada plato cuenta una historia.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}