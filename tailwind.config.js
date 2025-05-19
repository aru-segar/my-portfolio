/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        dark: {
          'bg-primary': '#0f172a',
          'bg-secondary': '#1e293b',
          'accent': '#d946ef',
          'accent-secondary': '#c026d3',
          'accent-glow': '#e879f9',
          'text-primary': '#f8fafc',
          'text-secondary': '#94a3b8',
          'border': 'rgba(226, 232, 240, 0.1)',
          'card': 'rgba(15, 23, 42, 0.6)',
        },
        neon: {
          'pink': '#ff00ff',
          'purple': '#9d00ff',
          'blue': '#00b3ff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(to right, rgba(236, 72, 153, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(236, 72, 153, 0.1) 1px, transparent 1px)',
        'pink-purple': 'linear-gradient(to bottom, #ec4899, #8b5cf6)',
      },
      boxShadow: {
        'inner-glow': 'inset 0 0 5px 2px rgba(217, 70, 239, 0.3)',
        'neon': '0 0 5px rgba(217, 70, 239, 0.2), 0 0 20px rgba(217, 70, 239, 0.2), 0 0 30px rgba(217, 70, 239, 0.2), 0 0 40px rgba(217, 70, 239, 0.2)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-in': 'slideIn 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'neon-pulse': 'neonPulse 1.5s ease-in-out infinite alternate',
        'typing': 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(217, 70, 239, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(217, 70, 239, 0.8)' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-468px 0' },
          '100%': { backgroundPosition: '468px 0' },
        },
        neonPulse: {
          '0%, 100%': {
            textShadow: '0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #d946ef, 0 0 82px #d946ef, 0 0 92px #d946ef, 0 0 102px #d946ef, 0 0 151px #d946ef'
          },
          '50%': {
            textShadow: '0 0 4px #fff, 0 0 7px #fff, 0 0 13px #fff, 0 0 26px #d946ef, 0 0 45px #d946ef, 0 0 55px #d946ef, 0 0 65px #d946ef, 0 0 95px #d946ef'
          }
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#d946ef' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-sm': {
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
        },
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        },
        '.text-shadow-md': {
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        },
        '.text-shadow-lg': {
          textShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
        },
        '.text-shadow-neon': {
          textShadow: '0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #d946ef, 0 0 82px #d946ef',
        },
        '.backdrop-blur-xs': {
          backdropFilter: 'blur(2px)',
        },
        '.backdrop-saturate-150': {
          backdropFilter: 'saturate(150%)',
        },
        '.backdrop-saturate-200': {
          backdropFilter: 'saturate(200%)',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
