import { useCart } from '../context/CartContext';

export default function CartFloatingButton() {
  const { cart, total, itemsCount } = useCart();
  
  // No mostrar nada si el carrito está vacío
  if (itemsCount === 0) return null;

  const handleSendOrder = () => {
    // 1. Configura aquí el número de WhatsApp de tu negocio (Sin el +)
    // Ejemplo: 57 (Colombia) + número.
    const phoneNumber = "573104028647"; 
    
    // 2. Construir el cuerpo del mensaje
    let message = `*SAN BERNARDINO COMPANY* 👨‍🍳\n`;
    message += `_Nuevo pedido desde la web_\n`;
    message += `----------------------------------\n\n`;
    
    cart.forEach(item => {
      const subtotal = item.price * item.quantity;
      message += `✅ *${item.quantity}x* ${item.name}\n`;
      message += `     Subtotal: $${subtotal.toLocaleString('es-CO')}\n\n`;
    });
    
    message += `----------------------------------\n`;
    message += `💰 *TOTAL A PAGAR: $${total.toLocaleString('es-CO')}*\n\n`;
    message += `📍 *¿A qué dirección enviamos el pedido?* \n`;
    message += `_(Por favor escribe tu dirección aquí)_`;

    // 3. Codificar para URL y abrir WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-[60] px-4 flex justify-center animate-fade-in-up">
      <button 
        onClick={handleSendOrder}
        className="w-full max-w-lg bg-sb-red text-white flex items-center justify-between px-6 py-4 rounded-2xl shadow-[0_20px_50px_rgba(164,29,29,0.4)] hover:scale-[1.02] active:scale-95 transition-all duration-300 group"
      >
        <div className="flex items-center gap-3">
          {/* Contador de items */}
          <div className="bg-white text-sb-red w-8 h-8 flex items-center justify-center rounded-full font-black text-sm group-hover:rotate-12 transition-transform">
            {itemsCount}
          </div>
          <div className="text-left">
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 leading-none mb-1">Tu Pedido</span>
            <span className="block text-sm font-black uppercase tracking-widest">Enviar a WhatsApp</span>
          </div>
        </div>

        {/* Precio Total */}
        <div className="flex flex-col text-right">
          <span className="text-xl font-black tracking-tighter">
            ${total.toLocaleString('es-CO')}
          </span>
        </div>
      </button>
    </div>
  );
}