/**
 * PricingTable Component Demo
 *
 * Demonstrates the pricing table with multiple plans in a grid layout (v1.0.11).
 */

import { PricingTable, useWallet } from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';
import { useState } from 'react';

export function PricingTableDemo() {
  const { isConnected } = useWallet();
  const [currency, setCurrency] = useState<'SUBS' | 'USDC'>('SUBS');
  const [columns, setColumns] = useState<1 | 2 | 3 | 4 | undefined>(undefined);
  const [useAdvanced, setUseAdvanced] = useState(false);

  if (!isConnected) {
    return (
      <DemoCard
        title="PricingTable"
        description="Grid layout for displaying multiple subscription plans"
        version="v1.0.11"
      >
        <ConnectWalletPrompt />
      </DemoCard>
    );
  }

  // Simple plan IDs
  const simplePlans = ['1', '2', '3'];

  // Advanced configuration with per-plan customization
  const advancedPlans = [
    {
      planId: '1',
      title: 'Starter',
      subscribeLabel: 'Get Started',
      featured: false,
    },
    {
      planId: '2',
      title: 'Professional',
      subscribeLabel: 'Go Pro',
      featured: true,  // Highlight this plan
    },
    {
      planId: '3',
      title: 'Business',
      subscribeLabel: 'Contact Sales',
      featured: false,
    },
  ];

  return (
    <DemoCard
      title="PricingTable"
      description="Grid layout for displaying multiple subscription plans"
      version="v1.0.11"
    >
      <div className="space-y-4">
        {/* Configuration Mode Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Configuration Mode:
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setUseAdvanced(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !useAdvanced
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Simple (Plan IDs Only)
            </button>
            <button
              onClick={() => setUseAdvanced(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                useAdvanced
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Advanced (Custom Titles & Labels)
            </button>
          </div>
        </div>

        {/* Currency Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Display Currency:
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrency('SUBS')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currency === 'SUBS'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              SUBS
            </button>
            <button
              onClick={() => setCurrency('USDC')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currency === 'USDC'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              USDC
            </button>
          </div>
        </div>

        {/* Column Layout */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Grid Columns:
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setColumns(undefined)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                columns === undefined
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Auto
            </button>
            {[1, 2, 3, 4].map((col) => (
              <button
                key={col}
                onClick={() => setColumns(col as 1 | 2 | 3 | 4)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  columns === col
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {col}
              </button>
            ))}
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Live Pricing Table:</h4>
          <PricingTable
            plans={useAdvanced ? advancedPlans : simplePlans}
            currency={currency}
            columns={columns}
            showFields={['description', 'amount', 'frequency', 'subscribers']}
            onSubscriptionSuccess={(subscriptionId, planId) => {
              console.log('Subscription successful!', { subscriptionId, planId });
            }}
            onSubscriptionError={(error, planId) => {
              console.error('Subscription error:', { error, planId });
            }}
          />
        </div>

        {/* Features */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Features:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Display multiple plans in responsive grid layout (1-4 columns)</li>
            <li>✓ Simple mode (just plan IDs) or advanced mode (custom titles, labels, featured)</li>
            <li>✓ Built-in checkout flow for each plan</li>
            <li>✓ Configurable currency display (SUBS or USDC)</li>
            <li>✓ Customizable visible fields per plan</li>
            <li>✓ Featured/highlighted plan support</li>
            <li>✓ Automatic loading and error states</li>
            <li>✓ Responsive grid that adapts to screen size</li>
          </ul>
        </div>

        {/* Props Documentation */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Component Props:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div><strong>plans:</strong> (string | PlanConfig)[] (required) - Plan IDs or configurations</div>
            <div><strong>currency:</strong> 'SUBS' | 'USDC' - Display currency (default: SUBS)</div>
            <div><strong>showFields:</strong> PlanField[] - Fields to display on cards</div>
            <div><strong>columns:</strong> 1 | 2 | 3 | 4 - Grid columns (default: auto)</div>
            <div><strong>onSubscribe:</strong> (planId: string) =&gt; void - Custom subscribe handler</div>
            <div><strong>subscribeLabel:</strong> string - Default button label</div>
            <div><strong>onSubscriptionSuccess:</strong> (id: string, planId: string) =&gt; void</div>
            <div><strong>onSubscriptionError:</strong> (error: Error, planId: string) =&gt; void</div>
            <div><strong>referralAddress:</strong> string - Referrer wallet address</div>
            <div><strong>className:</strong> string - Additional CSS classes</div>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">💡 Perfect for Pricing Pages:</h4>
          <p className="text-sm text-gray-700">
            PricingTable is the easiest way to create a complete pricing page. It automatically
            fetches plan data, displays them in a grid, and handles the checkout flow. Just pass
            in your plan IDs and you're done!
          </p>
        </div>

        {/* Example Code */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Example Usage:</h4>
          <pre className="text-xs bg-white rounded p-3 overflow-x-auto">
            {`import { PricingTable } from '@subscrypts/react-sdk';

// Simple usage - just plan IDs
function PricingPage() {
  return (
    <div className="container">
      <h1>Choose Your Plan</h1>
      <PricingTable
        plans={['1', '2', '3']}
        currency="SUBS"
        showFields={['description', 'amount', 'frequency']}
      />
    </div>
  );
}

// Advanced - custom configuration per plan
function AdvancedPricing() {
  return (
    <PricingTable
      plans={[
        {
          planId: '1',
          title: 'Starter',
          subscribeLabel: 'Start Free',
        },
        {
          planId: '2',
          title: 'Pro',
          featured: true,
          subscribeLabel: 'Go Pro',
        },
        {
          planId: '3',
          title: 'Enterprise',
          subscribeLabel: 'Contact Sales',
        },
      ]}
      columns={3}
      onSubscriptionSuccess={(subId, planId) => {
        console.log('Success!', subId, planId);
        // Navigate to thank you page
      }}
    />
  );
}`}
          </pre>
        </div>
      </div>
    </DemoCard>
  );
}
