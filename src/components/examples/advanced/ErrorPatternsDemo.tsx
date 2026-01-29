/**
 * ErrorPatternsDemo - Error Handling Best Practices
 *
 * Demonstrates error handling patterns, custom error classes,
 * and recovery strategies for robust SDK integration.
 * Added in SDK v1.1.0.
 */

import { useState } from 'react';
import {
  useSubscribe,
  getErrorMessage,
  getErrorCode,
  SubscryptsError,
  WalletError,
  NetworkError,
  ContractError,
  InsufficientBalanceError,
  TransactionError,
  ValidationError,
} from '@subscrypts/react-sdk';
import { DemoCard } from '../shared';

export function ErrorPatternsDemo() {
  const { subscribe } = useSubscribe();
  const [errorLog, setErrorLog] = useState<string[]>([]);

  const logError = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setErrorLog(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, 10));
  };

  // Pattern 1: Basic Try-Catch
  const handleBasicTryCatch = async () => {
    try {
      await subscribe({
        planId: '999', // Non-existent plan
        cycleLimit: 1,
        autoRenew: false,
        paymentMethod: 'USDC',
      });
      logError('✅ Success (unexpected)');
    } catch (error) {
      logError(`❌ Basic catch: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Pattern 2: Error Type Checking
  const handleErrorTypeChecking = async () => {
    try {
      await subscribe({
        planId: '1',
        cycleLimit: 1,
        autoRenew: false,
        paymentMethod: 'USDC',
      });
      logError('✅ Success (or user rejected)');
    } catch (error) {
      // Check specific error types
      if (error instanceof InsufficientBalanceError) {
        logError('❌ InsufficientBalanceError: User does not have enough tokens');
      } else if (error instanceof WalletError) {
        logError('❌ WalletError: Issue with wallet connection');
      } else if (error instanceof ContractError) {
        logError('❌ ContractError: Smart contract interaction failed');
      } else if (error instanceof TransactionError) {
        logError('❌ TransactionError: Transaction was rejected or failed');
      } else if (error instanceof NetworkError) {
        logError('❌ NetworkError: Network issue or wrong chain');
      } else if (error instanceof ValidationError) {
        logError('❌ ValidationError: Invalid input parameters');
      } else if (error instanceof SubscryptsError) {
        logError('❌ SubscryptsError: General SDK error');
      } else {
        logError(`❌ Unknown error: ${error instanceof Error ? error.message : 'Unknown'}`);
      }
    }
  };

  // Pattern 3: Using Error Utilities
  const handleErrorUtilities = async () => {
    try {
      await subscribe({
        planId: '1',
        cycleLimit: 1,
        autoRenew: false,
        paymentMethod: 'USDC',
      });
      logError('✅ Success');
    } catch (error) {
      // Use SDK error utilities
      const code = getErrorCode(error);
      const config = getErrorMessage(error);

      logError(`❌ Code: ${code}, Message: ${config.message}`);
      logError(`   Suggestion: ${config.suggestion}`);
    }
  };

  // Pattern 4: Error Recovery
  const handleErrorRecovery = async () => {
    let retries = 0;
    const maxRetries = 3;

    while (retries < maxRetries) {
      try {
        await subscribe({
          planId: '1',
          cycleLimit: 1,
          autoRenew: false,
          paymentMethod: 'USDC',
        });
        logError('✅ Success after retry');
        return;
      } catch (error) {
        retries++;

        if (error instanceof NetworkError && retries < maxRetries) {
          logError(`⚠️ Network error, retrying (${retries}/${maxRetries})...`);
          await new Promise(resolve => setTimeout(resolve, 1000));
          continue;
        }

        // Non-retryable error or max retries reached
        const config = getErrorMessage(error);
        logError(`❌ Failed after ${retries} attempts: ${config.message}`);
        break;
      }
    }
  };

  // Pattern 5: Graceful Degradation
  const handleGracefulDegradation = async () => {
    try {
      // Try primary method
      await subscribe({
        planId: '1',
        cycleLimit: 1,
        autoRenew: false,
        paymentMethod: 'USDC',
      });
      logError('✅ Primary method succeeded');
    } catch (error) {
      logError('⚠️ Primary method failed, trying fallback...');

      try {
        // Fallback method
        await subscribe({
          planId: '1',
          cycleLimit: 1,
          autoRenew: false,
          paymentMethod: 'SUBS', // Try different payment method
        });
        logError('✅ Fallback method succeeded');
      } catch (fallbackError) {
        const config = getErrorMessage(fallbackError);
        logError(`❌ Both methods failed: ${config.message}`);
      }
    }
  };

  const clearLog = () => {
    setErrorLog([]);
  };

  return (
    <DemoCard
      title="Error Handling Patterns"
      description="Learn best practices for handling errors gracefully in your Subscrypts integration."
    >
      <div className="space-y-6">
        {/* Error Patterns */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Error Handling Patterns</h3>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={handleBasicTryCatch}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium text-left"
            >
              1. Basic Try-Catch Pattern
            </button>
            <button
              onClick={handleErrorTypeChecking}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium text-left"
            >
              2. Error Type Checking
            </button>
            <button
              onClick={handleErrorUtilities}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium text-left"
            >
              3. Using Error Utilities
            </button>
            <button
              onClick={handleErrorRecovery}
              className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors text-sm font-medium text-left"
            >
              4. Error Recovery with Retries
            </button>
            <button
              onClick={handleGracefulDegradation}
              className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm font-medium text-left"
            >
              5. Graceful Degradation
            </button>
            <button
              onClick={clearLog}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
            >
              Clear Log
            </button>
          </div>
        </div>

        {/* Error Log */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Error Log</h3>
          <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-xs h-48 overflow-y-auto">
            {errorLog.length === 0 ? (
              <p className="text-gray-500">No errors yet. Try the patterns above to see error handling in action.</p>
            ) : (
              errorLog.map((log, i) => (
                <div key={i} className="mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            💡 Note: These demos simulate error scenarios. Connect your wallet and try the patterns to see real error handling.
          </p>
        </div>

        {/* SDK Error Classes */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">SDK Error Classes</h3>
          <div className="space-y-2">
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-mono text-sm text-blue-600 mb-1">SubscryptsError</h4>
              <p className="text-xs text-gray-600">Base error class for all SDK errors</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-mono text-sm text-blue-600 mb-1">WalletError</h4>
              <p className="text-xs text-gray-600">Wallet connection or account issues</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-mono text-sm text-blue-600 mb-1">NetworkError</h4>
              <p className="text-xs text-gray-600">Network connectivity or wrong chain</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-mono text-sm text-blue-600 mb-1">ContractError</h4>
              <p className="text-xs text-gray-600">Smart contract interaction failures</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-mono text-sm text-blue-600 mb-1">InsufficientBalanceError</h4>
              <p className="text-xs text-gray-600">Not enough tokens or gas</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-mono text-sm text-blue-600 mb-1">TransactionError</h4>
              <p className="text-xs text-gray-600">Transaction rejected or reverted</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-mono text-sm text-blue-600 mb-1">ValidationError</h4>
              <p className="text-xs text-gray-600">Invalid input parameters</p>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Code Examples</h3>
          <div className="space-y-4">
            {/* Pattern 1: Basic Try-Catch */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Pattern 1: Basic Try-Catch</h4>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`import { useSubscribe } from '@subscrypts/react-sdk';

function SubscribeButton() {
  const { subscribe } = useSubscribe();

  const handleSubscribe = async () => {
    try {
      const result = await subscribe({
        planId: '1',
        paymentMethod: 'USDC',
      });
      console.log('Success:', result);
    } catch (error) {
      console.error('Failed:', error);
      // Show error to user
      alert(\`Error: \${error.message}\`);
    }
  };

  return <button onClick={handleSubscribe}>Subscribe</button>;
}`}</pre>
              </div>
            </div>

            {/* Pattern 2: Error Type Checking */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Pattern 2: Error Type Checking</h4>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`import {
  useSubscribe,
  InsufficientBalanceError,
  WalletError,
  NetworkError,
  TransactionError,
} from '@subscrypts/react-sdk';

function SubscribeWithTypeChecking() {
  const { subscribe } = useSubscribe();

  const handleSubscribe = async () => {
    try {
      await subscribe({ planId: '1', paymentMethod: 'USDC' });
    } catch (error) {
      if (error instanceof InsufficientBalanceError) {
        // Show "insufficient funds" message
        alert('You don\\'t have enough tokens. Please add funds.');
      } else if (error instanceof WalletError) {
        // Show "connect wallet" prompt
        alert('Please connect your wallet to continue.');
      } else if (error instanceof NetworkError) {
        // Show "wrong network" message
        alert('Please switch to Arbitrum network.');
      } else if (error instanceof TransactionError) {
        // User rejected transaction
        console.log('User cancelled transaction');
      } else {
        // Generic error
        alert(\`Error: \${error.message}\`);
      }
    }
  };

  return <button onClick={handleSubscribe}>Subscribe</button>;
}`}</pre>
              </div>
            </div>

            {/* Pattern 3: Using Error Utilities */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Pattern 3: Using Error Utilities</h4>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`import {
  useSubscribe,
  getErrorMessage,
  getErrorCode,
} from '@subscrypts/react-sdk';

function SubscribeWithUtilities() {
  const { subscribe } = useSubscribe();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = async () => {
    try {
      await subscribe({ planId: '1', paymentMethod: 'USDC' });
      setErrorMessage('');
    } catch (error) {
      // Get user-friendly error message
      const errorConfig = getErrorMessage(error);
      const errorCode = getErrorCode(error);

      // Show user-friendly message to user
      setErrorMessage(errorConfig.userMessage);

      // Log technical details for debugging
      console.error('Error Code:', errorCode);
      console.error('Technical Details:', errorConfig.technicalDetails);
      console.error('Suggestion:', errorConfig.suggestion);
    }
  };

  return (
    <div>
      <button onClick={handleSubscribe}>Subscribe</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}`}</pre>
              </div>
            </div>

            {/* Pattern 4: Retry Logic */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Pattern 4: Error Recovery with Retries</h4>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`import { useSubscribe, NetworkError } from '@subscrypts/react-sdk';

function SubscribeWithRetry() {
  const { subscribe } = useSubscribe();

  const subscribeWithRetry = async (
    params: SubscribeParams,
    maxRetries = 3
  ) => {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await subscribe(params);
      } catch (error) {
        lastError = error as Error;

        // Only retry on network errors
        if (error instanceof NetworkError && attempt < maxRetries) {
          console.log(\`Retry \${attempt}/\${maxRetries} after network error\`);
          // Exponential backoff
          await new Promise(resolve =>
            setTimeout(resolve, 1000 * Math.pow(2, attempt - 1))
          );
          continue;
        }

        // Don't retry other errors
        break;
      }
    }

    throw lastError;
  };

  const handleSubscribe = async () => {
    try {
      await subscribeWithRetry({
        planId: '1',
        paymentMethod: 'USDC',
      });
    } catch (error) {
      console.error('Failed after retries:', error);
    }
  };

  return <button onClick={handleSubscribe}>Subscribe</button>;
}`}</pre>
              </div>
            </div>

            {/* Pattern 5: Graceful Degradation */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Pattern 5: Graceful Degradation</h4>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`import { useSubscribe } from '@subscrypts/react-sdk';

function SubscribeWithFallback() {
  const { subscribe } = useSubscribe();

  const handleSubscribe = async () => {
    // Try USDC payment first
    try {
      await subscribe({
        planId: '1',
        cycleLimit: 1,
        autoRenew: false,
        paymentMethod: 'USDC',
      });
      console.log('Subscribed with USDC');
      return;
    } catch (usdcError) {
      console.warn('USDC payment failed, trying SUBS...');
    }

    // Fallback to SUBS payment
    try {
      await subscribe({
        planId: '1',
        paymentMethod: 'SUBS',
      });
      console.log('Subscribed with SUBS');
      return;
    } catch (subsError) {
      console.error('Both payment methods failed');
      throw subsError;
    }
  };

  return <button onClick={handleSubscribe}>Subscribe</button>;
}`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 border-l-4 border-green-500 p-4">
          <h3 className="font-semibold text-green-900 mb-2">💡 Best Practices</h3>
          <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
            <li>Always wrap SDK calls in try-catch blocks</li>
            <li>Use error type checking for specific error handling</li>
            <li>Show user-friendly messages with <code className="bg-green-100 px-1 rounded">getErrorMessage()</code></li>
            <li>Log technical details for debugging but don't show to users</li>
            <li>Implement retry logic for transient network errors</li>
            <li>Provide fallback options when possible (different payment methods, etc.)</li>
            <li>Never swallow errors silently - always log or notify</li>
            <li>Use loading states during async operations to prevent double-clicks</li>
            <li>Validate inputs before making SDK calls to prevent <code className="bg-green-100 px-1 rounded">ValidationError</code></li>
          </ul>
        </div>

        {/* Common Scenarios */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <h3 className="font-semibold text-blue-900 mb-2">📋 Common Error Scenarios</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <div>
              <strong>User Rejects Transaction:</strong> Catch <code className="bg-blue-100 px-1 rounded">TransactionError</code> and show a friendly "Transaction cancelled" message
            </div>
            <div>
              <strong>Insufficient Balance:</strong> Catch <code className="bg-blue-100 px-1 rounded">InsufficientBalanceError</code> and prompt user to add funds
            </div>
            <div>
              <strong>Wrong Network:</strong> Catch <code className="bg-blue-100 px-1 rounded">NetworkError</code> and show network switch prompt
            </div>
            <div>
              <strong>Wallet Not Connected:</strong> Catch <code className="bg-blue-100 px-1 rounded">WalletError</code> and show connect wallet button
            </div>
            <div>
              <strong>Network Timeout:</strong> Implement retry logic with exponential backoff
            </div>
          </div>
        </div>
      </div>
    </DemoCard>
  );
}
