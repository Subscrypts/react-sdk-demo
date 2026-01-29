/**
 * Session Management Demo
 *
 * Demonstrates wallet session persistence via SubscryptsProvider (v1.1.0).
 */

import { useWallet, type WalletSession } from '@subscrypts/react-sdk';
import { DemoCard, ConnectWalletPrompt } from '../shared';
import { useState, useEffect } from 'react';

// Storage key used by SDK (for demonstration)
const STORAGE_KEY = 'subscrypts_wallet_session';
const MAX_SESSION_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export function SessionManagementDemo() {
  const { isConnected, address } = useWallet();
  const [storedSession, setStoredSession] = useState<WalletSession | null>(null);
  const [manualSession, setManualSession] = useState<{
    address: string;
    timestamp: number;
    age: string;
  } | null>(null);

  // Check localStorage for session
  useEffect(() => {
    const checkSession = () => {
      const sessionStr = localStorage.getItem(STORAGE_KEY);
      if (sessionStr) {
        try {
          const session = JSON.parse(sessionStr) as WalletSession;
          setStoredSession(session);
        } catch (error) {
          console.error('Failed to parse session:', error);
          setStoredSession(null);
        }
      } else {
        setStoredSession(null);
      }
    };

    checkSession();
    // Check every second for changes
    const interval = setInterval(checkSession, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isConnected) {
    return (
      <DemoCard
        title="Session Management"
        description="Automatic wallet session persistence with 7-day expiry"
        version="v1.1.0"
      >
        <ConnectWalletPrompt />
      </DemoCard>
    );
  }

  const isSessionStale = (session: WalletSession): boolean => {
    const age = Date.now() - session.timestamp;
    return age > MAX_SESSION_AGE_MS;
  };

  const formatAge = (timestamp: number): string => {
    const ageMs = Date.now() - timestamp;
    const ageDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));
    const ageHours = Math.floor((ageMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const ageMinutes = Math.floor((ageMs % (1000 * 60 * 60)) / (1000 * 60));

    if (ageDays > 0) return `${ageDays}d ${ageHours}h ago`;
    if (ageHours > 0) return `${ageHours}h ${ageMinutes}m ago`;
    return `${ageMinutes}m ago`;
  };

  const handleManualSave = () => {
    if (!address) return;

    const session: WalletSession = {
      connectorId: 'injected',
      address: address,
      timestamp: Date.now(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setManualSession({
      address: session.address,
      timestamp: session.timestamp,
      age: formatAge(session.timestamp),
    });
  };

  const handleManualClear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setStoredSession(null);
    setManualSession(null);
  };

  return (
    <DemoCard
      title="Session Management"
      description="Automatic wallet session persistence with 7-day expiry"
      version="v1.1.0"
    >
      <div className="space-y-6">
        {/* Current Session State */}
        <div className={`rounded-lg p-6 border-2 ${
          storedSession ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-300'
        }`}>
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Current Session in localStorage:
          </h4>

          {storedSession ? (
            <div className="space-y-3">
              <div>
                <div className="text-xs font-semibold text-gray-600 mb-1">Connector ID:</div>
                <div className="bg-white rounded p-2 text-sm font-mono text-blue-600">
                  {storedSession.connectorId}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-600 mb-1">Address:</div>
                <div className="bg-white rounded p-2 text-sm font-mono text-gray-700 break-all">
                  {storedSession.address}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-600 mb-1">Saved:</div>
                <div className="bg-white rounded p-2 text-sm">
                  <div className="text-gray-700">
                    {new Date(storedSession.timestamp).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    ({formatAge(storedSession.timestamp)})
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-600 mb-1">Status:</div>
                <div className={`bg-white rounded p-2 text-sm font-medium ${
                  isSessionStale(storedSession) ? 'text-red-700' : 'text-green-700'
                }`}>
                  {isSessionStale(storedSession)
                    ? '✗ Stale (older than 7 days) - Will be cleared on reconnect'
                    : '✓ Fresh (less than 7 days old)'}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded p-4 text-center text-sm text-gray-600">
              No session currently stored
            </div>
          )}
        </div>

        {/* Manual Session Controls */}
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Manual Session Controls:</h4>
          <p className="text-xs text-gray-600 mb-4">
            Normally, SubscryptsProvider handles sessions automatically when{' '}
            <code className="bg-white px-1 rounded">persistSession={'{'}true{'}'}</code> is set.
            These buttons let you manually test session storage:
          </p>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleManualSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              💾 Save Current Session
            </button>
            <button
              onClick={handleManualClear}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              🗑️ Clear Session
            </button>
          </div>

          {manualSession && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3 text-xs">
              <strong className="text-blue-900">Session Saved!</strong>
              <div className="text-blue-700 mt-1">
                Reload the page to see the SDK restore this connection automatically.
              </div>
            </div>
          )}
        </div>

        {/* WalletSession Type */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">WalletSession Interface:</h4>
          <pre className="text-xs bg-white rounded p-3 overflow-x-auto font-mono">
{`interface WalletSession {
  connectorId: ConnectorId;  // 'injected' | 'external'
  address: string;           // Wallet address (checksummed)
  timestamp: number;         // Unix timestamp in milliseconds
}`}
          </pre>
          <p className="text-xs text-gray-600 mt-2">
            The SDK uses this interface to store wallet sessions in localStorage. Sessions expire after 7 days.
          </p>
        </div>

        {/* How It Works */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">How Session Persistence Works:</h4>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex gap-3">
              <div className="text-xl">1️⃣</div>
              <div>
                <strong>User Connects Wallet</strong>
                <p className="text-xs text-gray-600 mt-1">
                  When persistSession is enabled, SubscryptsProvider saves the connection to localStorage
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-xl">2️⃣</div>
              <div>
                <strong>Page Reload</strong>
                <p className="text-xs text-gray-600 mt-1">
                  On page load, the provider checks localStorage for a saved session
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-xl">3️⃣</div>
              <div>
                <strong>Session Validation</strong>
                <p className="text-xs text-gray-600 mt-1">
                  If session exists and is less than 7 days old, auto-reconnect is attempted
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-xl">4️⃣</div>
              <div>
                <strong>Stale Session Cleanup</strong>
                <p className="text-xs text-gray-600 mt-1">
                  Sessions older than 7 days are automatically cleared and user must reconnect
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Provider Configuration */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Enable in SubscryptsProvider:</h4>
          <pre className="text-xs bg-white rounded p-3 overflow-x-auto font-mono">
{`import { SubscryptsProvider } from '@subscrypts/react-sdk';

function App() {
  return (
    <SubscryptsProvider
      persistSession={true}  // Enable automatic session persistence
      enableWalletManagement={true}
    >
      <YourApp />
    </SubscryptsProvider>
  );
}`}
          </pre>
        </div>

        {/* Usage Example */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">Usage Pattern:</h4>
          <pre className="text-xs bg-white rounded p-3 overflow-x-auto">
{`// Session persistence is automatic when enabled
// No manual session management needed!

// 1. User connects wallet → Session saved automatically
// 2. User closes browser
// 3. User returns to site → Session restored automatically
// 4. After 7 days → Session expired, user must reconnect

// You can access the WalletSession type for custom logic:
import type { WalletSession } from '@subscrypts/react-sdk';

function checkSession() {
  const sessionStr = localStorage.getItem('subscrypts_wallet_session');
  if (sessionStr) {
    const session: WalletSession = JSON.parse(sessionStr);
    const age = Date.now() - session.timestamp;
    const isStale = age > 7 * 24 * 60 * 60 * 1000;

    if (isStale) {
      console.log('Session expired');
    } else {
      console.log('Session valid:', session.address);
    }
  }
}`}
          </pre>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">💡 Important Notes:</h4>
          <ul className="text-xs text-gray-700 ml-4 space-y-1">
            <li>• Sessions expire after 7 days for security</li>
            <li>• Stored in browser localStorage (not cookies)</li>
            <li>• Only stores connector ID and address (never private keys)</li>
            <li>• User still needs to approve connection in their wallet</li>
            <li>• Clear session on explicit disconnect</li>
            <li>• Works across browser tabs on same domain</li>
            <li>• Private browsing mode may not persist sessions</li>
          </ul>
        </div>

        {/* Storage Key Info */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">🔑 Storage Key:</h4>
          <div className="bg-white rounded p-2 font-mono text-xs text-indigo-600">
            subscrypts_wallet_session
          </div>
          <p className="text-xs text-gray-600 mt-2">
            This is the localStorage key where the SDK stores wallet sessions. You can inspect it in your browser's DevTools.
          </p>
        </div>
      </div>
    </DemoCard>
  );
}
