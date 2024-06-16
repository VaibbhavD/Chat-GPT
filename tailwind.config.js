/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-pink-blue": "#D4A5FF", // Define a custom color
      },
    },
  },
  plugins: ["tailwind-scrollbar-hide"],
};
