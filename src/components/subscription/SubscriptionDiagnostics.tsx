/**
 * Subscription Diagnostics Component
 * 
 * This component directly queries the Subscrypts contract to diagnose
 * why SDK hooks are not returning subscription data.
 * 
 * CRITICAL FINDING: The SDK is not properly transforming ethers.js array
 * responses into structured objects. The contract returns arrays but
 * the SDK hooks expect objects with named properties.
 */

import { useEffect, useState } from 'react';
import { useSubscrypts, useWallet, useSubscriptionStatus, useMySubscriptions } from '@subscrypts/react-sdk';

// Subscription struct field mapping (from smart contract)
// These are the indices in the array returned by the contract
const SUBSCRIPTION_FIELDS = [
  { index: 0, name: 'id', type: 'uint256' },
  { index: 1, name: 'merchantAddress', type: 'address' },
  { index: 2, name: 'planId', type: 'uint256' },
  { index: 3, name: 'subscriberAddress', type: 'address' },
  { index: 4, name: 'currencyCode', type: 'uint256' },
  { index: 5, name: 'subscriptionAmount', type: 'uint256' },
  { index: 6, name: 'paymentFrequency', type: 'uint256' },
  { index: 7, name: 'isRecurring', type: 'bool' },
  { index: 8, name: 'remainingCycles', type: 'uint256' },
  { index: 9, name: 'customAttributes', type: 'bytes32' },
  { index: 10, name: 'lastPaymentDate', type: 'uint256' },
  { index: 11, name: 'nextPaymentDate', type: 'uint256' },
];

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
    parsedSubscription: any | null;
    error: string | null;
    loading: boolean;
  }>({
    planSubscription: null,
    fullSubscription: null,
    parsedSubscription: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    if (!isConnected || !address || !subscryptsContract) return;

    const queryContract = async () => {
      setDirectResults(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        console.log('=== DETAILED SUBSCRIPTION DIAGNOSTICS ===');
        console.log('Wallet Address:', address);
        console.log('Plan ID:', '1');
        
        // Step 1: Query getPlanSubscription directly
        console.log('\n1. Calling getPlanSubscription(1,', address, ')...');
        const planSub = await subscryptsContract.getPlanSubscription(1, address);
        console.log('Raw getPlanSubscription result:', planSub);
        console.log('Result type:', typeof planSub);
        console.log('Is Array:', Array.isArray(planSub));
        console.log('Has length property:', 'length' in planSub);
        
        // Try to access as array
        if (planSub && typeof planSub === 'object') {
          console.log('Object keys:', Object.keys(planSub));
          console.log('Object entries (first 5):', Object.entries(planSub).slice(0, 5));
        }
        
        // Step 2: If we have a subscription ID, query getSubscription
        let fullSub: any = null;
        let parsedSub: Record<string, any> | null = null;
        
        // Check if subscription exists (id at index 0 should be > 0)
        const subscriptionId = planSub?.[0] || planSub?.id;
        if (subscriptionId && subscriptionId !== 0n) {
          console.log('\n2. Found subscriptionId:', subscriptionId.toString());
          console.log('Calling getSubscription(', subscriptionId.toString(), ')...');
          
          fullSub = await subscryptsContract.getSubscription(subscriptionId);
          console.log('Raw getSubscription result:', fullSub);
          console.log('Result type:', typeof fullSub);
          console.log('Is Array:', Array.isArray(fullSub));
          
            // Parse the array into structured object
          if (fullSub && typeof fullSub === 'object') {
            console.log('Object keys:', Object.keys(fullSub));
            
            const newParsedSub: Record<string, any> = {};
            SUBSCRIPTION_FIELDS.forEach(field => {
              const value = fullSub[field.index];
              newParsedSub[field.name] = value;
              console.log(`Field ${field.name} (index ${field.index}):`, 
                typeof value === 'bigint' ? value.toString() + 'n' : value);
            });
            parsedSub = newParsedSub;
            
            console.log('\nParsed subscription object:', parsedSub);
            
            // Check if subscription is active
            const now = Math.floor(Date.now() / 1000);
            const nextPayment = Number(parsedSub.nextPaymentDate);
            const isActive = nextPayment > now;
            console.log('\nActive check:');
            console.log('  Current timestamp:', now);
            console.log('  nextPaymentDate:', nextPayment);
            console.log('  Is active:', isActive);
          }
        } else {
          console.log('\n2. No subscription found (id is 0 or null)');
        }
        
        setDirectResults({
          planSubscription: planSub,
          fullSubscription: fullSub,
          parsedSubscription: parsedSub,
          error: null,
          loading: false,
        });
        
        console.log('\n=== END DIAGNOSTICS ===');
      } catch (err: any) {
        console.error('Diagnostic error:', err);
        setDirectResults({
          planSubscription: null,
          fullSubscription: null,
          parsedSubscription: null,
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

  const formatValue = (value: any): string => {
    if (value === undefined || value === null) return 'null';
    if (typeof value === 'bigint') return value.toString() + 'n';
    if (typeof value === 'string' && value.startsWith('0x')) {
      return value.substring(0, 12) + '...' + value.substring(value.length - 8);
    }
    return String(value);
  };

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 space-y-6">
      <h3 className="text-lg font-bold text-purple-900">🔍 Subscription Diagnostics</h3>
      
      {/* BUG ANALYSIS */}
      <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
        <h4 className="font-bold text-red-900 mb-2">🐛 Bug Analysis</h4>
        <p className="text-sm text-red-800 mb-2">
          <strong>Issue:</strong> SDK hooks receive contract data but don't transform it correctly.
        </p>
        <p className="text-sm text-red-800 mb-2">
          <strong>Root Cause:</strong> Ethers.js returns arrays as objects with numeric indices, 
          but SDK hooks expect named properties (id, planId, nextPaymentDate, etc.).
        </p>
        <p className="text-sm text-red-800">
          <strong>Fix Location:</strong> SDK's ContractService or hook implementations need to 
          map array indices to object properties using the SUBSCRIPTION_FIELDS mapping below.
        </p>
      </div>
      
      {/* Wallet Info */}
      <div className="bg-white rounded-lg p-4 border border-purple-200">
        <h4 className="font-semibold text-purple-800 mb-2">Wallet Info</h4>
        <p className="text-sm font-mono text-gray-700">Address: {address}</p>
        <p className="text-sm font-mono text-gray-700">Plan ID: 1</p>
      </div>

      {/* SDK Hook Results */}
      <div className="bg-white rounded-lg p-4 border border-purple-200">
        <h4 className="font-semibold text-purple-800 mb-2">SDK Hook Results (Broken)</h4>
        
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-700">useSubscriptionStatus('1'):</p>
            <pre className="text-xs bg-red-50 p-2 rounded mt-1 overflow-x-auto border border-red-200">
              {JSON.stringify({
                status: hookStatus.status,
                isLoading: hookStatus.isLoading,
                error: hookStatus.error?.message || null,
              }, null, 2)}
            </pre>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-700">useMySubscriptions:</p>
            <pre className="text-xs bg-red-50 p-2 rounded mt-1 overflow-x-auto border border-red-200">
              {JSON.stringify({
                subscriptionCount: hookSubscriptions.subscriptions.length,
                isLoading: hookSubscriptions.isLoading,
                error: hookSubscriptions.error?.message || null,
              }, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      {/* Raw Contract Results */}
      <div className="bg-white rounded-lg p-4 border border-purple-200">
        <h4 className="font-semibold text-purple-800 mb-2">Raw Contract Response (Working)</h4>
        
        {directResults.loading && (
          <p className="text-sm text-purple-600">Querying contract...</p>
        )}
        
        {directResults.error && (
          <p className="text-sm text-red-600">Error: {directResults.error}</p>
        )}
        
        {!directResults.loading && !directResults.error && directResults.fullSubscription && (
          <div className="space-y-3">
            <div className="bg-green-50 p-3 rounded border border-green-200">
              <p className="text-sm font-medium text-green-800 mb-2">
                ✅ Contract returns valid data as array:
              </p>
              <pre className="text-xs overflow-x-auto">
                {JSON.stringify(directResults.fullSubscription, (_, v) => 
                  typeof v === 'bigint' ? v.toString() + 'n' : v, 2
                ).substring(0, 500)}...
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Parsed Subscription Data */}
      {directResults.parsedSubscription && (
        <div className="bg-white rounded-lg p-4 border border-purple-200">
          <h4 className="font-semibold text-purple-800 mb-2">Parsed Subscription (Manual Transformation)</h4>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-purple-100">
                  <th className="text-left p-2">Field</th>
                  <th className="text-left p-2">Index</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Value</th>
                </tr>
              </thead>
              <tbody>
                {SUBSCRIPTION_FIELDS.map((field) => {
                  const value = directResults.parsedSubscription?.[field.name];
                  return (
                    <tr key={field.name} className="border-b border-gray-100">
                      <td className="p-2 font-mono font-medium">{field.name}</td>
                      <td className="p-2 text-gray-600">{field.index}</td>
                      <td className="p-2 text-gray-600">{field.type}</td>
                      <td className="p-2 font-mono text-xs">
                        {formatValue(value)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 bg-green-50 p-3 rounded border border-green-200">
            <p className="text-sm text-green-800">
              <strong>Is Active:</strong>{' '}
              {(() => {
                const nextPayment = Number(directResults.parsedSubscription?.nextPaymentDate);
                const now = Math.floor(Date.now() / 1000);
                return nextPayment > now ? (
                  <span className="text-green-600 font-bold">YES ✓</span>
                ) : (
                  <span className="text-red-600 font-bold">NO ✗</span>
                );
              })()}
            </p>
            <p className="text-xs text-green-700 mt-1">
              nextPaymentDate: {formatValue(directResults.parsedSubscription?.nextPaymentDate)} {' '}
              ({new Date(Number(directResults.parsedSubscription?.nextPaymentDate) * 1000).toLocaleString()})
            </p>
          </div>
        </div>
      )}

      {/* SDK FIX GUIDE */}
      <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
        <h4 className="font-bold text-blue-900 mb-2">🔧 SDK Fix Guide</h4>
        
        <div className="space-y-3 text-sm text-blue-800">
          <p>
            <strong>File to Fix:</strong> SDK's ContractService.ts or individual hook files
          </p>
          
          <p>
            <strong>Problem Code Pattern:</strong>
          </p>
          <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
{`// ❌ WRONG - Assumes named properties
const subscription = await contract.getSubscription(id);
return {
  id: subscription.id,  // undefined!
  nextPaymentDate: subscription.nextPaymentDate,  // undefined!
};`}
          </pre>
          
          <p>
            <strong>Correct Code Pattern:</strong>
          </p>
          <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
{`// ✅ CORRECT - Maps array indices to properties
const result = await contract.getSubscription(id);
return {
  id: result[0],
  merchantAddress: result[1],
  planId: result[2],
  subscriberAddress: result[3],
  currencyCode: result[4],
  subscriptionAmount: result[5],
  paymentFrequency: result[6],
  isRecurring: result[7],
  remainingCycles: result[8],
  customAttributes: result[9],
  lastPaymentDate: result[10],
  nextPaymentDate: result[11],
};`}
          </pre>
          
          <p className="mt-2">
            <strong>Affected SDK Hooks:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>useSubscriptionStatus - Not parsing getSubscription result</li>
            <li>useMySubscriptions - Not parsing getSubscription results</li>
            <li>SubscriptionGuard - Same issue</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
