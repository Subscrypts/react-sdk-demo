/**
 * Account Dashboard Page
 *
 * This page demonstrates user account management with:
 * - Wallet information display
 * - Token balance tracking (SUBS, USDC)
 * - Subscription status for all plans
 * - Manual subscription management
 *
 * SDK v1.3.0 Enhancement Path:
 * - Replace manual subscription display with <SubscriptionDashboard> component
 * - Add <ManageSubscriptionModal> for subscription management
 * - Integrate useSubscryptsEvents for real-time updates
 *
 * Current Implementation: Manual using useSubscriptionStatus for each plan
 * Recommended: Use useMySubscriptions hook + SubscriptionCard components (v1.3.0)
 */

import { useWallet, useTokenBalance, useMySubscriptions, canAccess } from '@subscrypts/react-sdk';
import { Link, Navigate } from 'react-router-dom';
import { DEMO_PLANS } from '../config/plans';

function Account() {
  const { isConnected, address, disconnect } = useWallet();
  const { formatted: subsBalance, isLoading: subsLoading } = useTokenBalance('SUBS');
  const { formatted: usdcBalance, isLoading: usdcLoading } = useTokenBalance('USDC');

  // Fetch ALL user's subscriptions from blockchain (v1.3.0+)
  const {
    subscriptions: allSubscriptions,
    isLoading: subsLoading2,
    error: subsError,
  } = useMySubscriptions(address || undefined, 10);

  // Filter to show ALL subscriptions (active AND inactive) to this merchant's plans only (plan IDs 1 and 2)
  const merchantPlans = DEMO_PLANS.slice(0, 2); // Only Basic (ID 1) and Pro (ID 2)
  const subscriptions = allSubscriptions.filter(sub => {
    // Convert numeric planId from blockchain to string for comparison with DEMO_PLANS
    const planIdStr = String(sub.planId);
    const isMerchantPlan = merchantPlans.some(plan => plan.id === planIdStr);
    return isMerchantPlan;
  });

  // Redirect to home if wallet not connected
  if (!isConnected) {
    return <Navigate to="/" replace />;
  }

  const truncateAddress = (addr: string | null) => {
    if (!addr) return '';
    return `${addr.substring(0, 10)}...${addr.substring(addr.length - 8)}`;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDisconnect = async () => {
    if (disconnect) {
      await disconnect();
    }
  };

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Developer Note - SDK v1.4.1 Implementation */}
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                SDK v1.4.1 Implementation
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>This page uses modern SDK patterns:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li><code className="bg-green-100 px-1 rounded">useMySubscriptions</code> - Fetches all subscriptions</li>
                  <li><code className="bg-green-100 px-1 rounded">canAccess()</code> - Validates active access (v1.2.0)</li>
                  <li>No custom validation logic - uses SDK utilities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Account Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your subscriptions and view your account details
          </p>
        </div>

        {/* Wallet Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Wallet Information
            </h2>
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-300 rounded-lg hover:border-red-400 transition-colors"
            >
              Disconnect Wallet
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Address</span>
              <span className="font-mono text-sm text-gray-900">
                {truncateAddress(address)}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Network</span>
              <span className="flex items-center text-gray-900">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Arbitrum One
              </span>
            </div>
          </div>
        </div>

        {/* Token Balances */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Token Balances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">SUBS Token</div>
              <div className="text-3xl font-bold text-blue-600">
                {subsLoading ? (
                  <span className="text-lg">Loading...</span>
                ) : (
                  subsBalance || '0.00'
                )}
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">USDC Token</div>
              <div className="text-3xl font-bold text-green-600">
                {usdcLoading ? (
                  <span className="text-lg">Loading...</span>
                ) : (
                  usdcBalance || '0.00'
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Subscriptions */}
        {/*
          SDK v1.3.0 Alternative: Replace this entire section with:

          <SubscriptionDashboard
            pageSize={10}
            onManage={(subscriptionId) => {
              // Open ManageSubscriptionModal
            }}
            showPagination={true}
            emptyComponent={
              <EmptyStateWithLinkToPricing />
            }
          />

          This provides: automatic pagination, loading states, error handling,
          status badges, and built-in management integration.
        */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                My Subscriptions
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Showing all subscriptions (active and inactive) to our plans
              </p>
            </div>
            <Link
              to="/pricing"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View All Plans →
            </Link>
          </div>

          {/* Loading State */}
          {subsLoading2 && subscriptions.length === 0 && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 mt-2">Loading subscriptions...</p>
            </div>
          )}

          {/* Error State */}
          {subsError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">Error loading subscriptions: {subsError.message}</p>
            </div>
          )}

          {/* Subscriptions List */}
          {!subsLoading2 && subscriptions.length > 0 && (
            <div className="space-y-4">
              {subscriptions.map((subscription) => {
                // Convert numeric planId from blockchain to string for comparison with DEMO_PLANS
                const planIdStr = String(subscription.planId);
                const matchingPlan = DEMO_PLANS.find(plan => plan.id === planIdStr);
                const planName = matchingPlan ? `${matchingPlan.name} Plan` : `Plan ${subscription.planId}`;
                const isActive = canAccess(subscription);

                return (
                  <div
                    key={subscription.id.toString()}
                    className={`p-4 rounded-lg border-2 ${
                      isActive
                        ? 'bg-green-50 border-green-200'
                        : 'bg-gray-50 border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 mr-3">
                            {planName}
                          </h3>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                              isActive
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-400 text-white'
                            }`}
                          >
                            {isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>

                        <div className="space-y-1 text-sm">
                          <p className="text-gray-700">
                            <span className="font-medium">Next Payment:</span>{' '}
                            {formatDate(subscription.nextPaymentDate)}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium">Subscription ID:</span>{' '}
                            <span className="font-mono text-xs">
                              {subscription.id.toString()}
                            </span>
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium">Subscriber Address:</span>{' '}
                            <span className="font-mono text-xs">
                              {truncateAddress(subscription.subscriber)}
                            </span>
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium">Auto-Renewal:</span>{' '}
                            {subscription.isAutoRenewing ? (
                              <span className="text-green-600 font-medium">Enabled</span>
                            ) : (
                              <span className="text-gray-600">Disabled</span>
                            )}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium">Remaining Cycles:</span>{' '}
                            {subscription.remainingCycles}
                          </p>
                          {matchingPlan && (
                            <p className="text-gray-700">
                              <span className="font-medium">Plan Price:</span>{' '}
                              {matchingPlan.pricePerMonth}
                            </p>
                          )}
                        </div>

                        {/* Expandable Full Subscription Data */}
                        <details className="mt-3">
                          <summary className="text-xs text-blue-600 cursor-pointer hover:text-blue-800 font-medium">
                            Click to view all field values →
                          </summary>
                          <div className="bg-white rounded-lg border border-gray-200 p-3 mt-2">
                            <h4 className="text-xs font-semibold text-gray-700 mb-2">
                              Complete Subscription Data:
                            </h4>
                            <pre className="text-xs text-gray-700 overflow-x-auto whitespace-pre-wrap break-all">
                              {JSON.stringify(
                                subscription,
                                (_key, value) => (typeof value === 'bigint' ? value.toString() : value),
                                2
                              )}
                            </pre>
                          </div>
                        </details>
                      </div>

                      <div className="ml-4">
                        <Link
                          to="/account"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          Manage
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* No Active Subscriptions Message */}
          {!subsLoading2 && !subsError && subscriptions.length === 0 && (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <svg
                className="w-12 h-12 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <p className="text-gray-600 mb-4">
                You don't have any subscriptions to our plans yet.
              </p>
              <Link
                to="/pricing"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Browse Subscription Plans
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
