import React from 'react';
import ReactDOM from 'react-dom/client';
import { SubscryptsProvider } from '@subscrypts/react-sdk';
import '@subscrypts/react-sdk/styles';
import './styles/index.css';
import App from './App';
import { DebugPanel } from './components/dev/DebugPanel';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SubscryptsProvider
      enableWalletManagement={true}
      network="arbitrum"
      balanceRefreshInterval={30000}
      debug="debug"
      // [v1.6.0] Caching configuration (optional - defaults work great)
      caching={{
        enabled: true,        // Enable intelligent caching (default: true)
        defaultTTL: 60000,    // 60 second TTL (default: 60000ms)
        maxEntries: 500,      // Max 500 cache entries (default: 500)
      }}
    >
      <App />
      {/* [v1.6.0] Debug Panel - Toggle-able overlay for cache stats & performance metrics */}
      <DebugPanel />
    </SubscryptsProvider>
  </React.StrictMode>
);
