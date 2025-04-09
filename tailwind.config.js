/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs',
    './public/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#3490dc',
        secondary: '#ffed4a',
        dark: '#1a202c',
        light: '#f7fafc',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
