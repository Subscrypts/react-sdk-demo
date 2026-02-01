/**
 * Debug Panel Component [v1.6.0]
 *
 * Toggle-able overlay panel for debugging SDK v1.6.0 features:
 * - Cache statistics (hits, misses, hit rate)
 * - Performance metrics for contract calls
 * - Correlation ID tracing
 *
 * Usage:
 * <SubscryptsProvider debug="debug">
 *   <App />
 *   <DebugPanel />
 * </SubscryptsProvider>
 */

import { useState, useEffect } from 'react';
import { useSubscrypts } from '@subscrypts/react-sdk';

interface CacheStats {
  hits: number;
  misses: number;
  entries: number;
  hitRate: number;
}

interface PerformanceMetric {
  operation: string;
  duration: number;
  timestamp: number;
}

export function DebugPanel() {
  const { cacheManager } = useSubscrypts();
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState<CacheStats>({
    hits: 0,
    misses: 0,
    entries: 0,
    hitRate: 0,
  });
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);

  // Get logger from SDK (it may be exposed or we use console as fallback)
  const logger = (window as any).__SUBSCRYPTS_LOGGER__;

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      // Get cache stats
      if (cacheManager?.getStats) {
        setStats(cacheManager.getStats());
      }

      // Get performance metrics from logger if available
      if (logger?.getPerformanceMetrics) {
        setMetrics(logger.getPerformanceMetrics());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, cacheManager, logger]);

  // Don't render if no cache manager or if panel is closed
  if (!cacheManager) {
    return null;
  }

  const rpcSavings = stats.hitRate > 0 
    ? `${(stats.hitRate * 100).toFixed(1)}%` 
    : 'N/A';

  return (
    <>
      {/* Toggle Button - Positioned on LEFT side to avoid overlap with Dev Docs toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 left-4 z-50 px-4 py-2 rounded-lg font-medium transition-all shadow-lg ${
          isOpen 
            ? 'bg-red-600 text-white hover:bg-red-700' 
            : 'bg-purple-600 text-white hover:bg-purple-700'
        }`}
      >
        {isOpen ? '✕ Close Debug' : '🔍 Debug [v1.6.0]'}
      </button>

      {/* Debug Panel Overlay - Positioned on LEFT side */}
      {isOpen && (
        <div className="fixed bottom-16 left-4 z-50 w-96 max-h-[70vh] overflow-y-auto bg-gray-900 text-white rounded-lg shadow-2xl border border-purple-500">
          <div className="p-4">
            <h3 className="text-lg font-bold text-purple-400 mb-4">
              🔍 SDK v1.6.0 Debug Panel
            </h3>

            {/* Cache Statistics Section */}
            <div className="mb-6 bg-gray-800 rounded-lg p-3">
              <h4 className="text-sm font-semibold text-green-400 mb-2">
                📦 Cache Statistics
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-gray-700 rounded p-2">
                  <span className="text-gray-400">Hit Rate</span>
                  <div className="text-xl font-bold text-green-400">
                    {rpcSavings}
                  </div>
                </div>
                <div className="bg-gray-700 rounded p-2">
                  <span className="text-gray-400">Entries</span>
                  <div className="text-xl font-bold text-blue-400">
                    {stats.entries}
                  </div>
                </div>
                <div className="bg-gray-700 rounded p-2">
                  <span className="text-gray-400">Hits</span>
                  <div className="text-lg font-semibold text-green-300">
                    {stats.hits}
                  </div>
                </div>
                <div className="bg-gray-700 rounded p-2">
                  <span className="text-gray-400">Misses</span>
                  <div className="text-lg font-semibold text-yellow-300">
                    {stats.misses}
                  </div>
                </div>
              </div>
              
              {/* RPC Savings Indicator */}
              {stats.hitRate > 0 && (
                <div className="mt-3 p-2 bg-green-900/50 rounded text-sm">
                  <span className="text-green-300">
                    💰 Saved ~{(stats.hits * 2).toFixed(0)} RPC calls
                  </span>
                </div>
              )}

              <button
                onClick={() => cacheManager.clear?.()}
                className="mt-3 w-full px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded text-sm font-medium transition-colors"
              >
                🗑️ Clear Cache
              </button>
            </div>

            {/* Performance Metrics Section */}
            <div className="mb-6 bg-gray-800 rounded-lg p-3">
              <h4 className="text-sm font-semibold text-blue-400 mb-2">
                ⏱️ Recent Operations
              </h4>
              {metrics.length === 0 ? (
                <p className="text-gray-500 text-sm italic">
                  No performance metrics yet...
                </p>
              ) : (
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {metrics.slice(-10).reverse().map((metric, i) => (
                    <div 
                      key={i} 
                      className="flex justify-between items-center text-xs bg-gray-700 rounded p-2"
                    >
                      <span className="truncate flex-1 mr-2" title={metric.operation}>
                        {metric.operation}
                      </span>
                      <span className={`font-mono ${
                        metric.duration < 100 ? 'text-green-400' : 
                        metric.duration < 500 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {metric.duration.toFixed(1)}ms
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* v1.6.0 Features Info */}
            <div className="bg-purple-900/30 rounded-lg p-3 text-xs">
              <h4 className="font-semibold text-purple-300 mb-2">
                ✨ v1.6.0 Features Active
              </h4>
              <ul className="space-y-1 text-gray-300">
                <li>✅ Intelligent Caching (80-90% RPC reduction)</li>
                <li>✅ Chain ID Namespacing</li>
                <li>✅ Auto-invalidation</li>
                <li>✅ Performance Tracking</li>
                <li>✅ Correlation IDs</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}