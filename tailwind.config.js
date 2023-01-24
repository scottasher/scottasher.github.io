/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
      },
      minWidth: {
        8: "8em",
      },
      height: {
        "web-fill": "-webkit-fill-available",
      },
      width: {
        "web-fill": "-webkit-fill-available",
      },
      backgroundImage: {
        "banner-home":
          "url('https://cdn2.coolworks.com/wp-content/uploads/2019/02/05155005/HERO-WP-REsources.jpg')",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
