/**
 * usePlansByMerchant Hook Demo
 *
 * Demonstrates fetching all plans created by a specific merchant address.
 */

import { usePlansByMerchant } from '@subscrypts/react-sdk';
import { DemoCard } from '../shared';
import { useState } from 'react';

export function UsePlansByMerchantDemo() {
  // Example merchant addresses (you can replace with real ones)
  const exampleMerchants = [
    { name: 'Demo Merchant', address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb' },
    { name: 'Test Merchant', address: '0x1234567890123456789012345678901234567890' },
  ];

  const [merchantAddress, setMerchantAddress] = useState(exampleMerchants[0].address);
  const { plans, isLoading, error, refetch } = usePlansByMerchant(merchantAddress);

  return (
    <DemoCard
      title="usePlansByMerchant"
      description="Fetch all subscription plans created by a merchant address"
      version="v1.2.0"
    >
      <div className="space-y-4">
        {/* Merchant Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Merchant Address:
          </label>
          <select
            value={merchantAddress}
            onChange={(e) => setMerchantAddress(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {exampleMerchants.map((merchant) => (
              <option key={merchant.address} value={merchant.address}>
                {merchant.name} ({merchant.address.slice(0, 6)}...{merchant.address.slice(-4)})
              </option>
            ))}
          </select>
        </div>

        {/* Custom Address Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Or Enter Custom Address:
          </label>
          <input
            type="text"
            value={merchantAddress}
            onChange={(e) => setMerchantAddress(e.target.value)}
            placeholder="0x..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
          />
        </div>

        {/* Plans Display */}
        {isLoading ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <div className="text-gray-600">Loading merchant plans...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">Error: {error.message}</p>
          </div>
        ) : plans.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-gray-600">No plans found for this merchant address</p>
            <p className="text-xs text-gray-500 mt-2">
              This merchant may not have created any plans yet
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">
                  Found {plans.length} Plan{plans.length !== 1 ? 's' : ''}
                </h4>
                <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                  Active Merchant
                </span>
              </div>
            </div>

            {plans.map((plan, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-3">
                  <h4 className="text-sm font-bold text-white">Plan #{index + 1}</h4>
                </div>
                <div className="p-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-xs text-gray-700 overflow-x-auto whitespace-pre-wrap">
                      {JSON.stringify(
                        plan,
                        (_key, value) => (typeof value === 'bigint' ? value.toString() : value),
                        2
                      )}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Refresh Button */}
        <button
          onClick={() => refetch()}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Refresh Plans'}
        </button>

        {/* Use Case Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Use Cases:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Display all plans from a specific merchant</li>
            <li>✓ Build merchant storefronts</li>
            <li>✓ Compare offerings from different merchants</li>
            <li>✓ Discover plans by trusted merchants</li>
          </ul>
        </div>

        {/* Hook Info */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Return Values:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div>plans: Plan[] ({plans.length} plans)</div>
            <div>isLoading: {String(isLoading)}</div>
            <div>error: {error ? 'Error object' : 'null'}</div>
          </div>
        </div>
      </div>
    </DemoCard>
  );
}
