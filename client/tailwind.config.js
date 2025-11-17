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
        themeColor: '#6366F1',
        themeLight: '#f3fbfa',
        customeBg: "#f8fafc",
        primaryPurple: '#6366F1',
        primaryCyan: '#06B6D4',
        gradientStart: '#667eea',
        gradientEnd: '#764ba2'
      },
    },
  },
  plugins: [],
}
