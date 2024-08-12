/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'backgroundColor': "#1f2937", // Dark slate gray
      'textColor': "#f9fafb", // Off-white
      'primaryColor': "#3b82f6", // Bright blue
      'secondaryColor': "#6b7280", // Cool gray
      'accentColor': "#f59e0b", // Amber yellow
     },
    extend: {},
  },
  plugins: [],
}

