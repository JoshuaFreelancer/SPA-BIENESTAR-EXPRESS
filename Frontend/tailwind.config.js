/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
        },
      },
      screens: {
        phone: { max: "430px" },
        xs: { max: "540px" },
        xxs: { max: "280px" },
      },
      fontFamily: {
        kodchasan: ["Kodchasan", "sans-serif"],
      },
    },
  },
  variants: {},
  plugins: [],
};
