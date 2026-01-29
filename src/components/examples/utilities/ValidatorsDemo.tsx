/**
 * Validators Utility Demo
 *
 * Demonstrates all validation utility functions with interactive testing.
 */

import {
  validateAddress,
  validatePositiveNumber,
  validatePlanId,
  useWallet,
} from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';
import { useState } from 'react';

export function ValidatorsDemo() {
  const { isConnected } = useWallet();
  const [addressInput, setAddressInput] = useState('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');
  const [numberInput, setNumberInput] = useState('10');
  const [planIdInput, setPlanIdInput] = useState('1');

  // Validation results
  const [addressResult, setAddressResult] = useState<{ valid: boolean; message: string }>({ valid: true, message: '' });
  const [numberResult, setNumberResult] = useState<{ valid: boolean; message: string }>({ valid: true, message: '' });
  const [planIdResult, setPlanIdResult] = useState<{ valid: boolean; message: string }>({ valid: true, message: '' });

  if (!isConnected) {
    return (
      <DemoCard
        title="Validators"
        description="Utility functions for validating addresses, numbers, and plan IDs"
        version="v1.0.0"
      >
        <ConnectWalletPrompt />
      </DemoCard>
    );
  }

  // Validate address
  const testValidateAddress = () => {
    try {
      validateAddress(addressInput, 'Test Address');
      setAddressResult({ valid: true, message: '✅ Valid Ethereum address' });
    } catch (error) {
      setAddressResult({ valid: false, message: `❌ ${(error as Error).message}` });
    }
  };

  // Validate positive number
  const testValidateNumber = () => {
    try {
      const num = parseFloat(numberInput);
      validatePositiveNumber(num, 'Test Number');
      setNumberResult({ valid: true, message: '✅ Valid positive number' });
    } catch (error) {
      setNumberResult({ valid: false, message: `❌ ${(error as Error).message}` });
    }
  };

  // Validate plan ID
  const testValidatePlanId = () => {
    try {
      validatePlanId(planIdInput);
      setPlanIdResult({ valid: true, message: '✅ Valid plan ID' });
    } catch (error) {
      setPlanIdResult({ valid: false, message: `❌ ${(error as Error).message}` });
    }
  };

  return (
    <DemoCard
      title="Validators"
      description="Utility functions for validating addresses, numbers, and plan IDs"
      version="v1.0.0"
    >
      <div className="space-y-6">
        {/* validateAddress */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">validateAddress</h4>
          <p className="text-sm text-gray-700 mb-3">
            Validates Ethereum addresses (checksummed or lowercase).
          </p>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Test Address:
            </label>
            <input
              type="text"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
              placeholder="0x..."
            />
            <button
              onClick={testValidateAddress}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Validate
            </button>
            {addressResult.message && (
              <div className={`mt-2 p-3 rounded-lg ${
                addressResult.valid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <p className={`text-sm ${addressResult.valid ? 'text-green-700' : 'text-red-700'}`}>
                  {addressResult.message}
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <p className="text-xs font-semibold text-gray-700 mb-1">Test Cases:</p>
            <div className="text-xs text-gray-600 space-y-1">
              <div>✅ Valid: <code>0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb</code></div>
              <div>❌ Invalid: <code>0x123</code> (too short)</div>
              <div>❌ Invalid: <code>not-an-address</code></div>
            </div>
          </div>
        </div>

        {/* validatePositiveNumber */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">validatePositiveNumber</h4>
          <p className="text-sm text-gray-700 mb-3">
            Validates that a number is positive (greater than 0).
          </p>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Test Number:
            </label>
            <input
              type="number"
              value={numberInput}
              onChange={(e) => setNumberInput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
              placeholder="Enter number"
            />
            <button
              onClick={testValidateNumber}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              Validate
            </button>
            {numberResult.message && (
              <div className={`mt-2 p-3 rounded-lg ${
                numberResult.valid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <p className={`text-sm ${numberResult.valid ? 'text-green-700' : 'text-red-700'}`}>
                  {numberResult.message}
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <p className="text-xs font-semibold text-gray-700 mb-1">Test Cases:</p>
            <div className="text-xs text-gray-600 space-y-1">
              <div>✅ Valid: <code>10</code>, <code>0.5</code>, <code>1000</code></div>
              <div>❌ Invalid: <code>0</code> (not positive)</div>
              <div>❌ Invalid: <code>-5</code> (negative)</div>
              <div>❌ Invalid: <code>NaN</code></div>
            </div>
          </div>
        </div>

        {/* validatePlanId */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">validatePlanId</h4>
          <p className="text-sm text-gray-700 mb-3">
            Validates that a plan ID is a non-empty string.
          </p>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Test Plan ID:
            </label>
            <input
              type="text"
              value={planIdInput}
              onChange={(e) => setPlanIdInput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
              placeholder="Enter plan ID"
            />
            <button
              onClick={testValidatePlanId}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
            >
              Validate
            </button>
            {planIdResult.message && (
              <div className={`mt-2 p-3 rounded-lg ${
                planIdResult.valid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <p className={`text-sm ${planIdResult.valid ? 'text-green-700' : 'text-red-700'}`}>
                  {planIdResult.message}
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <p className="text-xs font-semibold text-gray-700 mb-1">Test Cases:</p>
            <div className="text-xs text-gray-600 space-y-1">
              <div>✅ Valid: <code>"1"</code>, <code>"basic-plan"</code>, <code>"plan-123"</code></div>
              <div>❌ Invalid: <code>""</code> (empty string)</div>
              <div>❌ Invalid: <code>"   "</code> (only whitespace)</div>
            </div>
          </div>
        </div>

        {/* Function Reference */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">All Validator Functions:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div><strong>validateAddress(address, fieldName?)</strong> - Validate Ethereum address</div>
            <div><strong>validatePositiveNumber(value, fieldName?)</strong> - Validate positive number</div>
            <div><strong>validatePositiveBigInt(value, fieldName?)</strong> - Validate positive BigInt</div>
            <div><strong>validatePlanId(planId)</strong> - Validate non-empty plan ID</div>
            <div><strong>validateCycleLimit(cycles)</strong> - Validate cycle limit (0 = unlimited)</div>
          </div>
        </div>

        {/* Example Code */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Example Usage:</h4>
          <pre className="text-xs bg-white rounded p-3 overflow-x-auto">
            {`import {
  validateAddress,
  validatePositiveNumber,
  validatePlanId,
} from '@subscrypts/react-sdk';

// Validate address (throws on error)
try {
  validateAddress(userAddress, 'User Address');
  console.log('Valid address!');
} catch (error) {
  console.error(error.message); // "Invalid User Address"
}

// Validate positive number
try {
  validatePositiveNumber(amount, 'Amount');
  // Proceed with amount
} catch (error) {
  showError(error.message);
}

// Validate plan ID
try {
  validatePlanId(planId);
  // Proceed with subscription
} catch (error) {
  showError('Invalid plan ID');
}

// Note: All validators throw errors on failure
// Use try/catch or handle errors in your code`}
          </pre>
        </div>

        {/* Important Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">⚠️ Error Handling:</h4>
          <p className="text-sm text-gray-700">
            All validator functions <strong>throw errors</strong> when validation fails. Always use
            try/catch blocks when calling them in your code. The SDK uses these internally before
            making blockchain calls to catch invalid inputs early.
          </p>
        </div>
      </div>
    </DemoCard>
  );
}
