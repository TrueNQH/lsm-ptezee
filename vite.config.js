// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // (tuỳ chọn) expose ra LAN để ngrok truy cập
    allowedHosts: ['.ngrok-free.app', '.ngrok.io'],
    // Nếu tunnel là HTTPS, HMR hay lỗi WS -> dùng clientPort 443.
    // Nếu tunnel HTTP, đổi thành 80.
    hmr: { clientPort: 443 }
  },
  // Nếu bạn dùng `vite preview`:
  preview: {
    allowedHosts: ['.ngrok-free.app', '.ngrok.io'],
  }
})
