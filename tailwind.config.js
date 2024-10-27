/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        font:["Inter", "sans-serif"],
      },
      boxShadow: {
        'custom': '0px 2px 6.5px 1px rgba(0, 0, 0, 0.25)',
      },
      colors: {
        'custom-blue': '#2D55FF',  
      }
    },
    theme: {
      screens: {
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }
  
        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      },
    }
  },
  plugins: [],
};
