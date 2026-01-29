/**
 * useManageSubscription Hook Demo
 *
 * Demonstrates managing subscriptions: cancel, toggle auto-renewal, update cycles (v1.2.0).
 */

import { useManageSubscription, useWallet, useMySubscriptions } from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';
import { useState } from 'react';

export function UseManageSubscriptionDemo() {
  const { isConnected, address } = useWallet();
  const { subscriptions } = useMySubscriptions(address || undefined, 10);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState('');

  const {
    cancelSubscription,
    toggleAutoRenew,
    updateCycles,
    txState,
    error,
    isProcessing,
  } = useManageSubscription(selectedSubscriptionId);

  const [newCycles, setNewCycles] = useState(1);
  const [lastAction, setLastAction] = useState<string>('');

  if (!isConnected) {
    return (
      <DemoCard
        title="useManageSubscription"
        description="Cancel, toggle auto-renewal, or update subscription cycles"
        version="v1.2.0"
      >
        <ConnectWalletPrompt />
      </DemoCard>
    );
  }

  const selectedSubscription = subscriptions.find(
    (sub) => sub.id === selectedSubscriptionId
  );

  const handleCancel = async () => {
    setLastAction('cancel');
    try {
      await cancelSubscription();
    } catch (err) {
      console.error('Cancel failed:', err);
    }
  };

  const handleToggleAutoRenewal = async () => {
    setLastAction('toggle auto-renewal');
    if (!selectedSubscription) return;
    try {
      // Toggle to opposite of current state
      await toggleAutoRenew(!selectedSubscription.isAutoRenewing);
    } catch (err) {
      console.error('Toggle auto-renewal failed:', err);
    }
  };

  const handleUpdateCycles = async () => {
    setLastAction('update cycles');
    try {
      await updateCycles(newCycles);
    } catch (err) {
      console.error('Update cycles failed:', err);
    }
  };

  return (
    <DemoCard
      title="useManageSubscription"
      description="Cancel, toggle auto-renewal, or update subscription cycles"
      version="v1.2.0"
    >
      <div className="space-y-4">
        {/* Success State */}
        {txState === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-green-900">
                Action Successful: {lastAction}
              </h4>
              <button
                onClick={() => window.location.reload()}
                className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
              >
                Done
              </button>
            </div>
            <p className="text-sm text-green-700">
              Your subscription has been updated successfully.
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-900 mb-2">Action Failed</h4>
            <p className="text-sm text-red-700">{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Subscription Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Subscription to Manage:
          </label>
          {subscriptions.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-gray-600 text-sm">
                No active subscriptions found. Subscribe to a plan first!
              </p>
            </div>
          ) : (
            <select
              value={selectedSubscriptionId}
              onChange={(e) => setSelectedSubscriptionId(e.target.value)}
              disabled={isProcessing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            >
              <option value="">-- Select a subscription --</option>
              {subscriptions.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  Plan {sub.planId} - ID: {sub.id}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Selected Subscription Details */}
        {selectedSubscription && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">
              Selected Subscription Details:
            </h4>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600">Plan ID:</span>
                <span className="font-medium">{selectedSubscription.planId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Auto-Renewal:</span>
                <span className="font-medium">
                  {selectedSubscription.isAutoRenewing ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Remaining Cycles:</span>
                <span className="font-medium">{selectedSubscription.remainingCycles}</span>
              </div>
            </div>
          </div>
        )}

        {/* Management Actions */}
        {selectedSubscriptionId && selectedSubscription && txState !== 'success' && (
          <>
            {/* Cancel Subscription */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                Cancel Subscription
              </h4>
              <p className="text-xs text-gray-600 mb-3">
                This will cancel your subscription and stop future renewals. Access continues until expiration.
              </p>
              <button
                onClick={handleCancel}
                disabled={isProcessing}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Cancel Subscription'}
              </button>
            </div>

            {/* Toggle Auto-Renewal */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                Toggle Auto-Renewal
              </h4>
              <p className="text-xs text-gray-600 mb-3">
                Currently: <strong>{selectedSubscription.isAutoRenewing ? 'Enabled' : 'Disabled'}</strong>
                {'. '}
                {selectedSubscription.isAutoRenewing
                  ? 'Disable to stop automatic renewals.'
                  : 'Enable to automatically renew this subscription.'}
              </p>
              <button
                onClick={handleToggleAutoRenewal}
                disabled={isProcessing}
                className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing
                  ? 'Processing...'
                  : selectedSubscription.isAutoRenewing
                  ? 'Disable Auto-Renewal'
                  : 'Enable Auto-Renewal'}
              </button>
            </div>

            {/* Update Remaining Cycles */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                Update Remaining Cycles
              </h4>
              <p className="text-xs text-gray-600 mb-3">
                Add more billing cycles to extend your subscription.
              </p>
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  New Cycles to Add:
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={newCycles}
                  onChange={(e) => setNewCycles(Number(e.target.value))}
                  disabled={isProcessing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
                />
              </div>
              <button
                onClick={handleUpdateCycles}
                disabled={isProcessing}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : `Add ${newCycles} Cycle${newCycles !== 1 ? 's' : ''}`}
              </button>
            </div>
          </>
        )}

        {/* Hook Info */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Hook Return Values:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div>cancelSubscription: Function (async)</div>
            <div>toggleAutoRenew: Function (async)</div>
            <div>updateCycles: Function (async)</div>
            <div>isProcessing: {String(isProcessing)}</div>
            <div>txState: {txState}</div>
            <div>error: {error ? 'Error object' : 'null'}</div>
          </div>
        </div>
      </div>
    </DemoCard>
  );
}
