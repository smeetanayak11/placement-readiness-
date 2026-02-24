/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F6F3',
        'text-primary': '#111111',
        accent: '#8B0000',
        success: '#2D5016',
        warning: '#9B6F1A',
        border: '#E5E4E0',
        hover: '#F0EFEB',
        disabled: '#999999',
      },
      spacing: {
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '5': '40px',
        '8': '64px',
      },
      fontFamily: {
        serif: 'Georgia, "Times New Roman", serif',
        sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '28px',
        '3xl': '36px',
        '4xl': '48px',
      },
      lineHeight: {
        tight: '1.2',
        snug: '1.3',
        normal: '1.4',
        relaxed: '1.6',
        spacious: '1.8',
      },
      borderRadius: {
        sm: '3px',
        base: '4px',
      },
      maxWidth: {
        prose: '720px',
      },
    },
  },
}

