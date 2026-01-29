/**
 * PlanCard Component Demo
 *
 * Demonstrates the configurable plan display card (v1.0.11).
 */

import { PlanCard, usePlan, useWallet } from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';
import { DEMO_PLANS } from '../../../config/plans';
import { useState } from 'react';

export function PlanCardDemo() {
  const { isConnected } = useWallet();
  const [selectedPlanId, setSelectedPlanId] = useState(DEMO_PLANS[0].id);
  const [currency, setCurrency] = useState<'SUBS' | 'USDC' | undefined>('SUBS');
  const [featured, setFeatured] = useState(false);
  const [showFields, setShowFields] = useState<Array<'description' | 'amount' | 'frequency' | 'subscribers' | 'merchant' | 'referralBonus' | 'attributes'>>(['description', 'amount', 'frequency']);

  const { plan, isLoading, error } = usePlan(selectedPlanId);

  if (!isConnected) {
    return (
      <DemoCard
        title="PlanCard"
        description="Configurable plan display card with currency display"
        version="v1.0.11"
      >
        <ConnectWalletPrompt />
      </DemoCard>
    );
  }

  return (
    <DemoCard
      title="PlanCard"
      description="Configurable plan display card with currency display"
      version="v1.0.11"
    >
      <div className="space-y-4">
        {/* Plan Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Plan:
          </label>
          <select
            value={selectedPlanId}
            onChange={(e) => setSelectedPlanId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {DEMO_PLANS.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name} - {plan.pricePerMonth}
              </option>
            ))}
          </select>
        </div>

        {/* Currency Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Display Currency:
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrency('SUBS')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currency === 'SUBS'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              SUBS
            </button>
            <button
              onClick={() => setCurrency('USDC')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currency === 'USDC'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              USDC
            </button>
          </div>
        </div>

        {/* Featured Toggle */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            Featured/Highlighted Plan
          </label>
        </div>

        {/* Field Customization */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Visible Fields:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['description', 'amount', 'frequency', 'subscribers', 'merchant', 'referralBonus', 'attributes'] as const).map((field) => (
              <label key={field} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={showFields.includes(field)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setShowFields([...showFields, field]);
                    } else {
                      setShowFields(showFields.filter(f => f !== field));
                    }
                  }}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                {field}
              </label>
            ))}
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Live Preview:</h4>
          {isLoading ? (
            <div className="text-center py-8 text-gray-600">Loading plan...</div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">Error: {error.message}</p>
            </div>
          ) : plan ? (
            <div className="max-w-sm mx-auto">
              <PlanCard
                plan={plan}
                currency={currency}
                showFields={showFields}
                featured={featured}
                onSubscribe={(planId) => {
                  alert(`Subscribe to Plan ${planId} clicked!`);
                }}
              />
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600">No plan found</div>
          )}
        </div>

        {/* Features */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Features:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Display plan with custom currency (SUBS or USDC)</li>
            <li>✓ Configurable visible fields</li>
            <li>✓ Built-in subscribe button with callback</li>
            <li>✓ Featured/highlighted plan styling</li>
            <li>✓ Automatic price formatting</li>
            <li>✓ Responsive design</li>
          </ul>
        </div>

        {/* Props Documentation */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Component Props:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div><strong>plan:</strong> Plan (required) - Plan object from usePlan hook</div>
            <div><strong>currency:</strong> 'SUBS' | 'USDC' - Display currency (default: SUBS)</div>
            <div><strong>showFields:</strong> PlanField[] - Fields to display</div>
            <div><strong>onSubscribe:</strong> (planId: string) =&gt; void - Subscribe callback</div>
            <div><strong>featured:</strong> boolean - Highlight as featured plan</div>
            <div><strong>subscribeLabel:</strong> string - Custom button label</div>
            <div><strong>showSubscribeButton:</strong> boolean - Show subscribe button (default: true)</div>
            <div><strong>title:</strong> string - Custom card title</div>
            <div><strong>className:</strong> string - Additional CSS classes</div>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">💡 Usage Pattern:</h4>
          <p className="text-sm text-gray-700">
            PlanCard requires you to fetch the plan data first using <code className="bg-white px-1 py-0.5 rounded">usePlan</code> or <code className="bg-white px-1 py-0.5 rounded">usePlans</code> hooks,
            then pass the plan object along with currency display preferences.
          </p>
        </div>

        {/* Example Code */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Example Usage:</h4>
          <pre className="text-xs bg-white rounded p-3 overflow-x-auto">
            {`import { PlanCard, usePlan } from '@subscrypts/react-sdk';

function PricingPage() {
  const { plan, isLoading } = usePlan('1');

  if (isLoading) return <div>Loading...</div>;
  if (!plan) return <div>Plan not found</div>;

  return (
    <PlanCard
      plan={plan}
      currency="SUBS"
      showFields={['description', 'amount', 'frequency', 'subscribers']}
      featured={true}
      onSubscribe={(planId) => {
        console.log('Opening checkout for plan:', planId);
      }}
    />
  );
}`}
          </pre>
        </div>
      </div>
    </DemoCard>
  );
}
