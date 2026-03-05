/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: '#0a0a0f',
          2: '#111118',
          3: '#1a1a24',
          4: '#22222f',
        },
        border: {
          DEFAULT: '#2a2a3a',
          bright: '#3a3a55',
        },
        accent: {
          DEFAULT: '#7c6aff',
          2: '#a78bfa',
        },
        text: {
          DEFAULT: '#e8e8f0',
          2: '#9090a8',
          3: '#5a5a72',
        },
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124,106,255,0.25)' },
          '50%': { boxShadow: '0 0 60px rgba(124,106,255,0.45)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.4s ease forwards',
        fadeIn: 'fadeIn 0.3s ease forwards',
        glow: 'glow 4s ease-in-out infinite',
        pulse: 'pulse 2s ease-in-out infinite',
        spin: 'spin 0.6s linear infinite',
      },
    },
  },
  plugins: [],
}