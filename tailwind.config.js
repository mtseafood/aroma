/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#edf4ef',
          100: '#d1e7d8',
          200: '#a3cfb2',
          300: '#6aad84',
          400: '#3d8f5f',
          500: '#2d6845',   // 沉穩深墨綠 main
          600: '#245437',
          700: '#1c402a',
          800: '#16321f',
          900: '#102517',
        },
        amber: {
          50:  '#fdf8ee',
          100: '#f9edcc',
          200: '#f3d88a',
          300: '#ecc050',
          400: '#e0a030',
          500: '#c8852a',
          600: '#a86820',
        },
        cream: '#f7f5ef',
        card:  '#ffffff',
      },
      fontFamily: {
        sans:  ['"Noto Sans TC"', 'PingFang TC', 'sans-serif'],
        serif: ['"Noto Serif TC"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
