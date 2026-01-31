import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // ⚠️ IMPORTANT: HTTPS is REQUIRED for MetaMask and browser extension wallets
    // The Subscrypts SDK requires HTTPS to interact with wallet extensions.
    // Local HTTP development will NOT work with browser extension wallets.
    // 
    // Options for local development:
    // 1. Use ngrok to create HTTPS tunnel: npx ngrok http 5173
    // 2. Deploy to Vercel (recommended): git push → auto-deploy with HTTPS
    // 3. Build and serve with local HTTPS server (advanced)
    //
    // For production: Deploy to Vercel/Netlify for automatic HTTPS
    host: 'localhost',
    port: 5173
  }
})
