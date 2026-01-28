/**
 * Components Showcase Page
 *
 * Comprehensive showcase of all Subscrypts React SDK components.
 */

import { SDK_COMPONENTS } from '../../config/sdkFeatures';

export default function ComponentsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">SDK Components</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive showcase of all {SDK_COMPONENTS.length} Subscrypts React SDK components
          with live, interactive examples and customization options.
        </p>
      </div>

      {/* Component Categories */}
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Checkout & Subscription */}
        <section id="checkout">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-blue-600">🛒</span>
            Checkout & Subscription
          </h2>
          <p className="text-gray-600 mb-8">
            One-click subscription buttons and full checkout wizard for seamless subscription flows.
          </p>

          <div className="grid gap-6">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">SubscryptsButton</h3>
              <p className="text-sm text-gray-500 mb-4">Since v1.0.0</p>
              <p className="text-gray-700 mb-4">
                One-click subscription with built-in checkout wizard, payment processing, and
                transaction tracking.
              </p>
              <div className="bg-gray-50 rounded p-4 text-sm text-gray-600">
                Demo component will be added here
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">CheckoutWizard</h3>
              <p className="text-sm text-gray-500 mb-4">Since v1.0.0</p>
              <p className="text-gray-700 mb-4">
                Standalone multi-step checkout modal with transaction tracking and Arbiscan links.
              </p>
              <div className="bg-gray-50 rounded p-4 text-sm text-gray-600">
                Demo component will be added here
              </div>
            </div>
          </div>
        </section>

        {/* Content Protection */}
        <section id="protection">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-green-600">🔒</span>
            Content Protection
          </h2>
          <p className="text-gray-600 mb-8">
            Gate content based on subscription status with flexible access control.
          </p>

          <div className="grid gap-6">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">SubscriptionGuard</h3>
              <p className="text-sm text-gray-500 mb-4">Since v1.0.0 • Enhanced v1.1.0</p>
              <p className="text-gray-700 mb-4">
                Multi-plan protection with planIds and requireAll props for flexible access control.
              </p>
              <div className="bg-gray-50 rounded p-4 text-sm text-gray-600">
                Demo component will be added here
              </div>
            </div>
          </div>
        </section>

        {/* Pricing & Plans */}
        <section id="pricing">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-purple-600">💵</span>
            Pricing & Plans
          </h2>
          <p className="text-gray-600 mb-8">
            Display subscription plans in cards or tables with customizable fields.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <p className="text-yellow-800">
              <strong>Note:</strong> Demo components for PlanCard and PricingTable (v1.0.11) will
              be added.
            </p>
          </div>
        </section>

        {/* Subscriber Dashboard */}
        <section id="dashboard">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-indigo-600">📊</span>
            Subscriber Dashboard (v1.3.0)
          </h2>
          <p className="text-gray-600 mb-8">
            Complete subscription dashboard with status badges, pagination, and management.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <p className="text-blue-800">
              <strong>✨ New in v1.3.0:</strong> SubscriptionCard and SubscriptionDashboard
              components for complete user subscription management.
            </p>
          </div>
        </section>

        {/* Merchant Dashboard */}
        <section id="merchant">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-red-600">👔</span>
            Merchant Dashboard (v1.4.0)
          </h2>
          <p className="text-gray-600 mb-8">
            Complete merchant overview with revenue metrics, plan list, and subscriber details.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <p className="text-blue-800">
              <strong>✨ New in v1.4.0:</strong> MerchantDashboard component with MRR tracking
              and subscriber management.
            </p>
          </div>
        </section>

        {/* Error Handling & UI */}
        <section id="error-ui">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-orange-600">❌</span>
            Error Handling & UI
          </h2>
          <p className="text-gray-600 mb-8">
            User-friendly error displays, network switching, error boundaries, and loading states.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <p className="text-yellow-800">
              <strong>Note:</strong> Demo components for ErrorDisplay, NetworkSwitchPrompt,
              SubscryptsErrorBoundary (v1.1.0), and UI primitives will be added.
            </p>
          </div>
        </section>

        {/* Summary */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 border border-green-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            All {SDK_COMPONENTS.length} SDK Components
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {SDK_COMPONENTS.map((component) => (
              <div key={component.name} className="bg-white rounded-lg p-3 shadow-sm">
                <p className="font-mono text-sm text-green-600">{component.name}</p>
                <p className="text-xs text-gray-500 mt-1">v{component.version}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Developer Resources */}
        <section className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Developer Resources</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://github.com/Subscrypts/react-sdk/blob/main/docs/components.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              📖 Components API Reference
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
              href="https://github.com/Subscrypts/react-sdk/blob/main/docs/styling.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              🎨 Styling Guide
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
