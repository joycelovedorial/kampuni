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
        r: '#FF847C',
        y: '#FFC96B',
        g: '#99B898',
        b: '#86B8B1',
        p: '#B492B8',
        bpop: '#F4EDCA',
        bnorm: '#FFFBE6',
        cyanp: '#2EC4B6',
        cyans: '#CBF3F0',
        orangep: '#FF9F1C',
        oranges: '#FFBF69',
        cwhite: '#F2F2F2',
        cblack: '#2F2F2F',
        primary: '#FF5733',
        secondary: colors.blue,
      },
      fontFamily: {
        sans: ['Jakarta Sans'],
        fredoka: ['Fredoka']
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
