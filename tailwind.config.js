module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        noto: 'Noto Sans KR',
      },
      screens: {
        xs: { min: '0px', max: '639.98px' },
      },
    },
  },
  variants: {},
  plugins: [],
};
