/**
 * Performance Dashboard Demo [v1.6.0]
 *
 * Showcases SDK v1.6.0 caching performance features:
 * - Real-time cache statistics
 * - RPC call savings visualization
 * - Cache hit/miss tracking
 * - Performance metrics over time
 */

import { useState, useEffect, useCallback } from 'react';
import { useSubscrypts, usePlan, useSubscriptionStatus } from '@subscrypts/react-sdk';

interface CacheStats {
  hits: number;
  misses: number;
  entries: number;
  hitRate: number;
}

interface MetricHistory {
  timestamp: number;
  hits: number;
  misses: number;
  hitRate: number;
}

export function PerformanceDashboardDemo() {
  const { cacheManager } = useSubscrypts();
  
  // Demo state
  const [planId, setPlanId] = useState('1');
  const [checkCount, setCheckCount] = useState(0);
  const [stats, setStats] = useState<CacheStats>({
    hits: 0,
    misses: 0,
    entries: 0,
    hitRate: 0,
  });
  const [history, setHistory] = useState<MetricHistory[]>([]);
  const [isAutoChecking, setIsAutoChecking] = useState(false);

  // Fetch data to populate cache
  const { plan, isLoading: planLoading } = usePlan(planId);
  const { isLoading: statusLoading } = useSubscriptionStatus(planId);

  // Get cache stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (cacheManager?.getStats) {
        const newStats = cacheManager.getStats();
        setStats(newStats);
        
        // Add to history (keep last 20 points)
        setHistory(prev => {
          const newPoint = {
            timestamp: Date.now(),
            hits: newStats.hits,
            misses: newStats.misses,
            hitRate: newStats.hitRate,
          };
          return [...prev.slice(-19), newPoint];
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [cacheManager]);

  // Simulate multiple queries to show caching
  const simulateQueries = useCallback(async () => {
    setCheckCount(prev => prev + 1);
    
    // These will hit the cache after first call
    // Demonstrating 80-90% RPC reduction
    if (cacheManager?.get) {
      // Simulate multiple rapid calls
      for (let i = 0; i < 3; i++) {
        await cacheManager.get(`plan:${planId}`, async () => plan);
      }
    }
  }, [cacheManager, planId, plan]);

  // Auto-check mode
  useEffect(() => {
    if (!isAutoChecking) return;
    
    const interval = setInterval(() => {
      simulateQueries();
    }, 2000);

    return () => clearInterval(interval);
  }, [isAutoChecking, simulateQueries]);

  const totalCalls = stats.hits + stats.misses;
  const rpcReduction = totalCalls > 0 
    ? ((stats.hits / totalCalls) * 100).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
            [v1.6.0] New Feature
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-2">Performance Dashboard</h3>
        <p className="text-purple-100">
          Intelligent caching system providing 80-90% RPC call reduction with 
          zero-config defaults. Watch cache statistics update in real-time.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-500 mb-1">Cache Hit Rate</div>
          <div className="text-3xl font-bold text-green-600">
            {rpcReduction}%
          </div>
          <div className="text-xs text-gray-400 mt-1">
            RPC calls avoided
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-500 mb-1">Cache Entries</div>
          <div className="text-3xl font-bold text-blue-600">
            {stats.entries}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Active cached items
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-500 mb-1">Total Hits</div>
          <div className="text-3xl font-bold text-green-500">
            {stats.hits}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Served from cache
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-500 mb-1">Total Misses</div>
          <div className="text-3xl font-bold text-yellow-500">
            {stats.misses}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Required RPC calls
          </div>
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          🎮 Interactive Demo
        </h4>

        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={planId}
            onChange={(e) => setPlanId(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="1">Plan 1 (Basic)</option>
            <option value="2">Plan 2 (Pro)</option>
            <option value="3">Plan 3 (Enterprise)</option>
          </select>

          <button
            onClick={simulateQueries}
            disabled={planLoading || statusLoading}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {planLoading || statusLoading ? 'Loading...' : 'Query Plan Data'}
          </button>

          <button
            onClick={() => setIsAutoChecking(!isAutoChecking)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isAutoChecking
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isAutoChecking ? '⏹ Stop Auto-Check' : '▶️ Start Auto-Check'}
          </button>

          <button
            onClick={() => cacheManager?.clear?.()}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            🗑️ Clear Cache
          </button>
        </div>

        {/* Current Query Status */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Current Plan Data:
            </span>
            {planLoading ? (
              <span className="text-yellow-600 text-sm">Loading...</span>
            ) : (
              <span className="text-green-600 text-sm">✅ Cached</span>
            )}
          </div>
          {plan && (
            <div className="text-sm text-gray-600">
              <p><strong>Plan ID:</strong> {plan.id.toString()}</p>
              <p><strong>Status:</strong> {plan.isActive ? 'Active' : 'Inactive'}</p>
            </div>
          )}
        </div>

        {/* Manual Check Counter */}
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {checkCount}
          </div>
          <div className="text-sm text-gray-600">
            Manual queries performed
          </div>
          <div className="text-xs text-gray-500 mt-1">
            After first query, subsequent calls are served from cache instantly
          </div>
        </div>
      </div>

      {/* Performance History Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          📈 Cache Hit Rate History
        </h4>
        
        {history.length > 1 ? (
          <div className="h-40 flex items-end gap-1">
            {history.map((point, i) => (
              <div
                key={i}
                className="flex-1 bg-purple-500 rounded-t transition-all"
                style={{
                  height: `${Math.max(point.hitRate * 100, 5)}%`,
                  opacity: 0.3 + (i / history.length) * 0.7,
                }}
                title={`Hit Rate: ${(point.hitRate * 100).toFixed(1)}%`}
              />
            ))}
          </div>
        ) : (
          <div className="h-40 flex items-center justify-center text-gray-400">
            Start querying to see performance history...
          </div>
        )}
        
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Start</span>
          <span>Now</span>
        </div>
      </div>

      {/* v1.6.0 Features List */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">
          ✨ v1.6.0 Caching Features
        </h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span><strong>Zero-config:</strong> Works out of the box with sensible defaults (60s TTL, 500 max entries)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span><strong>Smart TTL:</strong> Plan data cached forever, subscription status uses dynamic TTL based on expiration</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span><strong>Chain ID Namespacing:</strong> Prevents testnet/mainnet cache collisions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span><strong>Auto-invalidation:</strong> Cache automatically cleared after successful subscriptions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span><strong>Request Deduplication:</strong> Simultaneous identical requests share a single RPC call</span>
          </li>
        </ul>
      </div>
    </div>
  );
}