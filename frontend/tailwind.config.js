/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#0782f5'
      },
      gridTemplateColumns:{
        'auto':'repeat(auto-fill,minmax(200px, 1fr))'
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],  // Thêm 'Roboto' vào đây
      },
    },
  },
  plugins: [],
}