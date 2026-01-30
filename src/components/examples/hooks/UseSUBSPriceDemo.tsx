/**
 * useSUBSPrice Hook Demo
 *
 * Demonstrates fetching the current SUBS token price in USD with auto-refresh.
 */

import { useSUBSPrice } from '@subscrypts/react-sdk';
import { DemoCard } from '../shared';
import { useState } from 'react';

export function UseSUBSPriceDemo() {
  const [refreshInterval, setRefreshInterval] = useState<number>(30000); // 30 seconds default
  const { priceUsd, isLoading, error, refetch } = useSUBSPrice(refreshInterval);

  // Convert BigInt to number for display and calculations
  const priceNumber = priceUsd !== null ? Number(priceUsd) : null;

  const intervalOptions = [
    { label: '10 seconds', value: 10000 },
    { label: '30 seconds', value: 30000 },
    { label: '1 minute', value: 60000 },
    { label: '5 minutes', value: 300000 },
    { label: 'Manual only', value: 0 },
  ];

  return (
    <DemoCard
      title="useSUBSPrice"
      description="Get current SUBS token price in USD with automatic refresh"
      version="v1.2.0"
    >
      <div className="space-y-4">
        {/* Refresh Interval Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Auto-Refresh Interval:
          </label>
          <select
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {intervalOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Display */}
        {isLoading ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <div className="text-gray-600">Loading SUBS price...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">Error: {error.message}</p>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border-2 border-green-300">
            <div className="text-center mb-4">
              <div className="text-sm text-gray-600 mb-2">Current SUBS Price</div>
              <div className="text-5xl font-bold text-green-600">
                ${priceNumber !== null ? priceNumber.toFixed(6) : '0.000000'}
              </div>
              <div className="text-sm text-gray-500 mt-2">USD per SUBS token</div>
            </div>

            <div className="bg-white rounded-lg p-3 text-center mx-auto max-w-xs">
              <div className="text-xs text-gray-600 mb-1">Refresh Interval</div>
              <div className="text-sm font-semibold text-gray-900">
                {refreshInterval === 0
                  ? 'Manual'
                  : `${refreshInterval / 1000}s`}
              </div>
            </div>

            {/* Price Examples */}
            {priceNumber !== null && (
              <div className="mt-4 pt-4 border-t border-green-200">
                <div className="text-xs font-medium text-gray-700 mb-2">Example Conversions:</div>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>100 SUBS =</span>
                    <span className="font-semibold">${(priceNumber * 100).toFixed(2)} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1,000 SUBS =</span>
                    <span className="font-semibold">${(priceNumber * 1000).toFixed(2)} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>10,000 SUBS =</span>
                    <span className="font-semibold">${(priceNumber * 10000).toFixed(2)} USD</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Manual Refresh Button */}
        <button
          onClick={() => refetch()}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Refreshing...' : 'Refresh Price Now'}
        </button>

        {/* Features */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Features:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Real-time SUBS/USD price from DEX</li>
            <li>✓ Configurable auto-refresh interval</li>
            <li>✓ Manual refresh on demand</li>
            <li>✓ Timestamp of last update</li>
            <li>✓ Essential for displaying USD equivalents</li>
          </ul>
        </div>

        {/* Hook Return Values */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Return Values:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div>priceUsd (BigInt): {priceUsd !== null ? priceUsd.toString() : 'null'}</div>
            <div>priceNumber (converted): {priceNumber !== null ? priceNumber.toFixed(6) : 'null'}</div>
            <div>isLoading: {String(isLoading)}</div>
            <div>error: {error ? 'Error object' : 'null'}</div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Common Use Cases:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Display USD equivalent of SUBS amounts</li>
            <li>• Calculate plan prices in fiat currency</li>
            <li>• Show real-time token price on dashboards</li>
            <li>• Convert subscription costs for user clarity</li>
          </ul>
        </div>
      </div>
    </DemoCard>
  );
}
