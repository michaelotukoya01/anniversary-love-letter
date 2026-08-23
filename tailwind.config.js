/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Times New Roman"', serif],
        sans: ['"Inter"', '"Helvetica Neue"', sans-serif],
      },
      colors: {
        black: {
          DEFAULT: '#000',
          50: '#00000008',
          100: '#0000001a',
          200: '#00000033',
          300: '#0000004d',
          400: '#00000066',
          500: '#00000080',
          600: '#00000099',
          700: '#000000b3',
          800: '#000000cc',
          900: '#000000e6',
          950: '#000000f2',
        }
      },
      animation: {
        float: 'float 6s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
};