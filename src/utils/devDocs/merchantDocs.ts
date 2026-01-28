/**
 * Developer Documentation for Merchant Page
 *
 * Documentation shown in sidebar when user is on the merchant dashboard page.
 * Showcases v1.4.0 Merchant Toolkit features.
 */

import type { PageDocumentation } from '../../types/devDocs';
import { HOOK_EXAMPLES, COMPONENT_EXAMPLES } from '../codeExamples';

export const merchantPageDocs: PageDocumentation = {
  pageName: 'Merchant Dashboard',
  pageDescription:
    'The merchant page demonstrates the v1.4.0 Merchant Toolkit for business owners: plan management, subscriber lists, and revenue tracking (MRR).',
  sections: [
    {
      id: 'merchant-dashboard',
      title: 'MerchantDashboard Component',
      type: 'component',
      version: '1.4.0',
      description:
        'Complete merchant overview component with revenue metrics, plan list, and subscriber details. Everything a merchant needs in one component.',
      code: COMPONENT_EXAMPLES.MerchantDashboard,
      props: [
        {
          name: 'onPlanSelect',
          type: '(planId: string) => void',
          required: false,
          description: 'Callback when a plan is selected',
        },
        {
          name: 'showRevenue',
          type: 'boolean',
          required: false,
          default: 'true',
          description: 'Show revenue metrics section',
        },
        {
          name: 'showSubscribers',
          type: 'boolean',
          required: false,
          default: 'true',
          description: 'Show subscribers list',
        },
        {
          name: 'subscribersPageSize',
          type: 'number',
          required: false,
          default: '10',
          description: 'Subscribers per page',
        },
        {
          name: 'emptyPlansMessage',
          type: 'string',
          required: false,
          description: 'Custom message when no plans',
        },
        {
          name: 'emptySubscribersMessage',
          type: 'string',
          required: false,
          description: 'Custom message when no subscribers',
        },
      ],
      notes: [
        'Uses useMerchantPlans, useMerchantRevenue, and useMerchantSubscribers hooks internally',
        'Automatically uses connected wallet as merchant address',
        'Real-time revenue calculation',
        'MRR normalized to monthly amounts',
      ],
      links: [
        {
          label: 'Merchant Toolkit Guide',
          url: 'https://github.com/Subscrypts/react-sdk/blob/main/docs/merchant.md',
        },
      ],
    },
    {
      id: 'merchant-plans',
      title: 'useMerchantPlans Hook',
      type: 'hook',
      version: '1.4.0',
      description:
        'Fetch all subscription plans owned by the connected merchant wallet. Essential for merchant dashboards.',
      code: HOOK_EXAMPLES.useMerchantPlans,
      returnValues: [
        {
          name: 'plans',
          type: 'Plan[]',
          description: 'Array of plans owned by merchant',
        },
        {
          name: 'isLoading',
          type: 'boolean',
          description: 'Whether plans are loading',
        },
        {
          name: 'error',
          type: 'Error | null',
          description: 'Error if fetch failed',
        },
        {
          name: 'refetch',
          type: '() => Promise<void>',
          description: 'Manually refetch plans',
        },
      ],
      notes: [
        'Automatically uses connected wallet address as merchant',
        'Returns empty array if no plans found',
        'Each plan includes subscriber count and active subscriber count',
      ],
    },
    {
      id: 'merchant-revenue',
      title: 'useMerchantRevenue Hook',
      type: 'hook',
      version: '1.4.0',
      description:
        'Calculate Monthly Recurring Revenue (MRR) from active subscriptions. Essential metric for subscription businesses.',
      code: HOOK_EXAMPLES.useMerchantRevenue,
      props: [
        {
          name: 'planIds',
          type: 'string[]',
          required: false,
          description:
            'Filter revenue by specific plans (optional - defaults to all merchant plans)',
        },
      ],
      returnValues: [
        {
          name: 'totalMRR',
          type: 'number',
          description: 'Total MRR in SUBS tokens',
        },
        {
          name: 'mrrByCurrency',
          type: 'object',
          description: 'MRR breakdown: { subs: number, usdc: number }',
        },
        {
          name: 'usdValue',
          type: 'number',
          description: 'Total MRR in USD (using current SUBS price)',
        },
        {
          name: 'activeSubscriptions',
          type: 'number',
          description: 'Number of active subscriptions',
        },
        {
          name: 'isLoading',
          type: 'boolean',
          description: 'Whether calculation is in progress',
        },
        {
          name: 'error',
          type: 'Error | null',
          description: 'Error if calculation failed',
        },
      ],
      notes: [
        'MRR is normalized to monthly amounts (weekly/daily plans converted)',
        'Only counts ACTIVE subscriptions',
        'USD conversion uses live SUBS/USD price',
        'Supports both SUBS and USDC-denominated plans',
      ],
      examples: [
        {
          title: 'Revenue for All Plans',
          code: `const { totalMRR, usdValue, activeSubscriptions } = useMerchantRevenue();`,
          description: 'Calculate MRR across all merchant plans',
        },
        {
          title: 'Revenue for Specific Plans',
          code: `const { totalMRR, usdValue } = useMerchantRevenue(['plan-1', 'plan-2']);`,
          description: 'Filter MRR by specific plan IDs',
        },
      ],
    },
    {
      id: 'merchant-subscribers',
      title: 'useMerchantSubscribers Hook',
      type: 'hook',
      version: '1.4.0',
      description:
        'Fetch paginated list of subscribers for a specific plan. Perfect for managing your subscriber base.',
      code: HOOK_EXAMPLES.useMerchantSubscribers,
      props: [
        {
          name: 'planId',
          type: 'string',
          required: true,
          description: 'Plan ID to fetch subscribers for',
        },
        {
          name: 'pageSize',
          type: 'number',
          required: false,
          default: '10',
          description: 'Subscribers per page',
        },
      ],
      returnValues: [
        {
          name: 'subscribers',
          type: 'Subscriber[]',
          description: 'Array of subscribers for current page',
        },
        {
          name: 'activeCount',
          type: 'number',
          description: 'Number of active subscribers',
        },
        {
          name: 'totalCount',
          type: 'number',
          description: 'Total number of subscribers (active + inactive)',
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
      ],
      notes: [
        'Each subscriber includes: address, status, start date, next payment date',
        'Status can be: active, expired, cancelled',
        'Pagination handled client-side',
      ],
    },
    {
      id: 'plans-by-merchant',
      title: 'usePlansByMerchant Hook',
      type: 'hook',
      version: '1.2.0',
      description:
        'Fetch all plans by a specific merchant address. Useful for displaying merchant profiles.',
      code: HOOK_EXAMPLES.usePlansByMerchant,
      props: [
        {
          name: 'merchantAddress',
          type: 'string',
          required: true,
          description: 'Ethereum address of the merchant',
        },
      ],
      returnValues: [
        {
          name: 'plans',
          type: 'Plan[]',
          description: 'Array of plans created by this merchant',
        },
        {
          name: 'isLoading',
          type: 'boolean',
          description: 'Whether plans are loading',
        },
        {
          name: 'error',
          type: 'Error | null',
          description: 'Error if fetch failed',
        },
        {
          name: 'refetch',
          type: '() => Promise<void>',
          description: 'Manually refetch plans',
        },
      ],
      notes: [
        'Can query any merchant address (not just connected wallet)',
        'Useful for public merchant profile pages',
        'v1.2.0 feature',
      ],
    },
    {
      id: 'subs-price',
      title: 'useSUBSPrice Hook',
      type: 'hook',
      version: '1.2.0',
      description:
        'Get current SUBS/USD price with auto-refresh. Essential for USD revenue calculations.',
      code: HOOK_EXAMPLES.useSUBSPrice,
      returnValues: [
        {
          name: 'price',
          type: 'number',
          description: 'Current SUBS/USD price',
        },
        {
          name: 'isLoading',
          type: 'boolean',
          description: 'Whether price is loading',
        },
        {
          name: 'error',
          type: 'Error | null',
          description: 'Error if fetch failed',
        },
        {
          name: 'lastUpdated',
          type: 'number',
          description: 'Timestamp of last price update',
        },
      ],
      notes: [
        'Auto-refreshes every 60 seconds',
        'Uses on-chain oracle for accurate pricing',
        'Used internally by useMerchantRevenue',
      ],
    },
  ],
};
