/**
 * useSubscriptionStatus Hook Demo
 *
 * Demonstrates checking subscription status for a plan with real-time updates.
 */

import { useWallet, useSubscriptionStatus } from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';
import { DEMO_PLANS } from '../../../config/plans';
import { useState } from 'react';

export function UseSubscriptionStatusDemo() {
  const { isConnected } = useWallet();
  const [selectedPlanId, setSelectedPlanId] = useState(DEMO_PLANS[0].id);

  const { status, isLoading, error, refetch } = useSubscriptionStatus(selectedPlanId);

  if (!isConnected) {
    return (
      <DemoCard
        title="useSubscriptionStatus"
        description="Check if user has active subscription to a plan"
        version="v1.0.0"
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

  return (
    <DemoCard
      title="useSubscriptionStatus"
      description="Check if user has active subscription to a plan"
      version="v1.0.0"
    >
      <div className="space-y-4">
        {/* Plan Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Plan to Check:
          </label>
          <select
            value={selectedPlanId}
            onChange={(e) => setSelectedPlanId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {DEMO_PLANS.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name} Plan (ID: {plan.id})
              </option>
            ))}
          </select>
        </div>

        {/* Status Display */}
        {isLoading ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <div className="text-gray-600">Checking subscription status...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">Error: {error.message}</p>
          </div>
        ) : (
          <div
            className={`rounded-lg p-4 border-2 ${
              status?.isActive
                ? 'bg-green-50 border-green-300'
                : 'bg-gray-50 border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Subscription Status</h4>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  status?.isActive
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-400 text-white'
                }`}
              >
                {status?.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            {status?.isActive ? (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subscription ID:</span>
                  <span className="font-mono text-xs text-gray-900">
                    {status.subscriptionId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expiration Date:</span>
                  <span className="font-medium text-gray-900">
                    {formatDate(status.expirationDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Auto-Renewal:</span>
                  <span
                    className={`font-medium ${
                      status.isAutoRenewing ? 'text-green-600' : 'text-gray-600'
                    }`}
                  >
                    {status.isAutoRenewing ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                {status.remainingCycles !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Remaining Cycles:</span>
                    <span className="font-medium text-gray-900">
                      {status.remainingCycles}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-600 text-sm">
                No active subscription found for this plan.
              </p>
            )}
          </div>
        )}

        {/* Refresh Button */}
        <button
          onClick={() => refetch()}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Checking...' : 'Refresh Status'}
        </button>

        {/* Hook Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Return Values:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div>status.isActive: {String(status?.isActive || false)}</div>
            <div>status.subscriptionId: {status?.subscriptionId || 'null'}</div>
            <div>isLoading: {String(isLoading)}</div>
            <div>error: {error ? 'Error object' : 'null'}</div>
          </div>
        </div>
      </div>
    </DemoCard>
  );
}
