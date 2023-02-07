/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#301E67",
        secondary: "#ececec",
      },
    },
    fontFamily: {
      display: ["Cairo", "sans-serif"],
      body: ["Cairo", "sans-serif"],
    },
  },
  plugins: [],
};
