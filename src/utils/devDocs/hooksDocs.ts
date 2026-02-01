/**
 * Developer Documentation for Hooks Showcase Page
 *
 * Documentation shown in sidebar when user is on the hooks showcase page.
 * This page demonstrates all SDK hooks with live examples.
 */

import type { PageDocumentation } from '../../types/devDocs';
import { SDK_HOOKS } from '../../config/sdkFeatures';

export const hooksPageDocs: PageDocumentation = {
  pageName: 'Hooks Showcase',
  pageDescription:
    'Comprehensive showcase of all Subscrypts React SDK hooks with live, interactive examples. Connect your wallet to see real data.',
  sections: [
    {
      id: 'hooks-overview',
      title: 'SDK Hooks Overview',
      type: 'hook',
      version: '1.0.0',
      description:
        `The Subscrypts React SDK provides ${SDK_HOOKS.length} hooks for building subscription-powered applications. All hooks follow React best practices with consistent return patterns for loading, error, and data states.`,
      code: `// Common hook pattern
const {
  data,           // The main data returned
  isLoading,      // Loading state
  error,          // Error object if failed
  refetch         // Manually refetch data
} = useSDKHook();

// Always check loading and error states
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorDisplay error={error} />;

// Render data when ready
return <div>{data}</div>;`,
      notes: [
        'All hooks require SubscryptsProvider to be wrapped around your app',
        'Hooks automatically handle wallet connection state',
        'Most hooks include refetch() for manual data refresh',
        'Loading and error states are consistent across all hooks',
        'Hooks automatically re-fetch when wallet address changes',
      ],
      links: [
        {
          label: 'Hooks API Reference',
          url: 'https://github.com/Subscrypts/react-sdk/blob/main/docs/hooks.md',
        },
        {
          label: 'SDK Feature Registry',
          url: 'https://github.com/Subscrypts/react-sdk-demo/blob/main/src/config/sdkFeatures.ts',
        },
      ],
    },
    {
      id: 'hook-categories',
      title: 'Hook Categories',
      type: 'hook',
      version: '1.0.0',
      description: 'Hooks are organized into logical categories for easy discovery:',
      notes: [
        '🔌 Core Wallet & Provider (3 hooks): useWallet, useTokenBalance, useSubscrypts',
        '📝 Subscription Hooks (3 hooks): useSubscriptionStatus, useSubscribe, useMySubscriptions',
        '📋 Plan Hooks (4 hooks): usePlan, usePlans, usePlansByMerchant, usePlanPrice',
        '💰 Pricing Hooks (1 hook): useSUBSPrice',
        '⚙️ Management Hooks (1 hook): useManageSubscription',
        '👔 Merchant Hooks (3 hooks): useMerchantPlans, useMerchantSubscribers, useMerchantRevenue',
        '📡 Event Hooks (1 hook): useSubscryptsEvents',
      ],
    },
    {
      id: 'wallet-connection',
      title: 'Wallet Connection Pattern',
      type: 'hook',
      version: '1.0.0',
      description:
        'Most hooks require a connected wallet. Follow this pattern for user-friendly experiences:',
      code: `function MyComponent() {
  const { isConnected, address, connect } = useWallet();
  const { data, isLoading, error } = useSomeHook();

  // Show connect prompt if not connected
  if (!isConnected) {
    return (
      <div>
        <p>Please connect your wallet</p>
        <button onClick={connect}>Connect Wallet</button>
      </div>
    );
  }

  // Show loading state
  if (isLoading) return <LoadingSpinner />;

  // Show error state
  if (error) return <ErrorDisplay error={error} />;

  // Render data
  return <div>{/* Your UI */}</div>;
}`,
      notes: [
        'Always check isConnected before using wallet-dependent hooks',
        'Provide clear "Connect Wallet" prompts',
        'Handle loading and error states gracefully',
      ],
    },
    {
      id: 'hook-composition',
      title: 'Hook Composition',
      type: 'hook',
      version: '1.0.0',
      description: 'Hooks can be composed together for powerful functionality:',
      code: `function SubscriptionManager({ planId }: { planId: string }) {
  // Compose multiple hooks
  const { address } = useWallet();
  const { isActive, subscription } = useSubscriptionStatus(planId);
  const { plan } = usePlan(planId);
  const { subsPrice } = useSUBSPrice();

  // Derived calculations
  const usdValue = plan && subsPrice
    ? parseFloat(plan.price) * subsPrice
    : 0;

  return (
    <div>
      <h2>{plan?.name}</h2>
      <p>Price: {plan?.price} SUBS ({usdValue.toFixed(2)})</p>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
      {subscription && (
        <p>Next Payment: {new Date(subscription.nextPaymentDate * 1000).toLocaleDateString()}</p>
      )}
    </div>
  );
}`,
      notes: [
        'Hooks can be used together in the same component',
        'Combine data from multiple hooks for rich UIs',
        'Each hook manages its own loading/error state',
      ],
    },
    {
      id: 'performance-tips',
      title: 'Performance Tips',
      type: 'hook',
      version: '1.0.0',
      description: 'Best practices for optimal performance:',
      notes: [
        'Hooks cache data automatically - no need for additional caching',
        'Use refetch() sparingly - hooks auto-update when wallet changes',
        'For lists, use pagination hooks (useMySubscriptions, useMerchantSubscribers)',
        'Balance refresh intervals to avoid excessive RPC calls',
        'Use usePlans for fetching multiple plans in parallel (better than multiple usePlan calls)',
      ],
    },
    {
      id: 'error-handling',
      title: 'Error Handling',
      type: 'hook',
      version: '1.0.0',
      description: 'All hooks return errors in a consistent format:',
      code: `function MyComponent() {
  const { data, error } = useSomeHook();

  if (error) {
    // Option 1: Use SDK error utilities
    const message = getErrorMessage(error);
    const code = getErrorCode(error);
    return <ErrorDisplay error={error} />;

    // Option 2: Custom error handling
    console.error('Hook error:', error);
    return <p>Failed to load data: {error.message}</p>;

    // Option 3: Error boundary
    // Let SubscryptsErrorBoundary catch it
    throw error;
  }

  return <div>{/* Success UI */}</div>;
}`,
      notes: [
        'All hooks return error objects with .message property',
        'Use getErrorMessage() utility for user-friendly messages',
        'Consider using ErrorDisplay component for consistent UX',
        'Wrap components in SubscryptsErrorBoundary for graceful failures',
      ],
      links: [
        {
          label: 'Error Handling Guide',
          url: 'https://github.com/Subscrypts/react-sdk/blob/main/docs/error-handling.md',
        },
      ],
    },
    // Additional hook documentation for hooks shown in demo
    {
      id: 'use-plan-hooks',
      title: 'Plan Hooks (usePlan, usePlans, usePlansByMerchant)',
      type: 'hook',
      version: '1.0.11 - 1.2.0',
      description: 'Fetch and manage subscription plan data with automatic caching.',
      code: `import {
  usePlan,
  usePlans,
  usePlansByMerchant,
  usePlanPrice
} from '@subscrypts/react-sdk';

// Single plan
function PlanDetails({ planId }) {
  const { plan, isLoading, error } = usePlan(planId);
  
  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;
  
  return <div>{plan.name} - {plan.price}</div>;
}

// Multiple plans (parallel fetching)
function PlanGrid() {
  const { plans, isLoading } = usePlans(['plan-1', 'plan-2', 'plan-3']);
  
  return (
    <div className="grid grid-cols-3">
      {plans.map(plan => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}

// Plans by merchant
function MerchantStore({ merchantAddress }) {
  const { plans, isLoading } = usePlansByMerchant(merchantAddress);
  
  return (
    <div>
      <h2>Available Plans</h2>
      {plans.map(plan => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}

// Plan with USD price
function PricedPlan({ planId }) {
  const { plan, usdPrice, isLoading } = usePlanPrice(planId);
  
  return (
    <div>
      <p>{plan?.price} SUBS</p>
      <p>~{'$'}{usdPrice?.toFixed(2)} USD</p>
    </div>
  );
}`,
      notes: [
        'usePlan (v1.0.11) - Single plan with infinite cache (plans are static)',
        'usePlans (v1.0.11) - Multiple plans fetched in parallel',
        'usePlansByMerchant (v1.2.0) - All plans by merchant address',
        'usePlanPrice (v1.2.0) - Plan with USD conversion',
        'All plan hooks cached in v1.6.0+ for 80-90% RPC reduction',
        'usePlans is more efficient than multiple usePlan calls',
      ],
    },
    {
      id: 'use-subscription-hooks',
      title: 'Subscription Hooks (useSubscriptionStatus, useSubscribe, useMySubscriptions)',
      type: 'hook',
      version: '1.0.0 - 1.3.0',
      description: 'Check subscription status, create subscriptions, and manage user subscriptions.',
      code: `import {
  useSubscriptionStatus,
  useSubscribe,
  useMySubscriptions,
  useManageSubscription
} from '@subscrypts/react-sdk';

// Check if user has active subscription
function ContentGuard({ planId, children }) {
  const { isActive, status, isLoading } = useSubscriptionStatus(planId);
  
  if (isLoading) return <Loading />;
  if (!isActive) return <SubscribePrompt planId={planId} />;
  
  return children;
}

// Create subscription
function SubscribeButton({ planId }) {
  const { subscribe, isLoading, error } = useSubscribe();
  
  const handleSubscribe = async (paymentMethod) => {
    try {
      const result = await subscribe({
        planId,
        paymentMethod, // 'SUBS' or 'USDC'
        duration: 12, // months
      });
      
      console.log('Success:', result);
    } catch (err) {
      console.error('Failed:', err);
    }
  };
  
  return (
    <button onClick={() => handleSubscribe('SUBS')} disabled={isLoading}>
      {isLoading ? 'Subscribing...' : 'Subscribe'}
    </button>
  );
}

// List user subscriptions
function MySubscriptions() {
  const { subscriptions, isLoading, pagination } = useMySubscriptions({
    pageSize: 10,
  });
  
  return (
    <div>
      {subscriptions.map(sub => (
        <SubscriptionCard key={sub.id} subscription={sub} />
      ))}
      
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={pagination.goToPage}
      />
    </div>
  );
}

// Manage subscription
function SubscriptionActions({ subscription }) {
  const { cancel, toggleAutoRenew, isLoading } = useManageSubscription();
  
  return (
    <div>
      <button onClick={() => cancel(subscription.id)} disabled={isLoading}>
        Cancel
      </button>
      <button onClick={() => toggleAutoRenew(subscription.id)} disabled={isLoading}>
        Toggle Auto-Renew
      </button>
    </div>
  );
}`,
      notes: [
        'useSubscriptionStatus (v1.0.0) - Check active status with smart TTL caching',
        'useSubscribe (v1.0.0) - Create new subscriptions with transaction tracking',
        'useMySubscriptions (v1.3.0) - Paginated list of user subscriptions',
        'useManageSubscription (v1.2.0) - Cancel, toggle auto-renewal, update cycles',
        'v1.6.0+ adds 70% RPC reduction for status checks via caching',
        'useSubscribe automatically handles sanctions pre-flight checks',
      ],
    },
    {
      id: 'merchant-hooks',
      title: 'Merchant Hooks (useMerchantPlans, useMerchantSubscribers, useMerchantRevenue)',
      type: 'hook',
      version: '1.4.0',
      description: 'Build merchant dashboards with subscription business analytics.',
      code: `import {
  useMerchantPlans,
  useMerchantSubscribers,
  useMerchantRevenue
} from '@subscrypts/react-sdk';

function MerchantDashboard({ merchantAddress }) {
  // Get all merchant plans
  const { plans, isLoading: plansLoading } = useMerchantPlans(merchantAddress);
  
  // Get subscribers for a specific plan
  const { subscribers, isLoading: subsLoading } = useMerchantSubscribers('plan-123', {
    pageSize: 10,
    status: 'active', // 'active', 'cancelled', 'all'
  });
  
  // Calculate revenue
  const { mrr, totalRevenue, subscriberCount, isLoading: revenueLoading } = 
    useMerchantRevenue(merchantAddress);

  return (
    <div>
      <RevenueCard mrr={mrr} totalRevenue={totalRevenue} />
      
      <h3>Your Plans ({plans.length})</h3>
      {plans.map(plan => (
        <PlanPerformanceCard key={plan.id} plan={plan} />
      ))}
      
      <h3>Recent Subscribers</h3>
      {subscribers.map(sub => (
        <SubscriberRow key={sub.id} subscriber={sub} />
      ))}
    </div>
  );
}`,
      notes: [
        'v1.4.0 feature - Merchant toolkit',
        'useMerchantPlans: List all plans owned by merchant',
        'useMerchantSubscribers: Paginated subscriber list per plan',
        'useMerchantRevenue: Calculate MRR and total revenue',
        'MRR = Monthly Recurring Revenue from active subscriptions',
        'All merchant hooks include caching in v1.6.0+',
      ],
    },
    {
      id: 'pricing-hooks',
      title: 'Pricing Hooks (useSUBSPrice, useTokenBalance)',
      type: 'hook',
      version: '1.0.0 - 1.2.0',
      description: 'Get real-time token prices and balances.',
      code: `import {
  useSUBSPrice,
  useTokenBalance,
  useWallet
} from '@subscrypts/react-sdk';

function PricingInfo() {
  // Get SUBS/USD price
  const { 
    price: subsPrice, 
    formattedPrice,
    isLoading: priceLoading,
    lastUpdated 
  } = useSUBSPrice();
  
  // Get wallet balances
  const { address } = useWallet();
  const { 
    subsBalance, 
    usdcBalance,
    formattedSubsBalance,
    formattedUsdcBalance,
    isLoading: balanceLoading 
  } = useTokenBalance(address);

  return (
    <div>
      <h3>Current Prices</h3>
      <p>1 SUBS = {'$'}{formattedPrice} USD</p>
      <p>Last updated: {new Date(lastUpdated).toLocaleTimeString()}</p>
      
      <h3>Your Balances</h3>
      <p>SUBS: {formattedSubsBalance}</p>
      <p>USDC: {formattedUsdcBalance}</p>
    </div>
  );
}`,
      notes: [
        'useSUBSPrice (v1.2.0) - Real-time SUBS/USD price from DEX',
        'useTokenBalance (v1.0.0) - SUBS and USDC balances',
        'Auto-refresh with configurable interval',
        'Formatted values for display',
        'Raw bigint values for calculations',
      ],
    },
    {
      id: 'event-hooks',
      title: 'Event Hooks (useSubscryptsEvents)',
      type: 'hook',
      version: '1.3.0',
      description: 'Listen to real-time protocol events for reactive applications.',
      code: `import { useSubscryptsEvents } from '@subscrypts/react-sdk';

function EventMonitor() {
  const events = useSubscryptsEvents({
    events: [
      'SubscriptionCreated',
      'SubscriptionRenewed',
      'SubscriptionCancelled',
      'PaymentProcessed',
    ],
    filter: {
      subscriber: userAddress, // Filter by subscriber
      // planId: 'plan-123',   // Filter by plan
    },
    onEvent: (event) => {
      console.log('New event:', event);
      
      // Show notification
      showToast({
        type: 'success',
        message: \`Subscription \${event.type}: \${event.planName}\`,
      });
    },
  });

  return (
    <div>
      <h3>Recent Activity</h3>
      {events.map((event, i) => (
        <EventCard key={i} event={event} />
      ))}
    </div>
  );
}`,
      notes: [
        'v1.3.0 feature - Real-time event listening',
        'Listen to protocol events without polling',
        'Filter by subscriber, plan, or merchant',
        'Callback on each new event',
        'Use for notifications, analytics, real-time updates',
        'Events: SubscriptionCreated, Renewed, Cancelled, PaymentProcessed',
      ],
    },
    {
      id: 'core-hooks',
      title: 'Core Hooks (useWallet, useSubscrypts)',
      type: 'hook',
      version: '1.0.0',
      description: 'Essential hooks for wallet connection and SDK context access.',
      code: `import {
  useWallet,
  useSubscrypts
} from '@subscrypts/react-sdk';

// Wallet connection
function WalletStatus() {
  const {
    address,
    isConnected,
    isConnecting,
    chainId,
    connect,
    disconnect,
    switchNetwork,
    connector
  } = useWallet();

  if (!isConnected) {
    return <button onClick={connect}>Connect Wallet</button>;
  }

  return (
    <div>
      <p>Connected: {address}</p>
      <p>Network: {chainId}</p>
      <button onClick={disconnect}>Disconnect</button>
      <button onClick={() => switchNetwork(42161)}>Switch to Arbitrum</button>
    </div>
  );
}

// Direct SDK access
function AdvancedIntegration() {
  const {
    subscryptsContract,
    subsTokenContract,
    usdcContract,
    provider,
    signer,
    isReady,
    cacheManager, // v1.6.0+
    logger
  } = useSubscrypts();

  // Access cache manager (v1.6.0+)
  const clearCache = () => {
    cacheManager?.clear?.();
  };

  // Custom contract call
  const customCall = async () => {
    if (!isReady) return;
    const result = await subscryptsContract.someMethod();
    return result;
  };

  return (
    <div>
      <button onClick={clearCache}>Clear Cache</button>
      <button onClick={customCall}>Custom Call</button>
    </div>
  );
}`,
      notes: [
        'useWallet (v1.0.0) - Wallet connection, network switching',
        'useSubscrypts (v1.0.0) - Direct SDK context access',
        'useSubscrypts provides contract instances for advanced use',
        'v1.6.0+ adds cacheManager to useSubscrypts',
        'isReady indicates contracts are initialized',
        'Use for custom contract interactions not covered by hooks',
      ],
    },
  ],
};
