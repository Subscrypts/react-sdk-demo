/**
 * Hooks Showcase Page
 *
 * Comprehensive showcase of all Subscrypts React SDK hooks.
 * Each hook has an isolated, interactive demo component.
 */

import { useWallet } from '@subscrypts/react-sdk';
import { SDK_HOOKS } from '../../config/sdkFeatures';
import { DemoSection } from '../../components/examples/shared';
import {
  UseWalletDemo,
  UseTokenBalanceDemo,
  UseSubscriptionStatusDemo,
  UsePlanDemo,
} from '../../components/examples/hooks';

export default function HooksPage() {
  const { isConnected, connect } = useWallet();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">SDK Hooks</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive showcase of all {SDK_HOOKS.length} Subscrypts React SDK hooks with live,
          interactive examples.
        </p>
      </div>

      {/* Wallet Connection Notice */}
      {!isConnected && (
        <div className="max-w-2xl mx-auto mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="text-blue-600 text-2xl">🔌</div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Connect Wallet for Live Examples
              </h3>
              <p className="text-blue-700 mb-4">
                Most hooks require a connected wallet to display real data. Connect your wallet to
                see live blockchain interactions.
              </p>
              <button
                onClick={connect}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hook Categories */}
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Core Wallet & Provider Hooks */}
        <DemoSection
          id="core-hooks"
          title="🔌 Core Wallet & Provider"
          description="Essential hooks for wallet connection, token balances, and direct contract access."
        >
          <UseWalletDemo />
          <UseTokenBalanceDemo />
        </DemoSection>

        {/* Subscription Hooks */}
        <DemoSection
          id="subscription-hooks"
          title="📝 Subscription Management"
          description="Check subscription status, create subscriptions, and manage user subscriptions."
        >
          <UseSubscriptionStatusDemo />

          {/* Placeholder sections for other hooks */}
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">More Subscription Hooks</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-blue-600">→</span>
                <strong>useSubscribe</strong> - Manual subscription flow with transaction tracking
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">→</span>
                <strong>useMySubscriptions (v1.3.0)</strong> - Paginated list of user subscriptions
              </li>
            </ul>
            <p className="mt-4 text-xs text-gray-500">
              Additional demo components coming soon
            </p>
          </div>
        </DemoSection>

        {/* Plan Hooks */}
        <DemoSection
          id="plan-hooks"
          title="📋 Plan Discovery"
          description="Fetch subscription plan details, search plans, and display pricing information."
        >
          <UsePlanDemo />

          {/* Placeholder for other plan hooks */}
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">More Plan Hooks</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-blue-600">→</span>
                <strong>usePlans (v1.0.11)</strong> - Fetch multiple plans in parallel
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">→</span>
                <strong>usePlansByMerchant (v1.2.0)</strong> - Get all plans by merchant address
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">→</span>
                <strong>usePlanPrice (v1.2.0)</strong> - Get plan price with USD conversion
              </li>
            </ul>
            <p className="mt-4 text-xs text-gray-500">
              Additional demo components coming soon
            </p>
          </div>
        </DemoSection>

        {/* Pricing & Management Hooks */}
        <DemoSection
          id="pricing-hooks"
          title="💰 Pricing & Management"
          description="Get token prices and manage active subscriptions."
        >
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pricing & Management Hooks</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-blue-600">→</span>
                <strong>useSUBSPrice (v1.2.0)</strong> - Current SUBS/USD price with auto-refresh
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">→</span>
                <strong>useManageSubscription (v1.2.0)</strong> - Cancel, toggle auto-renewal, update cycles
              </li>
            </ul>
            <p className="mt-4 text-xs text-gray-500">
              Demo components coming soon
            </p>
          </div>
        </DemoSection>

        {/* Merchant Hooks (v1.4.0) */}
        <DemoSection
          id="merchant-hooks"
          title="👔 Merchant Toolkit (v1.4.0)"
          description="Manage subscription business with revenue tracking and subscriber analytics."
        >
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-300 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🆕</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  New in v1.4.0: Merchant Hooks
                </h3>
                <p className="text-sm text-gray-600">
                  Complete toolkit for subscription business management
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-700 mb-4">
              <li className="flex items-center gap-2">
                <span className="text-purple-600">→</span>
                <strong>useMerchantPlans</strong> - Fetch all plans owned by merchant
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-600">→</span>
                <strong>useMerchantSubscribers</strong> - Paginated subscribers for a plan
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-600">→</span>
                <strong>useMerchantRevenue</strong> - Calculate MRR from active subscriptions
              </li>
            </ul>
            <a
              href="/merchant"
              className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              See Live Merchant Dashboard →
            </a>
          </div>
        </DemoSection>

        {/* Event Hooks */}
        <DemoSection
          id="event-hooks"
          title="📡 Real-Time Events (v1.3.0)"
          description="Listen for live protocol events like subscriptions, payments, and cancellations."
        >
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">useSubscryptsEvents (v1.3.0)</h3>
            <p className="text-gray-700 mb-4">
              Real-time protocol event listeners for live dashboard updates. Listen for subscription
              creation, payments, and cancellations without polling.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm text-gray-700">
              <p>✨ <strong>Real-Time Updates:</strong> Uses ethers.js contract.on() for instant event notifications.</p>
              <p className="mt-2">Demo component coming soon. Check the Account page for usage examples.</p>
            </div>
          </div>
        </DemoSection>

        {/* Summary */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">All {SDK_HOOKS.length} SDK Hooks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {SDK_HOOKS.map((hook) => (
              <div key={hook.name} className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                <div>
                  <strong className="text-gray-900">{hook.name}</strong>
                  <span className="text-xs text-gray-500 ml-2">{hook.version}</span>
                  <p className="text-gray-600 text-xs mt-0.5">{hook.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
