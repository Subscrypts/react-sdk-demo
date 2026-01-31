/**
 * Subscription Diagnostics Component
 * 
 * Comprehensive diagnostics comparing SDK hooks vs pure Ethers.js
 * to identify where the subscription reading fails.
 */

import { useEffect, useState } from 'react';
import { useWallet, useSubscriptionStatus, useMySubscriptions, useSubscrypts } from '@subscrypts/react-sdk';
import { ethers } from 'ethers';

// Subscrypts contract ABI (extended for diagnostics)
const SUBSCRYPTS_ABI = [
  "function getPlanSubscription(uint256 planId, address subscriber) view returns (tuple(uint256 id, address merchantAddress, uint256 planId, address subscriberAddress, uint256 currencyCode, uint256 subscriptionAmount, uint256 paymentFrequency, bool isRecurring, uint256 remainingCycles, bytes32 customAttributes, uint256 lastPaymentDate, uint256 nextPaymentDate))",
  "function getSubscription(uint256 subscriptionId) view returns (tuple(uint256 id, address merchantAddress, uint256 planId, address subscriberAddress, uint256 currencyCode, uint256 subscriptionAmount, uint256 paymentFrequency, bool isRecurring, uint256 remainingCycles, bytes32 customAttributes, uint256 lastPaymentDate, uint256 nextPaymentDate))",
  "function getUserSubscriptions(address user, uint256 start, uint256 count) view returns (uint256[] memory)",
  "function getSubscriptionCount(address user) view returns (uint256)",
  "function getPlanCount() view returns (uint256)",
  "function getPlan(uint256 planId) view returns (tuple(uint256 id, address merchantAddress, uint256 subscriptionAmount, uint256 paymentFrequency, bool isRecurringAllowed, uint256 maxSubscriptions, uint256 merkleRoot, bytes32 description, uint256 merchantEarnings, bool isActive))"
];

const SUBSCRYPTS_ADDRESS = '0xE2E5409C4B4Be5b67C69Cc2C6507B0598D069Eac';

export function SubscriptionDiagnostics() {
  const { address, isConnected } = useWallet();
  const { provider } = useSubscrypts();
  
  // SDK hook results
  const hookStatus = useSubscriptionStatus('1');
  const hookSubscriptions = useMySubscriptions(address || undefined, 10);
  
  // Extended diagnostics
  const [extendedResults, setExtendedResults] = useState<{
    subscriptionCount: string | null;
    userSubscriptionIds: string[] | null;
    manualFetch: any | null;
    error: string | null;
    loading: boolean;
  }>({
    subscriptionCount: null,
    userSubscriptionIds: null,
    manualFetch: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    if (!isConnected || !address || !provider) return;

    const runExtendedDiagnostics = async () => {
      setExtendedResults(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        console.log('=== EXTENDED SUBSCRIPTION DIAGNOSTICS ===');
        
        const contract = new ethers.Contract(SUBSCRYPTS_ADDRESS, SUBSCRYPTS_ABI, provider);
        
        // Test 1: Get subscription count
        console.log('\n1. Testing getSubscriptionCount...');
        let count = null;
        try {
          count = await contract.getSubscriptionCount(address);
          console.log('Subscription count:', count.toString());
        } catch (err: any) {
          console.log('getSubscriptionCount failed:', err.message);
        }
        
        // Test 2: Get user subscription IDs
        console.log('\n2. Testing getUserSubscriptions...');
        let ids: string[] = [];
        try {
          const result = await contract.getUserSubscriptions(address, 0, 100);
          ids = result.map((id: bigint) => id.toString());
          console.log('User subscription IDs:', ids);
        } catch (err: any) {
          console.log('getUserSubscriptions failed:', err.message);
        }
        
        // Test 3: Manual fetch by iterating through known plan IDs
        console.log('\n3. Manual fetch through plan IDs 1-5...');
        const manualSubs = [];
        for (let planId = 1; planId <= 5; planId++) {
          try {
            const planSub = await contract.getPlanSubscription(planId, address);
            if (planSub.id !== 0n) {
              console.log(`Found subscription in plan ${planId}:`, planSub.id.toString());
              const fullSub = await contract.getSubscription(planSub.id);
              manualSubs.push({
                planId,
                subscriptionId: planSub.id.toString(),
                nextPaymentDate: fullSub.nextPaymentDate.toString(),
              });
            }
          } catch (err) {
            // Plan might not exist
          }
        }
        console.log('Manual fetch results:', manualSubs);
        
        setExtendedResults({
          subscriptionCount: count?.toString() || '0',
          userSubscriptionIds: ids,
          manualFetch: manualSubs,
          error: null,
          loading: false,
        });
        
        console.log('\n=== END EXTENDED DIAGNOSTICS ===');
      } catch (err: any) {
        console.error('Extended diagnostic error:', err);
        setExtendedResults({
          subscriptionCount: null,
          userSubscriptionIds: null,
          manualFetch: null,
          error: err.message,
          loading: false,
        });
      }
    };

    runExtendedDiagnostics();
  }, [isConnected, address, provider]);

  if (!isConnected) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">Connect wallet to run diagnostics</p>
      </div>
    );
  }

  // Analysis
  const sdkErrorMessage = hookStatus.error?.message || hookSubscriptions.error?.message || '';
  const isContractRunnerError = sdkErrorMessage.includes('contract runner does not support');
  
  const sdkHookHasSubs = hookSubscriptions.subscriptions.length > 0;
  const manualHasSubs = extendedResults.manualFetch && extendedResults.manualFetch.length > 0;
  const userIdsHasSubs = extendedResults.userSubscriptionIds && extendedResults.userSubscriptionIds.length > 0;
  const countHasSubs = extendedResults.subscriptionCount && extendedResults.subscriptionCount !== '0';

  // Determine the issue
  let issueType = 'unknown';
  if (isContractRunnerError) {
    issueType = 'contract_runner';
  } else if (!userIdsHasSubs && manualHasSubs) {
    issueType = 'getUserSubscriptions_broken';
  } else if (userIdsHasSubs && !sdkHookHasSubs) {
    issueType = 'hook_processing';
  } else if (!manualHasSubs) {
    issueType = 'no_subscription_data';
  }

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 space-y-6">
      <h3 className="text-lg font-bold text-purple-900">🔍 Extended Subscription Diagnostics</h3>
      
      {/* Issue Analysis */}
      <div className={`rounded-lg p-4 border-2 ${
        issueType === 'contract_runner' ? 'bg-red-50 border-red-300' : 
        issueType === 'getUserSubscriptions_broken' ? 'bg-orange-50 border-orange-300' :
        issueType === 'hook_processing' ? 'bg-yellow-50 border-yellow-300' :
        manualHasSubs ? 'bg-green-50 border-green-300' :
        'bg-gray-50 border-gray-300'
      }`}>
        <h4 className="font-bold mb-2">Issue Analysis</h4>
        
        {issueType === 'getUserSubscriptions_broken' && (
          <div className="text-sm text-orange-700">
            <p className="font-bold">🔍 Root Cause Identified: getUserSubscriptions Contract Function</p>
            <p className="mt-1">
              The <code>getUserSubscriptions(address, start, count)</code> function returns empty array 
              even though subscriptions exist. This is what <code>useMySubscriptions</code> uses internally.
            </p>
            <p className="mt-2">
              ✅ Manual fetch through <code>getPlanSubscription</code> finds the subscription<br/>
              ❌ <code>getUserSubscriptions</code> returns empty array
            </p>
            <p className="mt-2 font-semibold">
              Fix: SDK should use alternative method (iterate through plans) instead of getUserSubscriptions
            </p>
          </div>
        )}
        
        {issueType === 'hook_processing' && (
          <div className="text-sm text-yellow-700">
            <p className="font-bold">⚠️ Hook Processing Issue</p>
            <p>Contract returns data but hook doesn't process it correctly.</p>
          </div>
        )}
        
        {manualHasSubs && issueType !== 'getUserSubscriptions_broken' && (
          <div className="text-sm text-green-700">
            <p className="font-bold">✅ Subscription data is accessible</p>
            <p>Found {extendedResults.manualFetch.length} subscription(s) via manual fetch.</p>
          </div>
        )}
        
        {!manualHasSubs && (
          <div className="text-sm text-gray-700">
            <p className="font-bold">⚪ No subscriptions found</p>
            <p>Could not find any subscriptions for this wallet address.</p>
          </div>
        )}
      </div>
      
      {/* Contract Function Test Results */}
      <div className="bg-white rounded-lg p-4 border border-purple-200">
        <h4 className="font-semibold text-purple-800 mb-2">Contract Function Tests</h4>
        
        {extendedResults.loading ? (
          <p className="text-sm text-purple-600">Running extended diagnostics...</p>
        ) : extendedResults.error ? (
          <p className="text-sm text-red-600">Error: {extendedResults.error}</p>
        ) : (
          <div className="space-y-3 text-sm">
            <div className={`p-2 rounded border ${
              countHasSubs ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
            }`}>
              <p className="font-medium">getSubscriptionCount(address):</p>
              <p className="font-mono">{extendedResults.subscriptionCount || '0'}</p>
              <p className="text-xs text-gray-600">
                {countHasSubs ? '✅ Returns count' : '⚪ Returns zero or failed'}
              </p>
            </div>
            
            <div className={`p-2 rounded border ${
              userIdsHasSubs ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}>
              <p className="font-medium">getUserSubscriptions(address, 0, 100):</p>
              <p className="font-mono">{extendedResults.userSubscriptionIds?.join(', ') || '[]'}</p>
              <p className="text-xs text-gray-600">
                {userIdsHasSubs 
                  ? '✅ Returns subscription IDs' 
                  : '❌ Returns empty (THIS IS THE BUG)'}
              </p>
            </div>
            
            <div className={`p-2 rounded border ${
              manualHasSubs ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
            }`}>
              <p className="font-medium">Manual fetch (getPlanSubscription loop):</p>
              <pre className="text-xs mt-1 overflow-x-auto">
                {JSON.stringify(extendedResults.manualFetch, null, 2)}
              </pre>
              <p className="text-xs text-gray-600 mt-1">
                {manualHasSubs 
                  ? '✅ Finds subscriptions by checking each plan' 
                  : '⚪ No subscriptions found'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* SDK Hook Results */}
      <div className="bg-white rounded-lg p-4 border border-purple-200">
        <h4 className="font-semibold text-purple-800 mb-2">SDK Hook Results</h4>
        
        <div className="space-y-3">
          <div className={`p-2 rounded border ${
            hookStatus.status?.isActive ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
          }`}>
            <p className="text-sm font-medium">useSubscriptionStatus('1'):</p>
            <pre className="text-xs mt-1 overflow-x-auto">
              {JSON.stringify({
                isActive: hookStatus.status?.isActive,
                subscriptionId: hookStatus.status?.subscriptionId,
                error: hookStatus.error?.message || null,
              }, null, 2)}
            </pre>
          </div>
          
          <div className={`p-2 rounded border ${
            sdkHookHasSubs ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
          }`}>
            <p className="text-sm font-medium">useMySubscriptions(address, 10):</p>
            <pre className="text-xs mt-1 overflow-x-auto">
              {JSON.stringify({
                subscriptionCount: hookSubscriptions.subscriptions.length,
                error: hookSubscriptions.error?.message || null,
              }, null, 2)}
            </pre>
            {!sdkHookHasSubs && manualHasSubs && (
              <p className="text-xs text-red-600 mt-1">
                ❌ Hook returns 0, but manual fetch found {extendedResults.manualFetch.length}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Fix */}
      {issueType === 'getUserSubscriptions_broken' && (
        <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-4">
          <h4 className="font-bold text-blue-900 mb-2">📝 Recommended SDK Fix</h4>
          <div className="text-sm text-blue-800 space-y-2">
            <p>The <code>useMySubscriptions</code> hook should not rely on <code>getUserSubscriptions</code> contract function.</p>
            
            <p className="font-semibold mt-2">Alternative Implementation:</p>
            <pre className="bg-white p-2 rounded text-xs overflow-x-auto mt-1">
{`// Instead of:
const ids = await contract.getUserSubscriptions(user, start, count);
// Which returns [] even when subscriptions exist

// Use this approach:
const subscriptions = [];
for (let planId = 1; planId <= maxPlanId; planId++) {
  const planSub = await contract.getPlanSubscription(planId, user);
  if (planSub.id !== 0n) {
    const fullSub = await contract.getSubscription(planSub.id);
    subscriptions.push(cleanSub(fullSub));
  }
}
return subscriptions;`}
            </pre>
            
            <p className="mt-2 text-xs">
              This is the same pattern that <code>useSubscriptionStatus</code> uses successfully.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}