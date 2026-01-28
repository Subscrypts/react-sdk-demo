/**
 * Developer Documentation for Account Page
 *
 * Documentation shown in sidebar when user is on the account/dashboard page.
 */

import type { PageDocumentation } from '../../types/devDocs';
import { HOOK_EXAMPLES, COMPONENT_EXAMPLES } from '../codeExamples';

export const accountPageDocs: PageDocumentation = {
  pageName: 'Account Dashboard',
  pageDescription:
    'The account page demonstrates subscription management with the v1.3.0 SubscriptionDashboard component, real-time events, and subscription management tools.',
  sections: [
    {
      id: 'subscription-dashboard',
      title: 'SubscriptionDashboard',
      type: 'component',
      version: '1.3.0',
      description:
        'Complete subscription dashboard component with pagination, status badges, and management integration. This is the easiest way to display user subscriptions.',
      code: COMPONENT_EXAMPLES.SubscriptionDashboard,
      props: [
        {
          name: 'pageSize',
          type: 'number',
          required: false,
          default: '10',
          description: 'Number of subscriptions per page',
        },
        {
          name: 'onManage',
          type: '(subscriptionId: string) => void',
          required: false,
          description: 'Callback when user clicks "Manage" button',
        },
        {
          name: 'showPagination',
          type: 'boolean',
          required: false,
          default: 'true',
          description: 'Show pagination controls',
        },
        {
          name: 'emptyMessage',
          type: 'string',
          required: false,
          description: 'Custom message when no subscriptions',
        },
        {
          name: 'emptyComponent',
          type: 'ReactNode',
          required: false,
          description: 'Custom empty state component',
        },
        {
          name: 'compact',
          type: 'boolean',
          required: false,
          default: 'false',
          description: 'Use compact card layout',
        },
      ],
      notes: [
        'Uses useMySubscriptions hook internally',
        'Automatic loading and error states',
        'Built-in pagination UI',
        'Integrates with ManageSubscriptionModal',
        'Displays colored status badges',
      ],
    },
    {
      id: 'my-subscriptions',
      title: 'useMySubscriptions Hook',
      type: 'hook',
      version: '1.3.0',
      description:
        'Fetch paginated list of user subscriptions. Perfect for building custom subscription dashboards.',
      code: HOOK_EXAMPLES.useMySubscriptions,
      props: [
        {
          name: 'address',
          type: 'string',
          required: false,
          description: 'Address to fetch subscriptions for (defaults to connected wallet)',
        },
        {
          name: 'pageSize',
          type: 'number',
          required: false,
          default: '10',
          description: 'Number of subscriptions per page',
        },
      ],
      returnValues: [
        {
          name: 'subscriptions',
          type: 'Subscription[]',
          description: 'Array of subscriptions for current page',
        },
        {
          name: 'isLoading',
          type: 'boolean',
          description: 'Whether data is loading',
        },
        {
          name: 'error',
          type: 'Error | null',
          description: 'Error if fetch failed',
        },
        {
          name: 'hasNext',
          type: 'boolean',
          description: 'Whether next page exists',
        },
        {
          name: 'hasPrev',
          type: 'boolean',
          description: 'Whether previous page exists',
        },
        {
          name: 'nextPage',
          type: '() => void',
          description: 'Go to next page',
        },
        {
          name: 'prevPage',
          type: '() => void',
          description: 'Go to previous page',
        },
        {
          name: 'currentPage',
          type: 'number',
          description: 'Current page number (1-indexed)',
        },
        {
          name: 'totalPages',
          type: 'number',
          description: 'Total number of pages',
        },
      ],
      notes: [
        'Pagination is handled client-side for simplicity',
        'Returns empty array if no subscriptions',
        'Automatically uses connected wallet address if not specified',
      ],
    },
    {
      id: 'manage-subscription',
      title: 'ManageSubscriptionModal',
      type: 'component',
      version: '1.2.0',
      description:
        'Full-featured modal for managing subscriptions: cancel, toggle auto-renewal, update cycles, and view details.',
      code: COMPONENT_EXAMPLES.ManageSubscriptionModal,
      props: [
        {
          name: 'subscriptionId',
          type: 'string',
          required: true,
          description: 'Subscription ID to manage',
        },
        {
          name: 'isOpen',
          type: 'boolean',
          required: true,
          description: 'Control modal visibility',
        },
        {
          name: 'onClose',
          type: '() => void',
          required: true,
          description: 'Close modal callback',
        },
        {
          name: 'onCancel',
          type: '(subscriptionId: string) => void',
          required: false,
          description: 'Callback when subscription is cancelled',
        },
        {
          name: 'onToggleAutoRenew',
          type: '(subscriptionId: string, enabled: boolean) => void',
          required: false,
          description: 'Callback when auto-renewal is toggled',
        },
        {
          name: 'onUpdateCycles',
          type: '(subscriptionId: string, cycles: number) => void',
          required: false,
          description: 'Callback when cycles are updated',
        },
      ],
      notes: [
        'Uses useManageSubscription hook internally',
        'Built-in confirmation dialogs',
        'Shows subscription details and status',
        'Handles transaction errors gracefully',
      ],
    },
    {
      id: 'use-manage-subscription',
      title: 'useManageSubscription Hook',
      type: 'hook',
      version: '1.2.0',
      description:
        'Programmatic subscription management. Cancel subscriptions, toggle auto-renewal, or update cycles.',
      code: HOOK_EXAMPLES.useManageSubscription,
      props: [
        {
          name: 'subscriptionId',
          type: 'string',
          required: true,
          description: 'Subscription ID to manage',
        },
      ],
      returnValues: [
        {
          name: 'cancel',
          type: '() => Promise<void>',
          description: 'Cancel the subscription',
        },
        {
          name: 'toggleAutoRenew',
          type: '() => Promise<void>',
          description: 'Toggle auto-renewal on/off',
        },
        {
          name: 'updateCycles',
          type: '(cycles: number) => Promise<void>',
          description: 'Update remaining cycles',
        },
        {
          name: 'isLoading',
          type: 'boolean',
          description: 'Whether an operation is in progress',
        },
        {
          name: 'error',
          type: 'Error | null',
          description: 'Error if operation failed',
        },
        {
          name: 'subscription',
          type: 'Subscription | null',
          description: 'Current subscription details',
        },
      ],
      notes: [
        'All operations require wallet signature',
        'Gas fees apply to on-chain transactions',
        'Subscription state updates after successful transaction',
      ],
    },
    {
      id: 'real-time-events',
      title: 'useSubscryptsEvents Hook',
      type: 'hook',
      version: '1.3.0',
      description:
        'Real-time protocol event listeners for live dashboard updates. Listen for subscription creation, payments, and cancellations.',
      code: HOOK_EXAMPLES.useSubscryptsEvents,
      props: [
        {
          name: 'callbacks',
          type: 'object',
          required: true,
          description:
            'Event callbacks: { onSubscriptionCreated, onPaymentProcessed, onSubscriptionCancelled, onSubscriptionStopped }',
        },
      ],
      notes: [
        'Uses ethers.js contract.on() under the hood',
        'Automatic cleanup on component unmount',
        'Enables live dashboard updates without polling',
        'No backend required for real-time updates',
        'Events are chain-specific (Arbitrum One)',
      ],
      links: [
        {
          label: 'Event Reference',
          url: 'https://github.com/Subscrypts/react-sdk/blob/main/docs/events.md',
        },
      ],
    },
    {
      id: 'subscription-card',
      title: 'SubscriptionCard',
      type: 'component',
      version: '1.3.0',
      description:
        'Display individual subscription with status badge, dates, amount, frequency, and manage button.',
      code: COMPONENT_EXAMPLES.SubscriptionCard,
      props: [
        {
          name: 'subscription',
          type: 'Subscription',
          required: true,
          description: 'Subscription object to display',
        },
        {
          name: 'onManage',
          type: '(subscriptionId: string) => void',
          required: false,
          description: 'Callback when "Manage" button is clicked',
        },
        {
          name: 'showActions',
          type: 'boolean',
          required: false,
          default: 'true',
          description: 'Show action buttons (Manage)',
        },
        {
          name: 'compact',
          type: 'boolean',
          required: false,
          default: 'false',
          description: 'Use compact layout',
        },
      ],
      notes: [
        'Colored status badges: Active (green), Expired (red), Expiring Soon (yellow), Cancelled (gray)',
        'Shows next payment date, auto-renewal status, remaining cycles',
        'Responsive design',
      ],
    },
  ],
};
