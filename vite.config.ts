import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_TELEGRAM_BOT_TOKEN': JSON.stringify(process.env.TELEGRAM_BOT_TOKEN || '8015335327:AAER_k1-PLGHKldW-9YkTehKUTHztA_T8iY')
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
