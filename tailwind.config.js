/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Haldi Theme
        haldi: {
          primary: '#FDB913',
          secondary: '#FFD700',
          accent: '#FF6B35',
          light: '#FFF9E6',
          dark: '#FFE082',
        },
        // Mehndi Theme
        mehndi: {
          primary: '#2D5016',
          secondary: '#8BC34A',
          accent: '#FF9800',
          light: '#E8F5E9',
          dark: '#AED581',
        },
        // Wedding Theme
        wedding: {
          primary: '#B8001F',
          secondary: '#FFD700',
          accent: '#8B0000',
          light: '#FFE5E5',
          dark: '#FF6B6B',
        },
        // Reception Theme
        reception: {
          primary: '#1A1A2E',
          secondary: '#E94560',
          accent: '#FFD700',
          light: '#0F0F23',
          dark: '#16213E',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'dance': 'dance 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'swing': 'swing 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        dance: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '25%': { transform: 'translateX(-10px) rotate(-5deg)' },
          '75%': { transform: 'translateX(10px) rotate(5deg)' },
        },
        swing: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
    },
  },
  plugins: [],
}
