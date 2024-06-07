/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-blue": "#DEE2FF",
        "main-dark-blue": "#CFD4FF",
        "bg-blue": "#F5F6FE",
        "main-pink": "#EAA1E3",
      },
    },
  },
  plugins: [],
};
