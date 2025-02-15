import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // This will cover all files in the app directory
    "./components/**/*.{tsx}", // Updated to ensure correct matching of component files
    "./*.{ts,tsx}", // Add root directory
		"./components/profile/*.{ts,tsx}", // Add specific path for profile components
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
