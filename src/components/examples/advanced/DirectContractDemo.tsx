/**
 * DirectContractDemo - Direct Contract Access
 *
 * Demonstrates using the useSubscrypts hook for direct access to
 * contracts, signers, and providers for advanced use cases.
 * Added in SDK v1.0.0.
 */

import { useState } from 'react';
import { useSubscrypts, formatTokenAmount } from '@subscrypts/react-sdk';
import { DemoCard } from '../shared';

export function DirectContractDemo() {
  const {
    wallet,
    signer,
    provider,
    network,
    subscryptsContract,
    subsTokenContract,
    usdcTokenContract,
    subsBalance,
    usdcBalance,
    refreshBalances,
    connectors,
    activeConnector,
  } = useSubscrypts();

  const [contractInfo, setContractInfo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchContractInfo = async () => {
    if (!subscryptsContract) {
      setContractInfo('Connect wallet to access contract');
      return;
    }

    setIsLoading(true);
    try {
      // Example: Call contract methods directly
      const contractAddress = await subscryptsContract.getAddress();
      setContractInfo(`Subscrypts Contract: ${contractAddress}`);
    } catch (error) {
      setContractInfo(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshBalances = async () => {
    setIsLoading(true);
    try {
      await refreshBalances();
    } catch (error) {
      console.error('Failed to refresh balances:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DemoCard
      title="Direct Contract Access via useSubscrypts"
      description="Access raw contracts, signers, and providers for advanced integrations and custom functionality."
    >
      <div className="space-y-6">
        {/* useSubscrypts Overview */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <h3 className="font-semibold text-blue-900 mb-2">What is useSubscrypts?</h3>
          <p className="text-sm text-blue-800">
            The <code className="bg-blue-100 px-1 rounded">useSubscrypts</code> hook provides direct access
            to the underlying SDK context, including:
          </p>
          <ul className="text-sm text-blue-800 list-disc list-inside mt-2 space-y-1">
            <li><strong>Contracts</strong> - Raw ethers.js Contract instances</li>
            <li><strong>Signer & Provider</strong> - For custom transaction signing and RPC calls</li>
            <li><strong>Wallet State</strong> - Address, connection status, balances</li>
            <li><strong>Network Info</strong> - Chain ID, RPC URL, explorer</li>
            <li><strong>Connectors</strong> - Available wallet connectors and active connector</li>
          </ul>
        </div>

        {/* Wallet State */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Wallet State</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm font-mono">
            <div>
              <span className="text-gray-600">Address:</span>{' '}
              <span className="text-gray-900">{wallet.address || 'Not connected'}</span>
            </div>
            <div>
              <span className="text-gray-600">Status:</span>{' '}
              <span className={wallet.isConnected ? 'text-green-600' : 'text-red-600'}>
                {wallet.isConnected ? '● Connected' : '○ Disconnected'}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Connecting:</span>{' '}
              <span className="text-gray-900">{wallet.isConnecting ? 'Yes' : 'No'}</span>
            </div>
            <div>
              <span className="text-gray-600">SUBS Balance:</span>{' '}
              <span className="text-gray-900">
                {subsBalance !== null ? formatTokenAmount(subsBalance, 18, 4) : 'N/A'}
              </span>
            </div>
            <div>
              <span className="text-gray-600">USDC Balance:</span>{' '}
              <span className="text-gray-900">
                {usdcBalance !== null ? formatTokenAmount(usdcBalance, 6, 2) : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Network Info */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Network Info</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm font-mono">
            <div>
              <span className="text-gray-600">Chain ID:</span>{' '}
              <span className="text-gray-900">{network.chainId}</span>
            </div>
            <div>
              <span className="text-gray-600">Chain Name:</span>{' '}
              <span className="text-gray-900">{network.name}</span>
            </div>
            <div>
              <span className="text-gray-600">Native Token:</span>{' '}
              <span className="text-gray-900">{network.nativeCurrency.symbol}</span>
            </div>
            <div>
              <span className="text-gray-600">RPC URL:</span>{' '}
              <span className="text-gray-900 break-all">{network.rpcUrl}</span>
            </div>
            <div>
              <span className="text-gray-600">Explorer:</span>{' '}
              <a
                href={network.blockExplorer}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {network.blockExplorer}
              </a>
            </div>
          </div>
        </div>

        {/* Contract Info */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Contract Access</h3>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <div>
                <span className="text-gray-600">Subscrypts Contract:</span>{' '}
                <span className={subscryptsContract ? 'text-green-600' : 'text-red-600'}>
                  {subscryptsContract ? '✓ Available' : '✗ Not available'}
                </span>
              </div>
              <div>
                <span className="text-gray-600">SUBS Token Contract:</span>{' '}
                <span className={subsTokenContract ? 'text-green-600' : 'text-red-600'}>
                  {subsTokenContract ? '✓ Available' : '✗ Not available'}
                </span>
              </div>
              <div>
                <span className="text-gray-600">USDC Token Contract:</span>{' '}
                <span className={usdcTokenContract ? 'text-green-600' : 'text-red-600'}>
                  {usdcTokenContract ? '✓ Available' : '✗ Not available'}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Signer:</span>{' '}
                <span className={signer ? 'text-green-600' : 'text-red-600'}>
                  {signer ? '✓ Available' : '✗ Not available'}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Provider:</span>{' '}
                <span className={provider ? 'text-green-600' : 'text-red-600'}>
                  {provider ? '✓ Available' : '✗ Not available'}
                </span>
              </div>
            </div>

            <button
              onClick={handleFetchContractInfo}
              disabled={isLoading || !subscryptsContract}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Loading...' : 'Fetch Contract Address'}
            </button>

            {contractInfo && (
              <div className="bg-white border border-gray-300 rounded-lg p-3 text-sm font-mono">
                {contractInfo}
              </div>
            )}
          </div>
        </div>

        {/* Wallet Connectors */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Wallet Connectors</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <div>
              <span className="text-gray-600">Available Connectors:</span>{' '}
              <span className="text-gray-900">{connectors.length}</span>
            </div>
            {connectors.map((connector, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className={activeConnector?.id === connector.id ? 'text-green-600' : 'text-gray-600'}>
                  {activeConnector?.id === connector.id ? '●' : '○'}
                </span>
                <span className="text-gray-900">{connector.name}</span>
                <span className="text-xs text-gray-500">({connector.id})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Actions */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Interactive Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <button
              onClick={handleRefreshBalances}
              disabled={isLoading || !wallet.isConnected}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Refresh Balances
            </button>
          </div>
        </div>

        {/* Code Examples */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Usage Examples</h3>
          <div className="space-y-4">
            {/* Basic Usage */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Access Wallet and Contracts</h4>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`import { useSubscrypts } from '@subscrypts/react-sdk';

function MyComponent() {
  const {
    wallet,              // { address, isConnected, isConnecting }
    signer,              // Ethers.js Signer
    provider,            // Ethers.js BrowserProvider
    network,             // { chainId, chainName, rpcUrl, ... }
    subscryptsContract,  // Subscrypts Contract instance
    subsTokenContract,   // SUBS Token Contract instance
    usdcTokenContract,   // USDC Token Contract instance
    subsBalance,         // bigint | null
    usdcBalance,         // bigint | null
    refreshBalances,     // () => Promise<void>
  } = useSubscrypts();

  return (
    <div>
      <p>Address: {wallet.address}</p>
      <p>SUBS Balance: {subsBalance?.toString()}</p>
      <button onClick={refreshBalances}>Refresh</button>
    </div>
  );
}`}</pre>
              </div>
            </div>

            {/* Direct Contract Calls */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Direct Contract Method Calls</h4>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`import { useSubscrypts } from '@subscrypts/react-sdk';

function ContractInteraction() {
  const { subscryptsContract, signer } = useSubscrypts();

  const getSubscription = async (subscriptionId: string) => {
    if (!subscryptsContract) throw new Error('Contract not available');

    // Read-only call
    const subscription = await subscryptsContract.subscriptions(subscriptionId);
    return subscription;
  };

  const cancelSubscription = async (subscriptionId: string) => {
    if (!subscryptsContract || !signer) {
      throw new Error('Contract or signer not available');
    }

    // Write call (sends transaction)
    const tx = await subscryptsContract.cancelSubscription(subscriptionId);
    const receipt = await tx.wait();
    return receipt;
  };

  return (
    <button onClick={() => cancelSubscription('1')}>
      Cancel Subscription
    </button>
  );
}`}</pre>
              </div>
            </div>

            {/* Custom RPC Calls */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Custom RPC Calls with Provider</h4>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`import { useSubscrypts } from '@subscrypts/react-sdk';

function NetworkInfo() {
  const { provider, wallet } = useSubscrypts();

  const getGasPrice = async () => {
    if (!provider) throw new Error('Provider not available');

    const feeData = await provider.getFeeData();
    return feeData.gasPrice;
  };

  const getBalance = async () => {
    if (!provider || !wallet.address) {
      throw new Error('Provider or address not available');
    }

    // Get ETH balance
    const balance = await provider.getBalance(wallet.address);
    return balance;
  };

  const getBlockNumber = async () => {
    if (!provider) throw new Error('Provider not available');

    const blockNumber = await provider.getBlockNumber();
    return blockNumber;
  };

  return <div>/* UI */</div>;
}`}</pre>
              </div>
            </div>

            {/* Token Transfers */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Custom Token Transfers</h4>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`import { useSubscrypts, parseTokenAmount } from '@subscrypts/react-sdk';

function TokenTransfer() {
  const { subsTokenContract, usdcTokenContract, signer } = useSubscrypts();

  const transferSubs = async (to: string, amount: string) => {
    if (!subsTokenContract || !signer) {
      throw new Error('Contract or signer not available');
    }

    const amountInWei = parseTokenAmount(amount, 18); // SUBS has 18 decimals
    const tx = await subsTokenContract.transfer(to, amountInWei);
    const receipt = await tx.wait();
    return receipt;
  };

  const transferUsdc = async (to: string, amount: string) => {
    if (!usdcTokenContract || !signer) {
      throw new Error('Contract or signer not available');
    }

    const amountInWei = parseTokenAmount(amount, 6); // USDC has 6 decimals
    const tx = await usdcTokenContract.transfer(to, amountInWei);
    const receipt = await tx.wait();
    return receipt;
  };

  return <div>/* UI */</div>;
}`}</pre>
              </div>
            </div>

            {/* Event Listening */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Listen to Contract Events</h4>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`import { useSubscrypts } from '@subscrypts/react-sdk';
import { useEffect } from 'react';

function EventListener() {
  const { subscryptsContract } = useSubscrypts();

  useEffect(() => {
    if (!subscryptsContract) return;

    // Listen for SubscriptionCreated events
    const handleSubscriptionCreated = (
      subscriptionId: bigint,
      subscriber: string,
      planId: bigint
    ) => {
      console.log('New subscription:', {
        subscriptionId: subscriptionId.toString(),
        subscriber,
        planId: planId.toString(),
      });
    };

    // Attach listener
    subscryptsContract.on('SubscriptionCreated', handleSubscriptionCreated);

    // Cleanup
    return () => {
      subscryptsContract.off('SubscriptionCreated', handleSubscriptionCreated);
    };
  }, [subscryptsContract]);

  return <div>Listening for events...</div>;
}`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 border-l-4 border-green-500 p-4">
          <h3 className="font-semibold text-green-900 mb-2">💡 Best Practices</h3>
          <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
            <li>Always check if contracts/signer/provider are available before using them</li>
            <li>Use <code className="bg-green-100 px-1 rounded">refreshBalances()</code> after transactions to update UI</li>
            <li>Handle transaction errors with try-catch blocks</li>
            <li>Wait for transaction receipts with <code className="bg-green-100 px-1 rounded">tx.wait()</code></li>
            <li>Use proper decimals when parsing token amounts (18 for SUBS, 6 for USDC)</li>
            <li>Clean up event listeners in useEffect cleanup functions</li>
            <li>Consider using higher-level hooks (useSubscribe, usePlan) for common operations</li>
          </ul>
        </div>

        {/* When to Use Direct Access */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
          <h3 className="font-semibold text-yellow-900 mb-2">⚠️ When to Use Direct Contract Access</h3>
          <p className="text-sm text-yellow-800 mb-2">
            Use <code className="bg-yellow-100 px-1 rounded">useSubscrypts</code> for advanced scenarios:
          </p>
          <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
            <li>Custom contract methods not covered by SDK hooks</li>
            <li>Listening to contract events in real-time</li>
            <li>Building custom dashboards with RPC calls</li>
            <li>Integrating with other protocols or contracts</li>
            <li>Advanced transaction batching or multicalls</li>
          </ul>
          <p className="text-sm text-yellow-800 mt-2">
            For common operations (subscribe, cancel, check status), prefer higher-level hooks
            like <code className="bg-yellow-100 px-1 rounded">useSubscribe</code>,{' '}
            <code className="bg-yellow-100 px-1 rounded">useManageSubscription</code>, etc.
          </p>
        </div>
      </div>
    </DemoCard>
  );
}
