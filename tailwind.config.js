/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'body': ['Montserrat', 'Inter', 'ui-sans-serif', 'system-ui'],
        'sans': ['Montserrat', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: []
}
