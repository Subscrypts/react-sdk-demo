/**
 * useMerchantPlans Hook Demo
 *
 * Demonstrates fetching all plans owned by the connected merchant (v1.4.0).
 */

import { useMerchantPlans, useWallet } from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';

export function UseMerchantPlansDemo() {
  const { isConnected, address } = useWallet();
  const { plans, isLoading, error, refetch } = useMerchantPlans();

  if (!isConnected) {
    return (
      <DemoCard
        title="useMerchantPlans"
        description="Fetch all subscription plans owned by your merchant account"
        version="v1.4.0"
      >
        <ConnectWalletPrompt />
      </DemoCard>
    );
  }

  return (
    <DemoCard
      title="useMerchantPlans"
      description="Fetch all subscription plans owned by your merchant account"
      version="v1.4.0"
    >
      <div className="space-y-4">
        {/* Merchant Info */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">
            Merchant Address:
          </h4>
          <p className="font-mono text-xs text-gray-700 break-all">{address}</p>
        </div>

        {/* Plans Display */}
        {isLoading ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <div className="text-gray-600">Loading your plans...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">Error: {error.message}</p>
          </div>
        ) : plans.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-gray-600 mb-3">No plans found for your merchant account</p>
            <p className="text-xs text-gray-500">
              Create your first plan on the Subscrypts platform to get started!
            </p>
          </div>
        ) : (
          <>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">
                  {plans.length} Plan{plans.length !== 1 ? 's' : ''} Found
                </h4>
                <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                  Merchant Owner
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-300 rounded-lg overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-3">
                    <h4 className="text-sm font-bold text-white">
                      Plan #{index + 1}
                    </h4>
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
          </>
        )}

        {/* Refresh Button */}
        <button
          onClick={() => refetch()}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Refresh Plans'}
        </button>

        {/* Use Cases */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Use Cases:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Build merchant dashboards</li>
            <li>✓ Display your plan catalog</li>
            <li>✓ Manage your subscription offerings</li>
            <li>✓ Track plan performance</li>
          </ul>
        </div>

        {/* Hook Info */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Return Values:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div>plans: Plan[] ({plans.length} plans)</div>
            <div>isLoading: {String(isLoading)}</div>
            <div>error: {error ? 'Error object' : 'null'}</div>
            <div>refetch: Function</div>
          </div>
        </div>

        {/* Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-xs text-yellow-800">
            <strong>Note:</strong> This hook only returns plans where the connected wallet is the merchant/owner.
            If you see no plans, connect with a merchant wallet that has created plans.
          </p>
        </div>
      </div>
    </DemoCard>
  );
}
