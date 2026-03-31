/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f0f7f2',
          100: '#d9ece0',
          200: '#b3d9c1',
          300: '#7dbf96',
          400: '#54a570',
          500: '#3a8a56',   // 大地綠 main
          600: '#2d6e44',
          700: '#265838',
          800: '#1f452c',
          900: '#183624',
        },
        amber: {
          50:  '#fdf8ee',
          100: '#f9edcc',
          200: '#f3d88a',
          300: '#ecc050',
          400: '#e0a030',   // 暖棕金 main
          500: '#c8852a',
          600: '#a86820',
        },
        cream: '#f7f5ef',
        card:  '#ffffff',
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', 'PingFang TC', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
