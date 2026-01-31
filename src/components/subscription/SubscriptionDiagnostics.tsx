/**
 * Subscription Diagnostics Component
 * 
 * This component directly queries the Subscrypts contract to diagnose
 * why SDK hooks are not returning subscription data.
 */

import { useEffect, useState } from 'react';
import { useSubscrypts, useWallet, useSubscriptionStatus, useMySubscriptions } from '@subscrypts/react-sdk';

export function SubscriptionDiagnostics() {
  const { address, isConnected } = useWallet();
  const { subscryptsContract } = useSubscrypts();
  
  // SDK hook results
  const hookStatus = useSubscriptionStatus('1');
  const hookSubscriptions = useMySubscriptions(address || undefined, 10);
  
  // Direct contract query results
  const [directResults, setDirectResults] = useState<{
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
    if (!isConnected || !address || !subscryptsContract) return;

    const queryContract = async () => {
      setDirectResults(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        console.log('=== SUBSCRIPTION DIAGNOSTICS ===');
        console.log('Wallet Address:', address);
        console.log('Plan ID:', '1');
        
        // Step 1: Query getPlanSubscription directly
        console.log('\n1. Calling getPlanSubscription(1,', address, ')...');
        const planSub = await subscryptsContract.getPlanSubscription(1, address);
        console.log('Raw getPlanSubscription result:', planSub);
        
        // Step 2: If we have a subscription ID, query getSubscription
        let fullSub = null;
        if (planSub && planSub.id && planSub.id !== 0n) {
          console.log('\n2. Found subscriptionId:', planSub.id.toString());
          console.log('Calling getSubscription(', planSub.id.toString(), ')...');
          fullSub = await subscryptsContract.getSubscription(planSub.id);
          console.log('Raw getSubscription result:', fullSub);
        } else {
          console.log('\n2. No subscription found (id is 0 or null)');
        }
        
        setDirectResults({
          planSubscription: planSub,
          fullSubscription: fullSub,
          error: null,
          loading: false,
        });
        
        console.log('\n=== END DIAGNOSTICS ===');
      } catch (err: any) {
        console.error('Diagnostic error:', err);
        setDirectResults({
          planSubscription: null,
          fullSubscription: null,
          error: err.message || 'Unknown error',
          loading: false,
        });
      }
    };

    queryContract();
  }, [isConnected, address, subscryptsContract]);

  if (!isConnected) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">Connect wallet to run diagnostics</p>
      </div>
    );
  }

  const formatBigInt = (value: any): string => {
    if (value === undefined || value === null) return 'null';
    if (typeof value === 'bigint') return value.toString() + 'n';
    if (typeof value === 'object') return JSON.stringify(value, (_, v) => 
      typeof v === 'bigint' ? v.toString() + 'n' : v
    );
    return String(value);
  };

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 space-y-6">
      <h3 className="text-lg font-bold text-purple-900">🔍 Subscription Diagnostics</h3>
      
      {/* Wallet Info */}
      <div className="bg-white rounded-lg p-4 border border-purple-200">
        <h4 className="font-semibold text-purple-800 mb-2">Wallet Info</h4>
        <p className="text-sm font-mono text-gray-700">Address: {address}</p>
        <p className="text-sm font-mono text-gray-700">Plan ID: 1</p>
      </div>

      {/* SDK Hook Results */}
      <div className="bg-white rounded-lg p-4 border border-purple-200">
        <h4 className="font-semibold text-purple-800 mb-2">SDK Hook Results</h4>
        
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-700">useSubscriptionStatus('1'):</p>
            <pre className="text-xs bg-gray-50 p-2 rounded mt-1 overflow-x-auto">
              {JSON.stringify({
                status: hookStatus.status,
                isLoading: hookStatus.isLoading,
                error: hookStatus.error?.message || null,
              }, null, 2)}
            </pre>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-700">useMySubscriptions:</p>
            <pre className="text-xs bg-gray-50 p-2 rounded mt-1 overflow-x-auto">
              {JSON.stringify({
                subscriptionCount: hookSubscriptions.subscriptions.length,
                isLoading: hookSubscriptions.isLoading,
                error: hookSubscriptions.error?.message || null,
              }, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      {/* Direct Contract Results */}
      <div className="bg-white rounded-lg p-4 border border-purple-200">
        <h4 className="font-semibold text-purple-800 mb-2">Direct Contract Query</h4>
        
        {directResults.loading && (
          <p className="text-sm text-purple-600">Querying contract...</p>
        )}
        
        {directResults.error && (
          <p className="text-sm text-red-600">Error: {directResults.error}</p>
        )}
        
        {!directResults.loading && !directResults.error && (
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700">getPlanSubscription(1, address):</p>
              <pre className="text-xs bg-gray-50 p-2 rounded mt-1 overflow-x-auto">
                {formatBigInt(directResults.planSubscription)}
              </pre>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-700">getSubscription(subscriptionId):</p>
              <pre className="text-xs bg-gray-50 p-2 rounded mt-1 overflow-x-auto">
                {formatBigInt(directResults.fullSubscription)}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Comparison */}
      <div className="bg-white rounded-lg p-4 border border-purple-200">
        <h4 className="font-semibold text-purple-800 mb-2">Comparison</h4>
        
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Direct contract has subscription:</span>{' '}
            {directResults.fullSubscription ? (
              <span className="text-green-600 font-bold">YES</span>
            ) : (
              <span className="text-red-600 font-bold">NO</span>
            )}
          </p>
          
          <p>
            <span className="font-medium">SDK hook found subscription:</span>{' '}
            {hookStatus.status?.isActive ? (
              <span className="text-green-600 font-bold">YES</span>
            ) : (
              <span className="text-red-600 font-bold">NO</span>
            )}
          </p>
          
          {directResults.fullSubscription && !hookStatus.status?.isActive && (
            <div className="bg-red-50 border border-red-200 rounded p-3 mt-2">
              <p className="text-red-800 font-bold">⚠️ MISMATCH DETECTED!</p>
              <p className="text-red-700 text-xs mt-1">
                Contract returns subscription data but SDK hook shows inactive.
                This indicates a bug in the SDK's data processing.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}