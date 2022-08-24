/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
