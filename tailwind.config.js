// tailwind.config.js

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.vue',
  ],
  purge: {
    content: [
      './public/**/*.html',
      './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
  },
  darkMode: 'class', // Enable dark mode support

  theme: {
    extend: {
      colors: {
        cyanprimary: '#2EC4B6',
        cyansecondary: '#CBF3F0',
        orangeprimary: '#FF9F1C',
        orangesecondary: '#FFBF69',
        primary: '#FF5733',
        secondary: colors.blue,
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
      },
      borderRadius: {
        'xl': '1rem',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['last'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Enable form styles
    require('@tailwindcss/typography'), // Typography plugin
  ],
};
