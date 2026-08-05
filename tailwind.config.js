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
      },
      // --- Agregamos las animaciones aquí ---
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        zoom: {
  '0%': { transform: 'scale(1)' },
  '100%': { transform: 'scale(1.15)' },
},
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'fade-in': 'fade-in 1s ease-out forwards',
        'slide-down': 'slide-down 0.3s ease-out forwards',
        'ken-burns': 'zoom 20s ease-in-out infinite alternate',
      }
    },
  },
  plugins: [],
}