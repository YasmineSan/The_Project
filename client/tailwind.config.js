/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      ...colors,
      'darkGrey': '#545454',
      'gold': '#AB8F45'
    }
  },
  plugins: [],
}