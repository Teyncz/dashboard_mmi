/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        font: ["Inter", "sans-serif"],
      },
      boxShadow: {
        'custom': '0px 2px 6.5px 1px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(90deg, #2D55FF 0%, #4F70FF 100%)',
      },
      colors: {
        customBlue: '#2D55FF',
        darkGray: '#181818',
      },
      screens: {
        xs: '500px', // ajoute un point de rupture pour les écrans de 500px et plus
      },
    },
    theme: {
      screens: {
        xs: '500px',
      },
    }
  },
  plugins: [],
};
