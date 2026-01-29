/**
 * useSubscribe Hook Demo
 *
 * Demonstrates manual subscription flow with transaction tracking.
 * This shows the low-level subscription process vs using SubscryptsButton.
 */

import { useSubscribe, useWallet } from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';
import { DEMO_PLANS } from '../../../config/plans';
import { useState } from 'react';

export function UseSubscribeDemo() {
  const { isConnected } = useWallet();
  const [selectedPlanId, setSelectedPlanId] = useState(DEMO_PLANS[0].id);
  const [cycleLimit, setCycleLimit] = useState(1);
  const [referralAddress, setReferralAddress] = useState('');
  const [autoRenew, setAutoRenew] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'SUBS' | 'USDC'>('SUBS');

  const {
    subscribe,
    isSubscribing,
    txState,
    error,
    txHash,
  } = useSubscribe();

  if (!isConnected) {
    return (
      <DemoCard
        title="useSubscribe"
        description="Manual subscription flow with full transaction control"
        version="v1.0.0"
      >
        <ConnectWalletPrompt />
      </DemoCard>
    );
  }

  const handleSubscribe = async () => {
    try {
      await subscribe({
        planId: selectedPlanId,
        cycleLimit,
        autoRenew,
        paymentMethod,
        referralAddress: referralAddress || undefined,
      });
    } catch (err) {
      // Error is already captured in the hook
      console.error('Subscription failed:', err);
    }
  };

  return (
    <DemoCard
      title="useSubscribe"
      description="Manual subscription flow with full transaction control"
      version="v1.0.0"
    >
      <div className="space-y-4">
        {/* Success State */}
        {txState === 'success' && txHash && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-green-900">Subscription Successful!</h4>
              <button
                onClick={() => window.location.reload()}
                className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
              >
                New Subscription
              </button>
            </div>
            <p className="text-sm text-green-700 mb-2">
              Your subscription has been created successfully.
            </p>
            <div className="bg-white rounded p-3">
              <div className="text-xs text-gray-600 mb-1">Transaction Hash:</div>
              <div className="font-mono text-xs text-gray-900 break-all">
                {txHash}
              </div>
              <a
                href={`https://arbiscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline mt-2 inline-block"
              >
                View on Arbiscan →
              </a>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-900 mb-2">Subscription Failed</h4>
            <p className="text-sm text-red-700">{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Subscription Form */}
        {txState !== 'success' && (
          <>
            {/* Plan Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Plan:
              </label>
              <select
                value={selectedPlanId}
                onChange={(e) => setSelectedPlanId(e.target.value)}
                disabled={isSubscribing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              >
                {DEMO_PLANS.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} Plan (ID: {plan.id})
                  </option>
                ))}
              </select>
            </div>

            {/* Cycle Limit Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Cycles:
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={cycleLimit}
                onChange={(e) => setCycleLimit(Number(e.target.value))}
                disabled={isSubscribing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              />
              <p className="text-xs text-gray-500 mt-1">
                How many billing cycles to purchase (1 = one period)
              </p>
            </div>

            {/* Referral Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Referral Address (Optional):
              </label>
              <input
                type="text"
                value={referralAddress}
                onChange={(e) => setReferralAddress(e.target.value)}
                placeholder="0x..."
                disabled={isSubscribing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm disabled:opacity-50"
              />
              <p className="text-xs text-gray-500 mt-1">
                Optional address to receive referral rewards
              </p>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method:
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as 'SUBS' | 'USDC')}
                disabled={isSubscribing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              >
                <option value="SUBS">SUBS Token</option>
                <option value="USDC">USDC Token</option>
              </select>
            </div>

            {/* Auto Renew Toggle */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoRenew"
                checked={autoRenew}
                onChange={(e) => setAutoRenew(e.target.checked)}
                disabled={isSubscribing}
                className="mr-2"
              />
              <label htmlFor="autoRenew" className="text-sm text-gray-700">
                Enable Auto-Renewal
              </label>
            </div>

            {/* Subscribe Button */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-xs text-yellow-800 mb-3">
                ⚠️ This will create a real subscription on Arbitrum. Make sure you have sufficient SUBS/USDC balance.
              </p>
              <button
                onClick={handleSubscribe}
                disabled={isSubscribing}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubscribing ? 'Processing Transaction...' : 'Subscribe Now'}
              </button>
            </div>
          </>
        )}

        {/* Hook Explanation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">
            useSubscribe vs SubscryptsButton:
          </h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>useSubscribe</strong>: Low-level control, custom UI, manual flow</li>
            <li>• <strong>SubscryptsButton</strong>: High-level, built-in UI, one-click</li>
            <li>• Use this hook when you need custom subscription logic</li>
          </ul>
        </div>

        {/* Hook Return Values */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Return Values:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div>subscribe: Function (async)</div>
            <div>isSubscribing: {String(isSubscribing)}</div>
            <div>txState: {txState}</div>
            <div>error: {error ? 'Error object' : 'null'}</div>
            <div>txHash: {txHash || 'null'}</div>
          </div>
        </div>
      </div>
    </DemoCard>
  );
}
