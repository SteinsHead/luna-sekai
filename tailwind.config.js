/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html, js, jsx, ts, tsx}', './src/**/*'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      }
    }
  },
  plugins: []
}
