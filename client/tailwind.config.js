/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0B1220', 800: '#101A2E', 700: '#16223B' },
        gold: { DEFAULT: '#B08D57', light: '#D4B98C' },
        ivory: '#F7F5F0',
        slate: { DEFAULT: '#5B6472' },
        teal: { DEFAULT: '#0F6E5B' },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        'skyline-gradient': 'linear-gradient(180deg, #0B1220 0%, #16223B 55%, #1C2A44 100%)',
      },
    },
  },
  plugins: [],
};
