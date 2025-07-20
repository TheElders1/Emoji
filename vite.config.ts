import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_TELEGRAM_BOT_TOKEN': JSON.stringify(process.env.TELEGRAM_BOT_TOKEN || '7249135652:AAG1VV2jiv1mYB1QRkuIwKMHvR3QfysRWKo'),
    'import.meta.env.VITE_OPENROUTER_API_KEY': JSON.stringify(process.env.OPENROUTER_API_KEY || 'sk-or-v1-your-api-key-here'),
    'import.meta.env.VITE_YOUTUBE_API_KEY': JSON.stringify(process.env.YOUTUBE_API_KEY || 'your-youtube-api-key')
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
