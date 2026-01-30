/**
 * usePlans Hook Demo
 *
 * Demonstrates fetching multiple plans in parallel for better performance.
 */

import { usePlans } from '@subscrypts/react-sdk';
import { DemoCard } from '../shared';
import { useState } from 'react';

export function UsePlansDemo() {
  const allPlanIds = ['1', '2', '3'];
  const [selectedPlanIds, setSelectedPlanIds] = useState<string[]>(['1', '2']);

  const { plans, isLoading, error } = usePlans(selectedPlanIds);

  const handleTogglePlan = (planId: string) => {
    if (selectedPlanIds.includes(planId)) {
      setSelectedPlanIds(selectedPlanIds.filter((id) => id !== planId));
    } else {
      setSelectedPlanIds([...selectedPlanIds, planId]);
    }
  };

  return (
    <DemoCard
      title="usePlans"
      description="Fetch multiple plans in parallel (better than multiple usePlan calls)"
      version="v1.0.11"
    >
      <div className="space-y-4">
        {/* Plan Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Plans to Fetch:
          </label>
          <div className="space-y-2">
            {allPlanIds.map((planId) => (
              <label key={planId} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedPlanIds.includes(planId)}
                  onChange={() => handleTogglePlan(planId)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">
                  Plan {planId}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Results Display */}
        {selectedPlanIds.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-gray-600">Select at least one plan to fetch</p>
          </div>
        ) : isLoading ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <div className="text-gray-600">Loading {selectedPlanIds.length} plans...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">Error: {error.message}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {plans.map((plan, index) => {
              const planId = selectedPlanIds[index];

              return (
                <div
                  key={planId}
                  className={`rounded-lg p-4 border-2 ${
                    plan
                      ? 'bg-green-50 border-green-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Plan {planId}</span>
                    {plan ? (
                      <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                        Loaded
                      </span>
                    ) : (
                      <span className="text-xs bg-gray-400 text-white px-2 py-1 rounded">
                        Not Found
                      </span>
                    )}
                  </div>

                  {plan ? (
                    <div className="bg-white rounded p-3">
                      <pre className="text-xs text-gray-700 overflow-x-auto whitespace-pre-wrap">
                        {JSON.stringify(
                          plan,
                          (_key, value) => (typeof value === 'bigint' ? value.toString() : value),
                          2
                        )}
                      </pre>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">Plan not found</p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Performance Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Performance Benefits:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Fetches all plans in parallel (not sequential)</li>
            <li>✓ Single hook call instead of multiple usePlan calls</li>
            <li>✓ Returns array of plans in same order as input</li>
            <li>✓ Individual error handling per plan</li>
          </ul>
        </div>

        {/* Hook Info */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div>plans: Plan[] ({plans.filter((p) => p !== null).length} loaded)</div>
            <div>error: {error ? 'Error object' : 'null'}</div>
            <div>isLoading: {String(isLoading)}</div>
          </div>
        </div>
      </div>
    </DemoCard>
  );
}
