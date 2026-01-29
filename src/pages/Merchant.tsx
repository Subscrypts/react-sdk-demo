/**
 * Merchant Dashboard Page
 *
 * Showcases v1.4.0 Merchant Toolkit features:
 * - useMerchantPlans hook
 * - useMerchantSubscribers hook
 * - useMerchantRevenue hook
 * - MerchantDashboard component
 */

import { useWallet } from '@subscrypts/react-sdk';
import { MerchantDashboardDemo } from '../components/examples/components';
import {
  UseMerchantRevenueDemo,
  UseMerchantPlansDemo,
  UseMerchantSubscribersDemo,
} from '../components/examples/hooks';

export default function MerchantPage() {
  const { isConnected, address, connect } = useWallet();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <span>✨</span>
          <span>New in v1.4.0</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Merchant Dashboard</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Complete merchant toolkit for managing your subscription business: track revenue (MRR),
          manage plans, and monitor subscribers.
        </p>
      </div>

      {/* Connection Required */}
      {!isConnected ? (
        <div className="max-w-2xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <div className="text-blue-600 text-6xl mb-4">👔</div>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Connect Wallet to Access Merchant Dashboard
            </h2>
            <p className="text-blue-700 mb-6">
              The merchant dashboard displays data for the connected wallet address. Connect your
              merchant wallet to see your plans, subscribers, and revenue metrics.
            </p>
            <button
              onClick={connect}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Connect Merchant Wallet
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Connected Merchant Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 mb-1">Connected Merchant</p>
                <p className="font-mono text-lg text-blue-900">{address}</p>
              </div>
              <div className="text-blue-600 text-4xl">👔</div>
            </div>
          </div>

          {/* Merchant Toolkit Overview */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Merchant Toolkit Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Revenue Tracking */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <div className="text-green-600 text-3xl mb-3">💰</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Revenue Tracking</h3>
                <p className="text-gray-600 mb-4">
                  Calculate Monthly Recurring Revenue (MRR) from active subscriptions with USD
                  conversion.
                </p>
                <div className="text-sm text-gray-500">
                  <code className="text-green-600">useMerchantRevenue()</code>
                </div>
              </div>

              {/* Plan Management */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <div className="text-blue-600 text-3xl mb-3">📋</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Plan Management</h3>
                <p className="text-gray-600 mb-4">
                  View all subscription plans you've created with subscriber counts and active
                  status.
                </p>
                <div className="text-sm text-gray-500">
                  <code className="text-blue-600">useMerchantPlans()</code>
                </div>
              </div>

              {/* Subscriber Lists */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <div className="text-purple-600 text-3xl mb-3">👥</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Subscriber Lists</h3>
                <p className="text-gray-600 mb-4">
                  Paginated lists of subscribers for each plan with active/inactive status.
                </p>
                <div className="text-sm text-gray-500">
                  <code className="text-purple-600">useMerchantSubscribers()</code>
                </div>
              </div>
            </div>
          </section>

          {/* MerchantDashboard Component Demo */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">MerchantDashboard Component</h2>
            <p className="text-gray-600 mb-6">
              The MerchantDashboard component provides a complete merchant overview in a single
              component. It uses all three merchant hooks internally.
            </p>

            <MerchantDashboardDemo />
          </section>

          {/* Individual Hooks Demos */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Individual Hook Demos</h2>
            <p className="text-gray-600 mb-6">
              For custom merchant UIs, use the individual hooks instead of the MerchantDashboard
              component.
            </p>

            <div className="space-y-6">
              {/* useMerchantRevenue */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span>useMerchantRevenue Hook</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    v1.4.0
                  </span>
                </h3>
                <p className="text-gray-600 mb-4">
                  Calculate MRR from active subscriptions, normalized to monthly amounts with USD
                  conversion.
                </p>
                <UseMerchantRevenueDemo />
              </div>

              {/* useMerchantPlans */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span>useMerchantPlans Hook</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    v1.4.0
                  </span>
                </h3>
                <p className="text-gray-600 mb-4">
                  Fetch all subscription plans owned by the connected merchant wallet.
                </p>
                <UseMerchantPlansDemo />
              </div>

              {/* useMerchantSubscribers */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span>useMerchantSubscribers Hook</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    v1.4.0
                  </span>
                </h3>
                <p className="text-gray-600 mb-4">
                  Paginated list of subscribers for a specific plan with active count.
                </p>
                <UseMerchantSubscribersDemo />
              </div>
            </div>
          </section>

          {/* Getting Started */}
          <section className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-8 border border-indigo-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Getting Started as a Merchant</h3>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start gap-3">
                <div className="text-indigo-600 font-bold text-xl">1</div>
                <div>
                  <h4 className="font-semibold mb-1">Create Subscription Plans</h4>
                  <p className="text-sm">
                    Use the Subscrypts platform to create your subscription plans with pricing,
                    frequency, and features.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-indigo-600 font-bold text-xl">2</div>
                <div>
                  <h4 className="font-semibold mb-1">Connect Your Merchant Wallet</h4>
                  <p className="text-sm">
                    Connect the same wallet address you used to create plans on the platform.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-indigo-600 font-bold text-xl">3</div>
                <div>
                  <h4 className="font-semibold mb-1">Monitor Your Business</h4>
                  <p className="text-sm">
                    Track MRR, manage subscribers, and monitor your subscription business in
                    real-time.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Developer Resources */}
          <section className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Developer Resources</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://github.com/Subscrypts/react-sdk/blob/main/docs/merchant.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                📖 Merchant Toolkit Guide
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
              <a
                href="https://subscrypts.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                🚀 Create Plans
              </a>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
