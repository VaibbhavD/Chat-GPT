/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-pink-blue": "#D4A5FF", // Define a custom color
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "spin-medium": "spin 1.5s linear infinite",
        "spin-fast": "spin 0.75s linear infinite",
      },
    },
  },
  plugins: ["tailwind-scrollbar-hide"],
};
