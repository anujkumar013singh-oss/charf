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
          DEFAULT: '#0C2340',
          dark: '#060F1A',
          light: '#1A3D6E',
        },
        blue: {
          mid: '#2563A8',
          light: '#3B82C4',
          pale: '#EBF2FA',
        },
        gold: {
          DEFAULT: '#D4A017',
          light: '#F5C842',
          pale: '#FDF6E3',
        },
        offwhite: '#F7F9FC',
        footer: '#0A0F1E',
        success: '#2ECC71',
        error: '#E74C3C',
        text: {
          primary: '#111827',
          secondary: '#4B5563',
          muted: '#9CA3AF',
          inverse: '#FFFFFF',
        },
        border: {
          light: '#E5E7EB',
          dark: '#1E3A5F',
        },
      },
      fontFamily: {
        logo: ['"Bebas Neue"', 'sans-serif'],
        heading: ['"Josefin Sans"', 'sans-serif'],
        body: ['"Chakra Petch"', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '20px',
        xl: '32px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(12, 35, 64, 0.10)',
        glow: '0 0 40px rgba(212, 160, 23, 0.25)',
        heavy: '0 20px 60px rgba(12, 35, 64, 0.18)',
      },
    },
  },
  plugins: [],
}
