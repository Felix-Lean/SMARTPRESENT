import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        'expand-messages': {
          '0%': { 
            maxHeight: '0',
            opacity: '0'
          },
          '100%': { 
            maxHeight: '500px',
            opacity: '1'
          }
        },
        'gift-spin': {
          '0%, 100%': { 
            transform: 'rotate(0deg)',
            opacity: '0.5'
          },
          '20%': {
            transform: 'rotate(60deg)',
            opacity: '1'
          },
          '35%': {
            transform: 'rotate(40deg)',
            opacity: '0.8'
          },
          '55%': {
            transform: 'rotate(180deg)',
            opacity: '1'
          },
          '70%': {
            transform: 'rotate(160deg)',
            opacity: '0.8'
          },
          '85%': {
            transform: 'rotate(360deg)',
            opacity: '1'
          }
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'wiggle': {
          '0%, 20%': {
            transform: 'rotate(0deg)'
          },
          '22%': {
            transform: 'rotate(-12deg)'
          },
          '24%': {
            transform: 'rotate(12deg)'
          },
          '26%': {
            transform: 'rotate(-10deg)'
          },
          '28%': {
            transform: 'rotate(10deg)'
          },
          '30%': {
            transform: 'rotate(-8deg)'
          },
          '32%': {
            transform: 'rotate(8deg)'
          },
          '34%': {
            transform: 'rotate(-6deg)'
          },
          '36%': {
            transform: 'rotate(6deg)'
          },
          '38%': {
            transform: 'rotate(-4deg)'
          },
          '40%': {
            transform: 'rotate(4deg)'
          },
          '42%': {
            transform: 'rotate(-2deg)'
          },
          '44%': {
            transform: 'rotate(2deg)'
          },
          '46%': {
            transform: 'rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(0deg)'
          }
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-5px)'
          }
        }
      },
      animation: {
        'expand-messages': 'expand-messages 0.5s ease-out forwards',
        'gift-spin': 'gift-spin 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'wiggle': 'wiggle 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite'
      },
      transitionTimingFunction: {
        'slow-ease': 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    },
  },
  plugins: [],
};

export default config;
