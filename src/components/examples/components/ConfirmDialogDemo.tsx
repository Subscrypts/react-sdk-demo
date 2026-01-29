/**
 * ConfirmDialog Component Demo
 *
 * Demonstrates the reusable confirmation dialog (v1.2.0).
 */

import { ConfirmDialog, useWallet } from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';
import { useState } from 'react';

export function ConfirmDialogDemo() {
  const { isConnected } = useWallet();
  const [showDanger, setShowDanger] = useState(false);
  const [showDefault, setShowDefault] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  if (!isConnected) {
    return (
      <DemoCard
        title="ConfirmDialog"
        description="Reusable confirmation dialog for important actions"
        version="v1.2.0"
      >
        <ConnectWalletPrompt />
      </DemoCard>
    );
  }

  return (
    <DemoCard
      title="ConfirmDialog"
      description="Reusable confirmation dialog for important actions"
      version="v1.2.0"
    >
      <div className="space-y-4">
        {/* Demo Triggers */}
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Try the Dialogs:</h4>

          <div className="space-y-3">
            {/* Danger Variant */}
            <div>
              <button
                onClick={() => setShowDanger(true)}
                className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Open Danger Dialog (Cancel Subscription)
              </button>
              <p className="text-xs text-gray-600 mt-1">
                Red variant for destructive actions like cancellations or deletions
              </p>
            </div>

            {/* Default Variant */}
            <div>
              <button
                onClick={() => setShowDefault(true)}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Open Default Dialog (Save Changes)
              </button>
              <p className="text-xs text-gray-600 mt-1">
                Standard variant for non-destructive confirmations
              </p>
            </div>
          </div>
        </div>

        {/* Last Action Result */}
        {lastAction && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <div>
                <div className="font-semibold text-green-900">Action Confirmed</div>
                <div className="text-sm text-gray-700">{lastAction}</div>
              </div>
            </div>
          </div>
        )}

        {/* Danger Dialog */}
        <ConfirmDialog
          isOpen={showDanger}
          title="Cancel Subscription?"
          message="Your subscription will remain active until the end of the current billing period. This action cannot be undone."
          variant="danger"
          confirmLabel="Cancel Subscription"
          cancelLabel="Keep Subscription"
          onConfirm={() => {
            setLastAction('Subscription cancelled (danger variant confirmed)');
            setShowDanger(false);
          }}
          onCancel={() => {
            setShowDanger(false);
          }}
        />

        {/* Default Dialog */}
        <ConfirmDialog
          isOpen={showDefault}
          title="Save Changes?"
          message="Do you want to save the changes you made to your subscription settings?"
          variant="default"
          confirmLabel="Save Changes"
          cancelLabel="Discard"
          onConfirm={() => {
            setLastAction('Changes saved (default variant confirmed)');
            setShowDefault(false);
          }}
          onCancel={() => {
            setShowDefault(false);
          }}
        />

        {/* Features */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Features:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Two visual variants: danger (red) and default (blue)</li>
            <li>✓ Customizable title, message, and button labels</li>
            <li>✓ Modal overlay with backdrop blur</li>
            <li>✓ Keyboard support (Escape to cancel, Enter to confirm)</li>
            <li>✓ Accessible focus management</li>
            <li>✓ Responsive design</li>
          </ul>
        </div>

        {/* Props Documentation */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Component Props:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div><strong>isOpen:</strong> boolean (required) - Dialog open state</div>
            <div><strong>title:</strong> string (required) - Dialog title</div>
            <div><strong>message:</strong> string (required) - Dialog message</div>
            <div><strong>variant:</strong> 'danger' | 'default' - Visual style (default: 'default')</div>
            <div><strong>confirmLabel:</strong> string - Confirm button text (default: 'Confirm')</div>
            <div><strong>cancelLabel:</strong> string - Cancel button text (default: 'Cancel')</div>
            <div><strong>onConfirm:</strong> () =&gt; void (required) - Called when confirmed</div>
            <div><strong>onCancel:</strong> () =&gt; void (required) - Called when cancelled</div>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">💡 When to Use:</h4>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Danger variant:</strong> Use for destructive or irreversible actions:
          </p>
          <ul className="text-xs text-gray-600 ml-4 mb-2 space-y-1">
            <li>• Cancelling subscriptions</li>
            <li>• Deleting data</li>
            <li>• Removing accounts</li>
          </ul>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Default variant:</strong> Use for non-destructive confirmations:
          </p>
          <ul className="text-xs text-gray-600 ml-4 space-y-1">
            <li>• Saving changes</li>
            <li>• Proceeding with actions</li>
            <li>• Confirming selections</li>
          </ul>
        </div>

        {/* Example Code */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Example Usage:</h4>
          <pre className="text-xs bg-white rounded p-3 overflow-x-auto">
            {`import { ConfirmDialog } from '@subscrypts/react-sdk';
import { useState } from 'react';

function CancelSubscriptionButton({ subscriptionId }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCancel = async () => {
    // Perform the cancellation
    await cancelSubscription(subscriptionId);
    setShowConfirm(false);
  };

  return (
    <>
      <button onClick={() => setShowConfirm(true)}>
        Cancel Subscription
      </button>

      <ConfirmDialog
        isOpen={showConfirm}
        title="Cancel Subscription?"
        message="This action cannot be undone. Your subscription will end at the current period."
        variant="danger"
        confirmLabel="Yes, Cancel It"
        cancelLabel="Keep Subscription"
        onConfirm={handleCancel}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}`}
          </pre>
        </div>

        {/* Usage in SDK */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">🔗 Used Internally:</h4>
          <p className="text-sm text-gray-700">
            ConfirmDialog is used internally by ManageSubscriptionModal for confirming
            subscription cancellations. You can also use it in your own custom UI flows.
          </p>
        </div>
      </div>
    </DemoCard>
  );
}
