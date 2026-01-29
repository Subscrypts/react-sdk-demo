/**
 * usePlanPrice Hook Demo
 *
 * Demonstrates fetching plan price with automatic USD conversion.
 */

import { usePlanPrice } from '@subscrypts/react-sdk';
import { DemoCard } from '../shared';
import { DEMO_PLANS } from '../../../config/plans';
import { useState } from 'react';

export function UsePlanPriceDemo() {
  const [selectedPlanId, setSelectedPlanId] = useState(DEMO_PLANS[0].id);

  const { price, isLoading, error } = usePlanPrice(selectedPlanId);

  return (
    <DemoCard
      title="usePlanPrice"
      description="Get plan price with automatic USD conversion and frequency formatting"
      version="v1.2.0"
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
            {DEMO_PLANS.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name} Plan (ID: {plan.id})
              </option>
            ))}
          </select>
        </div>

        {/* Price Display */}
        {isLoading ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <div className="text-gray-600">Loading price...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">Error: {error.message}</p>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border-2 border-blue-300">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {price?.subsFormatted || '0'} SUBS
              </div>
              <div className="text-lg text-gray-600">
                ≈ ${price?.usdValue || '0.00'} USD
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {price?.frequency || 'per period'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-blue-200">
              <div className="bg-white rounded-lg p-3">
                <div className="text-xs text-gray-600 mb-1">SUBS Amount</div>
                <div className="text-lg font-semibold text-blue-600">
                  {price?.subsFormatted || '0'}
                </div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-xs text-gray-600 mb-1">USDC Equivalent</div>
                <div className="text-lg font-semibold text-green-600">
                  {price?.usdcFormatted || '0'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Features:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Automatic USD conversion using live SUBS price</li>
            <li>✓ USDC equivalent calculation</li>
            <li>✓ Human-readable frequency labels (per month, per year, etc.)</li>
            <li>✓ Updates automatically when SUBS price changes</li>
          </ul>
        </div>

        {/* Hook Return Values */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Return Values:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div>price?.subsFormatted: {price?.subsFormatted || 'null'}</div>
            <div>price?.usdcFormatted: {price?.usdcFormatted || 'null'}</div>
            <div>price?.usdValue: {price?.usdValue || 'null'}</div>
            <div>price?.frequency: "{price?.frequency || ''}"</div>
            <div>isLoading: {String(isLoading)}</div>
          </div>
        </div>
      </div>
    </DemoCard>
  );
}
