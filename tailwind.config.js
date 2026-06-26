/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        // Bright champagne gold — AA only on dark backgrounds (8.28:1). Decorative on light.
        brandGold: '#D4AF37',
        // Deep antique gold — gold text/icons on LIGHT backgrounds (>=4.68:1).
        brandGoldDeep: '#8A6D1C',
        // Primary sage — light backgrounds + buttons (5.40:1, white-on-sage 5.40:1).
        brandSage: '#3E7464',
        // Light sage — sage text/icons on DARK backgrounds (7.09:1).
        brandSageLight: '#6BB39C',
        brandDark: '#1A1A1A',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
