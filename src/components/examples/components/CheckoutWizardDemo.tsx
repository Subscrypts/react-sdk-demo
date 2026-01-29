/**
 * CheckoutWizard Component Demo
 *
 * Demonstrates the standalone checkout wizard modal (v1.0.0).
 */

import { CheckoutWizard, useWallet } from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';
import { DEMO_PLANS } from '../../../config/plans';
import { useState } from 'react';

export function CheckoutWizardDemo() {
  const { isConnected } = useWallet();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(DEMO_PLANS[0].id);
  const [lastSubscriptionId, setLastSubscriptionId] = useState<string | null>(null);

  if (!isConnected) {
    return (
      <DemoCard
        title="CheckoutWizard"
        description="Standalone checkout wizard modal with multi-step flow"
        version="v1.0.0"
      >
        <ConnectWalletPrompt />
      </DemoCard>
    );
  }

  return (
    <DemoCard
      title="CheckoutWizard"
      description="Standalone checkout wizard modal with multi-step flow"
      version="v1.0.0"
    >
      <div className="space-y-4">
        {/* Plan Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Plan to Purchase:
          </label>
          <select
            value={selectedPlanId}
            onChange={(e) => setSelectedPlanId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {DEMO_PLANS.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name} - {plan.pricePerMonth}
              </option>
            ))}
          </select>
        </div>

        {/* Launch Button */}
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Try the Checkout Wizard:</h4>
          <button
            onClick={() => setIsOpen(true)}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Open Checkout Wizard
          </button>
          <p className="text-xs text-gray-600 mt-3 text-center">
            Click to see the full checkout flow with token approval and subscription steps
          </p>
        </div>

        {/* Last Result */}
        {lastSubscriptionId && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <div>
                <div className="font-semibold text-green-900">Subscription Successful!</div>
                <div className="text-sm text-gray-700">
                  Subscription ID: <code className="bg-white px-1 py-0.5 rounded">{lastSubscriptionId}</code>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Wizard Component */}
        <CheckoutWizard
          planId={selectedPlanId}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSuccess={(subscriptionId) => {
            console.log('Checkout success:', subscriptionId);
            setLastSubscriptionId(subscriptionId);
            setIsOpen(false);
          }}
          onError={(error) => {
            console.error('Checkout error:', error);
          }}
        />

        {/* Features */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Features:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Multi-step checkout flow (review, approve, subscribe)</li>
            <li>✓ Automatic token approval if needed</li>
            <li>✓ Transaction tracking with Arbiscan links</li>
            <li>✓ Loading states and progress indicators</li>
            <li>✓ Error handling with user-friendly messages</li>
            <li>✓ Success confirmation with subscription ID</li>
            <li>✓ Responsive modal design</li>
          </ul>
        </div>

        {/* Props Documentation */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Component Props:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div><strong>planId:</strong> string (required) - Plan ID to subscribe to</div>
            <div><strong>isOpen:</strong> boolean (required) - Modal open state</div>
            <div><strong>onClose:</strong> () =&gt; void (required) - Close handler</div>
            <div><strong>referralAddress:</strong> string - Referrer wallet address (optional)</div>
            <div><strong>onSuccess:</strong> (subscriptionId: string) =&gt; void - Success callback</div>
            <div><strong>onError:</strong> (error: Error) =&gt; void - Error callback</div>
          </div>
        </div>

        {/* Comparison with SubscryptsButton */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">🔄 CheckoutWizard vs SubscryptsButton:</h4>
          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <div className="font-medium">SubscryptsButton</div>
              <div className="text-xs ml-4">
                • All-in-one button component with built-in checkout wizard<br/>
                • Manages modal open/close state automatically<br/>
                • Best for simple "Subscribe" buttons
              </div>
            </div>
            <div>
              <div className="font-medium">CheckoutWizard (Standalone)</div>
              <div className="text-xs ml-4">
                • Pure checkout modal component<br/>
                • You control when and how to open it<br/>
                • Best for custom triggers (links, cards, etc.)
              </div>
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">💡 Usage Pattern:</h4>
          <p className="text-sm text-gray-700">
            CheckoutWizard is perfect when you need a custom checkout trigger (like a pricing card,
            hero banner link, or any element other than a standard button). It gives you full control
            over when to show the checkout modal.
          </p>
        </div>

        {/* Example Code */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Example Usage:</h4>
          <pre className="text-xs bg-white rounded p-3 overflow-x-auto">
            {`import { CheckoutWizard } from '@subscrypts/react-sdk';
import { useState } from 'react';

function PricingCard({ planId }) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <>
      {/* Custom trigger */}
      <div className="pricing-card">
        <h3>Pro Plan</h3>
        <button onClick={() => setIsCheckoutOpen(true)}>
          Get Started
        </button>
      </div>

      {/* Checkout wizard */}
      <CheckoutWizard
        planId={planId}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={(subscriptionId) => {
          console.log('Subscribed!', subscriptionId);
          setIsCheckoutOpen(false);
          // Navigate to success page
        }}
      />
    </>
  );
}`}
          </pre>
        </div>
      </div>
    </DemoCard>
  );
}
