/**
 * useMySubscriptions Hook Demo
 *
 * Demonstrates fetching paginated list of user's subscriptions (v1.3.0).
 */

import { useMySubscriptions, useWallet } from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';
import { useState } from 'react';

export function UseMySubscriptionsDemo() {
  const { address, isConnected } = useWallet();
  const [pageSize, setPageSize] = useState(5);
  const [customAddress, setCustomAddress] = useState('');

  // Use custom address if provided, otherwise use connected wallet
  const targetAddress = customAddress || address || undefined;

  const {
    subscriptions,
    total,
    page,
    hasMore,
    isLoading,
    error,
    nextPage,
    prevPage,
    refetch,
  } = useMySubscriptions(targetAddress, pageSize);

  if (!isConnected && !customAddress) {
    return (
      <DemoCard
        title="useMySubscriptions"
        description="Fetch paginated list of user's active subscriptions"
        version="v1.3.0"
      >
        <ConnectWalletPrompt />
      </DemoCard>
    );
  }

  const formatDate = (date: number | Date | null) => {
    if (!date) return 'N/A';
    const dateObj = typeof date === 'number' ? new Date(date * 1000) : date;
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isSubscriptionActive = (nextPaymentDate: Date) => {
    return new Date(nextPaymentDate) > new Date();
  };

  const pageSizeOptions = [
    { label: '5 per page', value: 5 },
    { label: '10 per page', value: 10 },
    { label: '20 per page', value: 20 },
    { label: '50 per page', value: 50 },
  ];

  return (
    <DemoCard
      title="useMySubscriptions"
      description="Fetch paginated list of user's active subscriptions"
      version="v1.3.0"
    >
      <div className="space-y-4">
        {/* Address Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            View Subscriptions For:
          </label>
          <input
            type="text"
            value={customAddress}
            onChange={(e) => setCustomAddress(e.target.value)}
            placeholder={address || '0x... (or leave empty for connected wallet)'}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            {customAddress
              ? `Showing subscriptions for: ${customAddress}`
              : address
              ? `Showing subscriptions for connected wallet: ${address}`
              : 'Connect wallet or enter address'}
          </p>
        </div>

        {/* Page Size Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Page Size:
          </label>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {pageSizeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Subscriptions Display */}
        {isLoading ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <div className="text-gray-600">Loading subscriptions...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">Error: {error.message}</p>
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-gray-600">No active subscriptions found</p>
            <p className="text-xs text-gray-500 mt-2">
              {targetAddress
                ? 'This address has no active subscriptions'
                : 'Connect a wallet or enter an address to view subscriptions'}
            </p>
          </div>
        ) : (
          <>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">
                  {subscriptions.length} Subscription{subscriptions.length !== 1 ? 's' : ''} Found
                </h4>
                <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                  Active
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {subscriptions.map((subscription, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-blue-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h5 className="font-semibold text-gray-900">
                        Subscription #{index + 1}
                      </h5>
                      <p className="text-xs font-mono text-gray-500 mt-1">
                        ID: {subscription.id || 'N/A'}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        isSubscriptionActive(subscription.nextPaymentDate)
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-400 text-white'
                      }`}
                    >
                      {isSubscriptionActive(subscription.nextPaymentDate) ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-xs text-gray-600">Plan ID</div>
                      <div className="font-medium text-gray-900">
                        {subscription.planId || 'N/A'}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Expiration</div>
                      <div className="font-medium text-gray-900">
                        {formatDate(subscription.nextPaymentDate)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Auto-Renewal</div>
                      <div className="font-medium text-gray-900">
                        {subscription.isAutoRenewing ? 'Yes' : 'No'}
                      </div>
                    </div>
                    {subscription.remainingCycles !== undefined && (
                      <div>
                        <div className="text-xs text-gray-600">Remaining Cycles</div>
                        <div className="font-medium text-gray-900">
                          {subscription.remainingCycles}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Full Subscription Data */}
                  <details className="mt-3">
                    <summary className="text-xs text-blue-600 cursor-pointer hover:text-blue-800">
                      View Raw Data
                    </summary>
                    <div className="bg-gray-50 rounded p-3 mt-2">
                      <pre className="text-xs text-gray-700 overflow-x-auto whitespace-pre-wrap">
                        {JSON.stringify(
                          subscription,
                          (_key, value) => (typeof value === 'bigint' ? value.toString() : value),
                          2
                        )}
                      </pre>
                    </div>
                  </details>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={prevPage}
                disabled={isLoading || page === 1}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous Page
              </button>
              <div className="text-sm text-gray-600">
                Page {page} {total > 0 && `of ${Math.ceil(total / pageSize)}`}
              </div>
              <button
                onClick={nextPage}
                disabled={isLoading || !hasMore}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Page
              </button>
            </div>
          </>
        )}

        {/* Refresh Button */}
        <button
          onClick={() => refetch()}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Refreshing...' : 'Refresh Subscriptions'}
        </button>

        {/* Features */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Features:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Paginated loading for performance</li>
            <li>✓ View subscriptions for any address</li>
            <li>✓ Load more functionality</li>
            <li>✓ Automatic refresh capability</li>
            <li>✓ Complete subscription details</li>
          </ul>
        </div>

        {/* Hook Return Values */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Return Values:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div>subscriptions: Subscription[] ({subscriptions.length} loaded)</div>
            <div>isLoading: {String(isLoading)}</div>
            <div>error: {error ? 'Error object' : 'null'}</div>
            <div>hasMore: {String(hasMore)}</div>
            <div>loadMore: Function</div>
            <div>refetch: Function</div>
          </div>
        </div>
      </div>
    </DemoCard>
  );
}
