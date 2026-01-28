/**
 * Utilities Showcase Page
 *
 * Comprehensive showcase of all Subscrypts React SDK utility functions.
 */

import { SDK_UTILITIES } from '../../config/sdkFeatures';

export default function UtilitiesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">SDK Utilities</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive showcase of all {SDK_UTILITIES.length}+ Subscrypts React SDK utility
          functions with live, interactive examples and real-time demos.
        </p>
      </div>

      {/* Info Banner */}
      <div className="max-w-4xl mx-auto mb-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="text-purple-600 text-2xl">🔧</div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              Pure Utility Functions
            </h3>
            <p className="text-purple-700">
              All utilities are pure functions that work in React, Node.js, or any JavaScript
              environment. No hooks or context required.
            </p>
          </div>
        </div>
      </div>

      {/* Utility Categories */}
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Formatters */}
        <section id="formatters">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-blue-600">🔢</span>
            Formatters
          </h2>
          <p className="text-gray-600 mb-8">
            Format blockchain data (token amounts, dates, addresses) for display.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Token Formatters</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <code className="text-blue-600">formatTokenAmount()</code>
                  <span className="text-gray-500">Generic bigint formatter</span>
                </li>
                <li className="flex items-center gap-2">
                  <code className="text-blue-600">formatSubs()</code>
                  <span className="text-gray-500">SUBS token formatter</span>
                </li>
                <li className="flex items-center gap-2">
                  <code className="text-blue-600">formatUsdc()</code>
                  <span className="text-gray-500">USDC formatter (6 decimals)</span>
                </li>
                <li className="flex items-center gap-2">
                  <code className="text-blue-600">parseTokenAmount()</code>
                  <span className="text-gray-500">String to bigint</span>
                </li>
              </ul>
              <div className="mt-4 bg-gray-50 rounded p-3 text-sm text-gray-600">
                Interactive demo will be added here
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Price & Date Formatters
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <code className="text-blue-600">formatFiatPrice()</code>
                  <span className="text-gray-500">USD with locale</span>
                </li>
                <li className="flex items-center gap-2">
                  <code className="text-blue-600">formatDate()</code>
                  <span className="text-gray-500">Date formatting</span>
                </li>
                <li className="flex items-center gap-2">
                  <code className="text-blue-600">formatDateTime()</code>
                  <span className="text-gray-500">Date with time</span>
                </li>
                <li className="flex items-center gap-2">
                  <code className="text-blue-600">shortenAddress()</code>
                  <span className="text-gray-500">Address truncation</span>
                </li>
              </ul>
              <div className="mt-4 bg-gray-50 rounded p-3 text-sm text-gray-600">
                Interactive demo will be added here
              </div>
            </div>
          </div>
        </section>

        {/* Validators */}
        <section id="validators">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-green-600">✅</span>
            Validators
          </h2>
          <p className="text-gray-600 mb-8">
            Validate user input and blockchain data before transactions.
          </p>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Available Validators</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <code className="text-green-600">validateAddress()</code>
                    <span className="text-gray-500">Ethereum address</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <code className="text-green-600">validatePositiveNumber()</code>
                    <span className="text-gray-500">Positive numbers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <code className="text-green-600">validatePlanId()</code>
                    <span className="text-gray-500">Plan ID validation</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded p-4 text-sm text-gray-600">
                Interactive validation demo will be added here
              </div>
            </div>
          </div>
        </section>

        {/* Decision Helpers */}
        <section id="decision-helpers">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-purple-600">🎯</span>
            Decision Helpers (v1.2.0)
          </h2>
          <p className="text-gray-600 mb-8">
            Make subscription access decisions with pure utility functions.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Access Control</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <code className="text-purple-600">canAccess()</code>
                  <span className="text-gray-500">Check active access</span>
                </li>
                <li className="flex items-center gap-2">
                  <code className="text-purple-600">isPaymentDue()</code>
                  <span className="text-gray-500">Check overdue</span>
                </li>
                <li className="flex items-center gap-2">
                  <code className="text-purple-600">shouldRenew()</code>
                  <span className="text-gray-500">Check auto-renew</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Health Check</h3>
              <p className="text-sm text-gray-600 mb-3">
                <code className="text-purple-600">getSubscriptionHealth()</code> combines all checks
                for comprehensive status.
              </p>
              <div className="bg-gray-50 rounded p-3 text-xs font-mono">
                Returns: hasAccess, isPaymentDue, shouldRenew, expiresIn, status, concerns
              </div>
            </div>
          </div>
        </section>

        {/* Error Handling */}
        <section id="error-utilities">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-red-600">❌</span>
            Error Handling (v1.1.0)
          </h2>
          <p className="text-gray-600 mb-8">
            Convert technical blockchain errors to user-friendly messages.
          </p>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <code className="text-red-600">getErrorMessage()</code>
                    <span className="text-gray-500">User-friendly messages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <code className="text-red-600">getErrorCode()</code>
                    <span className="text-gray-500">Extract error codes</span>
                  </li>
                </ul>
                <div className="mt-4 text-xs text-gray-600">
                  <strong>Supported errors:</strong> ACTION_REJECTED, INSUFFICIENT_FUNDS,
                  CALL_EXCEPTION, NETWORK_ERROR, TIMEOUT
                </div>
              </div>
              <div className="bg-gray-50 rounded p-4 text-sm text-gray-600">
                Error simulator demo will be added here
              </div>
            </div>
          </div>
        </section>

        {/* Session Management */}
        <section id="session">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-indigo-600">💾</span>
            Session Management (v1.1.0)
          </h2>
          <p className="text-gray-600 mb-8">
            Persist wallet connections with 7-day session expiry.
          </p>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <code className="text-indigo-600">saveSession()</code>
                    <span className="text-gray-500">Save to localStorage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <code className="text-indigo-600">loadSession()</code>
                    <span className="text-gray-500">Load from storage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <code className="text-indigo-600">clearSession()</code>
                    <span className="text-gray-500">Clear session</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <code className="text-indigo-600">isSessionStale()</code>
                    <span className="text-gray-500">Check 7-day expiry</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded p-4 text-sm text-gray-600">
                Session demo will be added here
              </div>
            </div>
          </div>
        </section>

        {/* Network Constants */}
        <section id="constants">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-orange-600">📌</span>
            Network & Contract Info
          </h2>
          <p className="text-gray-600 mb-8">
            Contract addresses and network configuration for Arbitrum One.
          </p>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="bg-gray-50 rounded p-4 text-sm text-gray-600 mb-4">
              Contract addresses display with copy-to-clipboard will be added here
            </div>
            <div className="text-xs text-gray-500">
              <strong>Available constants:</strong> SUBSCRYPTS_ADDRESS, SUBS_TOKEN_ADDRESS,
              USDC_ADDRESS, PERMIT2_ADDRESS, DEX_QUOTER_ADDRESS, DEX_ROUTER_ADDRESS, ARBITRUM_ONE
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8 border border-purple-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            All {SDK_UTILITIES.length}+ SDK Utilities
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {SDK_UTILITIES.map((utility) => (
              <div key={utility.name} className="bg-white rounded-lg p-3 shadow-sm">
                <p className="font-mono text-xs text-purple-600">{utility.name}</p>
                <p className="text-xs text-gray-500 mt-1">v{utility.version}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Developer Resources */}
        <section className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Developer Resources</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://github.com/Subscrypts/react-sdk/blob/main/docs/utilities.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              📖 Utilities API Reference
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
