/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Your Custom Brand Colors
        'celtics-green': '#007A33',
        'card-bg': '#1a1a1a', 
        'dark-bg': '#121212',
        'text-muted': '#aaaaaa'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}