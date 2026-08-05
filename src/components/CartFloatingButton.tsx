import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO, formatCurrency } from '../lib/constants';

export default function CartFloatingButton() {
  // Extraemos las funciones del contexto
  const { cart, total, itemsCount, updateQuantity, removeFromCart } = useCart();
  
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState("");

  // Bloquear scroll cuando el carrito está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  // Si no hay productos, no renderizar nada
  if (itemsCount === 0) return null;

  const handleWhatsAppOrder = () => {
    if (!address.trim()) {
      alert("Por favor, ingresa una dirección de entrega 📍");
      return;
    }

    let message = `*${RESTAURANT_INFO.name.toUpperCase()}* 👨‍🍳\n`;
    message += `_Nuevo pedido desde la web_\n`;
    message += `----------------------------------\n\n`;
    
    cart.forEach(item => {
      message += `✅ *${item.quantity}x* ${item.name}\n`;
      message += `     Precio: ${formatCurrency(item.price * item.quantity)}\n\n`;
    });
    
    message += `----------------------------------\n`;
    message += `💰 *TOTAL A PAGAR: ${formatCurrency(total)}*\n\n`;
    message += `📍 *Dirección de entrega:* ${address}\n\n`;
    message += `🚀 _Enviado desde San Bernardino Web_`;

    window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      {/* MODAL DEL CARRITO */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-sb-dark/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            {/* Cabecera */}
            <div className="bg-sb-cream p-6 flex justify-between items-center border-b border-sb-red/10">
              <h3 className="text-xl font-black text-sb-dark">TU PEDIDO</h3>
              <button 
                onClick={() => setIsOpen(false)} 
                className="bg-white text-sb-dark w-10 h-10 rounded-full flex items-center justify-center shadow-sm hover:bg-sb-red hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Lista de Productos */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 border-b border-gray-50 pb-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-sb-dark uppercase truncate">{item.name}</h4>
                    <p className="text-xs text-sb-red font-black mt-1">{formatCurrency(item.price * item.quantity)}</p>
                  </div>

                  {/* Controles + / - */}
                  <div className="flex items-center bg-gray-100 rounded-full p-1 shrink-0">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)} 
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-sb-dark font-bold shadow-sm active:scale-90"
                    >
                      -
                    </button>
                    <span className="px-3 text-sm font-black text-sb-dark">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)} 
                      className="w-8 h-8 flex items-center justify-center bg-sb-red text-white rounded-full font-bold shadow-sm active:scale-90"
                    >
                      +
                    </button>
                  </div>

                  {/* Botón Eliminar */}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors px-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Resumen Final */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
              <input 
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="📍 Escribe tu dirección de entrega..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sb-red outline-none text-sm font-medium"
              />

              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-bold uppercase text-[10px]">Total Estimado</span>
                <span className="text-3xl font-black text-sb-dark tracking-tighter">{formatCurrency(total)}</span>
              </div>

              <button 
                onClick={handleWhatsAppOrder}
                className="w-full bg-sb-red text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-sb-dark transition-all"
              >
                PEDIR POR WHATSAPP 📱
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOTÓN FLOTANTE INICIAL */}
      <div className="fixed bottom-6 left-0 right-0 z-[90] px-4 flex justify-center pointer-events-none">
        <button 
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto w-full max-w-lg bg-sb-red text-white flex items-center justify-between px-8 py-5 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in-up"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white text-sb-red w-8 h-8 flex items-center justify-center rounded-full font-black text-sm">
              {itemsCount}
            </div>
            <span className="font-black uppercase tracking-widest text-xs">Ver Carrito</span>
          </div>
          <span className="text-xl font-black">{formatCurrency(total)}</span>
        </button>
      </div>
    </>
  );
}