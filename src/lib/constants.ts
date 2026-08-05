export const RESTAURANT_INFO = {
  name: "San Bernardino Company",
  whatsapp: "573104028647", 
  locale: "es-CO",
  currency: "COP"
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(amount);
};