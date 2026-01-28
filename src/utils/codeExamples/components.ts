/**
 * Code Examples for SDK Components
 *
 * Copy-pasteable examples for all Subscrypts React SDK components.
 * These examples are displayed in the developer documentation sidebar.
 */

export const COMPONENT_EXAMPLES = {
  // Checkout & Subscription
  SubscryptsButton: `import { SubscryptsButton } from '@subscrypts/react-sdk';

function PlanCard({ planId }: { planId: string }) {
  return (
    <div>
      <h3>Premium Plan</h3>
      <p>$9.99/month</p>

      {/* Basic usage */}
      <SubscryptsButton planId={planId} />

      {/* Custom variant and size */}
      <SubscryptsButton
        planId={planId}
        variant="outline"
        size="lg"
      />

      {/* Custom text and payment method */}
      <SubscryptsButton
        planId={planId}
        text="Subscribe Now"
        paymentMethod="usdc"
      />

      {/* With referral and cycles */}
      <SubscryptsButton
        planId={planId}
        cycles={12}
        referralAddress="0x..."
        onSuccess={(tx) => console.log('Success:', tx)}
        onError={(err) => console.error('Error:', err)}
      />

      {/* Disabled state */}
      <SubscryptsButton
        planId={planId}
        disabled={true}
      />
    </div>
  );
}`,

  CheckoutWizard: `import { CheckoutWizard } from '@subscrypts/react-sdk';
import { useState } from 'react';

function CustomCheckout({ planId }: { planId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Start Checkout
      </button>

      <CheckoutWizard
        planId={planId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={(transactionHash) => {
          console.log('Transaction:', transactionHash);
          alert('Subscription successful!');
          setIsOpen(false);
        }}
        onError={(error) => {
          console.error('Checkout error:', error);
        }}
        paymentMethod="subs"
        cycles={1}
        referralAddress="0x..." // optional
      />
    </div>
  );
}`,

  // Content Protection
  SubscriptionGuard: `import { SubscriptionGuard } from '@subscrypts/react-sdk';

// Single plan protection
function PremiumContent() {
  return (
    <SubscriptionGuard
      planId="plan-123"
      fallback={
        <div>
          <h2>Premium Content</h2>
          <p>Subscribe to access this content</p>
          <button>Subscribe Now</button>
        </div>
      }
    >
      <div>
        <h2>Premium Content</h2>
        <p>This is protected content only for subscribers!</p>
      </div>
    </SubscriptionGuard>
  );
}

// Multi-plan protection (any-of)
function MultiTierContent() {
  return (
    <SubscriptionGuard
      planIds={['plan-basic', 'plan-premium', 'plan-enterprise']}
      fallback={<p>Subscribe to any plan to access</p>}
    >
      <p>Content available to all subscribers</p>
    </SubscriptionGuard>
  );
}

// Multi-plan protection (all-of)
function ExclusiveContent() {
  return (
    <SubscriptionGuard
      planIds={['plan-premium', 'plan-addon']}
      requireAll={true}
      fallback={<p>Requires both Premium and Add-on subscriptions</p>}
    >
      <p>Exclusive content for premium + addon subscribers</p>
    </SubscriptionGuard>
  );
}

// Custom loading and error states
function CustomGuard() {
  return (
    <SubscriptionGuard
      planId="plan-123"
      loadingComponent={<p>Checking your subscription...</p>}
      errorComponent={<p>Error checking subscription status</p>}
      fallback={<p>Please subscribe</p>}
    >
      <p>Protected content</p>
    </SubscriptionGuard>
  );
}`,

  // Pricing & Plans
  PlanCard: `import { PlanCard } from '@subscrypts/react-sdk';

function PricingSection() {
  return (
    <div>
      {/* Basic plan card */}
      <PlanCard planId="plan-123" />

      {/* Customized display */}
      <PlanCard
        planId="plan-123"
        showFields={{
          name: true,
          description: true,
          price: true,
          frequency: true,
          merchantAddress: false,
          subscriberCount: true,
          features: true
        }}
      />

      {/* With custom action button */}
      <PlanCard
        planId="plan-123"
        actionButton={
          <button className="custom-btn">
            Get Started
          </button>
        }
      />

      {/* Highlighted plan */}
      <PlanCard
        planId="plan-123"
        highlighted={true}
        highlightLabel="Most Popular"
      />
    </div>
  );
}`,

  PricingTable: `import { PricingTable } from '@subscrypts/react-sdk';

function Pricing() {
  const planIds = ['plan-basic', 'plan-premium', 'plan-enterprise'];

  return (
    <div>
      {/* Basic pricing table */}
      <PricingTable planIds={planIds} />

      {/* Customized layout */}
      <PricingTable
        planIds={planIds}
        columns={3}
        gap="lg"
        highlightIndex={1} // Highlight middle plan
      />

      {/* With custom action buttons */}
      <PricingTable
        planIds={planIds}
        renderAction={(planId) => (
          <button onClick={() => console.log('Selected:', planId)}>
            Choose Plan
          </button>
        )}
      />

      {/* Responsive grid */}
      <PricingTable
        planIds={planIds}
        responsive={{
          mobile: 1,
          tablet: 2,
          desktop: 3
        }}
      />
    </div>
  );
}`,

  // Subscriber Dashboard
  SubscriptionCard: `import { SubscriptionCard } from '@subscrypts/react-sdk';

function MySubscriptions({ subscriptions }) {
  return (
    <div>
      {subscriptions.map(sub => (
        <SubscriptionCard
          key={sub.id}
          subscription={sub}
          onManage={(subId) => {
            console.log('Managing subscription:', subId);
            // Open management modal
          }}
          showActions={true}
          compact={false}
        />
      ))}

      {/* Compact view */}
      <SubscriptionCard
        subscription={subscriptions[0]}
        compact={true}
        showActions={false}
      />
    </div>
  );
}`,

  SubscriptionDashboard: `import { SubscriptionDashboard } from '@subscrypts/react-sdk';

function AccountPage() {
  return (
    <div>
      <h1>My Account</h1>

      {/* Complete dashboard with all features */}
      <SubscriptionDashboard
        pageSize={10}
        onManage={(subscriptionId) => {
          console.log('Manage:', subscriptionId);
        }}
        showPagination={true}
        emptyMessage="You don't have any subscriptions yet"
      />

      {/* Compact dashboard */}
      <SubscriptionDashboard
        pageSize={5}
        compact={true}
      />

      {/* Custom empty state */}
      <SubscriptionDashboard
        emptyComponent={
          <div>
            <h2>No Subscriptions</h2>
            <p>Browse our plans to get started</p>
            <button>View Plans</button>
          </div>
        }
      />
    </div>
  );
}`,

  // Management
  ManageSubscriptionModal: `import { ManageSubscriptionModal } from '@subscrypts/react-sdk';
import { useState } from 'react';

function SubscriptionManager({ subscriptionId }: { subscriptionId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Manage Subscription
      </button>

      <ManageSubscriptionModal
        subscriptionId={subscriptionId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCancel={(subId) => {
          console.log('Cancelled:', subId);
          alert('Subscription cancelled');
          setIsOpen(false);
        }}
        onToggleAutoRenew={(subId, enabled) => {
          console.log('Auto-renew toggled:', subId, enabled);
        }}
        onUpdateCycles={(subId, cycles) => {
          console.log('Cycles updated:', subId, cycles);
        }}
      />
    </div>
  );
}`,

  ConfirmDialog: `import { ConfirmDialog } from '@subscrypts/react-sdk';
import { useState } from 'react';

function DangerousAction() {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    console.log('Action confirmed');
    // Perform dangerous action
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Delete Account
      </button>

      {/* Danger variant */}
      <ConfirmDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
        title="Delete Account?"
        message="This action cannot be undone. All your data will be permanently deleted."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />

      {/* Default variant */}
      <ConfirmDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => console.log('Confirmed')}
        title="Confirm Action"
        message="Are you sure you want to proceed?"
      />
    </div>
  );
}`,

  // Merchant Dashboard
  MerchantDashboard: `import { MerchantDashboard } from '@subscrypts/react-sdk';

function MerchantPage() {
  return (
    <div>
      <h1>Merchant Dashboard</h1>

      {/* Complete merchant dashboard */}
      <MerchantDashboard
        onPlanSelect={(planId) => {
          console.log('Selected plan:', planId);
        }}
        showRevenue={true}
        showSubscribers={true}
        subscribersPageSize={10}
      />

      {/* Revenue-only view */}
      <MerchantDashboard
        showRevenue={true}
        showSubscribers={false}
      />

      {/* Custom empty state */}
      <MerchantDashboard
        emptyPlansMessage="You haven't created any plans yet"
        emptySubscribersMessage="No subscribers yet"
      />
    </div>
  );
}`,

  // Wallet
  ConnectWalletModal: `import { ConnectWalletModal } from '@subscrypts/react-sdk';
import { useState } from 'react';

function WalletConnect() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Connect Wallet
      </button>

      <ConnectWalletModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConnect={(address) => {
          console.log('Connected:', address);
          setIsOpen(false);
        }}
        onError={(error) => {
          console.error('Connection error:', error);
        }}
        title="Connect Your Wallet"
        description="Choose a wallet provider to connect"
      />
    </div>
  );
}`,

  // Error Handling
  ErrorDisplay: `import { ErrorDisplay } from '@subscrypts/react-sdk';

function TransactionFlow() {
  const [error, setError] = useState<Error | null>(null);

  return (
    <div>
      {/* Compact error display */}
      {error && (
        <ErrorDisplay
          error={error}
          mode="compact"
          onDismiss={() => setError(null)}
        />
      )}

      {/* Full error display with retry */}
      {error && (
        <ErrorDisplay
          error={error}
          mode="full"
          onRetry={() => {
            console.log('Retrying...');
            setError(null);
          }}
          showStackTrace={false}
        />
      )}

      {/* Context-aware error (transaction) */}
      {error && (
        <ErrorDisplay
          error={error}
          context="transaction"
          showUserActions={true}
        />
      )}

      {/* Custom styling */}
      {error && (
        <ErrorDisplay
          error={error}
          className="custom-error"
          variant="danger"
        />
      )}
    </div>
  );
}`,

  NetworkSwitchPrompt: `import { NetworkSwitchPrompt } from '@subscrypts/react-sdk';
import { useWallet } from '@subscrypts/react-sdk';

function NetworkGuard() {
  const { chainId, switchNetwork } = useWallet();
  const isWrongNetwork = chainId !== 42161; // Arbitrum One

  if (!isWrongNetwork) {
    return <YourApp />;
  }

  return (
    <NetworkSwitchPrompt
      currentChainId={chainId}
      targetChainId={42161}
      onSwitch={switchNetwork}
      message="Please switch to Arbitrum One to continue"
      autoSwitch={false}
    />
  );
}`,

  SubscryptsErrorBoundary: `import { SubscryptsErrorBoundary } from '@subscrypts/react-sdk';

function App() {
  return (
    <SubscryptsErrorBoundary
      fallback={(error, resetError) => (
        <div>
          <h1>Something went wrong</h1>
          <p>{error.message}</p>
          <button onClick={resetError}>Try Again</button>
        </div>
      )}
      onError={(error, errorInfo) => {
        console.error('SDK Error:', error);
        console.error('Error Info:', errorInfo);
        // Send to error tracking service
      }}
    >
      <YourApp />
    </SubscryptsErrorBoundary>
  );
}

// Wrap specific sections
function ProtectedSection() {
  return (
    <SubscryptsErrorBoundary>
      <SubscriptionGuard planId="plan-123">
        <PremiumContent />
      </SubscriptionGuard>
    </SubscryptsErrorBoundary>
  );
}`,

  // UI Primitives
  LoadingSpinner: `import { LoadingSpinner } from '@subscrypts/react-sdk';

function LoadingStates() {
  return (
    <div>
      {/* Default spinner */}
      <LoadingSpinner />

      {/* Different sizes */}
      <LoadingSpinner size="sm" />
      <LoadingSpinner size="md" />
      <LoadingSpinner size="lg" />

      {/* Custom color */}
      <LoadingSpinner color="primary" />
      <LoadingSpinner color="secondary" />

      {/* With text */}
      <LoadingSpinner text="Loading..." />

      {/* Centered in container */}
      <div className="container">
        <LoadingSpinner centered={true} />
      </div>

      {/* Full screen overlay */}
      <LoadingSpinner
        overlay={true}
        text="Processing transaction..."
      />
    </div>
  );
}`,
};
