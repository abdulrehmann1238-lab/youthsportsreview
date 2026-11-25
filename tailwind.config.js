/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0F1A26',
          900: '#18283A', // Deep Navy
          800: '#21364B', // Dark Navy
          700: '#2D4760',
          600: '#3D5E7E',
        },
        ice: {
          50: '#F5F9FB',
          100: '#E9F1F5', // Ice Blue
          200: '#D3E3EC',
          300: '#A9C7D9',
        },
        slate: {
          brand: '#697887',
          muted: '#7794A8',
        },
        warm: {
          50: '#F8F8F5', // Warm Off-White
          100: '#F1F4F5', // Soft Background
          200: '#E5E9EC', // Light Border
        },
        muted: {
          green: '#6E927F',
          amber: '#B99762',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'sans-serif'],
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        ui: ['Manrope', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(24, 40, 58, 0.05), 0 1px 2px rgba(24, 40, 58, 0.03)',
        'elevated': '0 4px 20px -2px rgba(24, 40, 58, 0.08), 0 2px 6px -1px rgba(24, 40, 58, 0.04)',
        'modal': '0 20px 40px -8px rgba(24, 40, 58, 0.2)',
      }
    },
  },
  plugins: [],
}
