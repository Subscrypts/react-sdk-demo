/**
 * Error Handling Utilities Demo
 *
 * Demonstrates error message mapping utilities (v1.1.0).
 */

import { getErrorMessage, getErrorCode, useWallet } from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';
import { useState } from 'react';

export function ErrorHandlingDemo() {
  const { isConnected } = useWallet();
  const [errorResult, setErrorResult] = useState<{ code: string; config: any } | null>(null);

  // Simulated errors
  const simulatedErrors = {
    actionRejected: new Error('ACTION_REJECTED: User rejected the transaction'),
    insufficientFunds: { code: 'INSUFFICIENT_FUNDS', message: 'insufficient funds for gas * price + value' },
    networkError: new Error('NETWORK_ERROR: Failed to connect to provider'),
    timeout: new Error('TIMEOUT: Transaction confirmation timeout'),
    callException: { code: 'CALL_EXCEPTION', reason: 'execution reverted', data: '0x' },
    nonceExpired: new Error('NONCE_EXPIRED: Transaction nonce has already been used'),
    invalidArgument: new Error('INVALID_ARGUMENT: invalid BigNumber string'),
    unknownError: new Error('Something went wrong with the blockchain'),
  };

  if (!isConnected) {
    return (
      <DemoCard
        title="Error Handling"
        description="Utilities for mapping blockchain errors to user-friendly messages"
        version="v1.1.0"
      >
        <ConnectWalletPrompt />
      </DemoCard>
    );
  }

  const handleTestError = (error: unknown) => {
    const code = getErrorCode(error);
    const config = getErrorMessage(error);
    setErrorResult({ code, config });
  };

  return (
    <DemoCard
      title="Error Handling"
      description="Utilities for mapping blockchain errors to user-friendly messages"
      version="v1.1.0"
    >
      <div className="space-y-6">
        {/* Error Simulator */}
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Test Error Messages:</h4>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleTestError(simulatedErrors.actionRejected)}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
            >
              Action Rejected
            </button>
            <button
              onClick={() => handleTestError(simulatedErrors.insufficientFunds)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              Insufficient Funds
            </button>
            <button
              onClick={() => handleTestError(simulatedErrors.networkError)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
            >
              Network Error
            </button>
            <button
              onClick={() => handleTestError(simulatedErrors.timeout)}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
            >
              Timeout
            </button>
            <button
              onClick={() => handleTestError(simulatedErrors.callException)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Call Exception
            </button>
            <button
              onClick={() => handleTestError(simulatedErrors.nonceExpired)}
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm"
            >
              Nonce Expired
            </button>
            <button
              onClick={() => handleTestError(simulatedErrors.invalidArgument)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
            >
              Invalid Argument
            </button>
            <button
              onClick={() => handleTestError(simulatedErrors.unknownError)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              Unknown Error
            </button>
          </div>
        </div>

        {/* Error Analysis Result */}
        {errorResult && (
          <div className="space-y-4">
            {/* getErrorCode Result */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                getErrorCode() Result:
              </h4>
              <div className="bg-white rounded p-3 font-mono text-sm">
                {errorResult.code}
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Extracted error code from the error object
              </p>
            </div>

            {/* getErrorMessage Result */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                getErrorMessage() Result:
              </h4>

              <div className="space-y-3">
                {/* Title */}
                <div>
                  <div className="text-xs font-semibold text-gray-600 mb-1">Title:</div>
                  <div className="bg-white rounded p-2 text-sm font-semibold text-gray-900">
                    {errorResult.config.title}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <div className="text-xs font-semibold text-gray-600 mb-1">Message:</div>
                  <div className="bg-white rounded p-2 text-sm text-gray-700">
                    {errorResult.config.message}
                  </div>
                </div>

                {/* Suggestion */}
                <div>
                  <div className="text-xs font-semibold text-gray-600 mb-1">Suggestion:</div>
                  <div className="bg-white rounded p-2 text-sm text-blue-700">
                    {errorResult.config.suggestion}
                  </div>
                </div>

                {/* Retryable */}
                <div>
                  <div className="text-xs font-semibold text-gray-600 mb-1">Is Retryable:</div>
                  <div className={`bg-white rounded p-2 text-sm font-medium ${
                    errorResult.config.isRetryable ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {errorResult.config.isRetryable ? '✓ Yes - User can retry' : '✗ No - Cannot retry'}
                  </div>
                </div>
              </div>
            </div>

            {/* Full Object */}
            <details className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <summary className="cursor-pointer font-semibold text-gray-900 text-sm">
                View Full ErrorMessageConfig Object
              </summary>
              <pre className="mt-3 text-xs bg-white rounded p-3 overflow-x-auto">
                {JSON.stringify(errorResult.config, null, 2)}
              </pre>
            </details>
          </div>
        )}

        {/* Function Documentation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Available Functions:</h4>

          <div className="space-y-3">
            {/* getErrorCode */}
            <div className="bg-white rounded p-3">
              <div className="font-mono text-sm text-blue-600 mb-2">
                getErrorCode(error: unknown): string
              </div>
              <div className="text-xs text-gray-700">
                Extracts the error code from any error object. Handles ethers.js errors,
                SubscryptsError, and generic Error objects.
              </div>
            </div>

            {/* getErrorMessage */}
            <div className="bg-white rounded p-3">
              <div className="font-mono text-sm text-blue-600 mb-2">
                getErrorMessage(error: unknown): ErrorMessageConfig
              </div>
              <div className="text-xs text-gray-700 mb-2">
                Maps any error to a user-friendly message configuration with title, message,
                suggestion, and isRetryable flag.
              </div>
              <div className="text-xs font-mono bg-gray-50 rounded p-2 mt-2">
                <div>interface ErrorMessageConfig {'{'}</div>
                <div className="ml-4">title: string;</div>
                <div className="ml-4">message: string;</div>
                <div className="ml-4">suggestion: string;</div>
                <div className="ml-4">isRetryable: boolean;</div>
                <div>{'}'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Supported Error Codes */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Supported Error Codes:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs font-mono">
            <div className="bg-white rounded p-2">ACTION_REJECTED</div>
            <div className="bg-white rounded p-2">INSUFFICIENT_FUNDS</div>
            <div className="bg-white rounded p-2">NETWORK_ERROR</div>
            <div className="bg-white rounded p-2">TIMEOUT</div>
            <div className="bg-white rounded p-2">CALL_EXCEPTION</div>
            <div className="bg-white rounded p-2">NONCE_EXPIRED</div>
            <div className="bg-white rounded p-2">INVALID_ARGUMENT</div>
            <div className="bg-white rounded p-2">MISSING_ARGUMENT</div>
            <div className="bg-white rounded p-2">UNKNOWN_ERROR</div>
          </div>
          <p className="text-xs text-gray-600 mt-3">
            + Automatic fallback for unknown errors
          </p>
        </div>

        {/* Example Code */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Example Usage:</h4>
          <pre className="text-xs bg-white rounded p-3 overflow-x-auto">
            {`import { getErrorMessage, getErrorCode } from '@subscrypts/react-sdk';

// In your subscription flow
async function handleSubscribe() {
  try {
    await subscribe({ planId: '1', ... });
    showSuccess('Subscribed successfully!');
  } catch (error) {
    // Extract error code
    const code = getErrorCode(error);
    console.log('Error code:', code); // "INSUFFICIENT_FUNDS"

    // Get user-friendly message
    const { title, message, suggestion, isRetryable } = getErrorMessage(error);

    // Display to user
    showError({
      title,        // "Insufficient Funds"
      message,      // "Your wallet doesn't have enough funds..."
      suggestion,   // "Add more funds to your wallet and try again"
      canRetry: isRetryable  // true
    });

    // Track in analytics
    analytics.track('subscription_error', { code, isRetryable });
  }
}

// Programmatic error checking
if (getErrorCode(error) === 'ACTION_REJECTED') {
  // User cancelled, don't show error
  return;
}`}
          </pre>
        </div>

        {/* Important Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">💡 Best Practice:</h4>
          <p className="text-sm text-gray-700 mb-2">
            Always use <code className="bg-white px-1 py-0.5 rounded">getErrorMessage()</code> to
            present errors to users. It automatically:
          </p>
          <ul className="text-xs text-gray-600 ml-4 space-y-1">
            <li>• Maps technical blockchain errors to plain English</li>
            <li>• Provides actionable suggestions</li>
            <li>• Indicates whether retrying makes sense</li>
            <li>• Handles unknown errors gracefully</li>
          </ul>
        </div>

        {/* Used By */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">🔗 Used By:</h4>
          <p className="text-sm text-gray-700">
            The <code className="bg-white px-1 py-0.5 rounded">ErrorDisplay</code> component
            uses <code className="bg-white px-1 py-0.5 rounded">getErrorMessage()</code> internally
            to automatically display user-friendly error messages.
          </p>
        </div>
      </div>
    </DemoCard>
  );
}
