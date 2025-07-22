import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_TELEGRAM_BOT_TOKEN': JSON.stringify(process.env.TELEGRAM_BOT_TOKEN || '7249135652:AAG1VV2jiv1mYB1QRkuIwKMHvR3QfysRWKo'),
    'import.meta.env.VITE_OPENROUTER_API_KEY': JSON.stringify(process.env.OPENROUTER_API_KEY || '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'),
    'import.meta.env.VITE_YOUTUBE_API_KEY': JSON.stringify(process.env.YOUTUBE_API_KEY || 'your-youtube-api-key')
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
