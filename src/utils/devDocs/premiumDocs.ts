/**
 * Developer Documentation for Premium Page
 *
 * Documentation shown in sidebar when user is on the premium (protected content) page.
 */

import type { PageDocumentation } from '../../types/devDocs';
import { COMPONENT_EXAMPLES } from '../codeExamples/components';

export const premiumPageDocs: PageDocumentation = {
  pageName: 'Premium Content',
  pageDescription:
    'The premium page demonstrates content protection with SubscriptionGuard, which gates content based on subscription status.',
  sections: [
    {
      id: 'subscription-guard',
      title: 'SubscriptionGuard',
      type: 'component',
      version: '1.0.0',
      description:
        'The SubscriptionGuard component protects content by checking subscription status. It automatically hides/shows content based on whether the user has an active subscription.',
      code: COMPONENT_EXAMPLES.SubscriptionGuard,
      props: [
        {
          name: 'planId',
          type: 'string',
          required: false,
          description: 'Single plan ID to check (use this OR planIds)',
        },
        {
          name: 'planIds',
          type: 'string[]',
          required: false,
          description: 'Multiple plan IDs to check (v1.1.0+)',
        },
        {
          name: 'requireAll',
          type: 'boolean',
          required: false,
          default: 'false',
          description:
            'When using planIds: false = any subscription grants access, true = all subscriptions required (v1.1.0+)',
        },
        {
          name: 'fallback',
          type: 'ReactNode',
          required: true,
          description: 'Content to show when subscription is inactive (e.g., subscribe prompt)',
        },
        {
          name: 'loadingComponent',
          type: 'ReactNode',
          required: false,
          description: 'Custom loading component while checking subscription',
        },
        {
          name: 'errorComponent',
          type: 'ReactNode',
          required: false,
          description: 'Custom error component if check fails',
        },
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          description: 'Protected content to show when subscription is active',
        },
      ],
      examples: [
        {
          title: 'Single Plan Protection',
          code: `<SubscriptionGuard
  planId="plan-123"
  fallback={<p>Subscribe to access this content</p>}
>
  <PremiumContent />
</SubscriptionGuard>`,
          description: 'Protect content with a single subscription plan',
        },
        {
          title: 'Multi-Plan Protection (Any-Of)',
          code: `<SubscriptionGuard
  planIds={['plan-basic', 'plan-premium', 'plan-enterprise']}
  fallback={<p>Subscribe to any plan to access</p>}
>
  <SharedContent />
</SubscriptionGuard>`,
          description: 'Allow access with any of multiple plans',
        },
        {
          title: 'Multi-Plan Protection (All-Of)',
          code: `<SubscriptionGuard
  planIds={['plan-premium', 'plan-addon']}
  requireAll={true}
  fallback={<p>Requires Premium + Add-on</p>}
>
  <ExclusiveContent />
</SubscriptionGuard>`,
          description: 'Require all specified subscriptions',
        },
        {
          title: 'Custom Loading/Error States',
          code: `<SubscriptionGuard
  planId="plan-123"
  loadingComponent={<Spinner />}
  errorComponent={<ErrorMessage />}
  fallback={<SubscribePrompt />}
>
  <ProtectedContent />
</SubscriptionGuard>`,
          description: 'Customize loading and error states',
        },
      ],
      notes: [
        'Automatically checks subscription status using useSubscriptionStatus hook',
        'Supports multiple plans with flexible access control (v1.1.0+)',
        'Shows loading state while checking subscription',
        'Handles errors gracefully with error component',
        'Useful for courses, premium articles, member-only features, etc.',
      ],
      links: [
        {
          label: 'Component API',
          url: 'https://github.com/Subscrypts/react-sdk/blob/main/docs/components.md#subscriptionguard',
        },
      ],
    },
    {
      id: 'subscription-status',
      title: 'useSubscriptionStatus Hook',
      type: 'hook',
      version: '1.0.0',
      description:
        'The useSubscriptionStatus hook checks subscription status for a specific plan. SubscriptionGuard uses this hook internally.',
      code: `import { useSubscriptionStatus } from '@subscrypts/react-sdk';

function ContentGate({ planId }: { planId: string }) {
  const {
    isActive,
    subscription,
    isLoading,
    error,
    refetch
  } = useSubscriptionStatus(planId);

  if (isLoading) return <p>Checking...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (isActive && subscription) {
    return (
      <div>
        <p>✓ Active Subscription</p>
        <p>Next Payment: {new Date(subscription.nextPaymentDate * 1000).toLocaleDateString()}</p>
        <PremiumContent />
      </div>
    );
  }

  return <SubscribePrompt planId={planId} />;
}`,
      props: [
        {
          name: 'planId',
          type: 'string',
          required: true,
          description: 'Plan ID to check subscription status for',
        },
      ],
      returnValues: [
        {
          name: 'isActive',
          type: 'boolean',
          description: 'Whether user has active subscription for this plan',
        },
        {
          name: 'subscription',
          type: 'Subscription | null',
          description: 'Full subscription object if active',
        },
        {
          name: 'isLoading',
          type: 'boolean',
          description: 'Whether status check is in progress',
        },
        {
          name: 'error',
          type: 'Error | null',
          description: 'Error if status check failed',
        },
        {
          name: 'refetch',
          type: '() => Promise<void>',
          description: 'Manually refetch subscription status',
        },
      ],
      notes: [
        'Checks connected wallet address automatically',
        'Returns null subscription if not subscribed',
        'Use refetch to manually check status after subscription',
      ],
    },
    {
      id: 'access-helpers',
      title: 'Access Control Utilities',
      type: 'utility',
      version: '1.2.0',
      description:
        'Utility functions for fine-grained access control decisions based on subscription status.',
      code: `import {
  canAccess,
  isPaymentDue,
  shouldRenew,
  getSubscriptionHealth
} from '@subscrypts/react-sdk';

const subscription = {
  id: '123',
  status: 'active',
  nextPaymentDate: Math.floor(Date.now() / 1000) + 86400,
  autoRenewing: true,
  remainingCycles: 5
};

// Check if user can access content
const hasAccess = canAccess(subscription);
console.log('Has access:', hasAccess); // true

// Check if payment is overdue
const due = isPaymentDue(subscription);
console.log('Payment due:', due); // false

// Check if should auto-renew
const renew = shouldRenew(subscription);
console.log('Will renew:', renew); // false (not due yet)

// Get comprehensive health check
const health = getSubscriptionHealth(subscription);
console.log('Health:', health);
/*
{
  hasAccess: true,
  isPaymentDue: false,
  shouldRenew: false,
  expiresIn: 86400,
  status: 'active',
  concerns: []
}
*/`,
      notes: [
        'Pure utility functions (no hooks)',
        'Can be used in Node.js scripts or AI agents',
        'Useful for custom access control logic',
        'v1.2.0+ feature',
      ],
    },
  ],
};
