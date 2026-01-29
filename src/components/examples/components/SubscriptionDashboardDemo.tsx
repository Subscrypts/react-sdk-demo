/**
 * SubscriptionDashboard Component Demo
 *
 * Demonstrates the complete subscription dashboard with pagination (v1.3.0).
 */

import { SubscriptionDashboard, useWallet } from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';
import { useState } from 'react';

export function SubscriptionDashboardDemo() {
  const { isConnected } = useWallet();
  const [pageSize, setPageSize] = useState(10);
  const [showFiatPrices, setShowFiatPrices] = useState(false);

  if (!isConnected) {
    return (
      <DemoCard
        title="SubscriptionDashboard"
        description="Complete subscription management dashboard"
        version="v1.3.0"
      >
        <ConnectWalletPrompt />
      </DemoCard>
    );
  }

  return (
    <DemoCard
      title="SubscriptionDashboard"
      description="Complete subscription management dashboard"
      version="v1.3.0"
    >
      <div className="space-y-4">
        {/* Configuration */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Items Per Page:
            </label>
            <div className="flex gap-2">
              {[5, 10, 20].map((size) => (
                <button
                  key={size}
                  onClick={() => setPageSize(size)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pageSize === size
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={showFiatPrices}
                onChange={(e) => setShowFiatPrices(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              Show Fiat Prices (USD Conversion)
            </label>
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Live Dashboard:</h4>
          <SubscriptionDashboard
            pageSize={pageSize}
            showFiatPrices={showFiatPrices}
            onSubscriptionCancelled={(subscriptionId) => {
              console.log('Subscription cancelled:', subscriptionId);
            }}
            onSubscriptionUpdated={(subscriptionId) => {
              console.log('Subscription updated:', subscriptionId);
            }}
          />
        </div>

        {/* Features */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Features:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Complete dashboard with built-in pagination</li>
            <li>✓ Automatic loading and empty states</li>
            <li>✓ Built-in subscription management (cancel, auto-renewal)</li>
            <li>✓ Configurable page size</li>
            <li>✓ Optional USD price display</li>
            <li>✓ Event callbacks for cancelled/updated subscriptions</li>
            <li>✓ Responsive grid layout</li>
          </ul>
        </div>

        {/* Props Documentation */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Component Props:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div><strong>address:</strong> string - Address to fetch subscriptions for (default: connected wallet)</div>
            <div><strong>pageSize:</strong> number - Subscriptions per page (default: 10)</div>
            <div><strong>showFiatPrices:</strong> boolean - Show USD conversion (default: false)</div>
            <div><strong>emptyComponent:</strong> ReactNode - Custom empty state</div>
            <div><strong>loadingComponent:</strong> ReactNode - Custom loading state</div>
            <div><strong>className:</strong> string - Additional CSS classes</div>
            <div><strong>onSubscriptionCancelled:</strong> (id: string) =&gt; void - Cancelled callback</div>
            <div><strong>onSubscriptionUpdated:</strong> (id: string) =&gt; void - Updated callback</div>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">💡 All-in-One Solution:</h4>
          <p className="text-sm text-gray-700 mb-2">
            SubscriptionDashboard is a complete, ready-to-use dashboard component. It handles:
          </p>
          <ul className="text-sm text-gray-700 space-y-1 ml-4">
            <li>• Fetching subscriptions with <code className="bg-white px-1 py-0.5 rounded">useMySubscriptions</code></li>
            <li>• Rendering cards with <code className="bg-white px-1 py-0.5 rounded">SubscriptionCard</code></li>
            <li>• Managing pagination controls</li>
            <li>• Handling loading and empty states</li>
          </ul>
          <p className="text-sm text-gray-700 mt-2">
            Just drop it in and it works! No need to manage state manually.
          </p>
        </div>

        {/* Example Code */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Example Usage:</h4>
          <pre className="text-xs bg-white rounded p-3 overflow-x-auto">
            {`import { SubscriptionDashboard } from '@subscrypts/react-sdk';

// Simple usage - just drop it in!
function AccountPage() {
  return (
    <div className="container">
      <h1>My Subscriptions</h1>
      <SubscriptionDashboard
        pageSize={10}
        showFiatPrices={true}
        onSubscriptionCancelled={(id) => {
          console.log('Cancelled:', id);
          // Optionally show notification
        }}
      />
    </div>
  );
}

// With custom empty state
function CustomDashboard() {
  return (
    <SubscriptionDashboard
      emptyComponent={
        <div className="text-center py-12">
          <h3>No subscriptions yet!</h3>
          <a href="/pricing">Browse Plans</a>
        </div>
      }
    />
  );
}`}
          </pre>
        </div>
      </div>
    </DemoCard>
  );
}
