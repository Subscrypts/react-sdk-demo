import { useWallet, useTokenBalance, PricingTable } from '@subscrypts/react-sdk';
import { useNavigate } from 'react-router-dom';

function Pricing() {
  const { isConnected } = useWallet();
  const { formatted: subsBalance } = useTokenBalance('SUBS');
  const { formatted: usdcBalance } = useTokenBalance('USDC');
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the subscription plan that best fits your needs. All plans
            include access to our core features on the Arbitrum network.
          </p>
        </div>

        {/* Token Balances (shown when wallet connected) */}
        {isConnected && (subsBalance || usdcBalance) && (
          <div className="max-w-2xl mx-auto mb-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Your Token Balances
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">SUBS Balance</div>
                <div className="text-2xl font-bold text-blue-600">
                  {subsBalance || '0.00'}
                </div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">USDC Balance</div>
                <div className="text-2xl font-bold text-green-600">
                  {usdcBalance || '0.00'}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">
              You can pay with either SUBS or USDC tokens
            </p>
          </div>
        )}

        {/* Wallet Connection Notice */}
        {!isConnected && (
          <div className="max-w-2xl mx-auto mb-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start">
              <svg
                className="w-6 h-6 text-blue-600 mt-0.5 mr-3 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h4 className="text-lg font-semibold text-blue-900 mb-1">
                  Connect Your Wallet
                </h4>
                <p className="text-blue-800">
                  Please connect your MetaMask wallet to subscribe to a plan.
                  You'll need SUBS or USDC tokens on the Arbitrum network.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SDK's PricingTable Component */}
        <div className="max-w-6xl mx-auto mb-12">
          <PricingTable
            plans={[
              { planId: '1', featured: false },
              { planId: '2', featured: true },
              { planId: '3', featured: false }
            ]}
            columns={3}
            showFields={['description', 'amount', 'frequency', 'subscribers']}
            onSubscriptionSuccess={(subscriptionId, planId) => {
              console.log('Subscription successful:', subscriptionId, 'for plan:', planId);
              navigate('/premium');
            }}
          />
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods are accepted?
              </h3>
              <p className="text-gray-600">
                You can pay with SUBS tokens or USDC on the Arbitrum network.
                If you pay with USDC, it will be automatically swapped to SUBS
                tokens during the transaction.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do subscription cycles work?
              </h3>
              <p className="text-gray-600">
                During checkout, you can choose your subscription duration (12,
                24, or 36 months). You can also enable auto-renewal to
                automatically extend your subscription when it expires.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I cancel my subscription?
              </h3>
              <p className="text-gray-600">
                Yes, you can manage your subscription settings from your account
                page. You can disable auto-renewal at any time, and your
                subscription will remain active until the end of the current
                period.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What network do I need to be on?
              </h3>
              <p className="text-gray-600">
                All subscriptions run on the Arbitrum One network (Chain ID:
                42161). If you're on a different network, the SDK will
                automatically prompt you to switch when you try to subscribe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
