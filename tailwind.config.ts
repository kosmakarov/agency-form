import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f3f6f4',
          100: '#e0e8e2',
          200: '#c3d1c7',
          300: '#9db4a4',
          400: '#74927d',
          500: '#547560',
          600: '#415d4b',
          700: '#354a3d',
          800: '#2c3c32',
          900: '#1a2820',
          950: '#0f1a14',
        },
        ivory: {
          50: '#fefdfb',
          100: '#fdf9f3',
          200: '#faf5eb',
          300: '#f5ede0',
          400: '#ede0cc',
        },
        // Consultation page palette
        dark: {
          bg: '#1A1A2E',
          card: '#232338',
        },
        gold: {
          DEFAULT: '#C4A35A',
          light: '#D4B86A',
          dark: '#A8894A',
        },
        cream: {
          DEFAULT: '#F5F3EE',
          muted: '#8A8778',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        georgia: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
