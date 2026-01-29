/**
 * useMerchantRevenue Hook Demo
 *
 * Demonstrates calculating Monthly Recurring Revenue (MRR) from active subscriptions (v1.4.0).
 */

import { useMerchantRevenue, useMerchantPlans, useWallet } from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';
import { useState } from 'react';

export function UseMerchantRevenueDemo() {
  const { isConnected } = useWallet();
  const { plans } = useMerchantPlans();
  const [selectedPlanIds, setSelectedPlanIds] = useState<string[]>([]);

  const {
    revenue,
    isLoading,
    error,
    refetch,
  } = useMerchantRevenue(selectedPlanIds.length > 0 ? selectedPlanIds : undefined);

  if (!isConnected) {
    return (
      <DemoCard
        title="useMerchantRevenue"
        description="Calculate Monthly Recurring Revenue (MRR) from your subscriptions"
        version="v1.4.0"
      >
        <ConnectWalletPrompt />
      </DemoCard>
    );
  }

  const handleTogglePlan = (planId: string) => {
    if (selectedPlanIds.includes(planId)) {
      setSelectedPlanIds(selectedPlanIds.filter((id) => id !== planId));
    } else {
      setSelectedPlanIds([...selectedPlanIds, planId]);
    }
  };

  const handleSelectAll = () => {
    const allPlanIds = plans.map((plan) => plan.id.toString());
    setSelectedPlanIds(allPlanIds);
  };

  const handleClearAll = () => {
    setSelectedPlanIds([]);
  };

  // USD estimate is provided by the SDK
  const mrrUsdEstimate = revenue?.mrrUsdEstimate;

  return (
    <DemoCard
      title="useMerchantRevenue"
      description="Calculate Monthly Recurring Revenue (MRR) from your subscriptions"
      version="v1.4.0"
    >
      <div className="space-y-4">
        {/* Plan Selection */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Select Plans to Calculate MRR:
            </label>
            <div className="space-x-2">
              <button
                onClick={handleSelectAll}
                disabled={plans.length === 0}
                className="text-xs text-blue-600 hover:text-blue-800 disabled:opacity-50"
              >
                Select All
              </button>
              <button
                onClick={handleClearAll}
                disabled={selectedPlanIds.length === 0}
                className="text-xs text-gray-600 hover:text-gray-800 disabled:opacity-50"
              >
                Clear
              </button>
            </div>
          </div>

          {plans.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-gray-600 text-sm">
                No plans found. Create plans to track revenue.
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3">
              {plans.map((plan, index) => {
                const planId = plan.id.toString();
                return (
                  <label key={index} className="flex items-center">
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
                );
              })}
            </div>
          )}
          <p className="text-xs text-gray-500 mt-2">
            {selectedPlanIds.length === 0
              ? 'Leave empty to calculate MRR for all your plans'
              : `Calculating MRR for ${selectedPlanIds.length} selected plan${selectedPlanIds.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Revenue Display */}
        {isLoading ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <div className="text-gray-600">Calculating revenue...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">Error: {error.message}</p>
          </div>
        ) : (
          <>
            {/* Total MRR Card */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-300 rounded-lg p-6">
              <div className="text-center mb-4">
                <div className="text-sm text-gray-600 mb-2">Total Monthly Recurring Revenue</div>
                <div className="text-5xl font-bold text-green-600 mb-2">
                  {revenue?.mrrFormatted || '0'} SUBS
                </div>
                <div className="text-lg text-gray-600">per month</div>
                {mrrUsdEstimate && (
                  <div className="text-2xl text-green-700 mt-2">
                    ≈ ${mrrUsdEstimate.toFixed(2)} USD / month
                  </div>
                )}
              </div>

              {/* Subscriber Stats */}
              {revenue && (
                <div className="pt-4 border-t border-green-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {revenue.activeSubscribers}
                      </div>
                      <div className="text-xs text-gray-600">Active Subscribers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-600">
                        {revenue.totalSubscribers}
                      </div>
                      <div className="text-xs text-gray-600">Total Subscribers</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </>
        )}

        {/* Refresh Button */}
        <button
          onClick={() => refetch()}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Calculating...' : 'Refresh Revenue'}
        </button>

        {/* Explanation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">How MRR is Calculated:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Analyzes all active subscriptions for your plans</li>
            <li>• Normalizes revenue to monthly basis (annual plans ÷ 12, etc.)</li>
            <li>• Aggregates across all selected plans</li>
            <li>• Updates automatically when subscriptions change</li>
            <li>• Excludes expired and cancelled subscriptions</li>
          </ul>
        </div>

        {/* Hook Info */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Return Values:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div>revenue?.monthlyRecurringRevenue: {revenue?.monthlyRecurringRevenue !== null ? revenue?.monthlyRecurringRevenue.toString() : 'null'}</div>
            <div>revenue?.mrrFormatted: {revenue?.mrrFormatted || 'null'}</div>
            <div>revenue?.mrrUsdEstimate: {revenue?.mrrUsdEstimate?.toFixed(2) || 'null'}</div>
            <div>revenue?.activeSubscribers: {revenue?.activeSubscribers || 0}</div>
            <div>revenue?.totalSubscribers: {revenue?.totalSubscribers || 0}</div>
            <div>isLoading: {String(isLoading)}</div>
            <div>error: {error ? 'Error object' : 'null'}</div>
            <div>refetch: Function</div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Use Cases:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Build merchant revenue dashboards</li>
            <li>• Track business performance metrics</li>
            <li>• Calculate total MRR across all plans</li>
            <li>• Compare revenue by plan</li>
            <li>• Project annual recurring revenue (ARR)</li>
          </ul>
        </div>
      </div>
    </DemoCard>
  );
}
