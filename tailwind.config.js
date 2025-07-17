/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FE8C00",
        white: {
          DEFAULT: "#ffffff",
          100: "#fafafa",
          200: "#FE8C00",
        },
        gray: {
          100: "#878787",
          200: "#878787",
        },
        dark: {
          100: "#181C2E",
        },
        error: "#F14141",
        success: "#2F9B65",
      },
      fontFamily: {
        quicksand: ["QuickSand-Regular", "system-ui", "sans-serif"],
        "quicksand-light": ["QuickSand-Light", "system-ui", "sans-serif"],
        "quicksand-medium": ["QuickSand-Medium", "system-ui", "sans-serif"],
        "quicksand-semibold": ["QuickSand-SemiBold", "system-ui", "sans-serif"],
        "quicksand-bold": ["QuickSand-Bold", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
