/**
 * Developer Documentation for Components Showcase Page
 *
 * Documentation shown in sidebar when user is on the components showcase page.
 */

import type { PageDocumentation } from '../../types/devDocs';
import { SDK_COMPONENTS } from '../../config/sdkFeatures';

export const componentsPageDocs: PageDocumentation = {
  pageName: 'Components Showcase',
  pageDescription:
    `Comprehensive showcase of all ${SDK_COMPONENTS.length} Subscrypts React SDK components with live, interactive examples.`,
  sections: [
    {
      id: 'components-overview',
      title: 'SDK Components Overview',
      type: 'component',
      version: '1.0.0',
      description:
        'The Subscrypts React SDK provides pre-built, production-ready components for subscription management. All components are fully styled and customizable.',
      code: `import {
  SubscryptsButton,
  SubscriptionGuard,
  PlanCard,
  SubscriptionDashboard,
  MerchantDashboard
} from '@subscrypts/react-sdk';

// Import styles (required)
import '@subscrypts/react-sdk/styles';`,
      notes: [
        'Always import the SDK styles: import "@subscrypts/react-sdk/styles"',
        'All components require SubscryptsProvider wrapper',
        'Components are fully accessible (ARIA attributes, keyboard navigation)',
        'Mobile-responsive out of the box',
        'Customizable via className prop',
      ],
      links: [
        {
          label: 'Components API Reference',
          url: 'https://github.com/Subscrypts/react-sdk/blob/main/docs/components.md',
        },
        {
          label: 'Styling Guide',
          url: 'https://github.com/Subscrypts/react-sdk/blob/main/docs/styling.md',
        },
      ],
    },
    {
      id: 'component-categories',
      title: 'Component Categories',
      type: 'component',
      version: '1.0.0',
      description: 'Components are organized by use case:',
      notes: [
        '🛒 Checkout & Subscription: SubscryptsButton, CheckoutWizard',
        '🔒 Content Protection: SubscriptionGuard',
        '💵 Pricing & Plans: PlanCard, PricingTable',
        '📊 Subscriber Dashboard: SubscriptionCard, SubscriptionDashboard',
        '⚙️ Management: ManageSubscriptionModal, ConfirmDialog',
        '👔 Merchant Dashboard: MerchantDashboard',
        '🔌 Wallet: ConnectWalletModal',
        '❌ Error Handling: ErrorDisplay, NetworkSwitchPrompt, SubscryptsErrorBoundary',
        '⏳ UI Primitives: LoadingSpinner',
      ],
    },
    {
      id: 'styling-customization',
      title: 'Styling & Customization',
      type: 'component',
      version: '1.0.0',
      description: 'All components support customization via props and CSS:',
      code: `// Method 1: className prop
<SubscryptsButton
  planId="plan-123"
  className="my-custom-button"
/>

// Method 2: CSS overrides
// Add to your global CSS
.subscrypts-button {
  background-color: #your-brand-color;
  border-radius: 12px;
}

// Method 3: Tailwind CSS
<PlanCard
  planId="plan-123"
  className="shadow-xl hover:shadow-2xl transition-shadow"
/>

// Method 4: Inline styles (via wrapper)
<div style={{ maxWidth: '400px' }}>
  <SubscriptionCard subscription={sub} />
</div>`,
      notes: [
        'All components have consistent CSS class names',
        'Use className prop to add custom classes',
        'SDK styles use CSS variables for easy theming',
        'Components work with Tailwind CSS',
      ],
    },
    {
      id: 'composition-patterns',
      title: 'Component Composition',
      type: 'component',
      version: '1.0.0',
      description: 'Components can be composed for custom layouts:',
      code: `// Custom pricing page
function PricingPage() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {planIds.map(planId => (
        <div key={planId} className="flex flex-col">
          <PlanCard planId={planId} />
          <SubscryptsButton
            planId={planId}
            className="mt-4"
          />
        </div>
      ))}
    </div>
  );
}

// Custom dashboard
function CustomDashboard() {
  const { subscriptions } = useMySubscriptions();

  return (
    <div className="space-y-4">
      {subscriptions.map(sub => (
        <div key={sub.id} className="card">
          <SubscriptionCard subscription={sub} />
          <button onClick={() => openModal(sub.id)}>
            Manage
          </button>
        </div>
      ))}
    </div>
  );
}`,
      notes: [
        'Mix SDK components with your own UI components',
        'Use hooks to fetch data and components to display',
        'Create custom layouts with flexbox/grid',
      ],
    },
    {
      id: 'accessibility',
      title: 'Accessibility Features',
      type: 'component',
      version: '1.0.0',
      description: 'All components follow accessibility best practices:',
      notes: [
        'Semantic HTML elements (button, nav, dialog, etc.)',
        'ARIA attributes (aria-label, aria-expanded, aria-hidden)',
        'Keyboard navigation (Tab, Enter, Escape)',
        'Focus management (modals trap focus)',
        'Screen reader support',
        'Color contrast (WCAG AA compliant)',
      ],
    },
    {
      id: 'responsive-design',
      title: 'Responsive Design',
      type: 'component',
      version: '1.0.0',
      description: 'Components adapt to different screen sizes:',
      notes: [
        'Mobile-first design approach',
        'Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)',
        'Touch-friendly buttons and interactive elements',
        'Horizontal scrolling for tables on mobile',
        'Modal components use full-screen on mobile',
        'Grid layouts adjust columns automatically',
      ],
    },
    {
      id: 'error-states',
      title: 'Error Handling',
      type: 'component',
      version: '1.0.0',
      description: 'Components handle errors gracefully:',
      code: `// Components show error states automatically
<PlanCard planId="invalid-plan" />
// Shows: "Plan not found" message

// Custom error handling
<SubscriptionGuard
  planId="plan-123"
  errorComponent={<CustomError />}
  fallback={<SubscribePrompt />}
>
  <Content />
</SubscriptionGuard>

// Error boundaries
<SubscryptsErrorBoundary
  fallback={(error, reset) => (
    <div>
      <p>Error: {error.message}</p>
      <button onClick={reset}>Try Again</button>
    </div>
  )}
>
  <YourApp />
</SubscryptsErrorBoundary>`,
      notes: [
        'Most components show inline error messages',
        'Use ErrorDisplay component for consistent error UI',
        'Wrap components in SubscryptsErrorBoundary for app-level errors',
        'Network errors show retry buttons',
      ],
    },
    // Additional component documentation for components shown in demo
    {
      id: 'checkout-wizard',
      title: 'CheckoutWizard Component',
      type: 'component',
      version: '1.0.0',
      description: 'Standalone multi-step checkout modal with full transaction tracking and status updates.',
      code: `import { CheckoutWizard, useSubscriptionStatus } from '@subscrypts/react-sdk';

function CustomPricing() {
  const [showCheckout, setShowCheckout] = useState(false);
  const { isActive } = useSubscriptionStatus('plan-123');

  return (
    <div>
      <button onClick={() => setShowCheckout(true)}>
        Subscribe Now
      </button>

      {showCheckout && (
        <CheckoutWizard
          planId="plan-123"
          paymentMethod="SUBS"
          onSuccess={(receipt) => {
            console.log('Subscribed!', receipt);
            setShowCheckout(false);
          }}
          onCancel={() => setShowCheckout(false)}
          onError={(error) => {
            console.error('Failed:', error);
          }}
        />
      )}
    </div>
  );
}`,
      notes: [
        'v1.0.0 feature',
        'Full transaction flow in a modal',
        'Payment method selection (SUBS or USDC)',
        'Real-time transaction status updates',
        'Handles approval, transfer, subscription creation',
        'Customizable onSuccess, onCancel, onError callbacks',
      ],
    },
    {
      id: 'plan-card-pricing',
      title: 'PlanCard & PricingTable Components',
      type: 'component',
      version: '1.0.11',
      description: 'Display subscription plans with pricing information and feature lists.',
      code: `import { PlanCard, PricingTable } from '@subscrypts/react-sdk';

// Single plan card
<PlanCard
  planId="plan-123"
  className="my-custom-card"
  showFields={['name', 'price', 'features']} // Control displayed fields
/>

// Pricing table with multiple plans
<PricingTable
  planIds={['plan-1', 'plan-2', 'plan-3']}
  columns={3}
  highlightRecommended={true}
  className="my-pricing-grid"
/>`,
      notes: [
        'v1.0.11 feature',
        'PlanCard displays individual plan details',
        'PricingTable shows multiple plans in a grid',
        'Configurable fields with showFields prop',
        'Automatic USD conversion when price available',
        'Highlight recommended plan with badge',
      ],
    },
    {
      id: 'subscription-dashboard',
      title: 'Subscription Dashboard Components',
      type: 'component',
      version: '1.3.0',
      description: 'Complete subscriber dashboard with subscription cards and management interface.',
      code: `import {
  SubscriptionDashboard,
  SubscriptionCard,
  ManageSubscriptionModal
} from '@subscrypts/react-sdk';

// Full dashboard with pagination
<SubscriptionDashboard
  pageSize={10}
  showActions={true}
  onSubscriptionClick={(sub) => console.log(sub)}
/>

// Individual subscription card
<SubscriptionCard
  subscription={subscription}
  showActions={true}
  className="my-card"
/>

// Management modal
const [selectedSub, setSelectedSub] = useState(null);

{selectedSub && (
  <ManageSubscriptionModal
    subscription={selectedSub}
    isOpen={true}
    onClose={() => setSelectedSub(null)}
    onUpdated={() => {
      // Refresh data
      refetch();
    }}
  />
)}`,
      notes: [
        'v1.3.0 feature - Dashboard components',
        'SubscriptionDashboard: Complete paginated dashboard',
        'SubscriptionCard: Individual subscription display',
        'ManageSubscriptionModal: Cancel, toggle auto-renewal',
        'Status badges (active, expired, cancelled)',
        'Next payment dates and auto-renewal indicators',
      ],
    },
    {
      id: 'merchant-dashboard',
      title: 'MerchantDashboard Component',
      type: 'component',
      version: '1.4.0',
      description: 'Complete merchant dashboard for managing subscription business with MRR tracking and subscriber lists.',
      code: `import { MerchantDashboard } from '@subscrypts/react-sdk';

// Full merchant dashboard
<MerchantDashboard
  planIds={['plan-1', 'plan-2']} // Filter by specific plans
  showRevenue={true}
  showSubscribers={true}
  showPlans={true}
  refreshInterval={60000} // Auto-refresh every minute
/>`,
      notes: [
        'v1.4.0 feature - Merchant toolkit',
        'Monthly Recurring Revenue (MRR) calculation',
        'Active subscriber count per plan',
        'Subscriber list with pagination',
        'Plan performance overview',
        'Uses useMerchantPlans, useMerchantSubscribers, useMerchantRevenue hooks',
      ],
    },
    {
      id: 'network-switch',
      title: 'NetworkSwitchPrompt Component',
      type: 'component',
      version: '1.1.0',
      description: 'Automatic network detection and switching for wrong network scenarios.',
      code: `import { NetworkSwitchPrompt, useWallet } from '@subscrypts/react-sdk';

function NetworkGuard({ children }) {
  const { chainId, isConnected } = useWallet();

  // Only show if connected to wrong network
  if (isConnected && chainId !== 42161) {
    return (
      <div className="network-error">
        <NetworkSwitchPrompt
          currentChainId={chainId}
          targetChainId={42161}
          targetNetworkName="Arbitrum One"
          onSwitch={(success) => {
            if (success) console.log('Network switched!');
          }}
          autoSwitch={true} // Attempt auto-switch first
        />
      </div>
    );
  }

  return children;
}`,
      notes: [
        'v1.1.0 feature',
        'Detects wrong network automatically',
        'Shows current and target network info',
        'One-click network switching',
        'Auto-switch attempts first (if supported by wallet)',
        'Clear error messaging for users',
      ],
    },
    {
      id: 'error-display',
      title: 'ErrorDisplay Component',
      type: 'component',
      version: '1.1.0',
      description: 'Context-aware error display with actionable messages and retry options.',
      code: `import { ErrorDisplay, SubscryptsErrorBoundary } from '@subscrypts/react-sdk';

// Inline error display
<ErrorDisplay
  error={error}
  onRetry={() => refetch()}
  showDetails={true} // Show technical details (dev mode)
/>

// With error boundary
<SubscryptsErrorBoundary
  fallback={(error, resetError) => (
    <div className="error-page">
      <h1>Something went wrong</h1>
      <ErrorDisplay error={error} onRetry={resetError} />
    </div>
  )}
>
  <App />
</SubscryptsErrorBoundary>`,
      notes: [
        'v1.1.0 feature',
        'Context-aware error messages',
        'Automatic error code mapping',
        'Retry button with loading state',
        'Collapsible technical details',
        'User-friendly vs technical messaging',
      ],
    },
    {
      id: 'confirm-dialog',
      title: 'ConfirmDialog Component',
      type: 'component',
      version: '1.2.0',
      description: 'Reusable confirmation dialog for destructive actions like subscription cancellation.',
      code: `import { ConfirmDialog } from '@subscrypts/react-sdk';
import { useState } from 'react';

function CancelButton({ subscription }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { cancelSubscription } = useManageSubscription();

  return (
    <>
      <button onClick={() => setShowConfirm(true)}>
        Cancel Subscription
      </button>

      <ConfirmDialog
        isOpen={showConfirm}
        title="Cancel Subscription?"
        message="You will lose access to premium content immediately. This action cannot be undone."
        confirmText="Yes, Cancel"
        cancelText="Keep Subscription"
        confirmVariant="danger"
        onConfirm={async () => {
          await cancelSubscription(subscription.id);
          setShowConfirm(false);
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}`,
      notes: [
        'v1.2.0 feature',
        'Accessible modal with focus trap',
        'Customizable title, message, and buttons',
        'Button variants (primary, danger, secondary)',
        'Async confirm handler support',
        'Keyboard navigation (Enter to confirm, Escape to cancel)',
      ],
    },
    {
      id: 'loading-spinner',
      title: 'LoadingSpinner Component',
      type: 'component',
      version: '1.0.0',
      description: 'Accessible loading indicator with size variants and color customization.',
      code: `import { LoadingSpinner } from '@subscrypts/react-sdk';

// Size variants
<LoadingSpinner size="sm" />  // Small
<LoadingSpinner size="md" />  // Medium (default)
<LoadingSpinner size="lg" />  // Large

// Custom styling
<LoadingSpinner
  size="md"
  className="text-blue-600"
/>

// With loading text
<div className="flex items-center gap-2">
  <LoadingSpinner size="sm" />
  <span>Loading plans...</span>
</div>`,
      notes: [
        'v1.0.0 feature',
        'Three size variants: sm, md, lg',
        'Accessible with aria-label',
        'Customizable via className',
        'CSS animation for smooth spinning',
        'Works with Tailwind CSS color utilities',
      ],
    },
  ],
};
