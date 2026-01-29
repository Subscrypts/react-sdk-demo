/**
 * LoggerDemo - SDK Logger Utility
 *
 * Demonstrates the Subscrypts logger for debugging and monitoring SDK operations.
 * Added in SDK v1.1.0 with configurable log levels and formatting.
 */

import { useState } from 'react';
import { logger, type LogLevel } from '@subscrypts/react-sdk';
import { DemoCard } from '../shared';

export function LoggerDemo() {
  const [logOutput, setLogOutput] = useState<string[]>([]);
  const [currentLevel, setCurrentLevel] = useState<LogLevel>('info');

  // Add log to output display
  const addLog = (message: string, level: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const emoji = {
      debug: '🐛',
      info: 'ℹ️',
      warn: '⚠️',
      error: '❌',
      success: '✅',
    }[level] || '📝';

    setLogOutput(prev => [
      `${emoji} [${timestamp}] ${level.toUpperCase()}: ${message}`,
      ...prev
    ].slice(0, 20)); // Keep last 20 logs
  };

  const handleLogLevelChange = (level: LogLevel) => {
    setCurrentLevel(level);
    logger.configure({ level });
    addLog(`Logger level changed to: ${level}`, 'info');
  };

  const handleDebugLog = () => {
    logger.debug('This is a debug message', { userId: '0x123...', transactionId: 'tx_456' });
    addLog('Debug message sent (only visible in debug mode)', 'debug');
  };

  const handleInfoLog = () => {
    logger.info('Subscription created successfully');
    addLog('Info message sent (visible in info and debug modes)', 'info');
  };

  const handleWarnLog = () => {
    logger.warn('Wallet balance is low', { balance: '0.05 ETH' });
    addLog('Warning message sent', 'warn');
  };

  const handleErrorLog = () => {
    logger.error('Transaction failed', { reason: 'User rejected transaction' });
    addLog('Error message sent', 'error');
  };

  const handleSuccessLog = () => {
    logger.success('Payment processed', { amount: '100 USDC', planId: '1' });
    addLog('Success message sent', 'success');
  };

  const handleGroupLog = () => {
    logger.group('Transaction Flow');
    logger.info('Step 1: Approve tokens');
    logger.info('Step 2: Sign permit');
    logger.info('Step 3: Create subscription');
    logger.groupEnd();
    addLog('Grouped logs sent (only visible in debug mode)', 'debug');
  };

  const handleTableLog = () => {
    const data = [
      { planId: '1', price: '10 USDC', status: 'Active' },
      { planId: '2', price: '25 USDC', status: 'Active' },
      { planId: '3', price: '50 USDC', status: 'Paused' },
    ];
    logger.table(data);
    addLog('Table logged to console (only visible in debug mode)', 'debug');
  };

  const clearLogs = () => {
    setLogOutput([]);
  };

  return (
    <DemoCard
      title="Logger Utility"
      description="Configure and use the Subscrypts logger for debugging and monitoring SDK operations."
    >
      <div className="space-y-6">
        {/* Logger Configuration */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Configure Logger Level</h3>
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => handleLogLevelChange('silent')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentLevel === 'silent'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Silent
            </button>
            <button
              onClick={() => handleLogLevelChange('info')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentLevel === 'info'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Info
            </button>
            <button
              onClick={() => handleLogLevelChange('debug')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentLevel === 'debug'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Debug
            </button>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600">
              <strong>Current Level:</strong> {currentLevel}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {currentLevel === 'silent' && '🔇 No console output'}
              {currentLevel === 'info' && 'ℹ️ Info, warn, error, and success messages only'}
              {currentLevel === 'debug' && '🐛 All messages including debug, groups, and tables'}
            </p>
          </div>
        </div>

        {/* Log Methods */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Logger Methods</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <button
              onClick={handleDebugLog}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
            >
              🐛 Debug
            </button>
            <button
              onClick={handleInfoLog}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
            >
              ℹ️ Info
            </button>
            <button
              onClick={handleWarnLog}
              className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors text-sm font-medium"
            >
              ⚠️ Warn
            </button>
            <button
              onClick={handleErrorLog}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
            >
              ❌ Error
            </button>
            <button
              onClick={handleSuccessLog}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
            >
              ✅ Success
            </button>
            <button
              onClick={handleGroupLog}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
            >
              📂 Group
            </button>
            <button
              onClick={handleTableLog}
              className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm font-medium"
            >
              📊 Table
            </button>
            <button
              onClick={clearLogs}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm font-medium"
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        {/* Log Output Display */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Log Output (In-App Display)</h3>
          <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-xs h-64 overflow-y-auto">
            {logOutput.length === 0 ? (
              <p className="text-gray-500">No logs yet. Click the buttons above to generate logs.</p>
            ) : (
              logOutput.map((log, i) => (
                <div key={i} className="mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            💡 Tip: Open your browser's developer console to see the actual SDK logger output
          </p>
        </div>

        {/* Usage Examples */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Code Examples</h3>
          <div className="space-y-4">
            {/* Basic Configuration */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Configure Logger</h4>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`import { logger } from '@subscrypts/react-sdk';

// Set log level
logger.configure({ level: 'debug' });

// Set custom prefix
logger.configure({
  level: 'info',
  prefix: '[MyApp]'
});

// Get current level
const currentLevel = logger.getLevel();`}</pre>
              </div>
            </div>

            {/* Logging Methods */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Logging Methods</h4>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`// Debug - detailed developer info (debug level only)
logger.debug('Contract method called', {
  method: 'subscribe',
  args: [planId, paymentMethod]
});

// Info - user-friendly status
logger.info('Subscription created successfully');

// Warning - potential issues
logger.warn('Balance is low', { balance: '0.05 ETH' });

// Error - failures
logger.error('Transaction failed', {
  reason: error.message
});

// Success - completed operations
logger.success('Payment processed', {
  amount: '100 USDC'
});`}</pre>
              </div>
            </div>

            {/* Grouped Logging */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Grouped Logging (Debug Only)</h4>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`// Group related logs together
logger.group('Subscription Flow');
logger.debug('Step 1: Fetching plan details');
logger.debug('Step 2: Checking balance');
logger.debug('Step 3: Creating subscription');
logger.groupEnd();

// Nested groups
logger.group('Payment Processing');
logger.info('Validating payment method');

logger.group('Token Approval');
logger.debug('Checking allowance');
logger.debug('Requesting approval');
logger.groupEnd();

logger.info('Payment completed');
logger.groupEnd();`}</pre>
              </div>
            </div>

            {/* Table Logging */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Table Logging (Debug Only)</h4>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`// Log data as a table
const subscriptions = [
  { id: '1', planId: '1', status: 'Active' },
  { id: '2', planId: '2', status: 'Expired' },
  { id: '3', planId: '1', status: 'Active' }
];

logger.table(subscriptions);

// Log BigInt values safely
import { formatLogValue } from '@subscrypts/react-sdk';

const data = {
  balance: 1000000000000000000n,
  price: 100000000n
};

logger.debug('Balances', formatLogValue(data));
// BigInt values are automatically converted to strings`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Integration with Provider */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Integration with SubscryptsProvider</h3>
          <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre>{`import { SubscryptsProvider, logger } from '@subscrypts/react-sdk';

// Option 1: Configure via Provider props (recommended)
<SubscryptsProvider debug="debug">
  <App />
</SubscryptsProvider>

// Option 2: Configure logger directly
logger.configure({ level: 'debug' });

<SubscryptsProvider>
  <App />
</SubscryptsProvider>`}</pre>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 border-l-4 border-green-500 p-4">
          <h3 className="font-semibold text-green-900 mb-2">💡 Best Practices</h3>
          <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
            <li>Use <code className="bg-green-100 px-1 rounded">debug</code> level during development for full visibility</li>
            <li>Use <code className="bg-green-100 px-1 rounded">info</code> level in staging to monitor operations</li>
            <li>Use <code className="bg-green-100 px-1 rounded">silent</code> level in production to avoid console clutter</li>
            <li>Use <code className="bg-green-100 px-1 rounded">logger.group()</code> to organize related operations</li>
            <li>Use <code className="bg-green-100 px-1 rounded">logger.table()</code> for debugging data structures</li>
            <li>Use <code className="bg-green-100 px-1 rounded">formatLogValue()</code> when logging BigInt values</li>
            <li>Add meaningful context data to debug logs for easier troubleshooting</li>
          </ul>
        </div>
      </div>
    </DemoCard>
  );
}
