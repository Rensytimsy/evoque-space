import {Config} from "tailwindcss"

const config:Config = {
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
    extend: {
      colors: {
        brand: {
          dark: "#005461",      // Deep Forest
          primary: "#0C7779",   // Teal Green
          accent: "#249E94",    // Fresh Aqua
          light: "#3BC1A8",     // Mint Spark
        },
      },
    },
  },
  plugins: [],
}

export default config;