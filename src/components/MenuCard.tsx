import { useCart } from '../context/CartContext';

interface MenuCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  available: boolean;
}

export default function MenuCard(props: MenuCardProps) {
  const { name, description, price, image_url, available } = props;
  const { addToCart } = useCart();

  // Función para manejar el click en agregar
  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (available) {
      addToCart(props);
    }
  };

  return (
    <div className={`flex items-center justify-between p-4 md:p-6 bg-white border-b border-gray-100 hover:bg-sb-cream/20 transition-all duration-300 ${!available ? 'opacity-50 grayscale-[0.5]' : ''}`}>
      
      {/* Lado Izquierdo: Información del Plato */}
      <div className="flex-1 pr-4 md:pr-8 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-base md:text-xl font-black text-sb-dark tracking-tight leading-tight truncate">
            {name}
          </h4>
          {!available && (
            <span className="text-[8px] md:text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase font-black">
              Agotado
            </span>
          )}
        </div>
        
        <p className="text-xs md:text-sm text-gray-500 font-light leading-snug line-clamp-2 mb-3">
          {description || "Preparado con la receta secreta y tradicional de San Bernardino."}
        </p>
        
        <div className="flex items-center">
          <span className="text-sb-red font-black text-lg md:text-2xl tracking-tighter">
            ${Number(price).toLocaleString('es-CO')}
          </span>
        </div>
      </div>
      
      {/* Lado Derecho: Imagen con Botón de Agregar */}
      <div className="relative flex-shrink-0 group">
        {/* Contenedor de Imagen */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 overflow-hidden rounded-xl md:rounded-2xl shadow-sm border border-gray-50">
          <img 
            src={image_url || 'https://via.placeholder.com/300?text=San+Bernardino'} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Botón Flotante "+" */}
        {available && (
          <button 
            onClick={handleAddClick}
            className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 bg-white shadow-xl rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-gray-100 hover:bg-sb-red hover:text-white active:scale-90 transition-all group-active:scale-95"
            title="Agregar al pedido"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 md:h-6 md:w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}