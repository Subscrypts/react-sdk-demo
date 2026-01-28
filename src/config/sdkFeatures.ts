/**
 * Centralized SDK Feature Registry
 *
 * Single source of truth for all Subscrypts React SDK features.
 * This file tracks which features are available in which SDK versions,
 * making it easy to update the demo when the SDK changes.
 *
 * Usage:
 * - When adding a new SDK feature: Add it to the appropriate category
 * - When removing a feature: Remove it from this registry
 * - When SDK updates: Review changelog and update this file
 *
 * Benefits:
 * - Single place to update when SDK changes
 * - Version tracking for all features
 * - Easy to see what's available
 * - Auto-generates showcases
 */

export interface SDKFeature {
  name: string;
  version: string; // SDK version when feature was introduced
  category: 'hook' | 'component' | 'utility' | 'constant' | 'type';
  description: string;
}

/**
 * All SDK Hooks (16 hooks)
 */
export const SDK_HOOKS: SDKFeature[] = [
  // Core Wallet & Provider
  { name: 'useWallet', version: '1.0.0', category: 'hook', description: 'Wallet connection, network switching, connectors' },
  { name: 'useTokenBalance', version: '1.0.0', category: 'hook', description: 'Get SUBS or USDC token balance' },
  { name: 'useSubscrypts', version: '1.0.0', category: 'hook', description: 'Advanced - Direct context, contract instances, signer access' },

  // Subscription Hooks
  { name: 'useSubscriptionStatus', version: '1.0.0', category: 'hook', description: 'Check subscription status for a plan' },
  { name: 'useSubscribe', version: '1.0.0', category: 'hook', description: 'Manual subscription flow with transaction tracking' },
  { name: 'useMySubscriptions', version: '1.3.0', category: 'hook', description: 'Paginated list of user subscriptions' },

  // Plan Hooks
  { name: 'usePlan', version: '1.0.11', category: 'hook', description: 'Fetch single plan details' },
  { name: 'usePlans', version: '1.0.11', category: 'hook', description: 'Fetch multiple plans in parallel' },
  { name: 'usePlansByMerchant', version: '1.2.0', category: 'hook', description: 'Fetch all plans by merchant address' },
  { name: 'usePlanPrice', version: '1.2.0', category: 'hook', description: 'Get plan price with USD conversion' },

  // Pricing Hooks
  { name: 'useSUBSPrice', version: '1.2.0', category: 'hook', description: 'Current SUBS/USD price with auto-refresh' },

  // Management Hooks
  { name: 'useManageSubscription', version: '1.2.0', category: 'hook', description: 'Cancel, toggle auto-renewal, update cycles' },

  // Merchant Hooks
  { name: 'useMerchantPlans', version: '1.4.0', category: 'hook', description: 'Fetch all plans owned by merchant' },
  { name: 'useMerchantSubscribers', version: '1.4.0', category: 'hook', description: 'Paginated subscribers for a plan' },
  { name: 'useMerchantRevenue', version: '1.4.0', category: 'hook', description: 'Calculate MRR from active subscriptions' },

  // Event Hooks
  { name: 'useSubscryptsEvents', version: '1.3.0', category: 'hook', description: 'Real-time protocol event listeners' },
];

/**
 * All SDK Components (15 components)
 */
export const SDK_COMPONENTS: SDKFeature[] = [
  // Checkout & Subscription
  { name: 'SubscryptsButton', version: '1.0.0', category: 'component', description: 'One-click subscription with variants and sizes' },
  { name: 'CheckoutWizard', version: '1.0.0', category: 'component', description: 'Standalone multi-step checkout modal' },

  // Content Protection
  { name: 'SubscriptionGuard', version: '1.0.0', category: 'component', description: 'Multi-plan protection (v1.1.0: planIds, requireAll)' },

  // Pricing & Plans
  { name: 'PlanCard', version: '1.0.11', category: 'component', description: 'Configurable plan display with showFields' },
  { name: 'PricingTable', version: '1.0.11', category: 'component', description: 'Grid layout for multiple plans' },

  // Subscriber Dashboard
  { name: 'SubscriptionCard', version: '1.3.0', category: 'component', description: 'Display subscription with status badge' },
  { name: 'SubscriptionDashboard', version: '1.3.0', category: 'component', description: 'Complete dashboard with pagination' },

  // Management
  { name: 'ManageSubscriptionModal', version: '1.2.0', category: 'component', description: 'Full subscription management UI' },
  { name: 'ConfirmDialog', version: '1.2.0', category: 'component', description: 'Reusable confirmation dialog' },

  // Merchant Dashboard
  { name: 'MerchantDashboard', version: '1.4.0', category: 'component', description: 'Complete merchant overview' },

  // Wallet
  { name: 'ConnectWalletModal', version: '1.1.0', category: 'component', description: 'Lists available connectors' },

  // Error Handling
  { name: 'ErrorDisplay', version: '1.1.0', category: 'component', description: 'Context-aware error display' },
  { name: 'NetworkSwitchPrompt', version: '1.1.0', category: 'component', description: 'One-click network switcher' },
  { name: 'SubscryptsErrorBoundary', version: '1.1.0', category: 'component', description: 'React error boundary for SDK' },

  // UI Primitives (version may vary)
  { name: 'LoadingSpinner', version: '1.0.0', category: 'component', description: 'Size variants and color customization' },
];

/**
 * All SDK Utilities (20+ utilities)
 */
export const SDK_UTILITIES: SDKFeature[] = [
  // Formatters
  { name: 'formatTokenAmount', version: '1.0.0', category: 'utility', description: 'Format bigint to human-readable string' },
  { name: 'parseTokenAmount', version: '1.0.0', category: 'utility', description: 'Parse string to bigint' },
  { name: 'formatSubs', version: '1.0.0', category: 'utility', description: 'Format SUBS amounts' },
  { name: 'formatUsdc', version: '1.0.0', category: 'utility', description: 'Format USDC amounts' },
  { name: 'formatFiatPrice', version: '1.2.0', category: 'utility', description: 'Format USD amounts with locale support' },
  { name: 'formatDate', version: '1.0.0', category: 'utility', description: 'Format Date objects' },
  { name: 'formatDateTime', version: '1.0.0', category: 'utility', description: 'Format with time' },

  // Validators
  { name: 'shortenAddress', version: '1.0.0', category: 'utility', description: 'Truncate addresses' },
  { name: 'validateAddress', version: '1.0.0', category: 'utility', description: 'Test valid/invalid addresses' },
  { name: 'validatePositiveNumber', version: '1.0.0', category: 'utility', description: 'Number validation' },
  { name: 'validatePlanId', version: '1.0.0', category: 'utility', description: 'Plan ID validation' },

  // Decision Helpers
  { name: 'canAccess', version: '1.2.0', category: 'utility', description: 'Check if subscription grants active access' },
  { name: 'isPaymentDue', version: '1.2.0', category: 'utility', description: 'Check if payment is past due' },
  { name: 'shouldRenew', version: '1.2.0', category: 'utility', description: 'Check if should auto-renew' },
  { name: 'getSubscriptionHealth', version: '1.2.0', category: 'utility', description: 'Comprehensive health summary' },

  // Status Resolvers
  { name: 'resolveSubscriptionStatus', version: '1.1.0', category: 'utility', description: 'Normalize subscription state' },

  // Error Handling
  { name: 'getErrorMessage', version: '1.1.0', category: 'utility', description: 'Map ethers.js error codes to messages' },
  { name: 'getErrorCode', version: '1.1.0', category: 'utility', description: 'Extract error codes from errors' },

  // Session Management
  { name: 'saveSession', version: '1.1.0', category: 'utility', description: 'Persist wallet session' },
  { name: 'loadSession', version: '1.1.0', category: 'utility', description: 'Load wallet session' },
  { name: 'clearSession', version: '1.1.0', category: 'utility', description: 'Clear session' },
  { name: 'isSessionStale', version: '1.1.0', category: 'utility', description: 'Check 7-day expiry' },
];

/**
 * Contract Addresses & Network Constants
 */
export const SDK_CONSTANTS: SDKFeature[] = [
  { name: 'SUBSCRYPTS_ADDRESS', version: '1.0.0', category: 'constant', description: 'Subscrypts Diamond contract address' },
  { name: 'SUBS_TOKEN_ADDRESS', version: '1.0.0', category: 'constant', description: 'SUBS token contract address' },
  { name: 'USDC_ADDRESS', version: '1.0.0', category: 'constant', description: 'USDC token contract address' },
  { name: 'PERMIT2_ADDRESS', version: '1.0.0', category: 'constant', description: 'ERC-2612 permit contract' },
  { name: 'DEX_QUOTER_ADDRESS', version: '1.0.0', category: 'constant', description: 'Uniswap V3 quoter' },
  { name: 'DEX_ROUTER_ADDRESS', version: '1.0.0', category: 'constant', description: 'DEX router for token swaps' },
  { name: 'ARBITRUM_ONE', version: '1.0.0', category: 'constant', description: 'Arbitrum One network config (Chain ID: 42161)' },
];

/**
 * Provider Configuration Props
 */
export const PROVIDER_PROPS: SDKFeature[] = [
  { name: 'enableWalletManagement', version: '1.0.0', category: 'type', description: 'Enable internal wallet management' },
  { name: 'network', version: '1.0.0', category: 'type', description: 'Network to connect to (arbitrum)' },
  { name: 'externalProvider', version: '1.0.0', category: 'type', description: 'Use external wallet provider (Wagmi, etc.)' },
  { name: 'balanceRefreshInterval', version: '1.0.0', category: 'type', description: 'Token balance refresh interval' },
  { name: 'debug', version: '1.0.7', category: 'type', description: 'Logging level (silent, info, debug)' },
  { name: 'connectors', version: '1.1.0', category: 'type', description: 'Custom wallet connectors' },
  { name: 'persistSession', version: '1.1.0', category: 'type', description: 'Remember wallet connections' },
  { name: 'onAccountChange', version: '1.0.11', category: 'type', description: 'Callback when user switches accounts' },
  { name: 'onChainChange', version: '1.0.11', category: 'type', description: 'Callback when user switches networks' },
];

/**
 * All features combined
 */
export const ALL_SDK_FEATURES = [
  ...SDK_HOOKS,
  ...SDK_COMPONENTS,
  ...SDK_UTILITIES,
  ...SDK_CONSTANTS,
  ...PROVIDER_PROPS,
];

/**
 * Get features by category
 */
export function getFeaturesByCategory(category: SDKFeature['category']): SDKFeature[] {
  return ALL_SDK_FEATURES.filter(f => f.category === category);
}

/**
 * Get features by version
 */
export function getFeaturesByVersion(version: string): SDKFeature[] {
  return ALL_SDK_FEATURES.filter(f => f.version === version);
}

/**
 * Get feature by name
 */
export function getFeature(name: string): SDKFeature | undefined {
  return ALL_SDK_FEATURES.find(f => f.name === name);
}

/**
 * Check if feature exists in SDK
 */
export function hasFeature(name: string): boolean {
  return ALL_SDK_FEATURES.some(f => f.name === name);
}

/**
 * Get all hook names
 */
export function getAllHooks(): string[] {
  return SDK_HOOKS.map(h => h.name);
}

/**
 * Get all component names
 */
export function getAllComponents(): string[] {
  return SDK_COMPONENTS.map(c => c.name);
}

/**
 * Get all utility names
 */
export function getAllUtilities(): string[] {
  return SDK_UTILITIES.map(u => u.name);
}

/**
 * Summary statistics
 */
export const SDK_STATS = {
  totalFeatures: ALL_SDK_FEATURES.length,
  hooks: SDK_HOOKS.length,
  components: SDK_COMPONENTS.length,
  utilities: SDK_UTILITIES.length,
  constants: SDK_CONSTANTS.length,
  providerProps: PROVIDER_PROPS.length,
  currentVersion: '1.4.0',
};
