/**
 * useSubscrypts Hook Demo
 *
 * Demonstrates direct access to Subscrypts context for advanced use cases.
 * This is a low-level hook for developers who need full control.
 */

import { useSubscrypts, useWallet } from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';
import { useState } from 'react';

export function UseSubscryptsDemo() {
  const { isConnected } = useWallet();
  const [showRawContext, setShowRawContext] = useState(false);

  const context = useSubscrypts();

  if (!isConnected) {
    return (
      <DemoCard
        title="useSubscrypts"
        description="Advanced: Direct access to Subscrypts context, contracts, and provider"
        version="v1.0.0"
      >
        <ConnectWalletPrompt />
      </DemoCard>
    );
  }

  // Extract key information from context
  const hasProvider = !!context.provider;
  const hasSigner = !!context.signer;
  const hasContracts = !!context.subscryptsContract;
  const contractAddress = context.subscryptsContract?.target ? String(context.subscryptsContract.target) : 'Not available';
  const networkInfo = context.provider
    ? 'Connected to Arbitrum One'
    : 'Provider not available';

  return (
    <DemoCard
      title="useSubscrypts"
      description="Advanced: Direct access to Subscrypts context, contracts, and provider"
      version="v1.0.0"
    >
      <div className="space-y-4">
        {/* Warning Banner */}
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <div className="flex items-start">
            <span className="text-2xl mr-3">⚠️</span>
            <div>
              <h4 className="font-semibold text-yellow-900 text-sm mb-1">
                Advanced Hook
              </h4>
              <p className="text-xs text-yellow-800">
                This hook provides low-level access to the SDK internals. Only use this if you
                need direct contract interaction or custom transaction handling. For most use cases,
                prefer the higher-level hooks like useWallet, useSubscribe, etc.
              </p>
            </div>
          </div>
        </div>

        {/* Context Overview */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">
            Available Context:
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between bg-white rounded p-2">
              <span className="text-gray-700">Provider</span>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  hasProvider ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {hasProvider ? 'Available' : 'Not Available'}
              </span>
            </div>
            <div className="flex items-center justify-between bg-white rounded p-2">
              <span className="text-gray-700">Signer</span>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  hasSigner ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {hasSigner ? 'Available' : 'Not Available'}
              </span>
            </div>
            <div className="flex items-center justify-between bg-white rounded p-2">
              <span className="text-gray-700">Subscrypts Contract</span>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  hasContracts ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {hasContracts ? 'Available' : 'Not Available'}
              </span>
            </div>
          </div>
        </div>

        {/* Contract Information */}
        {hasContracts && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">
              Contract Details:
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <div className="text-gray-600">Contract Address:</div>
                <div className="font-mono text-gray-900 break-all mt-1">
                  {contractAddress}
                </div>
                <a
                  href={`https://arbiscan.io/address/${contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-1 inline-block"
                >
                  View on Arbiscan →
                </a>
              </div>
              <div>
                <div className="text-gray-600">Network:</div>
                <div className="text-gray-900 mt-1">{networkInfo}</div>
              </div>
            </div>
          </div>
        )}

        {/* Use Cases */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">When to Use This Hook:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Custom contract interactions not covered by other hooks</li>
            <li>✓ Direct access to ethers.js provider and signer</li>
            <li>✓ Advanced transaction handling with custom gas settings</li>
            <li>✓ Reading contract state directly</li>
            <li>✓ Building custom SDK extensions</li>
          </ul>
        </div>

        {/* Example Code */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Example Usage:</h4>
          <pre className="text-xs bg-white rounded p-3 overflow-x-auto">
            {`import { useSubscrypts } from '@subscrypts/react-sdk';

function MyComponent() {
  const context = useSubscrypts();

  // Access provider for read operations
  const provider = context.provider;

  // Access signer for write operations
  const signer = context.signer;

  // Access contract instance
  const contract = context.subscryptsContract;

  // Example: Call contract method directly
  const customFunction = async () => {
    if (contract) {
      const result = await contract.someMethod();
      return result;
    }
  };
}`}
          </pre>
        </div>

        {/* Raw Context Toggle */}
        <div>
          <button
            onClick={() => setShowRawContext(!showRawContext)}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            {showRawContext ? 'Hide' : 'Show'} Raw Context Object
          </button>
        </div>

        {/* Raw Context Display */}
        {showRawContext && (
          <div className="bg-white border border-gray-300 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Raw Context:</h4>
            <div className="bg-gray-50 rounded p-3 max-h-96 overflow-y-auto">
              <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(
                  {
                    hasProvider: hasProvider,
                    hasSigner: hasSigner,
                    hasContract: hasContracts,
                    contractAddress: contractAddress,
                    // Note: We don't serialize the full objects as they contain circular references
                    provider: hasProvider ? 'Provider object (not serializable)' : null,
                    signer: hasSigner ? 'Signer object (not serializable)' : null,
                    subscryptsContract: hasContracts
                      ? 'Contract object (not serializable)'
                      : null,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Note: Provider, Signer, and Contract objects contain circular references and cannot
              be fully serialized. Use browser DevTools to inspect them.
            </p>
          </div>
        )}

        {/* Context Properties */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">
            Available Context Properties:
          </h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div>provider: JsonRpcProvider | null</div>
            <div>signer: JsonRpcSigner | null</div>
            <div>subscryptsContract: Contract | null</div>
            <div>subsTokenContract: Contract | null</div>
            <div>usdcTokenContract: Contract | null</div>
            <div>isInitialized: boolean</div>
          </div>
        </div>

        {/* Alternative Recommendation */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">
            Prefer High-Level Hooks:
          </h4>
          <p className="text-sm text-gray-700">
            Before using this hook, check if your use case is covered by:
          </p>
          <ul className="text-sm text-gray-700 space-y-1 mt-2">
            <li>• <strong>useWallet</strong> - Wallet connection and network info</li>
            <li>• <strong>useSubscribe</strong> - Create subscriptions</li>
            <li>• <strong>useManageSubscription</strong> - Manage subscriptions</li>
            <li>• <strong>usePlan</strong> - Fetch plan data</li>
            <li>• <strong>useTokenBalance</strong> - Check SUBS/USDC balances</li>
          </ul>
          <p className="text-xs text-gray-600 mt-2">
            These hooks provide better error handling, loading states, and automatic updates.
          </p>
        </div>
      </div>
    </DemoCard>
  );
}
