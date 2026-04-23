/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          green: '#00ff41',
          dimgreen: '#00b32c',
          bg: '#0a0a0a',
          surface: '#111111',
          border: '#1a2a1a',
          muted: '#4a6a4a',
          white: '#e0e0e0',
        },
      },
      fontFamily: {
        mono: ['"Share Tech Mono"', '"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
}
