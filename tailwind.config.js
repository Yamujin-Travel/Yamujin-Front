/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        category: '10px 10px 20px 5px rgba(132, 132, 132, 0.25)',
        profilecard: '0 0 50px rgba(181, 181, 181, 0.2)',
      },

      colors: {
        background: {
          100: '#FFFFFF',
          200: '#F1F4F8',
        },
        airbnb: '#FD5C63',
        semiBlack: '#222222',
        lightGray: '#EBEBEB',
        gray: '#B5B5B5',
        smokeBlack: '#444444',
      },
    },
  },
  plugins: [],
};
