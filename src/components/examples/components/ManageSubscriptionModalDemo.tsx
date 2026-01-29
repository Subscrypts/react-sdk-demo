/**
 * ManageSubscriptionModal Component Demo
 *
 * Demonstrates the subscription management modal (v1.2.0).
 */

import { ManageSubscriptionModal, useMySubscriptions, useWallet } from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';
import { useState } from 'react';

export function ManageSubscriptionModalDemo() {
  const { isConnected } = useWallet();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<string | null>(null);

  const { subscriptions, isLoading, error, refetch } = useMySubscriptions(undefined, 10);

  if (!isConnected) {
    return (
      <DemoCard
        title="ManageSubscriptionModal"
        description="Modal for managing subscriptions (cancel, auto-renew, cycles)"
        version="v1.2.0"
      >
        <ConnectWalletPrompt />
      </DemoCard>
    );
  }

  return (
    <DemoCard
      title="ManageSubscriptionModal"
      description="Modal for managing subscriptions (cancel, auto-renew, cycles)"
      version="v1.2.0"
    >
      <div className="space-y-4">
        {/* Subscription Selector */}
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Select a Subscription to Manage:</h4>

          {isLoading ? (
            <div className="text-center py-8 text-gray-600">Loading your subscriptions...</div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">Error: {error.message}</p>
            </div>
          ) : subscriptions.length > 0 ? (
            <div className="space-y-3">
              {subscriptions.map((subscription) => (
                <div
                  key={subscription.id}
                  className="bg-white border border-gray-300 rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <div className="font-semibold text-gray-900">
                      Subscription #{subscription.id}
                    </div>
                    <div className="text-sm text-gray-600">
                      Plan: {subscription.planId} • Auto-renew: {subscription.isAutoRenewing ? 'On' : 'Off'}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedSubscriptionId(subscription.id);
                      setIsOpen(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Manage
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-gray-600 text-sm">
                No subscriptions found. Subscribe to a plan from the{' '}
                <a href="/pricing" className="text-blue-600 hover:underline">
                  Pricing page
                </a>{' '}
                to see the management modal.
              </p>
            </div>
          )}
        </div>

        {/* ManageSubscriptionModal Component */}
        {selectedSubscriptionId && (
          <ManageSubscriptionModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            subscriptionId={selectedSubscriptionId}
            subscription={subscriptions.find(s => s.id === selectedSubscriptionId)}
            onCancelled={() => {
              console.log('Subscription cancelled:', selectedSubscriptionId);
              refetch();
              setIsOpen(false);
            }}
            onUpdated={() => {
              console.log('Subscription updated:', selectedSubscriptionId);
              refetch();
            }}
          />
        )}

        {/* Features */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Features:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Cancel subscription with confirmation dialog</li>
            <li>✓ Toggle auto-renewal on/off</li>
            <li>✓ Update cycle limit (cycles remaining)</li>
            <li>✓ View subscription details (plan, dates, status)</li>
            <li>✓ Transaction tracking with Arbiscan links</li>
            <li>✓ Loading states and error handling</li>
            <li>✓ Success callbacks for cancelled/updated events</li>
          </ul>
        </div>

        {/* Props Documentation */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Component Props:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div><strong>isOpen:</strong> boolean (required) - Modal open state</div>
            <div><strong>onClose:</strong> () =&gt; void (required) - Close handler</div>
            <div><strong>subscriptionId:</strong> string (required) - Subscription ID to manage</div>
            <div><strong>subscription:</strong> Subscription - Pre-loaded subscription data (optional)</div>
            <div><strong>onCancelled:</strong> () =&gt; void - Called when subscription cancelled</div>
            <div><strong>onUpdated:</strong> () =&gt; void - Called when subscription updated</div>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">💡 Usage Pattern:</h4>
          <p className="text-sm text-gray-700">
            ManageSubscriptionModal is designed to work with SubscriptionCard or SubscriptionDashboard.
            When a user clicks "Manage" on a subscription card, open this modal with the subscription ID.
            The modal handles all management operations internally.
          </p>
        </div>

        {/* Example Code */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Example Usage:</h4>
          <pre className="text-xs bg-white rounded p-3 overflow-x-auto">
            {`import { ManageSubscriptionModal, useMySubscriptions } from '@subscrypts/react-sdk';
import { useState } from 'react';

function MySubscriptions() {
  const [manageId, setManageId] = useState<string | null>(null);
  const { subscriptions, refetch } = useMySubscriptions();

  return (
    <>
      {subscriptions.map((sub) => (
        <div key={sub.id}>
          <h3>Subscription {sub.id}</h3>
          <button onClick={() => setManageId(sub.id)}>
            Manage
          </button>
        </div>
      ))}

      {manageId && (
        <ManageSubscriptionModal
          isOpen={!!manageId}
          onClose={() => setManageId(null)}
          subscriptionId={manageId}
          onCancelled={() => {
            refetch(); // Refresh subscription list
            setManageId(null);
          }}
          onUpdated={() => {
            refetch(); // Refresh subscription list
          }}
        />
      )}
    </>
  );
}`}
          </pre>
        </div>

        {/* Hook Integration */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">🔗 Related Hook:</h4>
          <p className="text-sm text-gray-700 mb-2">
            For programmatic subscription management without UI, use:
          </p>
          <code className="text-xs bg-white px-2 py-1 rounded">
            useManageSubscription(subscriptionId)
          </code>
          <p className="text-xs text-gray-600 mt-2">
            Returns functions: cancelSubscription(), toggleAutoRenew(), updateCycles()
          </p>
        </div>
      </div>
    </DemoCard>
  );
}
