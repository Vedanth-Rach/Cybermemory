/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        soc: {
          bg: '#070B14',
          surface: '#0D1424',
          card: '#111A2E',
          cardHover: '#16223B',
          border: '#1E2C4A',
          borderLight: '#2B3E68',
          textMuted: '#8494B2',
          textSub: '#ADC1E2',
        },
        cyber: {
          cyan: '#06B6D4',
          blue: '#0EA5E9',
          sky: '#38BDF8',
          emerald: '#10B981',
          green: '#22C55E',
          amber: '#F59E0B',
          yellow: '#FBBF24',
          red: '#EF4444',
          rose: '#F43F5E',
          purple: '#8B5CF6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.25)',
        'glow-blue': '0 0 25px -5px rgba(14, 165, 233, 0.25)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'glow-red': '0 0 25px -5px rgba(239, 68, 68, 0.25)',
        'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        }
      }
    },
  },
  plugins: [],
}
