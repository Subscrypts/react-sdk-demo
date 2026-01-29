/**
 * Utilities Showcase Page
 *
 * Comprehensive showcase of all Subscrypts React SDK utility functions.
 */

import { SDK_UTILITIES } from '../../config/sdkFeatures';
import { DemoSection } from '../../components/examples/shared';
import {
  FormattersDemo,
  ValidatorsDemo,
  DecisionHelpersDemo,
  ErrorHandlingDemo,
  SessionManagementDemo,
  NetworkInfoDemo,
} from '../../components/examples/utilities';

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
        <DemoSection
          id="formatters"
          title="🔢 Formatters"
          description="Format blockchain data (token amounts, dates, addresses) for display."
        >
          <FormattersDemo />
        </DemoSection>

        {/* Validators */}
        <DemoSection
          id="validators"
          title="✅ Validators"
          description="Validate user input and blockchain data before transactions."
        >
          <ValidatorsDemo />
        </DemoSection>

        {/* Decision Helpers */}
        <DemoSection
          id="decision-helpers"
          title="🎯 Decision Helpers (v1.2.0)"
          description="Make subscription access decisions with pure utility functions."
        >
          <DecisionHelpersDemo />
        </DemoSection>

        {/* Error Handling */}
        <DemoSection
          id="error-utilities"
          title="❌ Error Handling (v1.1.0)"
          description="Convert technical blockchain errors to user-friendly messages."
        >
          <ErrorHandlingDemo />
        </DemoSection>

        {/* Session Management */}
        <DemoSection
          id="session"
          title="💾 Session Management (v1.1.0)"
          description="Persist wallet connections with 7-day session expiry."
        >
          <SessionManagementDemo />
        </DemoSection>

        {/* Network Constants */}
        <DemoSection
          id="constants"
          title="📌 Network & Contract Info"
          description="Contract addresses and network configuration for Arbitrum One."
        >
          <NetworkInfoDemo />
        </DemoSection>

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
