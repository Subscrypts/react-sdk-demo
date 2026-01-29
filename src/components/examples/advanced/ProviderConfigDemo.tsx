/**
 * ProviderConfigDemo - SubscryptsProvider Configuration
 *
 * Demonstrates all configuration options available for SubscryptsProvider.
 * Added in SDK v1.0.0, expanded in v1.1.0 with debug modes and callbacks.
 */

import { useState } from 'react';
import { DemoCard } from '../shared';

export function ProviderConfigDemo() {
  const [logLevel, setLogLevel] = useState<'silent' | 'info' | 'debug'>('info');
  const [accountChanges, setAccountChanges] = useState<string[]>([]);

  return (
    <DemoCard
      title="SubscryptsProvider Configuration"
      description="Configure the SDK provider with various options for wallet management, logging, and callbacks."
    >
      <div className="space-y-6">
        {/* Configuration Overview */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Available Configuration Options</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-mono text-blue-600">enableWalletManagement</span>
              <span className="text-gray-600"> : boolean</span>
              <p className="text-gray-600 mt-1">Enable internal wallet connection management (default: true)</p>
            </div>
            <div>
              <span className="font-mono text-blue-600">externalProvider</span>
              <span className="text-gray-600"> : ExternalWalletConfig</span>
              <p className="text-gray-600 mt-1">Provide external wallet (Privy, RainbowKit, etc.) when enableWalletManagement is false</p>
            </div>
            <div>
              <span className="font-mono text-blue-600">network</span>
              <span className="text-gray-600"> : 'arbitrum'</span>
              <p className="text-gray-600 mt-1">Network to use (default: 'arbitrum')</p>
            </div>
            <div>
              <span className="font-mono text-blue-600">rpcUrl</span>
              <span className="text-gray-600"> : string</span>
              <p className="text-gray-600 mt-1">Custom RPC URL (optional, uses public RPC by default)</p>
            </div>
            <div>
              <span className="font-mono text-blue-600">balanceRefreshInterval</span>
              <span className="text-gray-600"> : number</span>
              <p className="text-gray-600 mt-1">Token balance refresh interval in milliseconds (default: 30000)</p>
            </div>
            <div>
              <span className="font-mono text-blue-600">debug</span>
              <span className="text-gray-600"> : 'silent' | 'info' | 'debug'</span>
              <p className="text-gray-600 mt-1">Logging level for SDK operations (default: 'info')</p>
            </div>
            <div>
              <span className="font-mono text-blue-600">onAccountChange</span>
              <span className="text-gray-600"> : (newAddress, oldAddress) =&gt; void</span>
              <p className="text-gray-600 mt-1">Callback when user switches wallet accounts</p>
            </div>
            <div>
              <span className="font-mono text-blue-600">onChainChange</span>
              <span className="text-gray-600"> : (newChainId, oldChainId) =&gt; void</span>
              <p className="text-gray-600 mt-1">Callback when network/chain changes</p>
            </div>
            <div>
              <span className="font-mono text-blue-600">connectors</span>
              <span className="text-gray-600"> : WalletConnector[]</span>
              <p className="text-gray-600 mt-1">Custom wallet connectors for advanced integration</p>
            </div>
            <div>
              <span className="font-mono text-blue-600">persistSession</span>
              <span className="text-gray-600"> : boolean</span>
              <p className="text-gray-600 mt-1">Auto-reconnect wallet on page reload (default: true)</p>
            </div>
          </div>
        </div>

        {/* Basic Configuration Example */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Basic Configuration</h3>
          <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre>{`import { SubscryptsProvider } from '@subscrypts/react-sdk';
import '@subscrypts/react-sdk/styles';

function App() {
  return (
    <SubscryptsProvider
      enableWalletManagement={true}
      network="arbitrum"
      debug="info"
      persistSession={true}
      balanceRefreshInterval={30000}
    >
      <YourApp />
    </SubscryptsProvider>
  );
}`}</pre>
          </div>
        </div>

        {/* Debug Mode Example */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Debug Logging Levels</h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                onClick={() => setLogLevel('silent')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  logLevel === 'silent'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Silent
              </button>
              <button
                onClick={() => setLogLevel('info')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  logLevel === 'info'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Info (Default)
              </button>
              <button
                onClick={() => setLogLevel('debug')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  logLevel === 'debug'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Debug
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm space-y-2">
                <p><strong>Selected Level:</strong> {logLevel}</p>
                <p className="text-gray-600">
                  {logLevel === 'silent' && '🔇 No console output - recommended for production'}
                  {logLevel === 'info' && 'ℹ️ User-friendly status messages and errors - default setting'}
                  {logLevel === 'debug' && '🐛 Full developer debugging with transaction data, contract calls, and state changes'}
                </p>
              </div>
            </div>
            <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre>{`<SubscryptsProvider debug="${logLevel}">
  <YourApp />
</SubscryptsProvider>`}</pre>
            </div>
          </div>
        </div>

        {/* Event Callbacks Example */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Event Callbacks</h3>
          <div className="space-y-3">
            <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre>{`<SubscryptsProvider
  onAccountChange={(newAddress, oldAddress) => {
    console.log('Account changed:', { newAddress, oldAddress });
    // Refresh user-specific data, clear cache, etc.
  }}
  onChainChange={(newChainId, oldChainId) => {
    console.log('Chain changed:', { newChainId, oldChainId });
    // Handle network switch, update UI, etc.
  }}
>
  <YourApp />
</SubscryptsProvider>`}</pre>
            </div>

            {/* Simulated Event Log */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">Event Log (Simulated)</h4>
                <button
                  onClick={() => {
                    setAccountChanges([
                      ...accountChanges,
                      `Account changed: 0x742d...9D12 → 0x1234...5678 at ${new Date().toLocaleTimeString()}`
                    ]);
                  }}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                >
                  Simulate Account Change
                </button>
              </div>
              <div className="space-y-1 text-sm font-mono max-h-32 overflow-y-auto">
                {accountChanges.length === 0 && (
                  <p className="text-gray-500">No events yet. Simulate an account change to see how callbacks work.</p>
                )}
                {accountChanges.map((event, i) => (
                  <div key={i} className="text-gray-700 bg-white p-2 rounded">
                    {event}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* External Wallet Example */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">External Wallet Integration (e.g., Privy, RainbowKit)</h3>
          <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre>{`import { SubscryptsProvider } from '@subscrypts/react-sdk';
import { usePrivy } from '@privy-io/react-auth';

function AppWithPrivy() {
  const { authenticated, user, connectWallet } = usePrivy();

  return (
    <SubscryptsProvider
      enableWalletManagement={false}
      externalProvider={{
        connect: connectWallet,
        disconnect: () => {},
        address: user?.wallet?.address,
        chainId: user?.wallet?.chainId,
        signer: /* privy signer */,
        provider: /* ethers provider */,
      }}
    >
      <YourApp />
    </SubscryptsProvider>
  );
}`}</pre>
          </div>
        </div>

        {/* Custom RPC Example */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Custom RPC URL</h3>
          <p className="text-sm text-gray-600 mb-3">
            Use your own RPC endpoint for better reliability and rate limits.
          </p>
          <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre>{`<SubscryptsProvider
  network="arbitrum"
  rpcUrl="https://arb1.arbitrum.io/rpc"
>
  <YourApp />
</SubscryptsProvider>`}</pre>
          </div>
        </div>

        {/* Balance Refresh Interval */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Balance Refresh Interval</h3>
          <p className="text-sm text-gray-600 mb-3">
            Control how frequently token balances are updated (in milliseconds).
          </p>
          <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre>{`<SubscryptsProvider
  balanceRefreshInterval={60000} // Refresh every 60 seconds
>
  <YourApp />
</SubscryptsProvider>

// Default is 30000ms (30 seconds)
// Set to 0 to disable auto-refresh`}</pre>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Best Practices</h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Use <code className="bg-blue-100 px-1 rounded">debug="silent"</code> in production</li>
            <li>Use <code className="bg-blue-100 px-1 rounded">debug="debug"</code> during development for full visibility</li>
            <li>Implement <code className="bg-blue-100 px-1 rounded">onAccountChange</code> to clear user-specific cached data</li>
            <li>Keep <code className="bg-blue-100 px-1 rounded">persistSession={true}</code> for better UX (auto-reconnect)</li>
            <li>Use custom RPC for production apps to avoid rate limiting</li>
            <li>Adjust <code className="bg-blue-100 px-1 rounded">balanceRefreshInterval</code> based on your app's needs</li>
          </ul>
        </div>
      </div>
    </DemoCard>
  );
}
