/**
 * MerchantDashboard Component Demo
 *
 * Demonstrates the complete merchant dashboard with revenue, plans, and subscribers (v1.4.0).
 */

import { MerchantDashboard, useWallet } from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';

export function MerchantDashboardDemo() {
  const { isConnected } = useWallet();

  if (!isConnected) {
    return (
      <DemoCard
        title="MerchantDashboard"
        description="Complete merchant overview with revenue and subscribers"
        version="v1.4.0"
      >
        <ConnectWalletPrompt />
      </DemoCard>
    );
  }

  return (
    <DemoCard
      title="MerchantDashboard"
      description="Complete merchant overview with revenue and subscribers"
      version="v1.4.0"
    >
      <div className="space-y-4">
        {/* Live Preview */}
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Live Merchant Dashboard:</h4>
          <MerchantDashboard />
        </div>

        {/* Features */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Features:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Monthly Recurring Revenue (MRR) display with USD conversion</li>
            <li>✓ Total active subscribers count</li>
            <li>✓ Total subscribers (all-time) count</li>
            <li>✓ List of all merchant's plans with subscriber counts</li>
            <li>✓ Subscriber details for each plan</li>
            <li>✓ Automatic loading and empty states</li>
            <li>✓ Responsive dashboard layout</li>
          </ul>
        </div>

        {/* Props Documentation */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Component Props:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div><strong>merchantAddress:</strong> string - Merchant address to display (default: connected wallet)</div>
            <div><strong>className:</strong> string - Additional CSS classes</div>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">💡 All-in-One Merchant Solution:</h4>
          <p className="text-sm text-gray-700 mb-2">
            MerchantDashboard is a complete dashboard component that automatically:
          </p>
          <ul className="text-sm text-gray-700 space-y-1 ml-4">
            <li>• Fetches all merchant's plans with <code className="bg-white px-1 py-0.5 rounded">useMerchantPlans</code></li>
            <li>• Calculates MRR with <code className="bg-white px-1 py-0.5 rounded">useMerchantRevenue</code></li>
            <li>• Fetches subscribers with <code className="bg-white px-1 py-0.5 rounded">useMerchantSubscribers</code></li>
            <li>• Converts to USD with <code className="bg-white px-1 py-0.5 rounded">useSUBSPrice</code></li>
            <li>• Handles all loading and error states</li>
          </ul>
          <p className="text-sm text-gray-700 mt-2">
            Perfect for merchant/business owner portals. Just drop it in!
          </p>
        </div>

        {/* What You'll See */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">📊 What You'll See:</h4>
          <p className="text-sm text-gray-700 mb-2">
            <strong>If you're a merchant</strong> (have created plans):
          </p>
          <ul className="text-sm text-gray-700 space-y-1 ml-4">
            <li>• Revenue cards showing MRR and subscriber counts</li>
            <li>• List of your plans with subscriber counts</li>
            <li>• Subscriber details for each plan</li>
          </ul>
          <p className="text-sm text-gray-700 mt-3 mb-2">
            <strong>If you're not a merchant</strong> (no plans created):
          </p>
          <ul className="text-sm text-gray-700 space-y-1 ml-4">
            <li>• "No plans found" message</li>
            <li>• Instructions on how to create plans</li>
          </ul>
        </div>

        {/* Example Code */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Example Usage:</h4>
          <pre className="text-xs bg-white rounded p-3 overflow-x-auto">
            {`import { MerchantDashboard } from '@subscrypts/react-sdk';

// Simple usage - shows connected wallet's merchant data
function MerchantPortal() {
  return (
    <div className="container">
      <h1>My Business Dashboard</h1>
      <MerchantDashboard />
    </div>
  );
}

// View another merchant's data
function ViewMerchantPage({ merchantAddress }) {
  return (
    <div className="container">
      <h1>Merchant Overview</h1>
      <MerchantDashboard merchantAddress={merchantAddress} />
    </div>
  );
}`}
          </pre>
        </div>

        {/* Integration with Hooks */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">🔗 Behind the Scenes:</h4>
          <p className="text-sm text-gray-700 mb-2">
            MerchantDashboard uses these hooks internally (you can use them separately for custom UIs):
          </p>
          <div className="text-xs font-mono text-gray-700 space-y-1 ml-4">
            <div>• <strong>useMerchantPlans()</strong> - Fetch all merchant's plans</div>
            <div>• <strong>useMerchantRevenue(planIds?)</strong> - Calculate MRR from active subscriptions</div>
            <div>• <strong>useMerchantSubscribers(planId, pageSize?)</strong> - Fetch subscribers for a plan</div>
            <div>• <strong>useSUBSPrice()</strong> - Get current SUBS/USD price for conversions</div>
          </div>
          <p className="text-sm text-gray-700 mt-2">
            See the <a href="/examples/hooks" className="text-blue-600 hover:underline">Hooks page</a> for individual hook demos.
          </p>
        </div>
      </div>
    </DemoCard>
  );
}
