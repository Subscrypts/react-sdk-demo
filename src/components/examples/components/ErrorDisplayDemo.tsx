/**
 * ErrorDisplay Component Demo
 *
 * Demonstrates the context-aware error display component (v1.1.0).
 */

import { ErrorDisplay, useWallet } from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';
import { useState } from 'react';

export function ErrorDisplayDemo() {
  const { isConnected } = useWallet();
  const [selectedError, setSelectedError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [compact, setCompact] = useState(false);

  // Simulated errors
  const simulatedErrors = {
    userRejected: new Error('ACTION_REJECTED: User rejected the transaction'),
    insufficientFunds: new Error('INSUFFICIENT_FUNDS: Insufficient funds for gas'),
    networkError: new Error('NETWORK_ERROR: Failed to connect to network'),
    timeout: new Error('TIMEOUT: Transaction timed out'),
    callException: new Error('CALL_EXCEPTION: Contract call failed'),
    generic: new Error('An unexpected error occurred'),
  };

  if (!isConnected) {
    return (
      <DemoCard
        title="ErrorDisplay"
        description="Context-aware error display with user-friendly messages"
        version="v1.1.0"
      >
        <ConnectWalletPrompt />
      </DemoCard>
    );
  }

  return (
    <DemoCard
      title="ErrorDisplay"
      description="Context-aware error display with user-friendly messages"
      version="v1.1.0"
    >
      <div className="space-y-4">
        {/* Error Simulator */}
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Simulate Different Errors:</h4>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => setSelectedError(simulatedErrors.userRejected)}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
            >
              User Rejected
            </button>
            <button
              onClick={() => setSelectedError(simulatedErrors.insufficientFunds)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              Insufficient Funds
            </button>
            <button
              onClick={() => setSelectedError(simulatedErrors.networkError)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
            >
              Network Error
            </button>
            <button
              onClick={() => setSelectedError(simulatedErrors.timeout)}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
            >
              Timeout
            </button>
            <button
              onClick={() => setSelectedError(simulatedErrors.callException)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Call Exception
            </button>
            <button
              onClick={() => setSelectedError(simulatedErrors.generic)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              Generic Error
            </button>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={compact}
                onChange={(e) => setCompact(e.target.checked)}
                className="w-4 h-4"
              />
              Compact Mode
            </label>
            <button
              onClick={() => setSelectedError(null)}
              className="ml-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm"
            >
              Clear Error
            </button>
          </div>
        </div>

        {/* Error Display Component */}
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-300 min-h-[120px]">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Live Error Display:</h4>
          {selectedError ? (
            <ErrorDisplay
              error={selectedError}
              compact={compact}
              onRetry={() => {
                setRetryCount(prev => prev + 1);
                console.log('Retry clicked. Retry count:', retryCount + 1);
              }}
              onDismiss={() => {
                setSelectedError(null);
                console.log('Error dismissed');
              }}
            />
          ) : (
            <div className="text-center text-gray-500 py-8">
              Select an error type above to see how ErrorDisplay renders it
            </div>
          )}
        </div>

        {/* Retry Counter */}
        {retryCount > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-700">
              Retry button clicked <strong>{retryCount}</strong> time{retryCount !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Features */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Features:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Automatically maps blockchain error codes to user-friendly messages</li>
            <li>✓ Detects retryable errors and shows retry button</li>
            <li>✓ Optional dismiss button</li>
            <li>✓ Compact mode for inline display</li>
            <li>✓ Handles all common Web3 errors (ACTION_REJECTED, INSUFFICIENT_FUNDS, etc.)</li>
            <li>✓ Graceful fallback for unknown errors</li>
          </ul>
        </div>

        {/* Supported Error Codes */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Supported Error Codes:</h4>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono text-gray-700">
            <div>ACTION_REJECTED</div>
            <div>INSUFFICIENT_FUNDS</div>
            <div>NETWORK_ERROR</div>
            <div>TIMEOUT</div>
            <div>CALL_EXCEPTION</div>
            <div>INVALID_ARGUMENT</div>
            <div>MISSING_ARGUMENT</div>
            <div>NONCE_EXPIRED</div>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            + All unknown errors with generic fallback message
          </p>
        </div>

        {/* Props Documentation */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Component Props:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div><strong>error:</strong> Error | null (required) - The error to display</div>
            <div><strong>onRetry:</strong> () =&gt; void - Retry callback (shown for retryable errors)</div>
            <div><strong>onDismiss:</strong> () =&gt; void - Dismiss callback (shows X button)</div>
            <div><strong>compact:</strong> boolean - Compact mode for inline display</div>
            <div><strong>className:</strong> string - Additional CSS classes</div>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">💡 Smart Error Detection:</h4>
          <p className="text-sm text-gray-700">
            ErrorDisplay uses the SDK's <code className="bg-white px-1 py-0.5 rounded">getErrorMessage()</code> utility
            to map technical blockchain errors to user-friendly messages. It automatically detects
            which errors are retryable (like network errors) vs non-retryable (like user rejection).
          </p>
        </div>

        {/* Example Code */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Example Usage:</h4>
          <pre className="text-xs bg-white rounded p-3 overflow-x-auto">
            {`import { ErrorDisplay } from '@subscrypts/react-sdk';
import { useState } from 'react';

function SubscribeFlow() {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setError(null);
    setLoading(true);
    try {
      await subscribe(planId);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleSubscribe}>Subscribe</button>

      {/* Show error with retry option */}
      <ErrorDisplay
        error={error}
        onRetry={handleSubscribe}
        onDismiss={() => setError(null)}
      />
    </div>
  );
}`}
          </pre>
        </div>

        {/* Related Utilities */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">🔗 Related Utilities:</h4>
          <p className="text-sm text-gray-700 mb-2">
            For programmatic error handling, use these utilities directly:
          </p>
          <div className="text-xs font-mono space-y-1">
            <div>• <code className="bg-white px-1 py-0.5 rounded">getErrorMessage(error)</code> - Get user-friendly message</div>
            <div>• <code className="bg-white px-1 py-0.5 rounded">getErrorCode(error)</code> - Extract error code</div>
          </div>
        </div>
      </div>
    </DemoCard>
  );
}
