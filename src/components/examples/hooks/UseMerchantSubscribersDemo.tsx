/**
 * useMerchantSubscribers Hook Demo
 *
 * Demonstrates fetching paginated subscribers for a merchant's plan (v1.4.0).
 */

import { useMerchantSubscribers, useMerchantPlans, useWallet } from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';
import { useState } from 'react';

export function UseMerchantSubscribersDemo() {
  const { isConnected } = useWallet();
  const { plans } = useMerchantPlans();
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const {
    subscribers,
    activeCount,
    total,
    page,
    hasMore,
    isLoading,
    error,
    nextPage,
    prevPage,
    refetch,
  } = useMerchantSubscribers(selectedPlanId, pageSize);

  if (!isConnected) {
    return (
      <DemoCard
        title="useMerchantSubscribers"
        description="View and manage subscribers for your subscription plans"
        version="v1.4.0"
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
    { label: '10 per page', value: 10 },
    { label: '25 per page', value: 25 },
    { label: '50 per page', value: 50 },
    { label: '100 per page', value: 100 },
  ];

  return (
    <DemoCard
      title="useMerchantSubscribers"
      description="View and manage subscribers for your subscription plans"
      version="v1.4.0"
    >
      <div className="space-y-4">
        {/* Plan Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Your Plan:
          </label>
          {plans.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-gray-600 text-sm">
                No plans found. Create a plan first to view subscribers.
              </p>
            </div>
          ) : (
            <select
              value={selectedPlanId}
              onChange={(e) => setSelectedPlanId(e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
            >
              <option value="">-- Select a plan --</option>
              {plans.map((plan, index) => (
                <option key={index} value={plan.id.toString() || `plan-${index}`}>
                  Plan {plan.id.toString() || index + 1}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Page Size Selector */}
        {selectedPlanId && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Page Size:
            </label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
            >
              {pageSizeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Subscribers Display */}
        {selectedPlanId && (
          <>
            {isLoading ? (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-gray-600">Loading subscribers...</div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">Error: {error.message}</p>
              </div>
            ) : subscribers.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-600">No subscribers found for this plan</p>
                <p className="text-xs text-gray-500 mt-2">
                  Subscribers will appear here once users subscribe to your plan
                </p>
              </div>
            ) : (
              <>
                {/* Summary Card */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">
                        {activeCount}
                      </div>
                      <div className="text-sm text-gray-600">Active Subscribers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-600">
                        {subscribers.length}
                      </div>
                      <div className="text-sm text-gray-600">Total Loaded</div>
                    </div>
                  </div>
                </div>

                {/* Subscribers List */}
                <div className="space-y-3">
                  {subscribers.map((subscriber, index) => (
                    <div
                      key={index}
                      className={`border-2 rounded-lg p-4 ${
                        isSubscriptionActive(subscriber.nextPaymentDate)
                          ? 'bg-green-50 border-green-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h5 className="font-semibold text-gray-900 text-sm">
                            Subscriber #{index + 1}
                          </h5>
                          <p className="font-mono text-xs text-gray-600 mt-1 break-all">
                            {subscriber.subscriber || 'Unknown Address'}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            isSubscriptionActive(subscriber.nextPaymentDate)
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-400 text-white'
                          }`}
                        >
                          {isSubscriptionActive(subscriber.nextPaymentDate) ? 'Active' : 'Inactive'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <div className="text-gray-600">Subscription ID</div>
                          <div className="font-medium text-gray-900">
                            {subscriber.id || 'N/A'}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Expiration</div>
                          <div className="font-medium text-gray-900">
                            {formatDate(subscriber.nextPaymentDate)}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Auto-Renewal</div>
                          <div className="font-medium text-gray-900">
                            {subscriber.isAutoRenewing ? 'Yes' : 'No'}
                          </div>
                        </div>
                        {subscriber.remainingCycles !== undefined && (
                          <div>
                            <div className="text-gray-600">Remaining Cycles</div>
                            <div className="font-medium text-gray-900">
                              {subscriber.remainingCycles}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Raw Data */}
                      <details className="mt-3">
                        <summary className="text-xs text-purple-600 cursor-pointer hover:text-purple-800">
                          View Raw Data
                        </summary>
                        <div className="bg-white rounded p-3 mt-2">
                          <pre className="text-xs text-gray-700 overflow-x-auto whitespace-pre-wrap">
                            {JSON.stringify(
                              subscriber,
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
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous Page
                  </button>
                  <div className="text-sm text-gray-700">
                    Page {page} {total > 0 && `of ${Math.ceil(total / pageSize)}`}
                  </div>
                  <button
                    onClick={nextPage}
                    disabled={isLoading || !hasMore}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              {isLoading ? 'Refreshing...' : 'Refresh Subscribers'}
            </button>
          </>
        )}

        {/* Features */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Features:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ View all subscribers for your plans</li>
            <li>✓ Paginated loading for performance</li>
            <li>✓ Active subscriber count</li>
            <li>✓ Detailed subscription information</li>
            <li>✓ Page navigation (Previous/Next)</li>
          </ul>
        </div>

        {/* Hook Info */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Return Values:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div>subscribers: Subscription[] ({subscribers.length} loaded)</div>
            <div>activeCount: {activeCount}</div>
            <div>total: {total}</div>
            <div>page: {page}</div>
            <div>hasMore: {String(hasMore)}</div>
            <div>isLoading: {String(isLoading)}</div>
            <div>error: {error ? 'Error object' : 'null'}</div>
            <div>nextPage: Function</div>
            <div>prevPage: Function</div>
            <div>refetch: Function</div>
          </div>
        </div>
      </div>
    </DemoCard>
  );
}
