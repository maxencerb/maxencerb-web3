/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "c-darker": "#22223B",
        "c-dark": "#4A4E69",
        "c-neutral": "#9A8C98",
        "c-light": "#C9ADA7",
        "c-lighter": "#F2E9E4",
      },
    },
  },
  plugins: [],
}
