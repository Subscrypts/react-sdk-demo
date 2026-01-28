/**
 * Developer Documentation for Advanced Features Page
 *
 * Documentation shown in sidebar when user is on the advanced features page.
 */

import type { PageDocumentation } from '../../types/devDocs';

export const advancedPageDocs: PageDocumentation = {
  pageName: 'Advanced Features',
  pageDescription:
    'Advanced SDK features for power users: provider configuration, error handling, logging, direct contract access, and custom wallet connectors.',
  sections: [
    {
      id: 'advanced-provider',
      title: 'Advanced Provider Configuration',
      type: 'config',
      version: '1.0.0',
      description:
        'Deep dive into SubscryptsProvider configuration options for advanced use cases.',
      code: `<SubscryptsProvider
  // Wallet Management Options
  enableWalletManagement={true}
  externalProvider={wagmiProvider}
  connectors={[new InjectedConnector(), new WalletConnectConnector()]}
  persistSession={true}

  // Network Options
  network="arbitrum"

  // Performance Options
  balanceRefreshInterval={30000} // 30 seconds

  // Logging Options
  debug="debug" // "silent" | "info" | "debug"

  // Lifecycle Callbacks
  onAccountChange={(newAddress, oldAddress) => {
    console.log('Account changed:', newAddress);
  }}
  onChainChange={(newChainId, oldChainId) => {
    console.log('Network changed:', newChainId);
  }}
>
  <App />
</SubscryptsProvider>`,
      notes: [
        'Use ONE of: enableWalletManagement, externalProvider, or connectors',
        'persistSession enables 7-day auto-reconnect',
        'debug levels: silent (prod), info (default), debug (development)',
        'Lifecycle callbacks for tracking user behavior',
      ],
    },
    {
      id: 'wallet-connectors',
      title: 'Custom Wallet Connectors',
      type: 'config',
      version: '1.1.0',
      description:
        'Build custom wallet connectors for Privy, Web3Auth, WalletConnect, or any provider.',
      code: `import { WalletConnector } from '@subscrypts/react-sdk';

// Custom connector example
class CustomConnector implements WalletConnector {
  id = 'my-connector';
  name = 'My Wallet';

  async connect(): Promise<string> {
    // Your connection logic
    const address = await myWallet.connect();
    return address;
  }

  async disconnect(): Promise<void> {
    await myWallet.disconnect();
  }

  async getProvider() {
    return myWallet.provider;
  }

  async getSigner() {
    return myWallet.signer;
  }

  async reconnect(): Promise<string | null> {
    // Auto-reconnect logic
    if (myWallet.isConnected()) {
      return myWallet.address;
    }
    return null;
  }
}

// Use custom connector
<SubscryptsProvider
  connectors={[new CustomConnector()]}
>
  <App />
</SubscryptsProvider>`,
      notes: [
        'v1.1.0 feature',
        'Implement WalletConnector interface',
        'Built-in connectors: InjectedConnector, ExternalConnector',
        'Use with Privy, Web3Auth, Magic, etc.',
      ],
      links: [
        {
          label: 'Connector Guide',
          url: 'https://github.com/Subscrypts/react-sdk/blob/main/docs/connectors.md',
        },
      ],
    },
    {
      id: 'external-providers',
      title: 'External Provider Integration',
      type: 'config',
      version: '1.0.0',
      description:
        'Integrate with existing wallet management libraries like Wagmi or RainbowKit.',
      code: `import { WagmiConfig, useAccount } from 'wagmi';
import { SubscryptsProvider } from '@subscrypts/react-sdk';

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <SubscryptsIntegration />
    </WagmiConfig>
  );
}

function SubscryptsIntegration() {
  const { connector } = useAccount();
  const provider = await connector?.getProvider();

  return (
    <SubscryptsProvider
      externalProvider={provider}
      network="arbitrum"
    >
      <YourApp />
    </SubscryptsProvider>
  );
}`,
      notes: [
        'Works with Wagmi, RainbowKit, ConnectKit, etc.',
        'SDK uses external provider for all transactions',
        'Wallet management handled by external library',
      ],
    },
    {
      id: 'error-boundaries',
      title: 'Error Boundaries & Recovery',
      type: 'component',
      version: '1.1.0',
      description:
        'Graceful error handling with React error boundaries and recovery strategies.',
      code: `import {
  SubscryptsErrorBoundary,
  ErrorDisplay,
  NetworkSwitchPrompt,
  getErrorMessage
} from '@subscrypts/react-sdk';

// App-level error boundary
function App() {
  return (
    <SubscryptsErrorBoundary
      fallback={(error, resetError) => (
        <div>
          <h1>Something went wrong</h1>
          <ErrorDisplay error={error} onRetry={resetError} />
          <button onClick={resetError}>Try Again</button>
        </div>
      )}
      onError={(error, errorInfo) => {
        // Send to error tracking service
        console.error('SDK Error:', error);
        logErrorToService(error, errorInfo);
      }}
    >
      <SubscryptsProvider>
        <YourApp />
      </SubscryptsProvider>
    </SubscryptsErrorBoundary>
  );
}

// Wrong network detection
function NetworkGuard() {
  const { chainId, switchNetwork } = useWallet();

  if (chainId !== 42161) {
    return (
      <NetworkSwitchPrompt
        currentChainId={chainId}
        targetChainId={42161}
        onSwitch={switchNetwork}
        autoSwitch={true}
      />
    );
  }

  return <YourApp />;
}`,
      notes: [
        'v1.1.0 feature',
        'Wrap SDK components in error boundaries',
        'ErrorDisplay shows user-friendly messages',
        'NetworkSwitchPrompt handles wrong network',
        'Integrate with Sentry, Rollbar, etc.',
      ],
    },
    {
      id: 'debug-logging',
      title: 'Debug Logging',
      type: 'utility',
      version: '1.0.7',
      description:
        'Comprehensive logging system for troubleshooting and development.',
      code: `// Set debug level in provider
<SubscryptsProvider debug="debug">
  <App />
</SubscryptsProvider>

// Debug levels:
// "silent"  - No console output (production)
// "info"    - Important events only (default)
// "debug"   - Full debugging (development)

// Custom logger (advanced)
import { logger } from '@subscrypts/react-sdk';

logger.setLevel('debug');
logger.info('User connected:', address);
logger.debug('Transaction data:', txData);
logger.error('Transaction failed:', error);`,
      notes: [
        'v1.0.7 feature',
        'Logs: wallet events, transactions, API calls, errors',
        'Use "debug" in development, "silent" in production',
        'Customize logger for your logging service',
      ],
    },
    {
      id: 'direct-contract-access',
      title: 'Direct Contract Access',
      type: 'hook',
      version: '1.0.0',
      description:
        'Access contract instances directly for custom contract interactions.',
      code: `import { useSubscrypts } from '@subscrypts/react-sdk';

function AdvancedComponent() {
  const {
    subscryptsContract,
    subsTokenContract,
    usdcContract,
    provider,
    signer,
    isReady
  } = useSubscrypts();

  const callCustomMethod = async () => {
    if (!isReady || !subscryptsContract) {
      throw new Error('Contracts not ready');
    }

    // Direct contract call
    const result = await subscryptsContract.someCustomMethod();
    console.log('Result:', result);

    // Read token balance
    const balance = await subsTokenContract.balanceOf(address);
    console.log('Balance:', balance);

    // Custom transaction
    const tx = await subscryptsContract.customMethod({ gasLimit: 500000 });
    await tx.wait();
    console.log('Transaction:', tx.hash);
  };

  return <button onClick={callCustomMethod}>Custom Call</button>;
}`,
      notes: [
        'For advanced users only',
        'Direct access to ethers.js contract instances',
        'Full control over gas, nonce, etc.',
        'Use hooks for most use cases instead',
      ],
    },
    {
      id: 'signing-permits',
      title: 'Signing & Permits',
      type: 'utility',
      version: '1.0.0',
      description:
        'ERC-2612 permit signatures for gasless token approvals.',
      code: `// USDC payments use PERMIT2 internally
// This happens automatically in SubscryptsButton

// Manual permit signature (advanced)
import { generatePermit2Signature } from '@subscrypts/react-sdk';

const signature = await generatePermit2Signature({
  token: USDC_ADDRESS,
  spender: SUBSCRYPTS_ADDRESS,
  amount: amountInWei,
  deadline: Math.floor(Date.now() / 1000) + 3600, // 1 hour
  signer
});

// Use signature in contract call
await contract.payWithPermit(signature, ...);`,
      notes: [
        'PERMIT2 enables gasless approvals',
        'Users sign off-chain, approve on-chain',
        'SDK handles this automatically',
        'Only needed for custom payment flows',
      ],
    },
    {
      id: 'performance-optimization',
      title: 'Performance Optimization',
      type: 'config',
      version: '1.0.0',
      description:
        'Optimize SDK performance for production applications.',
      code: `// Optimize balance refresh interval
<SubscryptsProvider
  balanceRefreshInterval={60000} // Reduce from 30s to 60s
>

// Use pagination hooks
const { subscriptions } = useMySubscriptions({ pageSize: 10 });

// Fetch multiple plans in parallel
const { plans } = usePlans(['plan-1', 'plan-2', 'plan-3']);
// Better than: usePlan('plan-1') + usePlan('plan-2') + ...

// Conditional hook calls
function Component({ needsBalance }: { needsBalance: boolean }) {
  const { subsBalance } = useTokenBalance();

  // Only use data if needed
  return needsBalance ? <div>{subsBalance}</div> : null;
}

// Memoize expensive calculations
const usdValue = useMemo(() => {
  return parseFloat(subsAmount) * subsPrice;
}, [subsAmount, subsPrice]);`,
      notes: [
        'Balance refresh impacts RPC calls',
        'Use pagination for long lists',
        'Fetch multiple items in parallel',
        'Memoize derived calculations',
        'Lazy load components with React.lazy()',
      ],
    },
    {
      id: 'security-best-practices',
      title: 'Security Best Practices',
      type: 'config',
      version: '1.0.0',
      description:
        'Security considerations for production applications.',
      notes: [
        'Never store private keys or seed phrases',
        'Validate all user input with SDK validators',
        'Use HTTPS in production (required for MetaMask)',
        'Implement rate limiting on your backend',
        'Clear sessions on logout (clearSession())',
        'Use Content Security Policy (CSP) headers',
        'Monitor transactions with event listeners',
        'Set reasonable gas limits',
        'Validate plan IDs before transactions',
        'Implement transaction confirmation dialogs',
      ],
      links: [
        {
          label: 'Security Guide',
          url: 'https://github.com/Subscrypts/react-sdk/blob/main/docs/security.md',
        },
      ],
    },
  ],
};
