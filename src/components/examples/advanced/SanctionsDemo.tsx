/**
 * Sanctions Demo [v1.6.0]
 *
 * Demonstrates SDK v1.6.0 sanctions pre-flight checks:
 * - SanctionsError handling
 * - Pre-transaction validation
 * - Gas savings explanation
 * - Error message display
 */

import { useState } from 'react';
import { useSubscribe, usePlan } from '@subscrypts/react-sdk';

// Simulated SanctionsError for demo purposes
// In production SDK v1.6.0, this will be exported from '@subscrypts/react-sdk'
class SanctionsError extends Error {
  public readonly address: string;
  public readonly isMerchant: boolean;
  public readonly code: string;

  constructor(address: string, isMerchant: boolean, _details?: Record<string, unknown>) {
    super(
      `Address ${address} is sanctioned and cannot ${isMerchant ? 'receive payments' : 'create subscriptions'}`
    );
    this.name = 'SanctionsError';
    this.code = 'SANCTIONS_ERROR';
    this.address = address;
    this.isMerchant = isMerchant;
  }
}

export function SanctionsDemo() {
  const [planId, setPlanId] = useState('1');
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<SanctionsError | null>(null);
  const [success, setSuccess] = useState(false);
  const [demoStage, setDemoStage] = useState<'idle' | 'checking' | 'result'>('idle');

  const { plan } = usePlan(planId);
  useSubscribe(); // Hook is available for actual subscription flow

  const handleSimulateCheck = async () => {
    setIsChecking(true);
    setError(null);
    setSuccess(false);
    setDemoStage('checking');

    // Simulate the sanctions check process
    // In a real scenario, this would be done by the SDK automatically
    setTimeout(() => {
      setIsChecking(false);
      setDemoStage('result');
      // For demo purposes, we show a simulated error
      // In production, this would only trigger if the address is actually sanctioned
      setError(new SanctionsError(
        '0x1234...5678',
        false,
        { planId, message: 'This is a demonstration of the SanctionsError handling' }
      ));
    }, 1500);
  };

  const handleClear = () => {
    setError(null);
    setSuccess(false);
    setDemoStage('idle');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
            [v1.6.0] New Feature
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-2">Sanctions Pre-flight Checks</h3>
        <p className="text-red-100">
          Client-side validation prevents wasted gas on sanctioned addresses.
          The SDK checks both merchant and subscriber addresses before 
          initiating transactions.
        </p>
      </div>

      {/* Demo Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          🎮 Sanctions Check Demo
        </h4>

        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={planId}
            onChange={(e) => setPlanId(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="1">Plan 1 (Basic)</option>
            <option value="2">Plan 2 (Pro)</option>
            <option value="3">Plan 3 (Enterprise)</option>
          </select>

          <button
            onClick={handleSimulateCheck}
            disabled={isChecking}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isChecking ? '⏳ Checking...' : '🔍 Simulate Sanctions Check'}
          </button>

          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            🔄 Clear
          </button>
        </div>

        {/* Demo Status */}
        {demoStage === 'checking' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600"></div>
              <div>
                <p className="font-medium text-yellow-800">Performing sanctions check...</p>
                <p className="text-sm text-yellow-600">
                  Checking merchant and subscriber addresses against sanctions list
                </p>
              </div>
            </div>
            <div className="mt-3 text-xs text-yellow-700 space-y-1">
              <p>1. Querying plan details...</p>
              <p>2. Checking merchant address: {plan?.merchantAddress || 'Loading...'}</p>
              <p>3. Checking subscriber address...</p>
            </div>
          </div>
        )}

        {/* Sanctions Error Display */}
        {error instanceof SanctionsError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-4">
            <div className="flex items-start gap-3">
              <div className="bg-red-100 p-2 rounded-full">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h5 className="text-lg font-bold text-red-800 mb-2">
                  ⚠️ Address Sanctioned
                </h5>
                
                <div className="space-y-2 text-sm text-red-700">
                  <p>
                    <strong>Address:</strong>{' '}
                    <code className="bg-red-100 px-2 py-0.5 rounded">{error.address}</code>
                  </p>
                  <p>
                    <strong>Type:</strong>{' '}
                    {error.isMerchant ? 'Merchant' : 'Subscriber'}
                  </p>
                  <p>
                    <strong>Action Blocked:</strong>{' '}
                    {error.isMerchant 
                      ? 'Cannot receive payments' 
                      : 'Cannot create subscriptions'}
                  </p>
                </div>

                <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800 font-medium">
                    💰 Gas Saved: ~$2-5 in transaction fees
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    This check happened BEFORE the wallet approval popup, preventing 
                    a failed transaction that would waste gas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success State */}
        {success && (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">Sanctions check passed! Proceeding to subscription...</span>
            </div>
          </div>
        )}

        {/* Idle State Info */}
        {demoStage === 'idle' && (
          <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
            <p className="font-medium mb-2">How it works:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>User clicks "Subscribe"</li>
              <li>SDK checks if merchant address is sanctioned</li>
              <li>SDK checks if subscriber address is sanctioned</li>
              <li>If either is sanctioned: Throw SanctionsError immediately</li>
              <li>If both clear: Proceed to wallet approval popup</li>
            </ol>
          </div>
        )}
      </div>

      {/* Code Example */}
      <div className="bg-gray-900 rounded-xl p-6 text-white">
        <h4 className="text-lg font-semibold mb-4 text-gray-300">
          💻 Implementation Example
        </h4>
        <pre className="text-sm overflow-x-auto">
          <code>{`import { useSubscribe, SanctionsError } from '@subscrypts/react-sdk';

function SubscribeButton({ planId }) {
  const { subscribe } = useSubscribe();
  const [error, setError] = useState(null);

  const handleSubscribe = async () => {
    try {
      // SDK automatically performs sanctions check
      // BEFORE showing wallet popup
      await subscribe({ planId, ... });
      
    } catch (error) {
      if (error instanceof SanctionsError) {
        // Handle sanctioned address
        console.log('Address:', error.address);
        console.log('Is Merchant:', error.isMerchant);
        
        // Show user-friendly message
        alert(
          'This address cannot ' + 
          (error.isMerchant ? 'receive payments' : 'create subscriptions') +
          ' due to sanctions restrictions.'
        );
      }
    }
  };

  return <button onClick={handleSubscribe}>Subscribe</button>;
}`}</code>
        </pre>
      </div>

      {/* v1.6.0 Features */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">
          ✨ v1.6.0 Sanctions Features
        </h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span><strong>Pre-flight Validation:</strong> Check BEFORE wallet popup (saves gas)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span><strong>SanctionsError Class:</strong> Structured error with address and type info</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span><strong>Fail-open Pattern:</strong> If check fails, allow transaction (backwards compatible)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span><strong>Gas Savings:</strong> Prevents failed transactions costing $2-5 in fees</span>
          </li>
        </ul>
      </div>

      {/* Note about Production */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-800">
          <strong>ℹ️ Demo Note:</strong> This demo simulates a sanctions error for educational purposes.
          In production, the <code>SanctionsError</code> would only be thrown if the connected wallet 
          address or merchant address is actually on a sanctions list. The check is performed 
          automatically by the SDK's <code>useSubscribe</code> hook.
        </p>
      </div>
    </div>
  );
}