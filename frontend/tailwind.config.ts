import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          neon: '#CCFF00',     // Vanguard-style Neon Green
          dark: '#09090B',     // Main black background
          card: '#18181B',     // Dark gray for cards
          gray: '#A1A1AA',     // Muted text
          primary: '#CCFF00',  // Mapped to neon for backward compatibility
          gold: '#E8A317',     // Preserved original accent
          light: '#27272A',    // Adapted to dark mode (zinc-800 equivalent)
        },
        signal: {
          green: {
            bg: 'rgba(204, 255, 0, 0.1)',
            text: '#CCFF00',
            border: 'rgba(204, 255, 0, 0.3)',
          },
          amber: {
            bg: 'rgba(245, 158, 11, 0.1)',
            text: '#F59E0B',
            border: 'rgba(245, 158, 11, 0.3)',
          },
          red: {
            bg: 'rgba(244, 63, 94, 0.1)',
            text: '#F43F5E',
            border: 'rgba(244, 63, 94, 0.3)',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-display)', 'Sora', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'], // Added for elegant headings
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;