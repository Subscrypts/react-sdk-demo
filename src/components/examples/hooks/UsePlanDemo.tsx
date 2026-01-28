/**
 * usePlan Hook Demo
 *
 * Demonstrates fetching single plan details.
 */

import { usePlan } from '@subscrypts/react-sdk';
import { DemoCard } from '../shared';
import { DEMO_PLANS } from '../../../config/plans';
import { useState } from 'react';

export function UsePlanDemo() {
  const [selectedPlanId, setSelectedPlanId] = useState(DEMO_PLANS[0].id);
  const { plan, isLoading, error, refetch } = usePlan(selectedPlanId);

  return (
    <DemoCard
      title="usePlan"
      description="Fetch detailed information about a single subscription plan"
      version="v1.0.11"
    >
      <div className="space-y-4">
        {/* Plan Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Plan:
          </label>
          <select
            value={selectedPlanId}
            onChange={(e) => setSelectedPlanId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {DEMO_PLANS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} Plan (ID: {p.id})
              </option>
            ))}
          </select>
        </div>

        {/* Plan Display */}
        {isLoading ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <div className="text-gray-600">Loading plan details...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">Error: {error.message}</p>
          </div>
        ) : plan ? (
          <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3">
              <h4 className="text-lg font-bold text-white">Plan Details</h4>
            </div>
            <div className="p-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="text-xs text-gray-700 overflow-x-auto whitespace-pre-wrap">
                  {JSON.stringify(plan, (_key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                  , 2)}
                </pre>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Plan data returned from usePlan hook
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-gray-600">Plan not found</p>
          </div>
        )}

        {/* Refresh Button */}
        <button
          onClick={() => refetch()}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Refresh Plan'}
        </button>

        {/* Hook Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Use Case:</h4>
          <p className="text-sm text-gray-700">
            Use this hook to display plan details before subscription, show plan info in cards,
            or fetch updated plan data dynamically.
          </p>
        </div>
      </div>
    </DemoCard>
  );
}
