/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          light: '#3B82F6',
          dark: '#1D4ED8',
        },
        secondary: {
          DEFAULT: '#06B6D4',
        },
        accent: {
          DEFAULT: '#8B5CF6',
        },
      },
      fontFamily: {
        display: ['"Sora"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-light':
          'linear-gradient(to right, rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.06) 1px, transparent 1px)',
        'grid-dark':
          'linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px)',
        'hero-gradient-light':
          'radial-gradient(60% 60% at 15% 10%, rgba(37,99,235,0.16) 0%, rgba(37,99,235,0) 60%), radial-gradient(50% 50% at 90% 20%, rgba(139,92,246,0.14) 0%, rgba(139,92,246,0) 60%), radial-gradient(60% 60% at 50% 100%, rgba(6,182,212,0.12) 0%, rgba(6,182,212,0) 60%)',
        'hero-gradient-dark':
          'radial-gradient(60% 60% at 15% 10%, rgba(37,99,235,0.28) 0%, rgba(37,99,235,0) 60%), radial-gradient(50% 50% at 90% 20%, rgba(139,92,246,0.24) 0%, rgba(139,92,246,0) 60%), radial-gradient(60% 60% at 50% 100%, rgba(6,182,212,0.18) 0%, rgba(6,182,212,0) 60%)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(37,99,235,0.15), 0 8px 30px rgba(37,99,235,0.15)',
        'glow-accent': '0 0 0 1px rgba(139,92,246,0.15), 0 8px 30px rgba(139,92,246,0.2)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        blob: 'blob 14s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
      },
    },
  },
  plugins: [],
};
