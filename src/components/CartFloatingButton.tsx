import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function CartFloatingButton() {
  const { cart, total, itemsCount, updateQuantity, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // No mostrar nada si el carrito está vacío
  if (itemsCount === 0) return null;

  const handleWhatsAppOrder = () => {
    const phoneNumber = "573104028647"; // 👈 Tu número de WhatsApp aquí
    
    let message = `*NUEVO PEDIDO - SAN BERNARDINO COMPANY* 👨‍🍳\n`;
    message += `----------------------------------\n\n`;
    
    cart.forEach(item => {
      message += `✅ *${item.quantity}x* ${item.name}\n`;
      message += `     Precio: $${(item.price * item.quantity).toLocaleString('es-CO')}\n\n`;
    });
    
    message += `----------------------------------\n`;
    message += `💰 *TOTAL A PAGAR: $${total.toLocaleString('es-CO')}*\n\n`;
    message += `📍 *Dirección de entrega:* \n`;
    message += `_(Escribe tu dirección aquí)_`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <>
      {/* 1. RESUMEN DEL PEDIDO (MODAL/DRAWER) */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-sb-dark/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden animate-fade-in-up"
            onClick={e => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="bg-sb-cream p-6 flex justify-between items-center border-b border-sb-red/10">
              <div>
                <h3 className="text-xl font-black text-sb-dark leading-none">TU PEDIDO</h3>
                <p className="text-[10px] text-sb-red font-bold uppercase tracking-widest mt-1">San Bernardino Company</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="bg-white text-sb-dark w-10 h-10 rounded-full flex items-center justify-center shadow-sm hover:bg-sb-red hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Lista de Productos */}
            <div className="max-h-[50vh] overflow-y-auto p-6 space-y-4 no-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 border-b border-gray-50 pb-4">
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-sb-dark uppercase tracking-tight">{item.name}</h4>
                    <p className="text-xs text-sb-red font-black mt-1">
                      ${(item.price * item.quantity).toLocaleString('es-CO')}
                    </p>
                  </div>

                  {/* Controles de Cantidad */}
                  <div className="flex items-center bg-gray-100 rounded-full p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-sb-dark font-bold shadow-sm active:scale-90"
                    >
                      -
                    </button>
                    <span className="px-4 text-sm font-black text-sb-dark">{item.quantity}</span>
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
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Footer con Total y Botón */}
            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Total del pedido</span>
                <span className="text-3xl font-black text-sb-dark tracking-tighter">${total.toLocaleString('es-CO')}</span>
              </div>
              <button 
                onClick={handleWhatsAppOrder}
                className="w-full bg-sb-red text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-sb-red/20 hover:bg-sb-dark transition-all flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                PEDIR POR WHATSAPP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. BOTÓN FLOTANTE PRINCIPAL */}
      <div className="fixed bottom-6 left-0 right-0 z-[90] px-4 flex justify-center pointer-events-none">
        <button 
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto w-full max-w-lg bg-sb-red text-white flex items-center justify-between px-8 py-5 rounded-full shadow-[0_20px_50px_rgba(164,29,29,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 animate-fade-in-up group"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white text-sb-red w-8 h-8 flex items-center justify-center rounded-full font-black text-sm group-hover:rotate-12 transition-transform">
              {itemsCount}
            </div>
            <div className="text-left">
              <span className="block text-[8px] font-black uppercase tracking-[0.3em] opacity-70 leading-none mb-1">Tu Pedido</span>
              <span className="block text-xs font-black uppercase tracking-widest">Ver Carrito</span>
            </div>
          </div>

          <div className="flex flex-col text-right">
            <span className="text-xl font-black tracking-tighter leading-none">
              ${total.toLocaleString('es-CO')}
            </span>
          </div>
        </button>
      </div>
    </>
  );
}