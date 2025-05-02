import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';
// @ts-ignore
const typography = require('@tailwindcss/typography');

const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        amber: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        rose: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#F43F5E',
          600: '#E11D48',
          700: '#BE123C',
          800: '#9F1239',
          900: '#881337',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#92400E', // amber-800
            a: {
              color: '#B45309', // amber-700
              '&:hover': {
                color: '#78350F', // amber-900
              },
            },
            h1: {
              color: '#78350F', // amber-900
              fontFamily: 'serif',
            },
            h2: {
              color: '#78350F', // amber-900
              fontFamily: 'serif',
            },
            h3: {
              color: '#78350F', // amber-900
              fontFamily: 'serif',
            },
            h4: {
              color: '#78350F', // amber-900
              fontFamily: 'serif',
            },
            blockquote: {
              color: '#92400E', // amber-800
              borderLeftColor: '#FCD34D', // amber-300
              backgroundColor: '#FEF3C7', // amber-100
              padding: '1rem',
              borderRadius: '0.25rem',
            },
            code: {
              color: '#B45309', // amber-700
              backgroundColor: '#FEF3C7', // amber-100
              padding: '0.2rem 0.4rem',
              borderRadius: '0.25rem',
              fontFamily: 'monospace',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#FEF3C7', // amber-100
              color: '#92400E', // amber-800
              borderRadius: '0.25rem',
              padding: '1rem',
            },
            hr: {
              borderColor: '#FDE68A', // amber-200
            },
          },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
} satisfies Config;

export default config;
