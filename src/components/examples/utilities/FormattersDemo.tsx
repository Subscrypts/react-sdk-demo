/**
 * Formatters Utility Demo
 *
 * Demonstrates all formatting utility functions with interactive examples.
 */

import {
  formatTokenAmount,
  formatSubs,
  formatUsdc,
  formatDate,
  formatDateTime,
  formatDuration,
  formatPercentage,
  formatFiatPrice,
  shortenAddress,
  useWallet,
} from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';
import { useState } from 'react';

export function FormattersDemo() {
  const { isConnected, address } = useWallet();
  const [tokenAmount, setTokenAmount] = useState('1500000');  // 1.5 tokens (6 decimals)
  const [fiatAmount, setFiatAmount] = useState(25.99);
  const [percentage, setPercentage] = useState(0.12345);
  const [duration, setDuration] = useState(3665); // 1 hour, 1 minute, 5 seconds

  if (!isConnected) {
    return (
      <DemoCard
        title="Formatters"
        description="Utility functions for formatting tokens, dates, and more"
        version="v1.0.0"
      >
        <ConnectWalletPrompt />
      </DemoCard>
    );
  }

  return (
    <DemoCard
      title="Formatters"
      description="Utility functions for formatting tokens, dates, and more"
      version="v1.0.0"
    >
      <div className="space-y-6">
        {/* Token Formatters */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Token Amount Formatters</h4>

          {/* formatTokenAmount */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              formatTokenAmount (custom decimals):
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={tokenAmount}
                onChange={(e) => setTokenAmount(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg w-48"
                placeholder="Amount (wei)"
              />
              <span className="text-sm text-gray-600">→</span>
              <code className="bg-white px-3 py-2 rounded border border-gray-300">
                {formatTokenAmount(BigInt(tokenAmount || 0), 6, 4)}
              </code>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Input: BigInt raw amount • Decimals: 6 • Max decimals: 4
            </p>
          </div>

          {/* formatSubs */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              formatSubs (SUBS token - 18 decimals):
            </label>
            <div className="flex gap-2 items-center">
              <code className="bg-white px-3 py-2 rounded border border-gray-300 flex-1">
                formatSubs(1500000000000000000n) → {formatSubs(1500000000000000000n)}
              </code>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Automatically formats with 18 decimals
            </p>
          </div>

          {/* formatUsdc */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              formatUsdc (USDC token - 6 decimals):
            </label>
            <div className="flex gap-2 items-center">
              <code className="bg-white px-3 py-2 rounded border border-gray-300 flex-1">
                formatUsdc(25990000n) → {formatUsdc(25990000n)}
              </code>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Automatically formats with 6 decimals
            </p>
          </div>
        </div>

        {/* Fiat & Percentage Formatters */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Fiat & Percentage Formatters</h4>

          {/* formatFiatPrice */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              formatFiatPrice (USD with locale):
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                step="0.01"
                value={fiatAmount}
                onChange={(e) => setFiatAmount(parseFloat(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg w-32"
                placeholder="USD amount"
              />
              <span className="text-sm text-gray-600">→</span>
              <code className="bg-white px-3 py-2 rounded border border-gray-300">
                {formatFiatPrice(fiatAmount)}
              </code>
              <span className="text-xs text-gray-500">(en-US)</span>
            </div>
          </div>

          {/* formatPercentage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              formatPercentage (with decimals):
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                step="0.001"
                value={percentage}
                onChange={(e) => setPercentage(parseFloat(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg w-32"
                placeholder="Decimal value"
              />
              <span className="text-sm text-gray-600">→</span>
              <code className="bg-white px-3 py-2 rounded border border-gray-300">
                {formatPercentage(percentage, 2)}
              </code>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Converts 0.12345 to "12.35%"
            </p>
          </div>
        </div>

        {/* Date & Duration Formatters */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Date & Duration Formatters</h4>

          {/* formatDate */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              formatDate (date only):
            </label>
            <code className="bg-white px-3 py-2 rounded border border-gray-300 block">
              {formatDate(new Date())}
            </code>
          </div>

          {/* formatDateTime */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              formatDateTime (date + time):
            </label>
            <code className="bg-white px-3 py-2 rounded border border-gray-300 block">
              {formatDateTime(new Date())}
            </code>
          </div>

          {/* formatDuration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              formatDuration (seconds to human-readable):
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg w-32"
                placeholder="Seconds"
              />
              <span className="text-sm text-gray-600">→</span>
              <code className="bg-white px-3 py-2 rounded border border-gray-300">
                {formatDuration(duration)}
              </code>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Converts seconds to "1h 1m 5s" format
            </p>
          </div>
        </div>

        {/* Address Formatter */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Address Formatter</h4>

          {/* shortenAddress */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              shortenAddress (truncate long addresses):
            </label>
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <span className="text-sm text-gray-600 w-20">Default:</span>
                <code className="bg-white px-3 py-2 rounded border border-gray-300 flex-1 text-xs">
                  {address} → {shortenAddress(address || '0x0')}
                </code>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-sm text-gray-600 w-20">Custom:</span>
                <code className="bg-white px-3 py-2 rounded border border-gray-300 flex-1 text-xs">
                  {address} → {shortenAddress(address || '0x0', 8, 6)}
                </code>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              shortenAddress(address, startChars?, endChars?) - Default: 6, 4
            </p>
          </div>
        </div>

        {/* Function Reference */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">All Formatter Functions:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div><strong>formatTokenAmount(amount, decimals, maxDecimals?)</strong> - Format any token amount</div>
            <div><strong>formatSubs(amount)</strong> - Format SUBS token (18 decimals)</div>
            <div><strong>formatUsdc(amount)</strong> - Format USDC token (6 decimals)</div>
            <div><strong>formatFiatPrice(amount, locale?)</strong> - Format USD price</div>
            <div><strong>formatPercentage(value, decimals?)</strong> - Format as percentage</div>
            <div><strong>formatDate(date)</strong> - Format date only</div>
            <div><strong>formatDateTime(date)</strong> - Format date and time</div>
            <div><strong>formatDuration(seconds)</strong> - Format duration (e.g., "1h 2m 30s")</div>
            <div><strong>shortenAddress(address, start?, end?)</strong> - Truncate addresses</div>
          </div>
        </div>

        {/* Example Code */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Example Usage:</h4>
          <pre className="text-xs bg-white rounded p-3 overflow-x-auto">
            {`import {
  formatSubs,
  formatUsdc,
  formatFiatPrice,
  formatDate,
  shortenAddress,
} from '@subscrypts/react-sdk';

// Token formatting
const subsAmount = 1500000000000000000n; // 1.5 SUBS
console.log(formatSubs(subsAmount)); // "1.5 SUBS"

const usdcAmount = 25990000n; // 25.99 USDC
console.log(formatUsdc(usdcAmount)); // "25.99 USDC"

// Fiat pricing
console.log(formatFiatPrice(25.99)); // "$25.99"

// Dates
const date = new Date();
console.log(formatDate(date)); // "Jan 29, 2026"

// Addresses
const addr = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";
console.log(shortenAddress(addr)); // "0x742d...f0bEb"`}
          </pre>
        </div>
      </div>
    </DemoCard>
  );
}
