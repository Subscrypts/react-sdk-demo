/**
 * Components Showcase Page
 *
 * Comprehensive showcase of all Subscrypts React SDK components.
 */

import { SDK_COMPONENTS } from '../../config/sdkFeatures';
import { DemoSection } from '../../components/examples/shared';
import {
  SubscryptsButtonDemo,
  SubscriptionGuardDemo,
  PlanCardDemo,
  SubscriptionCardDemo,
  SubscriptionDashboardDemo,
  MerchantDashboardDemo,
  CheckoutWizardDemo,
  PricingTableDemo,
  ManageSubscriptionModalDemo,
  ConfirmDialogDemo,
  ErrorDisplayDemo,
  NetworkSwitchPromptDemo,
  UIComponentsDemo,
} from '../../components/examples/components';

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
        <DemoSection
          id="checkout"
          title="🛒 Checkout & Subscription"
          description="One-click subscription buttons and full checkout wizard for seamless subscription flows."
        >
          <div className="space-y-8">
            <SubscryptsButtonDemo />
            <CheckoutWizardDemo />
          </div>
        </DemoSection>

        {/* Content Protection */}
        <DemoSection
          id="protection"
          title="🔒 Content Protection"
          description="Gate content based on subscription status with flexible access control."
        >
          <SubscriptionGuardDemo />
        </DemoSection>

        {/* Pricing & Plans */}
        <DemoSection
          id="pricing"
          title="💵 Pricing & Plans (v1.0.11)"
          description="Display subscription plans in cards or tables with customizable fields."
        >
          <div className="space-y-8">
            <PlanCardDemo />
            <PricingTableDemo />
          </div>
        </DemoSection>

        {/* Subscriber Dashboard */}
        <DemoSection
          id="dashboard"
          title="📊 Subscriber Dashboard (v1.3.0)"
          description="Complete subscription dashboard with status badges, pagination, and management."
        >
          <div className="space-y-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-800">
                <strong>✨ New in v1.3.0:</strong> SubscriptionCard and SubscriptionDashboard
                components for complete user subscription management.
              </p>
            </div>

            <SubscriptionCardDemo />
            <SubscriptionDashboardDemo />
            <ManageSubscriptionModalDemo />
            <ConfirmDialogDemo />
          </div>
        </DemoSection>

        {/* Merchant Dashboard */}
        <DemoSection
          id="merchant"
          title="👔 Merchant Dashboard (v1.4.0)"
          description="Complete merchant overview with revenue metrics, plan list, and subscriber details."
        >
          <div className="space-y-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-800">
                <strong>✨ New in v1.4.0:</strong> MerchantDashboard component with MRR tracking
                and subscriber management.
              </p>
            </div>

            <MerchantDashboardDemo />
          </div>
        </DemoSection>

        {/* Error Handling & UI */}
        <DemoSection
          id="error-ui"
          title="❌ Error Handling & UI (v1.1.0)"
          description="User-friendly error displays, network switching, error boundaries, and loading states."
        >
          <div className="space-y-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-800">
                <strong>✨ New in v1.1.0:</strong> ErrorDisplay and NetworkSwitchPrompt components
                for better user experience and error handling.
              </p>
            </div>

            <ErrorDisplayDemo />
            <NetworkSwitchPromptDemo />
            <UIComponentsDemo />
          </div>
        </DemoSection>

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
