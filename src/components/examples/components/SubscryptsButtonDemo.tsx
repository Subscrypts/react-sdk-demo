/**
 * SubscryptsButton Component Demo
 *
 * Demonstrates the one-click subscription button with built-in checkout wizard (v1.0.0).
 */

import { SubscryptsButton, useWallet } from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';
import { useState } from 'react';

export function SubscryptsButtonDemo() {
  const { isConnected } = useWallet();
  const DEMO_PLAN_IDS = ['1', '2', '3'];
  const [selectedPlanId, setSelectedPlanId] = useState('1');
  const [variant, setVariant] = useState<'primary' | 'secondary' | 'outline'>('primary');
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');

  if (!isConnected) {
    return (
      <DemoCard
        title="SubscryptsButton"
        description="One-click subscription with built-in checkout wizard"
        version="v1.0.0"
      >
        <ConnectWalletPrompt />
      </DemoCard>
    );
  }

  return (
    <DemoCard
      title="SubscryptsButton"
      description="One-click subscription with built-in checkout wizard"
      version="v1.0.0"
    >
      <div className="space-y-4">
        {/* Plan Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Plan:
          </label>
          <select
            value={selectedPlanId}
            onChange={(e) => setSelectedPlanId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {DEMO_PLAN_IDS.map((planId) => (
              <option key={planId} value={planId}>
                Plan {planId}
              </option>
            ))}
          </select>
        </div>

        {/* Variant Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Button Variant:
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setVariant('primary')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                variant === 'primary'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Primary
            </button>
            <button
              onClick={() => setVariant('secondary')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                variant === 'secondary'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Secondary
            </button>
            <button
              onClick={() => setVariant('outline')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                variant === 'outline'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Outline
            </button>
          </div>
        </div>

        {/* Size Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Button Size:
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setSize('sm')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                size === 'sm'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Small
            </button>
            <button
              onClick={() => setSize('md')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                size === 'md'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setSize('lg')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                size === 'lg'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Large
            </button>
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Live Preview:</h4>
          <SubscryptsButton
            planId={selectedPlanId}
            variant={variant}
            size={size}
          >
            Subscribe Now
          </SubscryptsButton>
        </div>

        {/* Features */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Features:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Built-in checkout wizard with multi-step flow</li>
            <li>✓ Automatic wallet connection prompt</li>
            <li>✓ Token approval and subscription in one flow</li>
            <li>✓ Transaction tracking with Arbiscan links</li>
            <li>✓ Error handling and user feedback</li>
            <li>✓ Customizable variants, sizes, and styling</li>
          </ul>
        </div>

        {/* Props Documentation */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Component Props:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div><strong>planId:</strong> string (required) - Plan ID to subscribe to</div>
            <div><strong>variant:</strong> 'primary' | 'secondary' | 'outline' - Button style</div>
            <div><strong>size:</strong> 'sm' | 'md' | 'lg' - Button size</div>
            <div><strong>children:</strong> ReactNode - Button text/content</div>
            <div><strong>referralAddress:</strong> string - Referrer wallet address (optional)</div>
            <div><strong>onSuccess:</strong> (subscriptionId: string) =&gt; void - Success callback</div>
          </div>
        </div>

        {/* Example Code */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Example Usage:</h4>
          <pre className="text-xs bg-white rounded p-3 overflow-x-auto">
            {`import { SubscryptsButton } from '@subscrypts/react-sdk';

function PricingCard() {
  return (
    <SubscryptsButton
      planId="1"
      variant="primary"
      size="lg"
      onSuccess={(subscriptionId) => {
        console.log('Subscribed!', subscriptionId);
      }}
    >
      Subscribe Now
    </SubscryptsButton>
  );
}`}
          </pre>
        </div>
      </div>
    </DemoCard>
  );
}
