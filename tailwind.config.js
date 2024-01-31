/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundColor: {
        // Light mode background colors
        light: {
          primary: '#3498db',
          secondary: '#2ecc71',
          // Add more light mode background colors as needed
        },
        // Dark mode background colors
        dark: {
          primary: '#2980b9',
          secondary: '#27ae60',
          // Add more dark mode background colors as needed
        },
      },
      textColor: {
        // Light mode text colors
        light: {
          primary: '#ffffff',
          secondary: '#333333',
          // Add more light mode text colors as needed
        },
        // Dark mode text colors
        dark: {
          primary: '#ffffff',
          secondary: '#aaaaaa',
          // Add more dark mode text colors as needed
        },
      },
    },
  },
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: true, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {}, // light theme colors
        },
        // ... custom themes
      },
    }),
  ],
}
