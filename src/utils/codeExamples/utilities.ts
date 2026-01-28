/**
 * Code Examples for SDK Utilities
 *
 * Copy-pasteable examples for all Subscrypts React SDK utility functions.
 * These examples are displayed in the developer documentation sidebar.
 */

export const UTILITY_EXAMPLES = {
  // Formatters
  formatTokenAmount: `import { formatTokenAmount } from '@subscrypts/react-sdk';

// Format bigint to human-readable string
const balance = 1500000000000000000n; // 1.5 tokens with 18 decimals
const formatted = formatTokenAmount(balance, 18);
console.log(formatted); // "1.5"

// With custom decimals
const usdcBalance = 1500000n; // 1.5 USDC with 6 decimals
const formattedUsdc = formatTokenAmount(usdcBalance, 6);
console.log(formattedUsdc); // "1.5"

// With custom precision
const precise = formatTokenAmount(balance, 18, 6);
console.log(precise); // "1.500000"

// Zero value
const zero = formatTokenAmount(0n, 18);
console.log(zero); // "0"`,

  parseTokenAmount: `import { parseTokenAmount } from '@subscrypts/react-sdk';

// Parse string to bigint
const amount = parseTokenAmount("1.5", 18);
console.log(amount); // 1500000000000000000n

// USDC with 6 decimals
const usdcAmount = parseTokenAmount("10.50", 6);
console.log(usdcAmount); // 10500000n

// Integer values
const integer = parseTokenAmount("100", 18);
console.log(integer); // 100000000000000000000n

// Small amounts
const small = parseTokenAmount("0.001", 18);
console.log(small); // 1000000000000000n

// Error handling
try {
  const invalid = parseTokenAmount("invalid", 18);
} catch (error) {
  console.error("Invalid amount:", error);
}`,

  formatSubs: `import { formatSubs } from '@subscrypts/react-sdk';

// Format SUBS token amounts (18 decimals)
const balance = 1500000000000000000n;
const formatted = formatSubs(balance);
console.log(formatted); // "1.5 SUBS"

// With custom precision
const precise = formatSubs(balance, 4);
console.log(precise); // "1.5000 SUBS"

// Large amounts
const large = formatSubs(1000000000000000000000n);
console.log(large); // "1,000 SUBS"

// Display in UI
function TokenBalance({ balance }: { balance: bigint }) {
  return <p>Balance: {formatSubs(balance)}</p>;
}`,

  formatUsdc: `import { formatUsdc } from '@subscrypts/react-sdk';

// Format USDC token amounts (6 decimals)
const balance = 1500000n;
const formatted = formatUsdc(balance);
console.log(formatted); // "1.5 USDC"

// With custom precision
const precise = formatUsdc(balance, 2);
console.log(precise); // "1.50 USDC"

// Large amounts
const large = formatUsdc(1000000000n);
console.log(large); // "1,000 USDC"

// Display in UI
function UsdcBalance({ balance }: { balance: bigint }) {
  return <p>Balance: {formatUsdc(balance)}</p>;
}`,

  formatFiatPrice: `import { formatFiatPrice } from '@subscrypts/react-sdk';

// Format USD amounts with locale support
const price = 9.99;
const formatted = formatFiatPrice(price);
console.log(formatted); // "$9.99"

// Large amounts
const large = formatFiatPrice(1234.56);
console.log(large); // "$1,234.56"

// Zero decimals
const integer = formatFiatPrice(100, 0);
console.log(integer); // "$100"

// Custom locale
const euro = formatFiatPrice(99.99, 2, 'de-DE', 'EUR');
console.log(euro); // "99,99 €"

// Display in UI
function PlanPrice({ usdValue }: { usdValue: number }) {
  return <p>Price: {formatFiatPrice(usdValue)}</p>;
}`,

  formatDate: `import { formatDate } from '@subscrypts/react-sdk';

// Format Date objects
const date = new Date('2026-01-28');
const formatted = formatDate(date);
console.log(formatted); // "Jan 28, 2026"

// From timestamp
const timestamp = 1706400000; // Unix timestamp
const dateFromTimestamp = new Date(timestamp * 1000);
const formatted2 = formatDate(dateFromTimestamp);
console.log(formatted2); // "Jan 28, 2024"

// Custom locale
const german = formatDate(date, 'de-DE');
console.log(german); // "28. Jan. 2026"

// Display in UI
function NextPayment({ timestamp }: { timestamp: number }) {
  const date = new Date(timestamp * 1000);
  return <p>Next payment: {formatDate(date)}</p>;
}`,

  formatDateTime: `import { formatDateTime } from '@subscrypts/react-sdk';

// Format with time
const date = new Date('2026-01-28T14:30:00');
const formatted = formatDateTime(date);
console.log(formatted); // "Jan 28, 2026, 2:30 PM"

// From timestamp
const timestamp = 1706450400;
const dateFromTimestamp = new Date(timestamp * 1000);
const formatted2 = formatDateTime(dateFromTimestamp);
console.log(formatted2); // "Jan 28, 2024, 2:00 PM"

// Custom locale
const german = formatDateTime(date, 'de-DE');
console.log(german); // "28. Jan. 2026, 14:30"

// Display in UI
function TransactionTime({ timestamp }: { timestamp: number }) {
  const date = new Date(timestamp * 1000);
  return <p>Transaction: {formatDateTime(date)}</p>;
}`,

  // Validators
  shortenAddress: `import { shortenAddress } from '@subscrypts/react-sdk';

// Truncate Ethereum addresses
const address = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
const short = shortenAddress(address);
console.log(short); // "0x742d...0bEb"

// Custom length
const shorter = shortenAddress(address, 4);
console.log(shorter); // "0x74...0bEb"

const longer = shortenAddress(address, 8);
console.log(longer); // "0x742d35...95f0bEb"

// Display in UI
function WalletAddress({ address }: { address: string }) {
  return (
    <span title={address}>
      {shortenAddress(address)}
    </span>
  );
}

// Copy to clipboard
function CopyableAddress({ address }: { address: string }) {
  return (
    <button onClick={() => navigator.clipboard.writeText(address)}>
      {shortenAddress(address)}
    </button>
  );
}`,

  validateAddress: `import { validateAddress } from '@subscrypts/react-sdk';

// Validate Ethereum addresses
const valid = validateAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');
console.log(valid); // true

const invalid = validateAddress('0x123');
console.log(invalid); // false

const notAnAddress = validateAddress('hello');
console.log(notAnAddress); // false

// Use in form validation
function AddressInput() {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);

    if (value && !validateAddress(value)) {
      setError('Invalid Ethereum address');
    } else {
      setError('');
    }
  };

  return (
    <div>
      <input value={address} onChange={handleChange} />
      {error && <p className="error">{error}</p>}
    </div>
  );
}`,

  validatePositiveNumber: `import { validatePositiveNumber } from '@subscrypts/react-sdk';

// Validate positive numbers
const valid = validatePositiveNumber(10);
console.log(valid); // true

const zero = validatePositiveNumber(0);
console.log(zero); // false

const negative = validatePositiveNumber(-5);
console.log(negative); // false

const float = validatePositiveNumber(3.14);
console.log(float); // true

// Use in form validation
function CyclesInput() {
  const [cycles, setCycles] = useState(1);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCycles(value);

    if (!validatePositiveNumber(value)) {
      setError('Must be a positive number');
    } else {
      setError('');
    }
  };

  return (
    <div>
      <input type="number" value={cycles} onChange={handleChange} />
      {error && <p className="error">{error}</p>}
    </div>
  );
}`,

  validatePlanId: `import { validatePlanId } from '@subscrypts/react-sdk';

// Validate plan IDs
const valid = validatePlanId('plan-123');
console.log(valid); // true

const empty = validatePlanId('');
console.log(empty); // false

const nullValue = validatePlanId(null);
console.log(nullValue); // false

// Use before API calls
function subscribeToPlan(planId: string) {
  if (!validatePlanId(planId)) {
    throw new Error('Invalid plan ID');
  }

  // Proceed with subscription
  console.log('Subscribing to plan:', planId);
}

// Use in components
function PlanSelector({ planId }: { planId: string }) {
  if (!validatePlanId(planId)) {
    return <p>Invalid plan ID</p>;
  }

  return <PlanCard planId={planId} />;
}`,

  // Decision Helpers (v1.2.0)
  canAccess: `import { canAccess } from '@subscrypts/react-sdk';

// Check if subscription grants active access
const subscription = {
  id: '123',
  status: 'active',
  nextPaymentDate: Math.floor(Date.now() / 1000) + 86400, // Tomorrow
  autoRenewing: true,
  remainingCycles: 5
};

const hasAccess = canAccess(subscription);
console.log(hasAccess); // true

// Expired subscription
const expired = {
  ...subscription,
  nextPaymentDate: Math.floor(Date.now() / 1000) - 86400 // Yesterday
};
console.log(canAccess(expired)); // false

// Cancelled subscription
const cancelled = {
  ...subscription,
  status: 'cancelled'
};
console.log(canAccess(cancelled)); // false

// Use in access control
function ProtectedContent({ subscription }) {
  if (!canAccess(subscription)) {
    return <p>Your subscription has expired</p>;
  }

  return <div>Protected content here</div>;
}`,

  isPaymentDue: `import { isPaymentDue } from '@subscrypts/react-sdk';

// Check if payment is past due
const subscription = {
  nextPaymentDate: Math.floor(Date.now() / 1000) - 86400, // Yesterday
  status: 'active'
};

const due = isPaymentDue(subscription);
console.log(due); // true

// Future payment
const future = {
  nextPaymentDate: Math.floor(Date.now() / 1000) + 86400, // Tomorrow
  status: 'active'
};
console.log(isPaymentDue(future)); // false

// Use in payment reminders
function PaymentStatus({ subscription }) {
  if (isPaymentDue(subscription)) {
    return (
      <div className="alert alert-warning">
        <p>Your payment is overdue!</p>
        <button>Pay Now</button>
      </div>
    );
  }

  return <p>Payment up to date</p>;
}`,

  shouldRenew: `import { shouldRenew } from '@subscrypts/react-sdk';

// Check if subscription should be renewed
const subscription = {
  nextPaymentDate: Math.floor(Date.now() / 1000) - 86400, // Past due
  autoRenewing: true,
  remainingCycles: 5
};

const renew = shouldRenew(subscription);
console.log(renew); // true

// Auto-renew disabled
const noAutoRenew = { ...subscription, autoRenewing: false };
console.log(shouldRenew(noAutoRenew)); // false

// No cycles remaining
const noCycles = { ...subscription, remainingCycles: 0 };
console.log(shouldRenew(noCycles)); // false

// Use in subscription logic
function RenewalCheck({ subscription }) {
  if (shouldRenew(subscription)) {
    return (
      <div>
        <p>Your subscription will auto-renew</p>
        <p>Cycles remaining: {subscription.remainingCycles}</p>
      </div>
    );
  }

  return <p>Subscription will not auto-renew</p>;
}`,

  getSubscriptionHealth: `import { getSubscriptionHealth } from '@subscrypts/react-sdk';

// Get comprehensive health summary
const subscription = {
  id: '123',
  status: 'active',
  nextPaymentDate: Math.floor(Date.now() / 1000) + 172800, // 2 days
  autoRenewing: true,
  remainingCycles: 5
};

const health = getSubscriptionHealth(subscription);
console.log(health);
/*
{
  hasAccess: true,
  isPaymentDue: false,
  shouldRenew: false,
  expiresIn: 172800,
  status: 'active',
  concerns: []
}
*/

// Expiring soon subscription
const expiringSoon = {
  ...subscription,
  nextPaymentDate: Math.floor(Date.now() / 1000) + 86400 // 1 day
};

const expiring = getSubscriptionHealth(expiringSoon);
console.log(expiring.concerns); // ['expiring-soon']

// Use in health dashboard
function SubscriptionHealthCard({ subscription }) {
  const health = getSubscriptionHealth(subscription);

  return (
    <div className={health.hasAccess ? 'healthy' : 'warning'}>
      <h3>Subscription Health</h3>
      <p>Status: {health.status}</p>
      <p>Access: {health.hasAccess ? 'Active' : 'Inactive'}</p>

      {health.concerns.length > 0 && (
        <div className="concerns">
          <h4>Concerns:</h4>
          <ul>
            {health.concerns.map(concern => (
              <li key={concern}>{concern}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}`,

  // Status Resolvers (v1.1.0)
  resolveSubscriptionStatus: `import { resolveSubscriptionStatus } from '@subscrypts/react-sdk';

// Normalize subscription state
const subscription = {
  id: '123',
  nextPaymentDate: Math.floor(Date.now() / 1000) + 86400,
  autoRenewing: true,
  remainingCycles: 5
};

const status = resolveSubscriptionStatus(subscription);
console.log(status);
/*
{
  state: 'active',
  isActive: true,
  isExpired: false,
  isExpiringSoon: false,
  isCancelled: false,
  daysUntilExpiry: 1,
  displayStatus: 'Active'
}
*/

// Expiring soon (< 3 days)
const expiring = {
  ...subscription,
  nextPaymentDate: Math.floor(Date.now() / 1000) + 172800 // 2 days
};
const expiringStatus = resolveSubscriptionStatus(expiring);
console.log(expiringStatus.state); // 'expiring-soon'

// Expired
const expired = {
  ...subscription,
  nextPaymentDate: Math.floor(Date.now() / 1000) - 86400 // Yesterday
};
const expiredStatus = resolveSubscriptionStatus(expired);
console.log(expiredStatus.state); // 'expired'

// Use in UI
function StatusBadge({ subscription }) {
  const status = resolveSubscriptionStatus(subscription);

  return (
    <span className={\`badge badge-\${status.state}\`}>
      {status.displayStatus}
    </span>
  );
}`,

  // Error Handling (v1.1.0)
  getErrorMessage: `import { getErrorMessage } from '@subscrypts/react-sdk';

// Map ethers.js error codes to user-friendly messages
try {
  // Some transaction or contract call
  await contract.someMethod();
} catch (error) {
  const message = getErrorMessage(error);
  console.log(message);
  // "Transaction rejected by user" or
  // "Insufficient funds to complete transaction" or
  // "Network error. Please check your connection."
}

// Common error codes
const userRejection = { code: 'ACTION_REJECTED' };
console.log(getErrorMessage(userRejection)); // "Transaction rejected by user"

const insufficientFunds = { code: 'INSUFFICIENT_FUNDS' };
console.log(getErrorMessage(insufficientFunds)); // "Insufficient funds to complete transaction"

const networkError = { code: 'NETWORK_ERROR' };
console.log(getErrorMessage(networkError)); // "Network error. Please check your connection."

// Use in error display
function TransactionButton() {
  const [error, setError] = useState<Error | null>(null);

  const handleTransaction = async () => {
    try {
      await someTransaction();
    } catch (err) {
      setError(err as Error);
    }
  };

  return (
    <div>
      <button onClick={handleTransaction}>Send Transaction</button>
      {error && (
        <p className="error">{getErrorMessage(error)}</p>
      )}
    </div>
  );
}`,

  getErrorCode: `import { getErrorCode } from '@subscrypts/react-sdk';

// Extract error codes from errors
try {
  await contract.someMethod();
} catch (error) {
  const code = getErrorCode(error);
  console.log('Error code:', code);

  // Handle specific error codes
  if (code === 'ACTION_REJECTED') {
    console.log('User rejected the transaction');
  } else if (code === 'INSUFFICIENT_FUNDS') {
    console.log('Not enough funds');
  }
}

// Error code mapping
const error1 = { code: 'ACTION_REJECTED' };
console.log(getErrorCode(error1)); // 'ACTION_REJECTED'

const error2 = new Error('Some error');
console.log(getErrorCode(error2)); // 'UNKNOWN_ERROR'

// Use with getErrorMessage
function ErrorHandler({ error }: { error: Error }) {
  const code = getErrorCode(error);
  const message = getErrorMessage(error);

  return (
    <div className="error">
      <p>{message}</p>
      <small>Error code: {code}</small>
    </div>
  );
}`,

  // Session Management (v1.1.0)
  saveSession: `import { saveSession } from '@subscrypts/react-sdk';

// Persist wallet session to localStorage
const sessionData = {
  address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  chainId: 42161,
  connectorId: 'injected',
  timestamp: Date.now()
};

saveSession(sessionData);
console.log('Session saved');

// Session persists across page reloads
// Expires after 7 days`,

  loadSession: `import { loadSession } from '@subscrypts/react-sdk';

// Load wallet session from localStorage
const session = loadSession();

if (session) {
  console.log('Found session:', session);
  console.log('Address:', session.address);
  console.log('Chain ID:', session.chainId);

  // Auto-reconnect logic
  if (!isSessionStale(session)) {
    await reconnect(session);
  }
} else {
  console.log('No session found');
}`,

  clearSession: `import { clearSession } from '@subscrypts/react-sdk';

// Clear session from localStorage
clearSession();
console.log('Session cleared');

// Use on disconnect
function DisconnectButton() {
  const { disconnect } = useWallet();

  const handleDisconnect = async () => {
    await disconnect();
    clearSession();
    console.log('Disconnected and session cleared');
  };

  return (
    <button onClick={handleDisconnect}>
      Disconnect
    </button>
  );
}`,

  isSessionStale: `import { isSessionStale, loadSession } from '@subscrypts/react-sdk';

// Check 7-day expiry
const session = loadSession();

if (session) {
  if (isSessionStale(session)) {
    console.log('Session is stale (>7 days old)');
    clearSession();
  } else {
    console.log('Session is fresh, can auto-reconnect');
    await reconnect(session);
  }
}

// Session object
const exampleSession = {
  address: '0x...',
  chainId: 42161,
  timestamp: Date.now() - (8 * 24 * 60 * 60 * 1000) // 8 days ago
};

console.log(isSessionStale(exampleSession)); // true`,

  // Contract Addresses & Constants
  contractAddresses: `import {
  SUBSCRYPTS_ADDRESS,
  SUBS_TOKEN_ADDRESS,
  USDC_ADDRESS,
  PERMIT2_ADDRESS,
  DEX_QUOTER_ADDRESS,
  DEX_ROUTER_ADDRESS,
  ARBITRUM_ONE
} from '@subscrypts/react-sdk';

// Contract addresses (Arbitrum One)
console.log('Subscrypts:', SUBSCRYPTS_ADDRESS);
console.log('SUBS Token:', SUBS_TOKEN_ADDRESS);
console.log('USDC:', USDC_ADDRESS);
console.log('Permit2:', PERMIT2_ADDRESS);
console.log('DEX Quoter:', DEX_QUOTER_ADDRESS);
console.log('DEX Router:', DEX_ROUTER_ADDRESS);

// Network configuration
console.log('Network:', ARBITRUM_ONE);
/*
{
  chainId: 42161,
  name: 'Arbitrum One',
  rpcUrls: [...],
  blockExplorer: 'https://arbiscan.io'
}
*/

// Use in ethers.js
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(ARBITRUM_ONE.rpcUrls[0]);
const contract = new ethers.Contract(
  SUBSCRYPTS_ADDRESS,
  subscryptsABI,
  provider
);`,
};
