interface MenuCardProps {
  name: string;
  description: string;
  price: number;
  image_url?: string;
  available: boolean;
}

export default function MenuCard({ name, description, price, image_url, available }: MenuCardProps) {
  return (
    <div className={`group flex items-center justify-between p-4 md:p-6 
    bg-white/90 backdrop-blur-sm 
    border border-gray-100 rounded-2xl 
    shadow-sm hover:shadow-xl 
    transition-all duration-300 hover:-translate-y-1
    ${!available ? 'opacity-50 grayscale' : ''}`}>

      {/* Info */}
      <div className="flex-1 pr-4 md:pr-6 min-w-0">
        
        <div className="flex items-start gap-2 mb-2">
          <h4 className="text-base md:text-xl font-black text-sb-dark tracking-tight leading-tight line-clamp-2">
            {name}
          </h4>
        </div>
        
        <p className="text-xs md:text-sm text-gray-500 font-light leading-snug mb-4 line-clamp-2 md:line-clamp-3">
          {description || "Especialidad de la casa preparada con ingredientes frescos."}
        </p>
        
        <div className="flex items-center gap-3">
          <span className="text-sb-red font-black text-lg md:text-2xl tracking-tight">
            ${Number(price).toLocaleString('es-CO')}
          </span>

          {!available && (
            <span className="text-[9px] md:text-[11px] bg-gray-100 text-gray-500 px-3 py-1 rounded-full uppercase font-black tracking-wide">
              Agotado
            </span>
          )}
        </div>
      </div>
      
      {/* Imagen */}
      <div className="relative flex-shrink-0 group">
        
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 
        overflow-hidden rounded-xl md:rounded-2xl 
        shadow-md border border-gray-100">
          
          <img 
            src={image_url || 'https://via.placeholder.com/300?text=San+Bernardino'} 
            alt={name}
            className="w-full h-full object-cover 
            transition-transform duration-500 
            group-hover:scale-110"
          />

          {/* Overlay elegante */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
        </div>
        
        {/* Botón + mejorado */}
        <div className="absolute -bottom-2 -right-2 
        bg-sb-red text-white 
        shadow-lg rounded-full 
        w-8 h-8 md:w-10 md:h-10 
        flex items-center justify-center 
        transition-all duration-300 
        group-hover:scale-110 group-hover:shadow-xl">
          
          <span className="text-lg md:text-xl font-bold leading-none">+</span>
        </div>
      </div>
    </div>
  );
}