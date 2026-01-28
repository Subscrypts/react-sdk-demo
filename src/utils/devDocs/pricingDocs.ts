/**
 * Developer Documentation for Pricing Page
 *
 * Documentation shown in sidebar when user is on the pricing page.
 */

import type { PageDocumentation } from '../../types/devDocs';
import { COMPONENT_EXAMPLES } from '../codeExamples/components';

export const pricingPageDocs: PageDocumentation = {
  pageName: 'Pricing',
  pageDescription:
    'The pricing page demonstrates one-click subscriptions with SubscryptsButton and plan display components.',
  sections: [
    {
      id: 'subscrypts-button',
      title: 'SubscryptsButton',
      type: 'component',
      version: '1.0.0',
      description:
        'The SubscryptsButton component provides a one-click subscription flow with built-in checkout wizard, payment processing, and transaction tracking.',
      code: COMPONENT_EXAMPLES.SubscryptsButton,
      props: [
        {
          name: 'planId',
          type: 'string',
          required: true,
          description: 'The ID of the subscription plan to subscribe to',
        },
        {
          name: 'variant',
          type: '"primary" | "outline"',
          required: false,
          default: '"primary"',
          description: 'Visual style variant of the button',
        },
        {
          name: 'size',
          type: '"sm" | "md" | "lg"',
          required: false,
          default: '"md"',
          description: 'Button size',
        },
        {
          name: 'text',
          type: 'string',
          required: false,
          default: '"Subscribe"',
          description: 'Button text',
        },
        {
          name: 'paymentMethod',
          type: '"subs" | "usdc"',
          required: false,
          description: 'Pre-select payment method (user can still change)',
        },
        {
          name: 'cycles',
          type: 'number',
          required: false,
          default: '1',
          description: 'Number of billing cycles to subscribe for',
        },
        {
          name: 'referralAddress',
          type: 'string',
          required: false,
          description: 'Referral address to credit for this subscription',
        },
        {
          name: 'onSuccess',
          type: '(txHash: string) => void',
          required: false,
          description: 'Callback when subscription succeeds',
        },
        {
          name: 'onError',
          type: '(error: Error) => void',
          required: false,
          description: 'Callback when subscription fails',
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          default: 'false',
          description: 'Disable the button',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes',
        },
      ],
      notes: [
        'Automatically opens CheckoutWizard modal when clicked',
        'Handles wallet connection if not connected',
        'Shows loading state during transaction',
        'Supports both SUBS and USDC payments',
        'Transaction is tracked on Arbiscan',
      ],
      links: [
        {
          label: 'Component API',
          url: 'https://github.com/Subscrypts/react-sdk/blob/main/docs/components.md#subscryptsbutton',
        },
      ],
    },
    {
      id: 'plan-card',
      title: 'PlanCard',
      type: 'component',
      version: '1.0.11',
      description:
        'The PlanCard component displays subscription plan details in a configurable card layout. Perfect for pricing pages.',
      code: COMPONENT_EXAMPLES.PlanCard,
      props: [
        {
          name: 'planId',
          type: 'string',
          required: true,
          description: 'The ID of the plan to display',
        },
        {
          name: 'showFields',
          type: 'object',
          required: false,
          description:
            'Configure which fields to display: { name, description, price, frequency, merchantAddress, subscriberCount, features }',
        },
        {
          name: 'actionButton',
          type: 'ReactNode',
          required: false,
          description: 'Custom action button (replaces default Subscribe button)',
        },
        {
          name: 'highlighted',
          type: 'boolean',
          required: false,
          default: 'false',
          description: 'Highlight this plan (e.g., "Most Popular")',
        },
        {
          name: 'highlightLabel',
          type: 'string',
          required: false,
          description: 'Label for highlighted plans',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes',
        },
      ],
      notes: [
        'Automatically fetches plan data using usePlan hook',
        'Shows loading skeleton while fetching',
        'Displays error state if plan not found',
        'Customizable field visibility',
      ],
    },
    {
      id: 'pricing-table',
      title: 'PricingTable',
      type: 'component',
      version: '1.0.11',
      description:
        'The PricingTable component displays multiple plans in a responsive grid layout with built-in checkout integration.',
      code: COMPONENT_EXAMPLES.PricingTable,
      props: [
        {
          name: 'planIds',
          type: 'string[]',
          required: true,
          description: 'Array of plan IDs to display',
        },
        {
          name: 'columns',
          type: 'number',
          required: false,
          default: '3',
          description: 'Number of columns in the grid',
        },
        {
          name: 'gap',
          type: '"sm" | "md" | "lg"',
          required: false,
          default: '"md"',
          description: 'Spacing between cards',
        },
        {
          name: 'highlightIndex',
          type: 'number',
          required: false,
          description: 'Index of plan to highlight (0-based)',
        },
        {
          name: 'renderAction',
          type: '(planId: string) => ReactNode',
          required: false,
          description: 'Custom action button renderer',
        },
        {
          name: 'responsive',
          type: 'object',
          required: false,
          description: 'Responsive column configuration: { mobile, tablet, desktop }',
        },
      ],
      notes: [
        'Responsive grid layout',
        'Built-in loading and error states',
        'Fetches all plans in parallel for performance',
      ],
    },
    {
      id: 'checkout-wizard',
      title: 'CheckoutWizard (Standalone)',
      type: 'component',
      version: '1.0.0',
      description:
        'The CheckoutWizard can be used standalone for custom checkout flows. SubscryptsButton uses this internally.',
      code: COMPONENT_EXAMPLES.CheckoutWizard,
      props: [
        {
          name: 'planId',
          type: 'string',
          required: true,
          description: 'Plan ID to subscribe to',
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
          name: 'onSuccess',
          type: '(txHash: string) => void',
          required: false,
          description: 'Success callback with transaction hash',
        },
        {
          name: 'onError',
          type: '(error: Error) => void',
          required: false,
          description: 'Error callback',
        },
        {
          name: 'paymentMethod',
          type: '"subs" | "usdc"',
          required: false,
          description: 'Pre-select payment method',
        },
        {
          name: 'cycles',
          type: 'number',
          required: false,
          default: '1',
          description: 'Number of billing cycles',
        },
        {
          name: 'referralAddress',
          type: 'string',
          required: false,
          description: 'Referral address',
        },
      ],
      notes: [
        'Multi-step wizard: Plan Review → Payment Method → Transaction → Success',
        'Built-in error handling and retry logic',
        'Displays Arbiscan link on success',
        'Most developers should use SubscryptsButton instead',
      ],
    },
  ],
};
