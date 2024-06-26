/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        "green": "#D7F205",
        "black": "#262626",
        "white": "#FEFFFA",
        "dark-blue": "#5581D9",
        "light-blue": "#5E88BF",
      },
      fontFamily: {
        inter: ["Inter"]
      }
    },
  },
  plugins: [],
}

