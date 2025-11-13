/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2',
        'primary-light': '#B3D9F2',
        'primary-dark': '#2E5C8A',
        accent: '#4A90E2',
        'text-dark': '#1A1A1A',
        'text-muted': '#6B7280',
        'border-light': '#E5E7EB',
      },
      backgroundColor: {
        'gradient-light': '#B3D9F2',
      },
    },
  },
  plugins: [],
}
