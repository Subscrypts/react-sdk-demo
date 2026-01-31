/**
 * Subscription Diagnostics Component
 * 
 * Comprehensive diagnostics comparing SDK hooks vs pure Ethers.js
 * to identify where the subscription reading fails.
 */

import { useEffect, useState } from 'react';
import { useWallet, useSubscriptionStatus, useMySubscriptions, useSubscrypts } from '@subscrypts/react-sdk';
import { ethers } from 'ethers';

// Subscrypts contract ABI (minimal for diagnostics)
const SUBSCRYPTS_ABI = [
  "function getPlanSubscription(uint256 planId, address subscriber) view returns (tuple(uint256 id, address merchantAddress, uint256 planId, address subscriberAddress, uint256 currencyCode, uint256 subscriptionAmount, uint256 paymentFrequency, bool isRecurring, uint256 remainingCycles, bytes32 customAttributes, uint256 lastPaymentDate, uint256 nextPaymentDate))",
  "function getSubscription(uint256 subscriptionId) view returns (tuple(uint256 id, address merchantAddress, uint256 planId, address subscriberAddress, uint256 currencyCode, uint256 subscriptionAmount, uint256 paymentFrequency, bool isRecurring, uint256 remainingCycles, bytes32 customAttributes, uint256 lastPaymentDate, uint256 nextPaymentDate))"
];

const SUBSCRYPTS_ADDRESS = '0xE2E5409C4B4Be5b67C69Cc2C6507B0598D069Eac';

export function SubscriptionDiagnostics() {
  const { address, isConnected } = useWallet();
  const { provider } = useSubscrypts();
  
  // SDK hook results
  const hookStatus = useSubscriptionStatus('1');
  const hookSubscriptions = useMySubscriptions(address || undefined, 10);
  
  // Pure ethers results
  const [ethersResults, setEthersResults] = useState<{
    planSubscription: any | null;
    fullSubscription: any | null;
    error: string | null;
    loading: boolean;
  }>({
    planSubscription: null,
    fullSubscription: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    if (!isConnected || !address || !provider) return;

    const queryWithEthers = async () => {
      setEthersResults(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        console.log('=== PURE ETHERS.JS DIAGNOSTICS ===');
        console.log('Wallet Address:', address);
        console.log('Provider:', provider);
        
        // Create contract instance directly with ethers
        const contract = new ethers.Contract(SUBSCRYPTS_ADDRESS, SUBSCRYPTS_ABI, provider);
        console.log('Contract instance:', contract);
        
        // Step 1: Query getPlanSubscription directly
        console.log('\n1. Calling getPlanSubscription(1,', address, ')...');
        const planSub = await contract.getPlanSubscription(1, address);
        console.log('Raw getPlanSubscription result:', planSub);
        
        // Step 2: If we have a subscription ID, query getSubscription
        let fullSub = null;
        if (planSub && planSub.id && planSub.id !== 0n) {
          console.log('\n2. Found subscriptionId:', planSub.id.toString());
          console.log('Calling getSubscription(', planSub.id.toString(), ')...');
          fullSub = await contract.getSubscription(planSub.id);
          console.log('Raw getSubscription result:', fullSub);
        } else {
          console.log('\n2. No subscription found (id is 0)');
        }
        
        setEthersResults({
          planSubscription: planSub,
          fullSubscription: fullSub,
          error: null,
          loading: false,
        });
        
        console.log('\n=== END ETHERS DIAGNOSTICS ===');
      } catch (err: any) {
        console.error('Ethers diagnostic error:', err);
        setEthersResults({
          planSubscription: null,
          fullSubscription: null,
          error: err.message || 'Unknown error',
          loading: false,
        });
      }
    };

    queryWithEthers();
  }, [isConnected, address, provider]);

  if (!isConnected) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">Connect wallet to run diagnostics</p>
      </div>
    );
  }

  // Determine root cause
  const sdkErrorMessage = hookStatus.error?.message || hookSubscriptions.error?.message || '';
  const isContractRunnerError = sdkErrorMessage.includes('contract runner does not support');
  const ethersHasData = !!ethersResults.fullSubscription;
  const sdkHasData = hookStatus.status?.isActive || hookSubscriptions.subscriptions.length > 0;

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 space-y-6">
      <h3 className="text-lg font-bold text-purple-900">🔍 Comprehensive Subscription Diagnostics</h3>
      
      {/* Root Cause Analysis */}
      <div className={`rounded-lg p-4 border-2 ${
        isContractRunnerError ? 'bg-red-50 border-red-300' : 
        ethersHasData && !sdkHasData ? 'bg-orange-50 border-orange-300' :
        'bg-green-50 border-green-300'
      }`}>
        <h4 className="font-bold mb-2">
          {isContractRunnerError ? (
            <span className="text-red-800">🐛 CRITICAL: SDK Contract Runner Error</span>
          ) : ethersHasData && !sdkHasData ? (
            <span className="text-orange-800">⚠️ SDK Data Transformation Issue</span>
          ) : ethersHasData ? (
            <span className="text-green-800">✅ Both SDK and Ethers Working</span>
          ) : (
            <span className="text-yellow-800">⚠️ No Subscription Found on Blockchain</span>
          )}
        </h4>
        
        {isContractRunnerError && (
          <div className="text-sm text-red-700 space-y-2">
            <p><strong>Issue:</strong> SDK v1.5.0 contract instance doesn't support read operations</p>
            <p><strong>Error:</strong> "contract runner does not support calling"</p>
            <p><strong>Root Cause:</strong> The SDK's internal contract initialization is missing a proper provider/signer for read calls</p>
            <p><strong>Fix Needed:</strong> SDK must ensure contract has a provider that supports static calls</p>
          </div>
        )}
        
        {ethersHasData && !sdkHasData && (
          <div className="text-sm text-orange-700 space-y-2">
            <p><strong>Issue:</strong> Ethers.js can read the subscription, but SDK hooks don't return it</p>
            <p><strong>Root Cause:</strong> SDK data transformation or hook logic issue</p>
          </div>
        )}
      </div>
      
      {/* Wallet Info */}
      <div className="bg-white rounded-lg p-4 border border-purple-200">
        <h4 className="font-semibold text-purple-800 mb-2">Wallet Info</h4>
        <p className="text-sm font-mono text-gray-700">Address: {address}</p>
        <p className="text-sm font-mono text-gray-700">Plan ID: 1</p>
        <p className="text-sm font-mono text-gray-700">Contract: {SUBSCRYPTS_ADDRESS}</p>
      </div>

      {/* SDK Hook Results */}
      <div className="bg-white rounded-lg p-4 border border-purple-200">
        <h4 className="font-semibold text-purple-800 mb-2">SDK Hook Results</h4>
        
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-700">useSubscriptionStatus('1'):</p>
            <pre className={`text-xs p-2 rounded mt-1 overflow-x-auto border ${
              hookStatus.error ? 'bg-red-50 border-red-200' : 
              hookStatus.status?.isActive ? 'bg-green-50 border-green-200' :
              'bg-gray-50 border-gray-200'
            }`}>
              {JSON.stringify({
                status: hookStatus.status,
                isLoading: hookStatus.isLoading,
                error: hookStatus.error?.message || null,
              }, (_, v) => typeof v === 'bigint' ? v.toString() + 'n' : v, 2)}
            </pre>
            {hookStatus.error && (
              <p className="text-xs text-red-600 mt-1">❌ {hookStatus.error.message}</p>
            )}
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-700">useMySubscriptions:</p>
            <pre className={`text-xs p-2 rounded mt-1 overflow-x-auto border ${
              hookSubscriptions.error ? 'bg-red-50 border-red-200' : 
              hookSubscriptions.subscriptions.length > 0 ? 'bg-green-50 border-green-200' :
              'bg-gray-50 border-gray-200'
            }`}>
              {JSON.stringify({
                subscriptionCount: hookSubscriptions.subscriptions.length,
                isLoading: hookSubscriptions.isLoading,
                error: hookSubscriptions.error?.message || null,
              }, (_, v) => typeof v === 'bigint' ? v.toString() + 'n' : v, 2)}
            </pre>
            {hookSubscriptions.error && (
              <p className="text-xs text-red-600 mt-1">❌ {hookSubscriptions.error.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Pure Ethers.js Results */}
      <div className="bg-white rounded-lg p-4 border border-purple-200">
        <h4 className="font-semibold text-purple-800 mb-2">Pure Ethers.js Results (Direct Contract Call)</h4>
        
        {ethersResults.loading && (
          <p className="text-sm text-purple-600">Querying contract with ethers.js...</p>
        )}
        
        {ethersResults.error && (
          <div className="bg-red-50 border border-red-200 rounded p-3">
            <p className="text-sm text-red-600 font-bold">Ethers.js Error:</p>
            <p className="text-xs text-red-600">{ethersResults.error}</p>
          </div>
        )}
        
        {!ethersResults.loading && !ethersResults.error && ethersResults.fullSubscription && (
          <div className="space-y-3">
            <div className="bg-green-50 p-3 rounded border border-green-200">
              <p className="text-sm font-bold text-green-800 mb-2">
                ✅ Ethers.js Successfully Read Subscription:
              </p>
              <pre className="text-xs overflow-x-auto">
                {JSON.stringify({
                  id: ethersResults.fullSubscription.id?.toString(),
                  planId: ethersResults.fullSubscription.planId?.toString(),
                  subscriber: ethersResults.fullSubscription.subscriberAddress,
                  nextPaymentDate: ethersResults.fullSubscription.nextPaymentDate?.toString(),
                  isActive: Number(ethersResults.fullSubscription.nextPaymentDate) > Date.now() / 1000,
                }, null, 2)}
              </pre>
            </div>
          </div>
        )}
        
        {!ethersResults.loading && !ethersResults.error && !ethersResults.fullSubscription && (
          <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
            <p className="text-sm text-yellow-800">
              No subscription found via Ethers.js either
            </p>
          </div>
        )}
      </div>

      {/* Comparison */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-bold text-blue-900 mb-2">📊 Comparison</h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-blue-200">
              <th className="text-left py-2">Method</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Data</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-blue-100">
              <td className="py-2">SDK useSubscriptionStatus</td>
              <td className="py-2">
                {hookStatus.error ? (
                  <span className="text-red-600">❌ Error</span>
                ) : hookStatus.isLoading ? (
                  <span className="text-yellow-600">⏳ Loading</span>
                ) : (
                  <span className={hookStatus.status?.isActive ? 'text-green-600' : 'text-gray-600'}>
                    {hookStatus.status?.isActive ? '✅ Active' : '⚪ Inactive'}
                  </span>
                )}
              </td>
              <td className="py-2">{hookStatus.status ? 'Has data' : 'No data'}</td>
            </tr>
            <tr className="border-b border-blue-100">
              <td className="py-2">SDK useMySubscriptions</td>
              <td className="py-2">
                {hookSubscriptions.error ? (
                  <span className="text-red-600">❌ Error</span>
                ) : hookSubscriptions.isLoading ? (
                  <span className="text-yellow-600">⏳ Loading</span>
                ) : (
                  <span className={hookSubscriptions.subscriptions.length > 0 ? 'text-green-600' : 'text-gray-600'}>
                    {hookSubscriptions.subscriptions.length > 0 ? `✅ ${hookSubscriptions.subscriptions.length} found` : '⚪ None'}
                  </span>
                )}
              </td>
              <td className="py-2">{hookSubscriptions.subscriptions.length} subscriptions</td>
            </tr>
            <tr>
              <td className="py-2">Pure Ethers.js</td>
              <td className="py-2">
                {ethersResults.error ? (
                  <span className="text-red-600">❌ Error</span>
                ) : ethersResults.loading ? (
                  <span className="text-yellow-600">⏳ Loading</span>
                ) : (
                  <span className={ethersResults.fullSubscription ? 'text-green-600' : 'text-gray-600'}>
                    {ethersResults.fullSubscription ? '✅ Found' : '⚪ None'}
                  </span>
                )}
              </td>
              <td className="py-2">{ethersResults.fullSubscription ? 'Has data' : 'No data'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* SDK Bug Report */}
      {isContractRunnerError && (
        <div className="bg-red-50 border-2 border-red-400 rounded-lg p-4">
          <h4 className="font-bold text-red-900 mb-2">🚨 SDK v1.5.0 Bug Report</h4>
          <div className="text-sm text-red-800 space-y-2">
            <p><strong>Problem:</strong> SDK hooks cannot read from the blockchain</p>
            <p><strong>Impact:</strong> All subscription-related features are broken</p>
            <p><strong>Technical Details:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-xs">
              <li>useSubscriptionStatus fails with "contract runner does not support calling"</li>
              <li>This indicates the contract instance lacks a proper provider</li>
              <li>Ethers.js v6 requires a provider that supports static calls</li>
              <li>The SDK's methods.ts or contract initialization is broken in v1.5.0</li>
            </ul>
            <p className="mt-2"><strong>Workaround:</strong> Use SDK v1.4.4 until fix is released</p>
          </div>
        </div>
      )}
    </div>
  );
}