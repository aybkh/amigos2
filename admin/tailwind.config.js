/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Verde de marca Amigos2 (sustituye al ámbar como color primario).
        // Se mantiene la clave "amber" para no renombrar clases en todo el código.
        amber: {
          50:  '#e9fbf1',
          100: '#c6f4dd',
          500: '#00c264',
          600: '#00a857',
          700: '#097a45',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
