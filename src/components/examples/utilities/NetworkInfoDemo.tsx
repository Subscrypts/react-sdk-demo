/**
 * Network & Contract Information Demo
 *
 * Displays all Subscrypts contract addresses and network constants.
 */

import {
  ARBITRUM_ONE,
  getSubscryptsContractAddress,
  getSubsTokenAddress,
  getUsdcTokenAddress,
  PERMIT2_ADDRESS,
  DEX_QUOTER_ADDRESS,
  TOKEN_DECIMALS,
  DEFAULTS,
} from '@subscrypts/react-sdk';
import { DemoCard } from '../shared';
import { useState } from 'react';

interface ContractInfo {
  name: string;
  address: string;
  description: string;
  arbiscanUrl: string;
}

export function NetworkInfoDemo() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  // Get contract addresses
  const SUBSCRYPTS_ADDRESS = getSubscryptsContractAddress(ARBITRUM_ONE.chainId);
  const SUBS_TOKEN_ADDRESS = getSubsTokenAddress(ARBITRUM_ONE.chainId);
  const USDC_ADDRESS = getUsdcTokenAddress(ARBITRUM_ONE.chainId);

  const contracts: ContractInfo[] = [
    {
      name: 'SUBSCRYPTS_ADDRESS',
      address: SUBSCRYPTS_ADDRESS,
      description: 'Main Subscrypts proxy contract (UUPS Diamond pattern)',
      arbiscanUrl: `${ARBITRUM_ONE.blockExplorer}/address/${SUBSCRYPTS_ADDRESS}`,
    },
    {
      name: 'SUBS_TOKEN_ADDRESS',
      address: SUBS_TOKEN_ADDRESS,
      description: 'SUBS token contract (same as Subscrypts proxy)',
      arbiscanUrl: `${ARBITRUM_ONE.blockExplorer}/address/${SUBS_TOKEN_ADDRESS}`,
    },
    {
      name: 'USDC_ADDRESS',
      address: USDC_ADDRESS,
      description: 'USDC token contract on Arbitrum One',
      arbiscanUrl: `${ARBITRUM_ONE.blockExplorer}/address/${USDC_ADDRESS}`,
    },
    {
      name: 'PERMIT2_ADDRESS',
      address: PERMIT2_ADDRESS,
      description: 'Uniswap Permit2 contract for gasless approvals',
      arbiscanUrl: `${ARBITRUM_ONE.blockExplorer}/address/${PERMIT2_ADDRESS}`,
    },
    {
      name: 'DEX_QUOTER_ADDRESS',
      address: DEX_QUOTER_ADDRESS,
      description: 'Uniswap V3 Quoter for price quotes',
      arbiscanUrl: `${ARBITRUM_ONE.blockExplorer}/address/${DEX_QUOTER_ADDRESS}`,
    },
  ];

  const handleCopy = async (address: string, name: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(name);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <DemoCard
      title="Network & Contract Info"
      description="Contract addresses and network constants for Arbitrum One"
      version="All Versions"
    >
      <div className="space-y-6">
        {/* Network Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Network Configuration (ARBITRUM_ONE):</h4>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">Chain Name:</div>
              <div className="bg-white rounded p-2 text-sm font-mono text-gray-900">
                {ARBITRUM_ONE.name}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">Chain ID:</div>
              <div className="bg-white rounded p-2 text-sm font-mono text-blue-600">
                {ARBITRUM_ONE.chainId}
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="text-xs font-semibold text-gray-600 mb-1">Block Explorer:</div>
              <div className="bg-white rounded p-2 text-sm">
                <a
                  href={ARBITRUM_ONE.blockExplorer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-mono"
                >
                  {ARBITRUM_ONE.blockExplorer}
                </a>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="text-xs font-semibold text-gray-600 mb-1">Default RPC URL:</div>
              <div className="bg-white rounded p-2 text-sm font-mono text-gray-700 break-all">
                {ARBITRUM_ONE.rpcUrl}
              </div>
            </div>
          </div>
        </div>

        {/* Token Decimals */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Token Decimals (TOKEN_DECIMALS):</h4>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">SUBS:</div>
              <div className="bg-white rounded p-2 text-center text-sm font-mono text-purple-600">
                {TOKEN_DECIMALS.SUBS}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">USDC:</div>
              <div className="bg-white rounded p-2 text-center text-sm font-mono text-purple-600">
                {TOKEN_DECIMALS.USDC}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">ETH:</div>
              <div className="bg-white rounded p-2 text-center text-sm font-mono text-purple-600">
                {TOKEN_DECIMALS.ETH}
              </div>
            </div>
          </div>
        </div>

        {/* Contract Addresses */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-4 text-sm">Contract Addresses:</h4>

          <div className="space-y-3">
            {contracts.map((contract) => (
              <div key={contract.name} className="bg-white rounded-lg border border-gray-200 p-3">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    <div className="font-mono text-sm font-semibold text-blue-600 mb-1">
                      {contract.name}
                    </div>
                    <div className="text-xs text-gray-600">{contract.description}</div>
                  </div>
                  <button
                    onClick={() => handleCopy(contract.address, contract.name)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs font-medium shrink-0"
                  >
                    {copiedAddress === contract.name ? '✓ Copied!' : '📋 Copy'}
                  </button>
                </div>
                <div className="bg-gray-50 rounded p-2 font-mono text-xs text-gray-700 break-all">
                  {contract.address}
                </div>
                <div className="mt-2">
                  <a
                    href={contract.arbiscanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    View on Arbiscan
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SDK Defaults */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">SDK Default Configuration (DEFAULTS):</h4>

          <div className="grid md:grid-cols-2 gap-3 text-xs">
            <div className="bg-white rounded p-3">
              <div className="font-semibold text-gray-700 mb-1">Network:</div>
              <div className="font-mono text-orange-600">{DEFAULTS.NETWORK}</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="font-semibold text-gray-700 mb-1">Balance Refresh Interval:</div>
              <div className="font-mono text-orange-600">{DEFAULTS.BALANCE_REFRESH_INTERVAL}ms (30s)</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="font-semibold text-gray-700 mb-1">Subscription Cache Time:</div>
              <div className="font-mono text-orange-600">{DEFAULTS.SUBSCRIPTION_CACHE_TIME}ms (30s)</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="font-semibold text-gray-700 mb-1">Default Cycle Limit:</div>
              <div className="font-mono text-orange-600">{DEFAULTS.DEFAULT_CYCLE_LIMIT} cycles</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="font-semibold text-gray-700 mb-1">Transaction Deadline:</div>
              <div className="font-mono text-orange-600">{DEFAULTS.TRANSACTION_DEADLINE_SECONDS}s (5min)</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="font-semibold text-gray-700 mb-1">Permit Deadline:</div>
              <div className="font-mono text-orange-600">{DEFAULTS.PERMIT_DEADLINE_SECONDS}s (30min)</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="font-semibold text-gray-700 mb-1">Slippage Buffer:</div>
              <div className="font-mono text-orange-600">{DEFAULTS.SLIPPAGE_BUFFER_BPS} BPS (0.5%)</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="font-semibold text-gray-700 mb-1">Uniswap Fee Tier:</div>
              <div className="font-mono text-orange-600">{DEFAULTS.UNISWAP_FEE_TIER} (0.3%)</div>
            </div>
          </div>
        </div>

        {/* Import Examples */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Import Examples:</h4>

          <div className="space-y-3">
            {/* Network Config */}
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-2">Network Configuration:</div>
              <pre className="text-xs bg-white rounded p-3 overflow-x-auto">
{`import { ARBITRUM_ONE } from '@subscrypts/react-sdk';

console.log('Chain ID:', ARBITRUM_ONE.chainId);      // 42161
console.log('Chain Name:', ARBITRUM_ONE.name);        // "Arbitrum One"
console.log('RPC URL:', ARBITRUM_ONE.rpcUrl);
console.log('Explorer:', ARBITRUM_ONE.blockExplorer); // Arbiscan

// Check if on correct network
if (currentChainId !== ARBITRUM_ONE.chainId) {
  alert(\`Please switch to \${ARBITRUM_ONE.name}\`);
}`}
              </pre>
            </div>

            {/* Contract Addresses */}
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-2">Contract Addresses (via functions):</div>
              <pre className="text-xs bg-white rounded p-3 overflow-x-auto">
{`import {
  getSubscryptsContractAddress,
  getSubsTokenAddress,
  getUsdcTokenAddress,
  PERMIT2_ADDRESS,
  DEX_QUOTER_ADDRESS,
  ARBITRUM_ONE,
} from '@subscrypts/react-sdk';

const chainId = ARBITRUM_ONE.chainId;

// Get contract addresses
const subscrypts = getSubscryptsContractAddress(chainId);
const subs = getSubsTokenAddress(chainId);
const usdc = getUsdcTokenAddress(chainId);

// Direct constants
const permit2 = PERMIT2_ADDRESS;
const quoter = DEX_QUOTER_ADDRESS;

console.log('Subscrypts:', subscrypts);
console.log('SUBS:', subs);
console.log('USDC:', usdc);`}
              </pre>
            </div>

            {/* Token Decimals */}
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-2">Token Decimals:</div>
              <pre className="text-xs bg-white rounded p-3 overflow-x-auto">
{`import { TOKEN_DECIMALS } from '@subscrypts/react-sdk';

// Use token decimals for formatting
const subsAmount = rawAmount / 10 ** TOKEN_DECIMALS.SUBS;
const usdcAmount = rawAmount / 10 ** TOKEN_DECIMALS.USDC;

console.log('SUBS decimals:', TOKEN_DECIMALS.SUBS); // 18
console.log('USDC decimals:', TOKEN_DECIMALS.USDC); // 6
console.log('ETH decimals:', TOKEN_DECIMALS.ETH);   // 18`}
              </pre>
            </div>

            {/* Defaults */}
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-2">SDK Defaults:</div>
              <pre className="text-xs bg-white rounded p-3 overflow-x-auto">
{`import { DEFAULTS } from '@subscrypts/react-sdk';

// Use defaults in custom logic
const refreshInterval = DEFAULTS.BALANCE_REFRESH_INTERVAL;
const defaultCycles = DEFAULTS.DEFAULT_CYCLE_LIMIT;
const txDeadline = Math.floor(Date.now() / 1000) +
                   DEFAULTS.TRANSACTION_DEADLINE_SECONDS;

// Access all default values
console.log('Network:', DEFAULTS.NETWORK);             // "arbitrum"
console.log('Refresh:', DEFAULTS.BALANCE_REFRESH_INTERVAL); // 30000ms
console.log('Cycles:', DEFAULTS.DEFAULT_CYCLE_LIMIT);  // 12
console.log('Slippage:', DEFAULTS.SLIPPAGE_BUFFER_BPS);     // 50 (0.5%)`}
              </pre>
            </div>
          </div>
        </div>

        {/* Utility Functions */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Utility Functions:</h4>

          <div className="space-y-2 text-sm">
            <div className="bg-white rounded p-3">
              <div className="font-mono text-xs text-indigo-600 mb-1">
                getSubscryptsContractAddress(chainId: number): string
              </div>
              <div className="text-xs text-gray-600">
                Returns the Subscrypts contract address for the given chain ID
              </div>
            </div>

            <div className="bg-white rounded p-3">
              <div className="font-mono text-xs text-indigo-600 mb-1">
                getSubsTokenAddress(chainId: number): string
              </div>
              <div className="text-xs text-gray-600">
                Returns the SUBS token address for the given chain ID
              </div>
            </div>

            <div className="bg-white rounded p-3">
              <div className="font-mono text-xs text-indigo-600 mb-1">
                getUsdcTokenAddress(chainId: number): string
              </div>
              <div className="text-xs text-gray-600">
                Returns the USDC token address for the given chain ID
              </div>
            </div>

            <div className="bg-white rounded p-3">
              <div className="font-mono text-xs text-indigo-600 mb-1">
                isArbitrumNetwork(chainId: number): boolean
              </div>
              <div className="text-xs text-gray-600">
                Checks if the given chain ID is Arbitrum One (42161)
              </div>
            </div>

            <div className="bg-white rounded p-3">
              <div className="font-mono text-xs text-indigo-600 mb-1">
                getNetworkConfig(network?: "arbitrum"): NetworkConfig
              </div>
              <div className="text-xs text-gray-600">
                Returns full network configuration (same as ARBITRUM_ONE constant)
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">💡 Important Notes:</h4>
          <ul className="text-xs text-gray-700 ml-4 space-y-1">
            <li>• All contracts are deployed on Arbitrum One (Chain ID: 42161)</li>
            <li>• Subscrypts and SUBS token addresses are the same (proxy pattern)</li>
            <li>• Always verify contract addresses on Arbiscan before transactions</li>
            <li>• Use getter functions for addresses to ensure type safety</li>
            <li>• PERMIT2_ADDRESS and DEX_QUOTER_ADDRESS are direct constants</li>
            <li>• These constants are read-only and cannot be modified</li>
            <li>• ARBITRUM_ONE contains all network configuration in one object</li>
          </ul>
        </div>

        {/* Links */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">🔗 Useful Links:</h4>
          <div className="flex flex-wrap gap-3">
            <a
              href={`${ARBITRUM_ONE.blockExplorer}/address/${SUBSCRYPTS_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs"
            >
              View Subscrypts on Arbiscan
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
            <a
              href={ARBITRUM_ONE.blockExplorer}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-xs"
            >
              Arbiscan Explorer
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </DemoCard>
  );
}
