/**
 * SubscriptionGuard Component Demo
 *
 * Demonstrates content protection based on subscription status (v1.0.0, enhanced v1.1.0).
 */

import { SubscriptionGuard, useWallet, useSubscriptionStatus } from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';
import { DEMO_PLANS } from '../../../config/plans';
import { useState } from 'react';

export function SubscriptionGuardDemo() {
  const { isConnected } = useWallet();
  const [mode, setMode] = useState<'single' | 'multi-any' | 'multi-all'>('single');
  const [selectedPlan1] = useState(DEMO_PLANS[0].id);
  const [selectedPlan2] = useState(DEMO_PLANS[1]?.id || DEMO_PLANS[0].id);

  // Check subscription status to show what user would see
  const { status } = useSubscriptionStatus(selectedPlan1);
  const isActive = status?.isActive;

  if (!isConnected) {
    return (
      <DemoCard
        title="SubscriptionGuard"
        description="Protect content based on subscription status"
        version="v1.0.0 (Multi-plan: v1.1.0)"
      >
        <ConnectWalletPrompt />
      </DemoCard>
    );
  }

  return (
    <DemoCard
      title="SubscriptionGuard"
      description="Protect content based on subscription status"
      version="v1.0.0 (Multi-plan: v1.1.0)"
    >
      <div className="space-y-4">
        {/* Mode Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Protection Mode:
          </label>
          <div className="space-y-2">
            <label className="flex items-start gap-2">
              <input
                type="radio"
                checked={mode === 'single'}
                onChange={() => setMode('single')}
                className="mt-1"
              />
              <div>
                <div className="font-medium text-sm">Single Plan</div>
                <div className="text-xs text-gray-600">
                  Requires subscription to one specific plan
                </div>
              </div>
            </label>
            <label className="flex items-start gap-2">
              <input
                type="radio"
                checked={mode === 'multi-any'}
                onChange={() => setMode('multi-any')}
                className="mt-1"
              />
              <div>
                <div className="font-medium text-sm">Multi-Plan (Any) - v1.1.0</div>
                <div className="text-xs text-gray-600">
                  Requires subscription to ANY of the specified plans
                </div>
              </div>
            </label>
            <label className="flex items-start gap-2">
              <input
                type="radio"
                checked={mode === 'multi-all'}
                onChange={() => setMode('multi-all')}
                className="mt-1"
              />
              <div>
                <div className="font-medium text-sm">Multi-Plan (All) - v1.1.0</div>
                <div className="text-xs text-gray-600">
                  Requires subscription to ALL of the specified plans
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Current Status */}
        <div className={`rounded-lg p-4 border-2 ${
          isActive ? 'bg-green-50 border-green-300' : 'bg-yellow-50 border-yellow-300'
        }`}>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-2xl">{isActive ? '✅' : '🔒'}</span>
            <div>
              <div className="font-semibold">{isActive ? 'Access Granted' : 'No Active Subscription'}</div>
              <div className="text-xs text-gray-600">
                {isActive
                  ? `You have an active subscription to ${DEMO_PLANS[0].name}`
                  : `Subscribe to ${DEMO_PLANS[0].name} to see protected content`
                }
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview - Single Plan */}
        {mode === 'single' && (
          <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              Single Plan Protection:
            </h4>
            <SubscriptionGuard
              planId={selectedPlan1}
              fallbackUrl="/pricing"
            >
              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="text-lg font-bold text-green-900 mb-2">
                  Premium Content Unlocked!
                </h3>
                <p className="text-green-700 mb-4">
                  You have an active subscription to {DEMO_PLANS[0].name}
                </p>
                <div className="p-4 bg-white rounded-lg text-left">
                  <h4 className="font-semibold mb-2">Exclusive Content:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Advanced tutorials and guides</li>
                    <li>• Priority support access</li>
                    <li>• Early feature access</li>
                    <li>• Downloadable resources</li>
                  </ul>
                </div>
              </div>
            </SubscriptionGuard>
          </div>
        )}

        {/* Live Preview - Multi-Plan (Any) */}
        {mode === 'multi-any' && (
          <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              Multi-Plan Protection (Any):
            </h4>
            <SubscriptionGuard
              planIds={[selectedPlan1, selectedPlan2]}
              requireAll={false}
              fallbackUrl="/pricing"
            >
              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="text-lg font-bold text-green-900 mb-2">
                  Content Unlocked!
                </h3>
                <p className="text-green-700">
                  You have an active subscription to one of the required plans
                </p>
                <div className="text-xs text-gray-600 mt-2">
                  Accepted plans: {DEMO_PLANS[0].name} or {DEMO_PLANS[1]?.name || 'Plan 2'}
                </div>
              </div>
            </SubscriptionGuard>
          </div>
        )}

        {/* Live Preview - Multi-Plan (All) */}
        {mode === 'multi-all' && (
          <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              Multi-Plan Protection (All):
            </h4>
            <SubscriptionGuard
              planIds={[selectedPlan1, selectedPlan2]}
              requireAll={true}
              fallbackUrl="/pricing"
            >
              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">🎁</div>
                <h3 className="text-lg font-bold text-green-900 mb-2">
                  Bundle Content Unlocked!
                </h3>
                <p className="text-green-700">
                  You have active subscriptions to all required plans
                </p>
                <div className="text-xs text-gray-600 mt-2">
                  Required: {DEMO_PLANS[0].name} AND {DEMO_PLANS[1]?.name || 'Plan 2'}
                </div>
              </div>
            </SubscriptionGuard>
          </div>
        )}

        {/* Features */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Features:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Automatic subscription status checking</li>
            <li>✓ Single or multi-plan protection (v1.1.0)</li>
            <li>✓ Automatic redirect when not subscribed (fallbackUrl)</li>
            <li>✓ Loading states handled automatically</li>
            <li>✓ Perfect for gating premium content</li>
            <li>✓ Works with routes and components</li>
          </ul>
        </div>

        {/* Props Documentation */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Component Props:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div><strong>planId:</strong> string - Single plan ID (v1.0.0)</div>
            <div><strong>planIds:</strong> string[] - Multiple plan IDs (v1.1.0)</div>
            <div><strong>requireAll:</strong> boolean - Require all plans (default: false)</div>
            <div><strong>fallbackUrl:</strong> string - Redirect URL when not subscribed</div>
            <div><strong>loadingComponent:</strong> ReactNode - Custom loading state UI</div>
            <div><strong>onAccessDenied:</strong> () =&gt; void - Callback when access denied</div>
            <div><strong>children:</strong> ReactNode - Protected content</div>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">⚠️ Important Note:</h4>
          <p className="text-sm text-gray-700">
            SubscriptionGuard automatically redirects to <code className="bg-white px-1 py-0.5 rounded">fallbackUrl</code> when the user doesn't have an active subscription.
            If you're subscribed, you'll see the protected content above. If not, clicking through would redirect to the pricing page.
          </p>
        </div>

        {/* Example Code */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Example Usage:</h4>
          <pre className="text-xs bg-white rounded p-3 overflow-x-auto">
            {`import { SubscriptionGuard } from '@subscrypts/react-sdk';

// Single plan protection
<SubscriptionGuard
  planId="1"
  fallbackUrl="/pricing"
>
  <PremiumContent />
</SubscriptionGuard>

// Multi-plan (any)
<SubscriptionGuard
  planIds={["1", "2", "3"]}
  requireAll={false}
  fallbackUrl="/subscribe"
>
  <PremiumFeature />
</SubscriptionGuard>

// Multi-plan (all)
<SubscriptionGuard
  planIds={["1", "2"]}
  requireAll={true}
  onAccessDenied={() => console.log('Access denied!')}
>
  <ExclusiveBundleContent />
</SubscriptionGuard>`}
          </pre>
        </div>
      </div>
    </DemoCard>
  );
}
