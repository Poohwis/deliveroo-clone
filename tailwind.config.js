/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        medium: "#9F9AA1",
        primary: "#20E1B2",
        lightgray: "#FCF8FF",
        grey: "#EEE9F0",
        green: "#437919",
      },
    },
  },
  plugins: [],
};
