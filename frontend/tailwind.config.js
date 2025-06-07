/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF4500', // fiery orange
          dark: '#CC3700',
          light: '#FF6A33',
        },
        secondary: {
          DEFAULT: '#1E293B', // slate dark
          light: '#334155',
        },
        accent: {
          DEFAULT: '#FFCC00', // warm yellow
          light: '#FFD633',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 