/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
      extend: {
          colors: {
              "primary-color": "#251349",
              "secondary-color": "#3e2278",
          },
      },
  },
  plugins: [],
};
