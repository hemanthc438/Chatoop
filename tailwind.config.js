/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sourgummy: ['Sour Gummy', 'sans-serif'], // Add Sour Gummy font
      },
    },
  },
  plugins: [],
}

