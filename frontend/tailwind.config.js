/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {},
    fontFamily: {
      'ro': ['Roboto', 'sans-serif'],
      'me': ['Merriweather', 'sans-serif'],
      'nu': ['Nunito', 'sans-serif'],
    }
  },
  plugins: [require("tw-elements/dist/plugin.cjs")]
}