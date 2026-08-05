/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sb-red': '#A41D1D', // El rojo del logo
        'sb-dark': '#1A1A1A',
        'sb-cream': '#F9F6F0', // Un blanco hueso para fondos elegantes
        'sb-gold': '#D4AF37',
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'serif'],
        'sans': ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}