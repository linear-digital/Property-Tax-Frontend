/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // important
  theme: {
    extend: {
      colors: {
        "primary": '#7267F0',
        "success": '#36C76F',
        "secondary": '#FB9F43',
      },
    },
  },
  plugins: [],
};