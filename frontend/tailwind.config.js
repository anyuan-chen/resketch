module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      cursor: {
        'eraser' : "url('../public/assets/Eraser_Cursor.png'), auto",
      }
    },
  },
  plugins: [],
}