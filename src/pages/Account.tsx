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

import { useWallet, useTokenBalance, useSubscriptionStatus } from '@subscrypts/react-sdk';
import { Link, Navigate } from 'react-router-dom';
import { DEMO_PLANS } from '../config/plans';

function Account() {
  const { isConnected, address, disconnect } = useWallet();
  const { formatted: subsBalance, isLoading: subsLoading } = useTokenBalance('SUBS');
  const { formatted: usdcBalance, isLoading: usdcLoading } = useTokenBalance('USDC');

  // Get subscription status for all plans
  const basicStatus = useSubscriptionStatus(DEMO_PLANS[0].id);
  const proStatus = useSubscriptionStatus(DEMO_PLANS[1].id);
  const enterpriseStatus = useSubscriptionStatus(DEMO_PLANS[2].id);

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

  const subscriptions = [
    { plan: DEMO_PLANS[0], status: basicStatus },
    { plan: DEMO_PLANS[1], status: proStatus },
    { plan: DEMO_PLANS[2], status: enterpriseStatus },
  ];

  const handleDisconnect = async () => {
    if (disconnect) {
      await disconnect();
    }
  };

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Developer Note - SDK v1.3.0 Enhancement */}
        <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                SDK v1.3.0 Enhancement Available
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>This page uses manual subscription management. With SDK v1.3.0+, you can replace this with:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li><code className="bg-blue-100 px-1 rounded">SubscriptionDashboard</code> - Complete dashboard with pagination</li>
                  <li><code className="bg-blue-100 px-1 rounded">useMySubscriptions</code> - Paginated subscription list hook</li>
                  <li><code className="bg-blue-100 px-1 rounded">ManageSubscriptionModal</code> - Subscription management UI</li>
                  <li><code className="bg-blue-100 px-1 rounded">useSubscryptsEvents</code> - Real-time event listeners</li>
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
            <h2 className="text-xl font-semibold text-gray-900">
              My Subscriptions
            </h2>
            <Link
              to="/pricing"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View All Plans →
            </Link>
          </div>

          <div className="space-y-4">
            {subscriptions.map(({ plan, status }) => {
              const isLoading = status.isLoading;
              const isActive = status.status?.isActive;

              return (
                <div
                  key={plan.id}
                  className={`p-4 rounded-lg border-2 ${
                    isActive
                      ? 'bg-green-50 border-green-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 mr-3">
                          {plan.name} Plan
                        </h3>
                        {isLoading ? (
                          <span className="inline-block px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-sm">
                            Loading...
                          </span>
                        ) : isActive ? (
                          <span className="inline-block px-3 py-1 bg-green-600 text-white rounded-full text-sm font-medium">
                            Active
                          </span>
                        ) : (
                          <span className="inline-block px-3 py-1 bg-gray-400 text-white rounded-full text-sm font-medium">
                            Inactive
                          </span>
                        )}
                      </div>

                      {isActive && status.status && (
                        <div className="space-y-1 text-sm">
                          <p className="text-gray-700">
                            <span className="font-medium">Expires:</span>{' '}
                            {formatDate(status.status.expirationDate)}
                          </p>
                          {status.status.subscriptionId && (
                            <p className="text-gray-700">
                              <span className="font-medium">Subscription ID:</span>{' '}
                              <span className="font-mono text-xs">
                                {status.status.subscriptionId}
                              </span>
                            </p>
                          )}
                          <p className="text-gray-700">
                            <span className="font-medium">Auto-Renewal:</span>{' '}
                            {status.status.isAutoRenewing ? (
                              <span className="text-green-600 font-medium">Enabled</span>
                            ) : (
                              <span className="text-gray-600">Disabled</span>
                            )}
                          </p>
                          {status.status.remainingCycles !== undefined && (
                            <p className="text-gray-700">
                              <span className="font-medium">Remaining Cycles:</span>{' '}
                              {status.status.remainingCycles}
                            </p>
                          )}
                        </div>
                      )}

                      {!isActive && !isLoading && (
                        <p className="text-sm text-gray-600">
                          You don't have an active subscription to this plan.
                        </p>
                      )}
                    </div>

                    <div className="ml-4">
                      {!isActive && !isLoading && (
                        <Link
                          to="/pricing"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          Subscribe
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Active Subscriptions Message */}
          {!subscriptions.some((sub) => sub.status.status?.isActive) &&
            !subscriptions.some((sub) => sub.status.isLoading) && (
              <div className="mt-6 text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
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
                  You don't have any active subscriptions yet.
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
