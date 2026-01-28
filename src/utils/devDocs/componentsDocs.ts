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
  ],
};
