/** @type {import('tailwindcss').Config} */
module.exports = {
  content:
    [
      "./src/**/*.{html,js,jsx}",
      "./src/components/**/*.{html,js,jsx}",
      "./src/user/pages/**/*.{html,js,jsx}",
    ],
  theme: {
    extend: {
      colors: {
        themeColor: '#14b8a6',
        themeDark: '#0f766e',
        themeDeep: '#0b1f1f',
        themeLight: '#f3fbfa',
        customeBg: "#f8fafc"
      },
    },
  },
  plugins: [],
}
