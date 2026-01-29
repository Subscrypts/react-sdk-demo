/**
 * UI Components Demo
 *
 * Demonstrates SubscryptsErrorBoundary, LoadingSpinner, Modal, and ConnectWalletModal.
 */

import { SubscryptsErrorBoundary, Modal, useWallet } from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';
import { useState } from 'react';

// Component that throws an error for ErrorBoundary testing
function ErrorThrowingComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Demo Error: This is a simulated component error for testing ErrorBoundary');
  }
  return <div className="text-green-600">✓ Component rendering successfully (no error)</div>;
}

export function UIComponentsDemo() {
  const { isConnected } = useWallet();
  const [throwError, setThrowError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorCaught, setErrorCaught] = useState(false);

  if (!isConnected) {
    return (
      <DemoCard
        title="UI Components"
        description="Error Boundary, Modal, LoadingSpinner primitives"
        version="v1.1.0"
      >
        <ConnectWalletPrompt />
      </DemoCard>
    );
  }

  return (
    <DemoCard
      title="UI Components"
      description="Error Boundary, Modal, LoadingSpinner primitives"
      version="v1.1.0"
    >
      <div className="space-y-6">
        {/* SubscryptsErrorBoundary Demo */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">SubscryptsErrorBoundary (v1.1.0)</h4>
          <p className="text-sm text-gray-700 mb-4">
            React error boundary that catches and displays errors from child components.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => setThrowError(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              Trigger Component Error
            </button>

            {errorCaught && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-700 text-sm">
                  ✅ Error was successfully caught by ErrorBoundary!
                </p>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-300">
              <h5 className="text-xs font-semibold text-gray-700 mb-2">Error Boundary Wrapper:</h5>
              <SubscryptsErrorBoundary
                fallback={(error, resetError) => (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="text-red-800 font-semibold mb-2">Component Error Caught!</div>
                    <div className="text-red-600 text-sm mb-3">{error.message}</div>
                    <button
                      onClick={() => {
                        setThrowError(false);
                        resetError();
                        setErrorCaught(false);
                      }}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    >
                      Reset Error Boundary
                    </button>
                  </div>
                )}
                onError={(error) => {
                  console.error('ErrorBoundary caught:', error);
                  setErrorCaught(true);
                }}
              >
                <ErrorThrowingComponent shouldThrow={throwError} />
              </SubscryptsErrorBoundary>
            </div>

            <div className="text-xs text-gray-600 bg-white rounded p-3">
              <strong>Props:</strong>
              <ul className="ml-4 mt-1 space-y-1">
                <li>• <code>children</code>: Components to wrap</li>
                <li>• <code>fallback</code>: Custom error UI or render function</li>
                <li>• <code>onError</code>: Callback when error caught</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Demo */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Modal</h4>
          <p className="text-sm text-gray-700 mb-4">
            Base modal component used by CheckoutWizard, ManageSubscriptionModal, etc.
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
          >
            Open Modal
          </button>

          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title="Demo Modal"
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                This is a demo modal. The Modal component provides:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Backdrop overlay with blur</li>
                <li>• Close button in header</li>
                <li>• Escape key support</li>
                <li>• Focus trap</li>
                <li>• Smooth animations</li>
              </ul>
              <button
                onClick={() => setShowModal(false)}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                Close Modal
              </button>
            </div>
          </Modal>

          <div className="text-xs text-gray-600 bg-white rounded p-3 mt-3">
            <strong>Props:</strong>
            <ul className="ml-4 mt-1 space-y-1">
              <li>• <code>isOpen</code>: boolean - Modal open state</li>
              <li>• <code>onClose</code>: () =&gt; void - Close handler</li>
              <li>• <code>title</code>: string - Modal title</li>
              <li>• <code>children</code>: ReactNode - Modal content</li>
            </ul>
          </div>
        </div>

        {/* LoadingSpinner Note */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">LoadingSpinner</h4>
          <p className="text-sm text-gray-700 mb-3">
            Simple loading spinner used throughout SDK components. Not exported directly,
            but used internally by all async operations (CheckoutWizard, SubscriptionDashboard, etc.).
          </p>
          <div className="flex items-center gap-3 p-3 bg-white rounded">
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            <span className="text-sm text-gray-600">Loading...</span>
          </div>
        </div>

        {/* ConnectWalletModal Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">ConnectWalletModal (v1.1.0)</h4>
          <p className="text-sm text-gray-700 mb-3">
            Modal for selecting and connecting wallet. Automatically shown when wallet is needed
            but not connected. Lists available connectors (MetaMask, WalletConnect, etc.).
          </p>
          <div className="text-xs text-gray-600 bg-white rounded p-3">
            <strong>Usage:</strong> Managed automatically by SubscryptsProvider when
            <code className="bg-gray-100 px-1 rounded"> manageWallet=true</code>.
            Not typically used directly in user code.
          </div>
        </div>

        {/* Example Code */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Example Usage:</h4>
          <pre className="text-xs bg-white rounded p-3 overflow-x-auto">
            {`import {
  SubscryptsErrorBoundary,
  Modal,
} from '@subscrypts/react-sdk';

// Error Boundary
<SubscryptsErrorBoundary
  fallback={(error, reset) => (
    <div>
      <p>Error: {error.message}</p>
      <button onClick={reset}>Retry</button>
    </div>
  )}
  onError={(error) => trackError(error)}
>
  <SubscriptionDashboard />
</SubscryptsErrorBoundary>

// Modal
const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="My Modal"
>
  <p>Modal content here</p>
</Modal>`}
          </pre>
        </div>
      </div>
    </DemoCard>
  );
}
