/**
 * Decision Helpers Utility Demo
 *
 * Demonstrates subscription decision helper functions (v1.2.0).
 */

import {
  canAccess,
  isPaymentDue,
  shouldRenew,
  getSubscriptionHealth,
  useMySubscriptions,
  useWallet,
} from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';

export function DecisionHelpersDemo() {
  const { isConnected } = useWallet();
  const { subscriptions, isLoading, error } = useMySubscriptions(undefined, 5);

  if (!isConnected) {
    return (
      <DemoCard
        title="Decision Helpers"
        description="Utilities for subscription status decisions"
        version="v1.2.0"
      >
        <ConnectWalletPrompt />
      </DemoCard>
    );
  }

  return (
    <DemoCard
      title="Decision Helpers"
      description="Utilities for subscription status decisions"
      version="v1.2.0"
    >
      <div className="space-y-6">
        {/* Live Subscription Analysis */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">
            🔍 Live Subscription Analysis
          </h4>
          {isLoading ? (
            <div className="text-center py-4 text-gray-600">Loading your subscriptions...</div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">Error: {error.message}</p>
            </div>
          ) : subscriptions.length > 0 ? (
            <div className="space-y-4">
              {subscriptions.map((subscription) => {
                const health = getSubscriptionHealth(subscription);
                const hasAccess = canAccess(subscription);
                const paymentDue = isPaymentDue(subscription);
                const shouldAutoRenew = shouldRenew(subscription);

                return (
                  <div
                    key={subscription.id}
                    className="bg-white border border-gray-300 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h5 className="font-semibold text-gray-900">
                          Subscription #{subscription.id}
                        </h5>
                        <p className="text-xs text-gray-500">
                          Plan ID: {subscription.planId}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        health.state === 'active' ? 'bg-green-100 text-green-800' :
                        health.state === 'expiring-soon' ? 'bg-yellow-100 text-yellow-800' :
                        health.state === 'expired' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {health.state}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {/* canAccess */}
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">canAccess():</span>
                        <span className={`font-medium ${hasAccess ? 'text-green-600' : 'text-red-600'}`}>
                          {hasAccess ? '✅ Yes' : '❌ No'}
                        </span>
                      </div>

                      {/* isPaymentDue */}
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">isPaymentDue():</span>
                        <span className={`font-medium ${paymentDue ? 'text-orange-600' : 'text-gray-600'}`}>
                          {paymentDue ? '⚠️ Yes' : '✓ No'}
                        </span>
                      </div>

                      {/* shouldRenew */}
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">shouldRenew():</span>
                        <span className={`font-medium ${shouldAutoRenew ? 'text-blue-600' : 'text-gray-600'}`}>
                          {shouldAutoRenew ? '🔄 Yes' : '✓ No'}
                        </span>
                      </div>

                      {/* Days until expiry */}
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Days until expiry:</span>
                        <span className="font-medium text-gray-800">
                          {health.daysUntilExpiry !== null ? `${health.daysUntilExpiry}d` : 'N/A'}
                        </span>
                      </div>

                      {/* Cycles remaining */}
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Cycles remaining:</span>
                        <span className="font-medium text-gray-800">
                          {health.cyclesRemaining === 0 ? 'Unlimited' : health.cyclesRemaining}
                        </span>
                      </div>
                    </div>

                    {/* getSubscriptionHealth full output */}
                    <details className="mt-3">
                      <summary className="text-xs text-blue-600 cursor-pointer hover:underline">
                        View getSubscriptionHealth() output
                      </summary>
                      <pre className="mt-2 text-xs bg-gray-50 rounded p-2 overflow-x-auto">
                        {JSON.stringify(health, null, 2)}
                      </pre>
                    </details>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-gray-600 text-sm">
                No subscriptions found. Subscribe to a plan from the{' '}
                <a href="/pricing" className="text-blue-600 hover:underline">
                  Pricing page
                </a>{' '}
                to see decision helpers in action.
              </p>
            </div>
          )}
        </div>

        {/* canAccess Explanation */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">canAccess(subscription)</h4>
          <p className="text-sm text-gray-700 mb-2">
            Check if a subscription grants active access to content.
          </p>
          <div className="text-xs bg-white rounded p-3 space-y-1">
            <div><strong>Returns:</strong> <code>boolean</code></div>
            <div><strong>True when:</strong> Subscription is active and not expired</div>
            <div><strong>Use case:</strong> Gate content based on subscription status</div>
          </div>
          <pre className="mt-2 text-xs bg-white rounded p-3 overflow-x-auto">
            {`if (canAccess(subscription)) {
  showPremiumContent();
} else {
  showUpgradePrompt();
}`}
          </pre>
        </div>

        {/* isPaymentDue Explanation */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">isPaymentDue(subscription)</h4>
          <p className="text-sm text-gray-700 mb-2">
            Check if a subscription payment is past due (nextPaymentDate has passed).
          </p>
          <div className="text-xs bg-white rounded p-3 space-y-1">
            <div><strong>Returns:</strong> <code>boolean</code></div>
            <div><strong>True when:</strong> Current date is past nextPaymentDate</div>
            <div><strong>Use case:</strong> Display payment reminders or trigger renewals</div>
          </div>
          <pre className="mt-2 text-xs bg-white rounded p-3 overflow-x-auto">
            {`if (isPaymentDue(subscription)) {
  showPaymentReminder();
  // Or automatically trigger renewal if auto-renewing
}`}
          </pre>
        </div>

        {/* shouldRenew Explanation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">shouldRenew(subscription)</h4>
          <p className="text-sm text-gray-700 mb-2">
            Check if a subscription should be automatically renewed right now.
          </p>
          <div className="text-xs bg-white rounded p-3 space-y-1">
            <div><strong>Returns:</strong> <code>boolean</code></div>
            <div><strong>True when:</strong> Payment is due AND auto-renewing is enabled AND has remaining cycles</div>
            <div><strong>Use case:</strong> Determine when to process auto-renewal payments</div>
          </div>
          <pre className="mt-2 text-xs bg-white rounded p-3 overflow-x-auto">
            {`if (shouldRenew(subscription)) {
  await processRenewalPayment(subscription.id);
  console.log('Subscription renewed!');
}`}
          </pre>
        </div>

        {/* getSubscriptionHealth Explanation */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">getSubscriptionHealth(subscription)</h4>
          <p className="text-sm text-gray-700 mb-2">
            Get a comprehensive health summary combining all decision helpers.
          </p>
          <div className="text-xs bg-white rounded p-3 space-y-1">
            <div><strong>Returns:</strong> <code>SubscriptionHealth</code> object</div>
            <div><strong>Includes:</strong> state, isPaymentDue, shouldRenew, daysUntilExpiry, cyclesRemaining</div>
            <div><strong>Use case:</strong> Get all subscription status info in one call</div>
          </div>
          <pre className="mt-2 text-xs bg-white rounded p-3 overflow-x-auto">
            {`const health = getSubscriptionHealth(subscription);

console.log(health);
// {
//   state: 'active' | 'expiring-soon' | 'expired' | 'cancelled' | 'not-found',
//   isPaymentDue: false,
//   shouldRenew: false,
//   daysUntilExpiry: 25,
//   cyclesRemaining: 0 // 0 = unlimited
// }`}
          </pre>
        </div>

        {/* Function Reference */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">All Decision Helper Functions:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div><strong>canAccess(subscription)</strong> - Check if subscription grants access</div>
            <div><strong>isPaymentDue(subscription, now?)</strong> - Check if payment is past due</div>
            <div><strong>shouldRenew(subscription, now?)</strong> - Check if should auto-renew now</div>
            <div><strong>getSubscriptionHealth(subscription, now?)</strong> - Get comprehensive health summary</div>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">💡 Pure Functions:</h4>
          <p className="text-sm text-gray-700">
            All decision helpers are <strong>pure functions</strong> that don't make blockchain calls.
            They analyze the subscription object you pass in. This makes them fast and safe to call
            frequently in your UI logic.
          </p>
        </div>
      </div>
    </DemoCard>
  );
}
