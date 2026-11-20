/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neo: {
          bg: '#FFFDF0',      // Warm paper canvas
          card: '#FFFFFF',    // Crisp white card
          dark: '#121212',    // Ink black
          black: '#000000',   // Pure black
          yellow: '#FFE600',  // Electric yellow
          lime: '#A6FF00',    // Acid / neon green
          cyan: '#00F0FF',    // Radical cyan
          coral: '#FF5470',   // Hot punch coral / pink
          purple: '#E0C3FC',  // Vivid retro lavender
          cream: '#F4E8C1',   // Retro cream
          blue: '#3B82F6',    // Electric blue
          amber: '#F59E0B',   // Deep amber
          emerald: '#10B981', // Clinical emerald
          border: '#000000',  // Stark black border
        },
        canvas: {
          DEFAULT: '#FFFDF0',
          panel: '#FFFFFF',
          elevated: '#F4E8C1',
          border: '#000000',
          subtle: '#FDFBF7',
        },
        ink: {
          DEFAULT: '#000000',
          secondary: '#262626',
          muted: '#525252',
          faint: '#737373',
        },
        bio: {
          emerald: '#10B981',
          cobalt: '#2563EB',
          amber: '#D97706',
          rose: '#DC2626',
          violet: '#7C3AED',
        }
      },
      boxShadow: {
        'neo-sm': '2px 2px 0px 0px #000000',
        'neo': '4px 4px 0px 0px #000000',
        'neo-md': '5px 5px 0px 0px #000000',
        'neo-lg': '6px 6px 0px 0px #000000',
        'neo-xl': '8px 8px 0px 0px #000000',
        'neo-2xl': '12px 12px 0px 0px #000000',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'monospace'],
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}
