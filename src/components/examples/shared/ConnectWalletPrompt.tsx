/**
 * ConnectWalletPrompt Component
 *
 * Reusable prompt for demos that require wallet connection.
 * Shows a friendly message with a connect button.
 */

import { useWallet } from '@subscrypts/react-sdk';

interface ConnectWalletPromptProps {
  message?: string;
  className?: string;
}

export function ConnectWalletPrompt({
  message = 'This demo requires a connected wallet to display live data.',
  className = ''
}: ConnectWalletPromptProps) {
  const { connect, isConnecting } = useWallet();

  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-lg p-6 text-center ${className}`}>
      <svg
        className="w-12 h-12 text-blue-500 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Wallet Connection Required
      </h3>
      <p className="text-gray-600 mb-4">
        {message}
      </p>
      <button
        onClick={connect}
        disabled={isConnecting}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
    </div>
  );
}
