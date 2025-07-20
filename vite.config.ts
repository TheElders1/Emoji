import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_TELEGRAM_BOT_TOKEN': JSON.stringify(process.env.TELEGRAM_BOT_TOKEN || '7249135652:AAG1VV2jiv1mYB1QRkuIwKMHvR3QfysRWKo')
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
