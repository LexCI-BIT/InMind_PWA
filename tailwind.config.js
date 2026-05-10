/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1f1f1f',
          900: '#1f1f1f',
          800: '#2a2a2a',
          700: '#3a3a3a',
        },
        accent: {
          400: '#f0b31e',
          300: '#fad36a',
          500: '#c8901a',
        },
        brand: {
          purple: '#7c3aed',
          'purple-soft': '#ede9fe',
          cream: '#f7f3ee',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        floaty: 'floaty 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
