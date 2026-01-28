/**
 * Developer Documentation for Utilities Showcase Page
 *
 * Documentation shown in sidebar when user is on the utilities showcase page.
 */

import type { PageDocumentation } from '../../types/devDocs';
import { SDK_UTILITIES } from '../../config/sdkFeatures';

export const utilitiesPageDocs: PageDocumentation = {
  pageName: 'Utilities Showcase',
  pageDescription:
    `Comprehensive showcase of all ${SDK_UTILITIES.length}+ Subscrypts React SDK utility functions with live, interactive examples.`,
  sections: [
    {
      id: 'utilities-overview',
      title: 'SDK Utilities Overview',
      type: 'utility',
      version: '1.0.0',
      description:
        'The Subscrypts React SDK provides pure utility functions for formatting, validation, and decision-making. All utilities are framework-agnostic and can be used in React, Node.js, or any JavaScript environment.',
      code: `import {
  formatSubs,
  formatUsdc,
  validateAddress,
  shortenAddress,
  canAccess,
  getErrorMessage
} from '@subscrypts/react-sdk';

// Use anywhere - no hooks required
const formatted = formatSubs(1500000000000000000n);
console.log(formatted); // "1.5 SUBS"

const isValid = validateAddress('0x742d35...');
console.log(isValid); // true

const hasAccess = canAccess(subscription);
console.log(hasAccess); // true/false`,
      notes: [
        'Utilities are pure functions (no side effects)',
        'Work in React components, Node.js scripts, or AI agents',
        'No hooks or context required',
        'Tree-shakeable (only import what you use)',
        'TypeScript definitions included',
      ],
      links: [
        {
          label: 'Utilities API Reference',
          url: 'https://github.com/Subscrypts/react-sdk/blob/main/docs/utilities.md',
        },
      ],
    },
    {
      id: 'utility-categories',
      title: 'Utility Categories',
      type: 'utility',
      version: '1.0.0',
      description: 'Utilities are organized by functionality:',
      notes: [
        '🔢 Formatters (7 utilities): Format token amounts, dates, and prices',
        '✅ Validators (4 utilities): Validate addresses, numbers, and plan IDs',
        '🎯 Decision Helpers (4 utilities): Access control and subscription logic',
        '📍 Status Resolvers (1 utility): Normalize subscription states',
        '❌ Error Handling (2 utilities): User-friendly error messages',
        '💾 Session Management (4 utilities): Persist wallet connections',
        '📌 Network Information: Contract addresses and network config',
      ],
    },
    {
      id: 'formatters',
      title: 'Formatters',
      type: 'utility',
      version: '1.0.0',
      description: 'Format blockchain data for display:',
      code: `// Token amounts (bigint → string)
const subsAmount = 1500000000000000000n; // 1.5 SUBS
const formatted = formatSubs(subsAmount);
console.log(formatted); // "1.5 SUBS"

// USDC amounts (6 decimals)
const usdcAmount = 1500000n; // 1.5 USDC
const formattedUsdc = formatUsdc(usdcAmount);
console.log(formattedUsdc); // "1.5 USDC"

// USD prices
const price = 9.99;
const usd = formatFiatPrice(price);
console.log(usd); // "$9.99"

// Dates
const timestamp = 1706400000;
const date = formatDate(new Date(timestamp * 1000));
console.log(date); // "Jan 28, 2024"

// Addresses
const address = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
const short = shortenAddress(address);
console.log(short); // "0x742d...0bEb"`,
      notes: [
        'All formatters handle edge cases (zero, null, undefined)',
        'formatTokenAmount is generic for any ERC20',
        'formatSubs and formatUsdc are convenience wrappers',
        'Dates support locale customization',
      ],
    },
    {
      id: 'validators',
      title: 'Validators',
      type: 'utility',
      version: '1.0.0',
      description: 'Validate user input and blockchain data:',
      code: `// Address validation
const isValid = validateAddress('0x742d35Cc...');
console.log(isValid); // true

const invalid = validateAddress('0x123');
console.log(invalid); // false

// Positive number validation
const validNumber = validatePositiveNumber(10);
console.log(validNumber); // true

const zero = validatePositiveNumber(0);
console.log(zero); // false

// Plan ID validation
const validPlanId = validatePlanId('plan-123');
console.log(validPlanId); // true

// Use in forms
function AddressInput() {
  const [error, setError] = useState('');

  const handleChange = (value: string) => {
    if (!validateAddress(value)) {
      setError('Invalid address');
    } else {
      setError('');
    }
  };

  return <input onChange={(e) => handleChange(e.target.value)} />;
}`,
      notes: [
        'Use validators in form validation',
        'Check data before API calls',
        'Prevent invalid transactions',
        'Clear error messages for users',
      ],
    },
    {
      id: 'decision-helpers',
      title: 'Decision Helpers',
      type: 'utility',
      version: '1.2.0',
      description: 'Make subscription access decisions:',
      code: `const subscription = {
  id: '123',
  status: 'active',
  nextPaymentDate: Math.floor(Date.now() / 1000) + 86400,
  autoRenewing: true,
  remainingCycles: 5
};

// Can user access content?
const hasAccess = canAccess(subscription);
console.log(hasAccess); // true

// Is payment overdue?
const due = isPaymentDue(subscription);
console.log(due); // false

// Should auto-renew?
const renew = shouldRenew(subscription);
console.log(renew); // false (not due yet)

// Comprehensive health check
const health = getSubscriptionHealth(subscription);
console.log(health);
/*
{
  hasAccess: true,
  isPaymentDue: false,
  shouldRenew: false,
  expiresIn: 86400,
  status: 'active',
  concerns: []
}
*/`,
      notes: [
        'v1.2.0 feature',
        'Pure functions - use anywhere',
        'Combine for custom access logic',
        'Health check combines all checks',
      ],
    },
    {
      id: 'error-utilities',
      title: 'Error Utilities',
      type: 'utility',
      version: '1.1.0',
      description: 'Convert technical errors to user-friendly messages:',
      code: `try {
  await contract.someMethod();
} catch (error) {
  // Get user-friendly message
  const message = getErrorMessage(error);
  console.log(message);
  // "Transaction rejected by user"

  // Get error code
  const code = getErrorCode(error);
  console.log(code);
  // "ACTION_REJECTED"
}

// Common error codes
const errors = [
  'ACTION_REJECTED',         // User rejected transaction
  'INSUFFICIENT_FUNDS',      // Not enough balance
  'CALL_EXCEPTION',          // Contract call failed
  'NETWORK_ERROR',           // Network issue
  'TIMEOUT',                 // Request timed out
];`,
      notes: [
        'Maps ethers.js v6 error codes',
        'User-friendly messages',
        'Use in error displays',
        'v1.1.0 feature',
      ],
    },
    {
      id: 'session-management',
      title: 'Session Management',
      type: 'utility',
      version: '1.1.0',
      description: 'Persist wallet connections across page reloads:',
      code: `// Save session
const session = {
  address: '0x742d35...',
  chainId: 42161,
  connectorId: 'injected',
  timestamp: Date.now()
};
saveSession(session);

// Load session
const saved = loadSession();
if (saved && !isSessionStale(saved)) {
  // Auto-reconnect
  await reconnect(saved);
} else {
  // Clear stale session
  clearSession();
}

// Check if stale (7 days)
const isStale = isSessionStale(session);
console.log(isStale); // false`,
      notes: [
        'Sessions expire after 7 days',
        'Stored in localStorage',
        'Auto-reconnect without popup',
        'Clear on explicit disconnect',
        'v1.1.0 feature',
      ],
    },
    {
      id: 'network-constants',
      title: 'Network & Contract Info',
      type: 'constant',
      version: '1.0.0',
      description: 'Access network configuration and contract addresses:',
      code: `import {
  ARBITRUM_ONE,
  SUBSCRYPTS_ADDRESS,
  SUBS_TOKEN_ADDRESS,
  USDC_ADDRESS,
  PERMIT2_ADDRESS,
  DEX_QUOTER_ADDRESS,
  DEX_ROUTER_ADDRESS
} from '@subscrypts/react-sdk';

console.log('Network:', ARBITRUM_ONE);
/*
{
  chainId: 42161,
  name: 'Arbitrum One',
  rpcUrls: [...],
  blockExplorer: 'https://arbiscan.io'
}
*/

console.log('Subscrypts:', SUBSCRYPTS_ADDRESS);
console.log('SUBS Token:', SUBS_TOKEN_ADDRESS);
console.log('USDC:', USDC_ADDRESS);`,
      notes: [
        'All contracts on Arbitrum One (Chain ID: 42161)',
        'Production addresses',
        'Use for ethers.js contract instances',
        'Immutable constants',
      ],
    },
  ],
};
