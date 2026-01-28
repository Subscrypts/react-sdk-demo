/**
 * useTokenBalance Hook Demo
 *
 * Demonstrates fetching SUBS and USDC token balances with auto-refresh.
 */

import { useWallet, useTokenBalance } from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';

export function UseTokenBalanceDemo() {
  const { isConnected } = useWallet();
  const {
    balance: subsBalance,
    formatted: subsFormatted,
    isLoading: subsLoading,
    refetch: refetchSubs,
  } = useTokenBalance('SUBS');

  const {
    balance: usdcBalance,
    formatted: usdcFormatted,
    isLoading: usdcLoading,
    refetch: refetchUsdc,
  } = useTokenBalance('USDC');

  if (!isConnected) {
    return (
      <DemoCard
        title="useTokenBalance"
        description="Fetch SUBS and USDC token balances with auto-refresh"
        version="v1.0.0"
      >
        <ConnectWalletPrompt />
      </DemoCard>
    );
  }

  return (
    <DemoCard
      title="useTokenBalance"
      description="Fetch SUBS and USDC token balances with auto-refresh"
      version="v1.0.0"
    >
      <div className="space-y-4">
        {/* Token Balances Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* SUBS Balance */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">SUBS Token</h4>
              <button
                onClick={refetchSubs}
                disabled={subsLoading}
                className="text-xs text-blue-600 hover:text-blue-700 disabled:opacity-50"
                title="Refresh balance"
              >
                ↻
              </button>
            </div>
            {subsLoading ? (
              <div className="text-2xl font-bold text-blue-600">Loading...</div>
            ) : (
              <>
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {subsFormatted || '0.00'}
                </div>
                <div className="text-xs text-gray-600 font-mono">
                  Raw: {subsBalance?.toString() || '0'}
                </div>
              </>
            )}
          </div>

          {/* USDC Balance */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">USDC Token</h4>
              <button
                onClick={refetchUsdc}
                disabled={usdcLoading}
                className="text-xs text-green-600 hover:text-green-700 disabled:opacity-50"
                title="Refresh balance"
              >
                ↻
              </button>
            </div>
            {usdcLoading ? (
              <div className="text-2xl font-bold text-green-600">Loading...</div>
            ) : (
              <>
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {usdcFormatted || '0.00'}
                </div>
                <div className="text-xs text-gray-600 font-mono">
                  Raw: {usdcBalance?.toString() || '0'}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Hook Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Features:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✓ Automatic balance refresh every 30 seconds</li>
            <li>✓ Manual refetch with refetch() function</li>
            <li>✓ Returns both raw (BigInt) and formatted (string) values</li>
            <li>✓ Loading and error states included</li>
          </ul>
        </div>
      </div>
    </DemoCard>
  );
}
