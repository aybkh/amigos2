/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary:  '#2A5A43',
        accent:   '#C84B31',
        cream:    '#F9F8F6',
        dark:     '#1c1c1c',
        textMain: '#2D2926',
      },
      fontFamily: {
        heading: ['"Black Ops One"', 'cursive'],
        sans:    ['Montserrat', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        neo:     '5px 5px 0px #2D2926',
        'neo-lg': '8px 8px 0px #2D2926',
        'neo-sm': '3px 3px 0px #2D2926',
      },
    },
  },
  plugins: [],
}
