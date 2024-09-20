/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "max-md": { max: "768px" }, // max-width 768px
        "max-lg": { max: "1024px" }, // max-width 1024px
      },
    },
  },
  plugins: [],
};
