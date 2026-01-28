/**
 * Code Examples for SDK Hooks
 *
 * Copy-pasteable examples for all Subscrypts React SDK hooks.
 * These examples are displayed in the developer documentation sidebar.
 */

export const HOOK_EXAMPLES = {
  // Core Wallet & Provider Hooks
  useWallet: `import { useWallet } from '@subscrypts/react-sdk';

function WalletStatus() {
  const {
    address,
    isConnected,
    isConnecting,
    connect,
    disconnect,
    switchNetwork,
    chainId,
    connectors,
    activeConnector
  } = useWallet();

  return (
    <div>
      {isConnected ? (
        <>
          <p>Connected: {address}</p>
          <p>Network: {chainId}</p>
          <p>Connector: {activeConnector?.name}</p>
          <button onClick={disconnect}>Disconnect</button>
        </>
      ) : (
        <button onClick={connect} disabled={isConnecting}>
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
    </div>
  );
}`,

  useTokenBalance: `import { useTokenBalance } from '@subscrypts/react-sdk';

function TokenBalances() {
  const {
    subsBalance,
    usdcBalance,
    isLoading,
    error,
    refetch
  } = useTokenBalance();

  if (isLoading) return <p>Loading balances...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <p>SUBS Balance: {subsBalance}</p>
      <p>USDC Balance: {usdcBalance}</p>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}`,

  useSubscrypts: `import { useSubscrypts } from '@subscrypts/react-sdk';

function AdvancedContractAccess() {
  const {
    provider,
    signer,
    subscryptsContract,
    subsTokenContract,
    usdcContract,
    isReady
  } = useSubscrypts();

  if (!isReady) return <p>Initializing...</p>;

  const callCustomMethod = async () => {
    // Direct contract access for advanced use cases
    const result = await subscryptsContract.customMethod();
    console.log('Result:', result);
  };

  return (
    <button onClick={callCustomMethod}>
      Call Custom Contract Method
    </button>
  );
}`,

  // Subscription Hooks
  useSubscriptionStatus: `import { useSubscriptionStatus } from '@subscrypts/react-sdk';

function SubscriptionChecker({ planId }: { planId: string }) {
  const {
    isActive,
    subscription,
    isLoading,
    error,
    refetch
  } = useSubscriptionStatus(planId);

  if (isLoading) return <p>Checking subscription...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
      {subscription && (
        <>
          <p>Next Payment: {new Date(subscription.nextPaymentDate * 1000).toLocaleDateString()}</p>
          <p>Auto-Renew: {subscription.autoRenewing ? 'Yes' : 'No'}</p>
          <p>Cycles Remaining: {subscription.remainingCycles}</p>
        </>
      )}
      <button onClick={refetch}>Refresh Status</button>
    </div>
  );
}`,

  useSubscribe: `import { useSubscribe } from '@subscrypts/react-sdk';

function ManualSubscription({ planId }: { planId: string }) {
  const {
    subscribe,
    isLoading,
    error,
    transactionHash,
    status
  } = useSubscribe();

  const handleSubscribe = async () => {
    try {
      await subscribe({
        planId,
        paymentMethod: 'subs', // or 'usdc'
        cycles: 1,
        referralAddress: '0x...' // optional
      });
    } catch (err) {
      console.error('Subscription failed:', err);
    }
  };

  return (
    <div>
      <button onClick={handleSubscribe} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Subscribe'}
      </button>
      {status && <p>Status: {status}</p>}
      {transactionHash && (
        <a href={\`https://arbiscan.io/tx/\${transactionHash}\`} target="_blank">
          View Transaction
        </a>
      )}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}`,

  useMySubscriptions: `import { useMySubscriptions } from '@subscrypts/react-sdk';

function MySubscriptionsList() {
  const {
    subscriptions,
    isLoading,
    error,
    hasNext,
    hasPrev,
    nextPage,
    prevPage,
    currentPage,
    totalPages
  } = useMySubscriptions({ pageSize: 10 });

  if (isLoading) return <p>Loading subscriptions...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>My Subscriptions</h2>
      {subscriptions.map(sub => (
        <div key={sub.id}>
          <p>Plan: {sub.planId}</p>
          <p>Status: {sub.status}</p>
          <p>Next Payment: {new Date(sub.nextPaymentDate * 1000).toLocaleDateString()}</p>
        </div>
      ))}

      <div>
        <button onClick={prevPage} disabled={!hasPrev}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={!hasNext}>Next</button>
      </div>
    </div>
  );
}`,

  // Plan Hooks
  usePlan: `import { usePlan } from '@subscrypts/react-sdk';

function PlanDetails({ planId }: { planId: string }) {
  const {
    plan,
    isLoading,
    error,
    refetch
  } = usePlan(planId);

  if (isLoading) return <p>Loading plan...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!plan) return <p>Plan not found</p>;

  return (
    <div>
      <h3>{plan.name}</h3>
      <p>Price: {plan.price} {plan.currency}</p>
      <p>Frequency: {plan.frequency}</p>
      <p>Merchant: {plan.merchantAddress}</p>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}`,

  usePlans: `import { usePlans } from '@subscrypts/react-sdk';

function MultiplePlans({ planIds }: { planIds: string[] }) {
  const {
    plans,
    isLoading,
    errors
  } = usePlans(planIds);

  if (isLoading) return <p>Loading plans...</p>;

  return (
    <div>
      <h2>Available Plans</h2>
      {plans.map((plan, index) => (
        plan ? (
          <div key={planIds[index]}>
            <h3>{plan.name}</h3>
            <p>Price: {plan.price} {plan.currency}</p>
          </div>
        ) : (
          <p key={planIds[index]}>Error loading plan {planIds[index]}: {errors[index]?.message}</p>
        )
      ))}
    </div>
  );
}`,

  usePlansByMerchant: `import { usePlansByMerchant } from '@subscrypts/react-sdk';

function MerchantPlans({ merchantAddress }: { merchantAddress: string }) {
  const {
    plans,
    isLoading,
    error,
    refetch
  } = usePlansByMerchant(merchantAddress);

  if (isLoading) return <p>Loading merchant plans...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Plans by Merchant</h2>
      <p>Total Plans: {plans.length}</p>
      {plans.map(plan => (
        <div key={plan.id}>
          <h3>{plan.name}</h3>
          <p>Price: {plan.price} {plan.currency}</p>
          <p>Subscribers: {plan.subscriberCount}</p>
        </div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}`,

  usePlanPrice: `import { usePlanPrice } from '@subscrypts/react-sdk';

function PlanPricing({ planId }: { planId: string }) {
  const {
    subsAmount,
    usdcEquivalent,
    usdValue,
    frequencyLabel,
    isLoading,
    error
  } = usePlanPrice(planId);

  if (isLoading) return <p>Loading price...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <p>Price: {subsAmount} SUBS</p>
      <p>USDC Equivalent: {usdcEquivalent} USDC</p>
      <p>USD Value: {usdValue}</p>
      <p>Frequency: {frequencyLabel}</p>
    </div>
  );
}`,

  // Pricing Hooks
  useSUBSPrice: `import { useSUBSPrice } from '@subscrypts/react-sdk';

function SUBSPriceDisplay() {
  const {
    price,
    isLoading,
    error,
    lastUpdated
  } = useSUBSPrice();

  if (isLoading) return <p>Loading SUBS price...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <p>1 SUBS = {price} USD</p>
      <p>Last updated: {new Date(lastUpdated).toLocaleString()}</p>
      <small>Updates every 60 seconds</small>
    </div>
  );
}`,

  // Management Hooks
  useManageSubscription: `import { useManageSubscription } from '@subscrypts/react-sdk';

function SubscriptionManager({ subscriptionId }: { subscriptionId: string }) {
  const {
    cancel,
    toggleAutoRenew,
    updateCycles,
    isLoading,
    error,
    subscription
  } = useManageSubscription(subscriptionId);

  const handleCancel = async () => {
    try {
      await cancel();
      alert('Subscription cancelled successfully');
    } catch (err) {
      console.error('Cancel failed:', err);
    }
  };

  const handleToggleAutoRenew = async () => {
    try {
      await toggleAutoRenew();
      alert('Auto-renewal toggled');
    } catch (err) {
      console.error('Toggle failed:', err);
    }
  };

  return (
    <div>
      {subscription && (
        <>
          <p>Status: {subscription.status}</p>
          <p>Auto-Renew: {subscription.autoRenewing ? 'On' : 'Off'}</p>
          <button onClick={handleToggleAutoRenew} disabled={isLoading}>
            Toggle Auto-Renew
          </button>
          <button onClick={handleCancel} disabled={isLoading}>
            Cancel Subscription
          </button>
        </>
      )}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}`,

  // Merchant Hooks (v1.4.0)
  useMerchantPlans: `import { useMerchantPlans } from '@subscrypts/react-sdk';

function MerchantPlansList() {
  const {
    plans,
    isLoading,
    error,
    refetch
  } = useMerchantPlans();

  if (isLoading) return <p>Loading your plans...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>My Plans</h2>
      <p>Total: {plans.length}</p>
      {plans.map(plan => (
        <div key={plan.id}>
          <h3>{plan.name}</h3>
          <p>Subscribers: {plan.subscriberCount}</p>
          <p>Active: {plan.activeSubscribers}</p>
          <p>Revenue: {plan.monthlyRevenue}</p>
        </div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}`,

  useMerchantSubscribers: `import { useMerchantSubscribers } from '@subscrypts/react-sdk';

function PlanSubscribers({ planId }: { planId: string }) {
  const {
    subscribers,
    activeCount,
    totalCount,
    isLoading,
    error,
    hasNext,
    hasPrev,
    nextPage,
    prevPage
  } = useMerchantSubscribers(planId, 10);

  if (isLoading) return <p>Loading subscribers...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Subscribers</h2>
      <p>Active: {activeCount} / Total: {totalCount}</p>

      {subscribers.map(sub => (
        <div key={sub.subscriptionId}>
          <p>Address: {sub.subscriberAddress}</p>
          <p>Status: {sub.status}</p>
          <p>Started: {new Date(sub.startDate * 1000).toLocaleDateString()}</p>
          <p>Next Payment: {new Date(sub.nextPaymentDate * 1000).toLocaleDateString()}</p>
        </div>
      ))}

      <div>
        <button onClick={prevPage} disabled={!hasPrev}>Previous</button>
        <button onClick={nextPage} disabled={!hasNext}>Next</button>
      </div>
    </div>
  );
}`,

  useMerchantRevenue: `import { useMerchantRevenue } from '@subscrypts/react-sdk';

function RevenueOverview({ planIds }: { planIds?: string[] }) {
  const {
    totalMRR,
    mrrByCurrency,
    usdValue,
    activeSubscriptions,
    isLoading,
    error
  } = useMerchantRevenue(planIds);

  if (isLoading) return <p>Calculating revenue...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Monthly Recurring Revenue</h2>
      <p>Total MRR: {usdValue.toFixed(2)}</p>
      <p>Active Subscriptions: {activeSubscriptions}</p>

      <h3>Breakdown by Currency</h3>
      <p>SUBS: {mrrByCurrency.subs} SUBS</p>
      <p>USDC: {mrrByCurrency.usdc} USDC</p>

      <small>MRR normalized to monthly amounts</small>
    </div>
  );
}`,

  // Event Hooks (v1.3.0)
  useSubscryptsEvents: `import { useSubscryptsEvents } from '@subscrypts/react-sdk';
import { useState } from 'react';

function LiveEventMonitor() {
  const [events, setEvents] = useState<any[]>([]);

  useSubscryptsEvents({
    onSubscriptionCreated: (event) => {
      console.log('New subscription:', event);
      setEvents(prev => [...prev, { type: 'created', ...event }]);
    },
    onPaymentProcessed: (event) => {
      console.log('Payment processed:', event);
      setEvents(prev => [...prev, { type: 'payment', ...event }]);
    },
    onSubscriptionCancelled: (event) => {
      console.log('Subscription cancelled:', event);
      setEvents(prev => [...prev, { type: 'cancelled', ...event }]);
    },
    onSubscriptionStopped: (event) => {
      console.log('Subscription stopped:', event);
      setEvents(prev => [...prev, { type: 'stopped', ...event }]);
    }
  });

  return (
    <div>
      <h2>Live Protocol Events</h2>
      <p>Listening for real-time events...</p>
      {events.map((event, i) => (
        <div key={i}>
          <strong>{event.type}</strong>: {JSON.stringify(event)}
        </div>
      ))}
    </div>
  );
}`,
};
