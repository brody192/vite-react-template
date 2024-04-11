/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'boulangerie-main': '#8c4322',
        'boulangerie-main-hover': '#704014', // Define hover color
      },
    },
  },
  plugins: [],
}