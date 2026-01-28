/**
 * Developer Documentation for Home Page
 *
 * Documentation shown in sidebar when user is on the home page.
 */

import type { PageDocumentation } from '../../types/devDocs';

export const homePageDocs: PageDocumentation = {
  pageName: 'Home',
  pageDescription:
    'The home page demonstrates SDK initialization with SubscryptsProvider and basic wallet connection.',
  sections: [
    {
      id: 'provider-setup',
      title: 'SubscryptsProvider Setup',
      type: 'config',
      version: '1.0.0',
      description:
        'The SubscryptsProvider is the root component that initializes the SDK. Wrap your app with this provider to enable all SDK features.',
      code: `import { SubscryptsProvider } from '@subscrypts/react-sdk';
import '@subscrypts/react-sdk/styles';

function App() {
  return (
    <SubscryptsProvider
      enableWalletManagement={true}
      network="arbitrum"
      debug="info"
      balanceRefreshInterval={30000}
      persistSession={true}
    >
      <YourApp />
    </SubscryptsProvider>
  );
}`,
      props: [
        {
          name: 'enableWalletManagement',
          type: 'boolean',
          required: false,
          default: 'false',
          description:
            'Enable internal wallet management. Set to true to use built-in wallet connection.',
        },
        {
          name: 'network',
          type: '"arbitrum"',
          required: false,
          default: '"arbitrum"',
          description: 'Network to connect to. Currently only Arbitrum One is supported.',
        },
        {
          name: 'externalProvider',
          type: 'Provider',
          required: false,
          description:
            'External wallet provider (e.g., from Wagmi/RainbowKit). Alternative to enableWalletManagement.',
        },
        {
          name: 'debug',
          type: '"silent" | "info" | "debug"',
          required: false,
          default: '"info"',
          description: 'Logging level for SDK operations.',
        },
        {
          name: 'balanceRefreshInterval',
          type: 'number',
          required: false,
          default: '30000',
          description: 'Token balance refresh interval in milliseconds.',
        },
        {
          name: 'persistSession',
          type: 'boolean',
          required: false,
          default: 'true',
          description: 'Remember wallet connections across page reloads (7-day expiry).',
        },
        {
          name: 'connectors',
          type: 'WalletConnector[]',
          required: false,
          description: 'Custom wallet connectors. Alternative to enableWalletManagement.',
        },
        {
          name: 'onAccountChange',
          type: '(newAddress, oldAddress) => void',
          required: false,
          description: 'Callback when user switches wallet accounts.',
        },
        {
          name: 'onChainChange',
          type: '(newChainId, oldChainId) => void',
          required: false,
          description: 'Callback when user switches networks.',
        },
      ],
      notes: [
        'Always import the CSS styles: import "@subscrypts/react-sdk/styles"',
        'Use either enableWalletManagement OR externalProvider OR connectors, not multiple',
        'The provider must wrap all components that use SDK hooks',
        'Debug level affects console output for troubleshooting',
      ],
      links: [
        {
          label: 'SDK Documentation',
          url: 'https://github.com/Subscrypts/react-sdk#readme',
        },
        {
          label: 'Provider Props Reference',
          url: 'https://github.com/Subscrypts/react-sdk/blob/main/docs/provider.md',
        },
      ],
    },
    {
      id: 'wallet-connection',
      title: 'useWallet Hook',
      type: 'hook',
      version: '1.0.0',
      description:
        'The useWallet hook provides wallet connection state and methods. Use it to display connection status and trigger connect/disconnect actions.',
      code: `import { useWallet } from '@subscrypts/react-sdk';

function WalletButton() {
  const {
    address,
    isConnected,
    isConnecting,
    connect,
    disconnect,
    chainId
  } = useWallet();

  if (isConnected) {
    return (
      <div>
        <p>Connected: {address}</p>
        <button onClick={disconnect}>Disconnect</button>
      </div>
    );
  }

  return (
    <button onClick={connect} disabled={isConnecting}>
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}`,
      returnValues: [
        {
          name: 'address',
          type: 'string | null',
          description: 'Connected wallet address (0x...)',
        },
        {
          name: 'isConnected',
          type: 'boolean',
          description: 'Whether wallet is connected',
        },
        {
          name: 'isConnecting',
          type: 'boolean',
          description: 'Whether connection is in progress',
        },
        {
          name: 'connect',
          type: '() => Promise<void>',
          description: 'Trigger wallet connection',
        },
        {
          name: 'disconnect',
          type: '() => Promise<void>',
          description: 'Disconnect wallet',
        },
        {
          name: 'switchNetwork',
          type: '() => Promise<void>',
          description: 'Switch to Arbitrum One (Chain ID: 42161)',
        },
        {
          name: 'chainId',
          type: 'number | null',
          description: 'Current network chain ID',
        },
        {
          name: 'connectors',
          type: 'WalletConnector[]',
          description: 'Available wallet connectors (v1.1.0+)',
        },
        {
          name: 'activeConnector',
          type: 'WalletConnector | null',
          description: 'Currently active connector (v1.1.0+)',
        },
      ],
      notes: [
        'Always check isConnected before displaying wallet-specific UI',
        'Chain ID 42161 = Arbitrum One',
        'Use isConnecting to show loading states',
      ],
    },
    {
      id: 'network-config',
      title: 'Network Configuration',
      type: 'constant',
      version: '1.0.0',
      description:
        'The SDK is configured for Arbitrum One. Access network constants for contract addresses and RPC URLs.',
      code: `import {
  ARBITRUM_ONE,
  SUBSCRYPTS_ADDRESS,
  SUBS_TOKEN_ADDRESS,
  USDC_ADDRESS
} from '@subscrypts/react-sdk';

console.log('Network:', ARBITRUM_ONE);
// { chainId: 42161, name: 'Arbitrum One', rpcUrls: [...] }

console.log('Subscrypts Contract:', SUBSCRYPTS_ADDRESS);
console.log('SUBS Token:', SUBS_TOKEN_ADDRESS);
console.log('USDC:', USDC_ADDRESS);`,
      notes: [
        'All contracts are deployed on Arbitrum One (Chain ID: 42161)',
        'Contract addresses are production addresses',
        'Users must be on Arbitrum network to interact with contracts',
      ],
    },
  ],
};
