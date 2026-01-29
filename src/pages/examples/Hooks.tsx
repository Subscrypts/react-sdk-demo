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
  UseSubscribeDemo,
  UseMySubscriptionsDemo,
  UsePlanDemo,
  UsePlansDemo,
  UsePlansByMerchantDemo,
  UsePlanPriceDemo,
  UseSUBSPriceDemo,
  UseManageSubscriptionDemo,
  UseMerchantPlansDemo,
  UseMerchantSubscribersDemo,
  UseMerchantRevenueDemo,
  UseSubscryptsEventsDemo,
  UseSubscryptsDemo,
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
          <UseSubscryptsDemo />
        </DemoSection>

        {/* Subscription Hooks */}
        <DemoSection
          id="subscription-hooks"
          title="📝 Subscription Management"
          description="Check subscription status, create subscriptions, and manage user subscriptions."
        >
          <UseSubscriptionStatusDemo />
          <UseSubscribeDemo />
          <UseMySubscriptionsDemo />
        </DemoSection>

        {/* Plan Hooks */}
        <DemoSection
          id="plan-hooks"
          title="📋 Plan Discovery"
          description="Fetch subscription plan details, search plans, and display pricing information."
        >
          <UsePlanDemo />
          <UsePlansDemo />
          <UsePlansByMerchantDemo />
          <UsePlanPriceDemo />
        </DemoSection>

        {/* Pricing & Management Hooks */}
        <DemoSection
          id="pricing-hooks"
          title="💰 Pricing & Management"
          description="Get token prices and manage active subscriptions."
        >
          <UseSUBSPriceDemo />
          <UseManageSubscriptionDemo />
        </DemoSection>

        {/* Merchant Hooks (v1.4.0) */}
        <DemoSection
          id="merchant-hooks"
          title="👔 Merchant Toolkit (v1.4.0)"
          description="Manage subscription business with revenue tracking and subscriber analytics."
        >
          <UseMerchantPlansDemo />
          <UseMerchantSubscribersDemo />
          <UseMerchantRevenueDemo />
        </DemoSection>

        {/* Event Hooks */}
        <DemoSection
          id="event-hooks"
          title="📡 Real-Time Events (v1.3.0)"
          description="Listen for live protocol events like subscriptions, payments, and cancellations."
        >
          <UseSubscryptsEventsDemo />
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
