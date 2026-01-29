/**
 * SubscriptionCard Component Demo
 *
 * Demonstrates the subscription display card with status badge and management (v1.3.0).
 */

import { SubscriptionCard, useMySubscriptions, useWallet } from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';
import { useState } from 'react';

export function SubscriptionCardDemo() {
  const { isConnected } = useWallet();
  const [showManageButton, setShowManageButton] = useState(true);
  const [showFiatPrice, setShowFiatPrice] = useState(false);

  // Fetch user's subscriptions to display one
  const { subscriptions, isLoading, error, refetch } = useMySubscriptions(undefined, 5);

  if (!isConnected) {
    return (
      <DemoCard
        title="SubscriptionCard"
        description="Display subscription details with status badge"
        version="v1.3.0"
      >
        <ConnectWalletPrompt />
      </DemoCard>
    );
  }

  return (
    <DemoCard
      title="SubscriptionCard"
      description="Display subscription details with status badge"
      version="v1.3.0"
    >
      <div className="space-y-4">
        {/* Configuration */}
        <div className="space-y-3">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={showManageButton}
                onChange={(e) => setShowManageButton(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              Show Manage Button
            </label>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={showFiatPrice}
                onChange={(e) => setShowFiatPrice(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              Show Fiat Price (USD Conversion)
            </label>
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Live Preview:</h4>
          {isLoading ? (
            <div className="text-center py-8 text-gray-600">Loading subscriptions...</div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">Error: {error.message}</p>
            </div>
          ) : subscriptions.length > 0 ? (
            <div className="space-y-4">
              {subscriptions.slice(0, 2).map((subscription) => (
                <SubscriptionCard
                  key={subscription.id}
                  subscription={subscription}
                  showManageButton={showManageButton}
                  showFiatPrice={showFiatPrice}
                  onCancelled={() => {
                    console.log('Subscription cancelled:', subscription.id);
                    refetch();
                  }}
                  onUpdated={() => {
                    console.log('Subscription updated:', subscription.id);
                    refetch();
                  }}
                />
              ))}
              {subscriptions.length > 2 && (
                <div className="text-center text-sm text-gray-500">
                  Showing 2 of {subscriptions.length} subscriptions
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-4xl mb-2">📭</div>
              <p className="text-gray-600 text-sm font-medium mb-1">No Active Subscriptions</p>
              <p className="text-gray-500 text-xs">
                Subscribe to a plan from the <a href="/pricing" className="text-blue-600 hover:underline">Pricing page</a> to see subscription cards here.
              </p>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Features:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Color-coded status badges (active, expiring soon, expired, cancelled)</li>
            <li>✓ Displays plan name, amount, frequency, and dates</li>
            <li>✓ Built-in manage button with modal (cancel, toggle auto-renewal)</li>
            <li>✓ Optional USD price conversion display</li>
            <li>✓ Callbacks for cancelled/updated events</li>
            <li>✓ Responsive card layout</li>
          </ul>
        </div>

        {/* Props Documentation */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Component Props:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div><strong>subscription:</strong> Subscription (required) - Subscription object to display</div>
            <div><strong>showManageButton:</strong> boolean - Show manage button (default: true)</div>
            <div><strong>showFiatPrice:</strong> boolean - Show USD conversion (default: false)</div>
            <div><strong>onManage:</strong> (subscriptionId: string) =&gt; void - Custom manage handler</div>
            <div><strong>onCancelled:</strong> () =&gt; void - Called when subscription cancelled</div>
            <div><strong>onUpdated:</strong> () =&gt; void - Called when subscription updated</div>
            <div><strong>className:</strong> string - Additional CSS classes</div>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">💡 Usage Pattern:</h4>
          <p className="text-sm text-gray-700">
            SubscriptionCard displays a single subscription. Use with <code className="bg-white px-1 py-0.5 rounded">useMySubscriptions</code> hook
            to fetch subscriptions, then map over them to display cards. For a complete dashboard with pagination, use <code className="bg-white px-1 py-0.5 rounded">SubscriptionDashboard</code> instead.
          </p>
        </div>

        {/* Example Code */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Example Usage:</h4>
          <pre className="text-xs bg-white rounded p-3 overflow-x-auto">
            {`import { SubscriptionCard, useMySubscriptions } from '@subscrypts/react-sdk';

function MySubscriptions() {
  const { subscriptions, isLoading, refetch } = useMySubscriptions();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      {subscriptions.map((subscription) => (
        <SubscriptionCard
          key={subscription.id}
          subscription={subscription}
          showManageButton={true}
          showFiatPrice={true}
          onCancelled={() => {
            console.log('Cancelled!');
            refetch(); // Refresh list
          }}
        />
      ))}
    </div>
  );
}`}
          </pre>
        </div>
      </div>
    </DemoCard>
  );
}
