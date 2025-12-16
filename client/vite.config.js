import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extends: {
      colors: {
        // Global Theme Palatte
        background: '#0B1220', // Black / Dark Navy
        surface: '#111827', // Dark Gray / Black (for Cards/Surfaces)
        'primary-blue': '#3B82F6', // Primary Accent
        'secondary-blue': '#2563EB', // Secondary Accent
        'text-white': '#FFFFFF',
        'text-muted': '#9CA3AF',
      },
      borderColor: {
        default: 'rgba(255, 255, 255, 0.1)', // border-white/10
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
