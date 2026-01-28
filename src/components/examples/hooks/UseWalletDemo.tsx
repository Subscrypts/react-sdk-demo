/**
 * useWallet Hook Demo
 *
 * Demonstrates wallet connection, network switching, and connector management.
 */

import { useWallet } from '@subscrypts/react-sdk';
import { DemoCard } from '../shared';

export function UseWalletDemo() {
  const {
    address,
    isConnected,
    isConnecting,
    connect,
    disconnect,
    chainId,
    switchNetwork,
  } = useWallet();

  const truncateAddress = (addr: string) => {
    return `${addr.substring(0, 10)}...${addr.substring(addr.length - 8)}`;
  };

  return (
    <DemoCard
      title="useWallet"
      description="Core wallet management hook for connection, network switching, and account info"
      version="v1.0.0"
    >
      <div className="space-y-4">
        {/* Connection Status */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Connection Status</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Status:</span>
              <span className={`text-sm font-medium ${isConnected ? 'text-green-600' : 'text-gray-600'}`}>
                {isConnected ? '✓ Connected' : '○ Disconnected'}
              </span>
            </div>
            {isConnected && address && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Address:</span>
                  <span className="text-sm font-mono text-gray-900">
                    {truncateAddress(address)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Chain ID:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {chainId}
                    {chainId === 42161 && (
                      <span className="ml-2 text-xs text-green-600">(Arbitrum One)</span>
                    )}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {!isConnected ? (
            <button
              onClick={connect}
              disabled={isConnecting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          ) : (
            <>
              <button
                onClick={disconnect}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Disconnect
              </button>
              {chainId !== 42161 && (
                <button
                  onClick={() => switchNetwork?.(42161)}
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
                >
                  Switch to Arbitrum
                </button>
              )}
            </>
          )}
        </div>

        {/* Return Values */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Hook Return Values:</h4>
          <div className="text-xs font-mono text-gray-700 space-y-1">
            <div>address: {address ? `"${truncateAddress(address)}"` : 'null'}</div>
            <div>isConnected: {String(isConnected)}</div>
            <div>isConnecting: {String(isConnecting)}</div>
            <div>chainId: {chainId || 'null'}</div>
          </div>
        </div>
      </div>
    </DemoCard>
  );
}
