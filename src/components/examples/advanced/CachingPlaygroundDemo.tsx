/**
 * Caching Playground Demo [v1.6.0]
 *
 * Interactive demo for SDK v1.6.0 caching configuration:
 * - Adjust TTL values
 * - Toggle caching on/off
 * - Manual cache invalidation
 * - Real-time cache statistics
 */

import { useState, useEffect } from 'react';
import { useSubscrypts, usePlan } from '@subscrypts/react-sdk';

interface CacheStats {
  hits: number;
  misses: number;
  entries: number;
  hitRate: number;
}

export function CachingPlaygroundDemo() {
  const { cacheManager } = useSubscrypts();
  
  // Demo state
  const [planId, setPlanId] = useState('1');
  const [queryCount, setQueryCount] = useState(0);
  const [stats, setStats] = useState<CacheStats>({
    hits: 0,
    misses: 0,
    entries: 0,
    hitRate: 0,
  });

  // Fetch data
  const { plan, isLoading, refetch } = usePlan(planId);

  // Get cache stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (cacheManager?.getStats) {
        setStats(cacheManager.getStats());
      }
    }, 500);

    return () => clearInterval(interval);
  }, [cacheManager]);

  const handleQuery = () => {
    setQueryCount(prev => prev + 1);
    refetch?.();
  };

  const handleClearCache = () => {
    cacheManager?.clear?.();
    setQueryCount(0);
  };

  const handleInvalidatePlan = () => {
    cacheManager?.invalidate?.(`plan:${planId}`);
  };

  const handleInvalidateAll = () => {
    cacheManager?.invalidate?.('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
            [v1.6.0] New Feature
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-2">Caching Playground</h3>
        <p className="text-blue-100">
          Interactive configuration demo for SDK v1.6.0 intelligent caching.
          Experiment with manual invalidation and observe real-time cache behavior.
        </p>
      </div>

      {/* Cache Configuration Display */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          ⚙️ Current Cache Configuration
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">Default TTL</div>
            <div className="text-2xl font-bold text-blue-600">60s</div>
            <div className="text-xs text-gray-400">Time-to-live for cached data</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">Max Entries</div>
            <div className="text-2xl font-bold text-purple-600">500</div>
            <div className="text-xs text-gray-400">Maximum cache entries (LRU eviction)</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">Chain ID</div>
            <div className="text-2xl font-bold text-green-600">42161</div>
            <div className="text-xs text-gray-400">Arbitrum One (namespaced)</div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
          <strong>ℹ️ Note:</strong> These are the default values. In your own application, 
          you can customize them via:
          <code className="block mt-2 bg-blue-100 p-2 rounded text-xs">
            {`<SubscryptsProvider caching=\{\{ defaultTTL: 30000, maxEntries: 1000 \}\}>`}
          </code>
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          🎮 Interactive Cache Controls
        </h4>

        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={planId}
            onChange={(e) => setPlanId(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="1">Plan 1 (Basic)</option>
            <option value="2">Plan 2 (Pro)</option>
            <option value="3">Plan 3 (Enterprise)</option>
          </select>

          <button
            onClick={handleQuery}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Loading...' : '🔍 Query Plan'}
          </button>

          <button
            onClick={handleInvalidatePlan}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            🎯 Invalidate This Plan
          </button>

          <button
            onClick={handleInvalidateAll}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            🧨 Invalidate All
          </button>

          <button
            onClick={handleClearCache}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            🗑️ Clear Cache
          </button>
        </div>

        {/* Query Result */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Query Result:</span>
            {isLoading ? (
              <span className="text-yellow-600 text-sm">Loading from RPC...</span>
            ) : plan ? (
              <span className="text-green-600 text-sm">✅ Served from cache</span>
            ) : (
              <span className="text-gray-500 text-sm">No data</span>
            )}
          </div>
          
          {plan && (
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Plan ID:</strong> {plan.id.toString()}</p>
              <p><strong>Subscription Amount:</strong> {plan.subscriptionAmount?.toString() || 'N/A'}</p>
              <p><strong>Active:</strong> {plan.isActive ? 'Yes' : 'No'}</p>
            </div>
          )}
        </div>

        {/* Query Counter */}
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {queryCount}
          </div>
          <div className="text-sm text-gray-600">
            Total queries performed
          </div>
          <div className="text-xs text-gray-500 mt-1">
            First query hits the blockchain, subsequent queries use cache
          </div>
        </div>
      </div>

      {/* Cache Statistics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          📊 Live Cache Statistics
        </h4>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <div className="text-sm text-green-600 mb-1">Hit Rate</div>
            <div className="text-3xl font-bold text-green-700">
              {(stats.hitRate * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-green-600 mt-1">
              Efficiency rating
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="text-sm text-blue-600 mb-1">Cache Hits</div>
            <div className="text-3xl font-bold text-blue-700">
              {stats.hits}
            </div>
            <div className="text-xs text-blue-600 mt-1">
              Served from cache
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
            <div className="text-sm text-yellow-600 mb-1">Cache Misses</div>
            <div className="text-3xl font-bold text-yellow-700">
              {stats.misses}
            </div>
            <div className="text-xs text-yellow-600 mt-1">
              Required RPC call
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <div className="text-sm text-purple-600 mb-1">Entries</div>
            <div className="text-3xl font-bold text-purple-700">
              {stats.entries}
            </div>
            <div className="text-xs text-purple-600 mt-1">
              Active cached items
            </div>
          </div>
        </div>
      </div>

      {/* Invalidation Examples */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">
          🎯 Pattern-Based Invalidation
        </h4>
        <p className="text-gray-700 mb-4">
          SDK v1.6.0 supports pattern-based cache invalidation for precise control:
        </p>
        
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-3 border border-amber-200">
            <code className="text-sm text-amber-800 font-mono">
              cacheManager.invalidate('plan:1')
            </code>
            <span className="text-gray-600 text-sm ml-2">- Invalidates only Plan 1</span>
          </div>
          
          <div className="bg-white rounded-lg p-3 border border-amber-200">
            <code className="text-sm text-amber-800 font-mono">
              cacheManager.invalidate('subscription-status:')
            </code>
            <span className="text-gray-600 text-sm ml-2">- Invalidates all status checks</span>
          </div>
          
          <div className="bg-white rounded-lg p-3 border border-amber-200">
            <code className="text-sm text-amber-800 font-mono">
              cacheManager.invalidate('my-subscriptions:')
            </code>
            <span className="text-gray-600 text-sm ml-2">- Invalidates subscription lists</span>
          </div>
        </div>
      </div>

      {/* v1.6.0 Features */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">
          ✨ v1.6.0 Cache Features Demonstrated
        </h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span><strong>Manual Invalidation:</strong> Clear specific cache entries or entire cache</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span><strong>Pattern Matching:</strong> Invalidate by pattern (e.g., all plans, all subscriptions)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span><strong>Real-time Stats:</strong> Live hit/miss tracking with hit rate calculation</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span><strong>Chain Isolation:</strong> Each network has isolated cache (42161: prefix)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}