import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// Definición de la estructura de un producto en el carrito
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
}

// Definición de las funciones y datos que el Carrito expondrá a toda la app
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, amount: number) => void;
  clearCart: () => void;
  total: number;
  itemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // Inicializamos el carrito intentando leer lo que haya guardado en el navegador
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('sb_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Cada vez que el carrito cambie, guardamos una copia en localStorage
  useEffect(() => {
    localStorage.setItem('sb_cart', JSON.stringify(cart));
  }, [cart]);

  // Función para agregar productos
  const addToCart = (product: any) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        // Si ya existe, le sumamos 1 a la cantidad
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      
      // Si es nuevo, lo agregamos con cantidad 1
      return [...prev, { 
        id: product.id, 
        name: product.name, 
        price: Number(product.price), 
        quantity: 1,
        image_url: product.image_url 
      }];
    });
  };

  // Función para quitar un producto por completo
  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Función para subir o bajar la cantidad (útil para botones + y - en el resumen)
  const updateQuantity = (id: string, amount: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + amount;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    }));
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('sb_cart');
  };

  // Cálculos automáticos de Total y Cantidad de items
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      total, 
      itemsCount 
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado para usar el carrito fácilmente en cualquier componente
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};