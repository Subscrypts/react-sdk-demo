/**
 * NetworkSwitchPrompt Component Demo
 *
 * Demonstrates the network switch prompt for wrong network detection (v1.1.0).
 */

import { NetworkSwitchPrompt, useWallet } from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';
import { useState } from 'react';

export function NetworkSwitchPromptDemo() {
  const { isConnected, chainId, switchNetwork } = useWallet();
  const [simulatedChainId, setSimulatedChainId] = useState<number | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [switchAttempted, setSwitchAttempted] = useState(false);

  if (!isConnected) {
    return (
      <DemoCard
        title="NetworkSwitchPrompt"
        description="One-click network switcher to Arbitrum One"
        version="v1.1.0"
      >
        <ConnectWalletPrompt />
      </DemoCard>
    );
  }

  const currentChainId = chainId || null;
  const isCorrectNetwork = currentChainId === 42161;

  // Network names for display
  const getNetworkName = (chainId: number | null) => {
    if (!chainId) return 'Unknown';
    const networks: Record<number, string> = {
      1: 'Ethereum Mainnet',
      5: 'Goerli Testnet',
      42161: 'Arbitrum One',
      137: 'Polygon',
      56: 'BSC',
    };
    return networks[chainId] || `Chain ${chainId}`;
  };

  return (
    <DemoCard
      title="NetworkSwitchPrompt"
      description="One-click network switcher to Arbitrum One"
      version="v1.1.0"
    >
      <div className="space-y-4">
        {/* Current Network Status */}
        <div className={`rounded-lg p-4 border-2 ${
          isCorrectNetwork ? 'bg-green-50 border-green-300' : 'bg-yellow-50 border-yellow-300'
        }`}>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{isCorrectNetwork ? '✅' : '⚠️'}</span>
            <div>
              <div className="font-semibold">
                {isCorrectNetwork ? 'Correct Network' : 'Wrong Network'}
              </div>
              <div className="text-sm text-gray-600">
                Connected to: <strong>{getNetworkName(currentChainId)}</strong> (Chain ID: {currentChainId})
              </div>
              {!isCorrectNetwork && (
                <div className="text-xs text-orange-600 mt-1">
                  Subscrypts requires Arbitrum One (Chain ID: 42161)
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Simulator */}
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Simulate Different Networks:</h4>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => {
                setSimulatedChainId(1);
                setShowPrompt(true);
                setSwitchAttempted(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Ethereum Mainnet (1)
            </button>
            <button
              onClick={() => {
                setSimulatedChainId(5);
                setShowPrompt(true);
                setSwitchAttempted(false);
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
            >
              Goerli Testnet (5)
            </button>
            <button
              onClick={() => {
                setSimulatedChainId(137);
                setShowPrompt(true);
                setSwitchAttempted(false);
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
            >
              Polygon (137)
            </button>
            <button
              onClick={() => {
                setSimulatedChainId(56);
                setShowPrompt(true);
                setSwitchAttempted(false);
              }}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
            >
              BSC (56)
            </button>
          </div>

          <button
            onClick={() => {
              setSimulatedChainId(null);
              setShowPrompt(false);
              setSwitchAttempted(false);
            }}
            className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm"
          >
            Clear Simulation
          </button>
        </div>

        {/* NetworkSwitchPrompt Component */}
        {showPrompt && simulatedChainId && (
          <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Live Prompt (Simulated):</h4>
            <NetworkSwitchPrompt
              currentChainId={simulatedChainId}
              onSwitch={async () => {
                console.log('Switch network clicked');
                setSwitchAttempted(true);
                // In real usage, this would call switchNetwork(42161)
                // For demo, we just show the message
              }}
              onDismiss={() => {
                setShowPrompt(false);
                console.log('Prompt dismissed');
              }}
            />
          </div>
        )}

        {/* Switch Result */}
        {switchAttempted && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-700">
              In a real app, clicking "Switch Network" would trigger:
            </p>
            <code className="text-xs bg-white px-2 py-1 rounded mt-2 block">
              await switchNetwork(42161)
            </code>
            <p className="text-xs text-blue-600 mt-2">
              This opens your wallet's network switch dialog
            </p>
          </div>
        )}

        {/* Real Network Switch Example */}
        {!isCorrectNetwork && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">🔄 Try Real Network Switch:</h4>
            <p className="text-sm text-gray-700 mb-3">
              You're currently on <strong>{getNetworkName(currentChainId)}</strong>.
              Click below to actually switch to Arbitrum One.
            </p>
            <button
              onClick={async () => {
                try {
                  await switchNetwork(42161);
                  console.log('Switched to Arbitrum One');
                } catch (error) {
                  console.error('Failed to switch network:', error);
                }
              }}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
            >
              Switch to Arbitrum One (Real)
            </button>
          </div>
        )}

        {/* Features */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Features:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Displays current network name and chain ID</li>
            <li>✓ One-click switch to Arbitrum One</li>
            <li>✓ Optional dismiss button</li>
            <li>✓ Clear visual indication of wrong network</li>
            <li>✓ Integrates with useWallet switchNetwork function</li>
            <li>✓ Responsive design</li>
          </ul>
        </div>

        {/* Props Documentation */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Component Props:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div><strong>currentChainId:</strong> number | null (required) - Current chain ID</div>
            <div><strong>onSwitch:</strong> () =&gt; void (required) - Called when user clicks switch</div>
            <div><strong>onDismiss:</strong> () =&gt; void - Optional dismiss callback</div>
            <div><strong>className:</strong> string - Additional CSS classes</div>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">💡 Automatic Detection:</h4>
          <p className="text-sm text-gray-700">
            The SDK's SubscryptsProvider automatically detects wrong networks. However, you can
            also use NetworkSwitchPrompt manually in your custom layouts to give users a clear
            way to switch networks when needed.
          </p>
        </div>

        {/* Example Code */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Example Usage:</h4>
          <pre className="text-xs bg-white rounded p-3 overflow-x-auto">
            {`import { NetworkSwitchPrompt, useWallet } from '@subscrypts/react-sdk';

function App() {
  const { walletState, switchNetwork } = useWallet();
  const ARBITRUM_ONE = 42161;

  // Show prompt if on wrong network
  const isWrongNetwork = walletState.chainId &&
                         walletState.chainId !== ARBITRUM_ONE;

  return (
    <div>
      {isWrongNetwork && (
        <NetworkSwitchPrompt
          currentChainId={walletState.chainId}
          onSwitch={async () => {
            await switchNetwork(ARBITRUM_ONE);
          }}
          onDismiss={() => {
            // Optionally dismiss for this session
            sessionStorage.setItem('network-prompt-dismissed', 'true');
          }}
        />
      )}

      {/* Rest of your app */}
    </div>
  );
}`}
          </pre>
        </div>
      </div>
    </DemoCard>
  );
}
