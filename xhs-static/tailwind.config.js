/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"PingFang SC"', '"Noto Sans SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fff1f5',
          100: '#ffe3eb',
          200: '#ffc6d6',
          300: '#ff97b2',
          400: '#ff6088',
          500: '#ff3366',
          600: '#ec1d52',
          700: '#c70f43',
          800: '#a4103e',
          900: '#88123b',
        },
      },
    },
  },
  plugins: [],
};
