import { SubscriptionGuard, useWallet, useMySubscriptions } from '@subscrypts/react-sdk';
import { Link } from 'react-router-dom';
import { DEMO_PLANS } from '../config/plans';

function PremiumContent() {
  // Fetch ALL user's subscriptions from blockchain (v1.3.0+)
  const { address } = useWallet();
  const { subscriptions } = useMySubscriptions(address || undefined, 10);

  // Filter for subscriptions to demo plans
  const activeSubscriptions = subscriptions.map(sub => {
    // Convert numeric planId from blockchain to string for comparison with DEMO_PLANS
    const planIdStr = String(sub.planId);
    const matchingPlan = DEMO_PLANS.find(plan => plan.id === planIdStr);
    return matchingPlan ? { plan: matchingPlan, subscription: sub } : null;
  }).filter((item): item is { plan: typeof DEMO_PLANS[0]; subscription: typeof subscriptions[0] } => item !== null);

  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-gradient-to-b from-purple-50 to-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Premium Content
          </h1>
          <p className="text-xl text-gray-600">
            Welcome to the exclusive members area!
          </p>
        </div>

        {/* Active Subscriptions */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Active Subscriptions
          </h2>
          {activeSubscriptions.length > 0 ? (
            <div className="space-y-4">
              {activeSubscriptions.map(({ plan, subscription }) => (
                <div
                  key={plan.id}
                  className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {plan.name} Plan
                    </h3>
                    <p className="text-sm text-gray-600">
                      Next Payment: {formatDate(subscription.nextPaymentDate)}
                    </p>
                    {subscription.isAutoRenewing && (
                      <p className="text-sm text-green-600 font-medium">
                        ✓ Auto-renewing
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-green-600 text-white rounded-full text-sm font-medium">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No active subscriptions found.</p>
          )}
          <div className="mt-6 flex justify-end">
            <Link
              to="/account"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Manage Subscriptions →
            </Link>
          </div>
        </div>

        {/* Premium Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Exclusive Content
            </h3>
            <p className="text-gray-600">
              Access to premium articles, tutorials, and resources available
              only to subscribers.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Video Tutorials
            </h3>
            <p className="text-gray-600">
              Watch in-depth video tutorials and live streams reserved for
              premium members.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Community Access
            </h3>
            <p className="text-gray-600">
              Join our private Discord community and connect with other premium
              members.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Early Access
            </h3>
            <p className="text-gray-600">
              Get early access to new features, updates, and product launches
              before anyone else.
            </p>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
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
                Demo Application
              </h4>
              <p className="text-blue-800 mb-4">
                This is a demonstration of the SubscriptionGuard component. In a
                real application, this page would contain your actual premium
                content that only subscribers can access.
              </p>
              <p className="text-sm text-blue-700">
                The SubscriptionGuard component automatically checks if the
                connected wallet has an active subscription and redirects
                non-subscribers to the pricing page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Premium() {
  // Wrap the premium content with SubscriptionGuard
  // This will automatically redirect to /pricing if user doesn't have any active subscription
  // Only accepts subscriptions to plan IDs 1 and 2 (Basic and Pro) - the merchant's plans for this demo
  return (
    <SubscriptionGuard
      planIds={DEMO_PLANS.slice(0, 2).map(p => p.id)} // Accept ONLY Basic (ID 1) and Pro (ID 2)
      requireAll={false} // Any active subscription to these plans grants access
      fallbackUrl="/pricing"
    >
      <PremiumContent />
    </SubscriptionGuard>
  );
}

export default Premium;
