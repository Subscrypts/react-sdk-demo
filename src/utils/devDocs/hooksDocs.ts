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
  ],
};
