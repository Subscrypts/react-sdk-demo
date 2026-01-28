/**
 * Advanced Features Showcase Page
 *
 * Advanced SDK features for power users.
 */

export default function AdvancedPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Advanced Features</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Advanced SDK features for power users: provider configuration, custom connectors, error
          handling, logging, direct contract access, and security best practices.
        </p>
      </div>

      {/* Warning Banner */}
      <div className="max-w-4xl mx-auto mb-8 bg-orange-50 border border-orange-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="text-orange-600 text-2xl">⚠️</div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-orange-900 mb-2">For Advanced Users</h3>
            <p className="text-orange-700">
              These features provide low-level control over the SDK. Most developers should use the
              standard hooks and components instead. Use these features only if you need custom
              functionality.
            </p>
          </div>
        </div>
      </div>

      {/* Advanced Topics */}
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Provider Configuration */}
        <section id="provider-config">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-blue-600">⚙️</span>
            Advanced Provider Configuration
          </h2>
          <p className="text-gray-600 mb-8">
            Deep dive into SubscryptsProvider options for custom setups.
          </p>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Configuration Options</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Wallet Management</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• enableWalletManagement</li>
                  <li>• externalProvider</li>
                  <li>• connectors (v1.1.0)</li>
                  <li>• persistSession (v1.1.0)</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Performance</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• balanceRefreshInterval</li>
                  <li>• debug levels</li>
                  <li>• RPC optimization</li>
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-2">Lifecycle Callbacks</h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• onAccountChange (v1.0.11)</li>
                  <li>• onChainChange (v1.0.11)</li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-900 mb-2">Network</h4>
                <ul className="text-sm text-orange-800 space-y-1">
                  <li>• network: "arbitrum"</li>
                  <li>• Chain ID: 42161</li>
                  <li>• Custom RPC URLs</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded p-4 text-sm text-gray-600">
              Interactive configuration demo will be added here
            </div>
          </div>
        </section>

        {/* Custom Wallet Connectors */}
        <section id="connectors">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-purple-600">🔌</span>
            Custom Wallet Connectors (v1.1.0)
          </h2>
          <p className="text-gray-600 mb-8">
            Build custom connectors for Privy, Web3Auth, WalletConnect, or any wallet provider.
          </p>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">WalletConnector Interface</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Implement these methods to create a custom connector:
                </p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <code className="text-purple-600 text-xs">connect()</code>
                    <span className="text-gray-600">Initialize connection and return address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="text-purple-600 text-xs">disconnect()</code>
                    <span className="text-gray-600">Disconnect wallet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="text-purple-600 text-xs">getProvider()</code>
                    <span className="text-gray-600">Return ethers provider</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="text-purple-600 text-xs">getSigner()</code>
                    <span className="text-gray-600">Return ethers signer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="text-purple-600 text-xs">reconnect()</code>
                    <span className="text-gray-600">Auto-reconnect for sessions</span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-2">Built-in Connectors</h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• InjectedConnector - MetaMask, browser wallets</li>
                  <li>• ExternalConnector - Wagmi, RainbowKit, etc.</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded p-4 text-sm text-gray-600">
                Custom connector demo will be added here
              </div>
            </div>
          </div>
        </section>

        {/* External Provider Integration */}
        <section id="external-providers">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-green-600">🔗</span>
            External Provider Integration
          </h2>
          <p className="text-gray-600 mb-8">
            Integrate with Wagmi, RainbowKit, ConnectKit, or other wallet management libraries.
          </p>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">Wagmi</h4>
                <p className="text-xs text-gray-600">React hooks for Ethereum</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg border border-pink-200">
                <h4 className="font-semibold text-gray-900 mb-2">RainbowKit</h4>
                <p className="text-xs text-gray-600">Beautiful wallet UI</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2">Privy</h4>
                <p className="text-xs text-gray-600">Embedded wallets</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded p-4 text-sm text-gray-600">
              External provider integration demo will be added here
            </div>
          </div>
        </section>

        {/* Error Handling */}
        <section id="error-handling">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-red-600">❌</span>
            Error Boundaries & Recovery (v1.1.0)
          </h2>
          <p className="text-gray-600 mb-8">
            Graceful error handling with React error boundaries and retry strategies.
          </p>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Error Components</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <code className="text-red-600 text-xs">SubscryptsErrorBoundary</code>
                  </li>
                  <li className="flex items-center gap-2">
                    <code className="text-red-600 text-xs">ErrorDisplay</code>
                  </li>
                  <li className="flex items-center gap-2">
                    <code className="text-red-600 text-xs">NetworkSwitchPrompt</code>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded p-4 text-sm text-gray-600">
                Error handling demo will be added here
              </div>
            </div>
          </div>
        </section>

        {/* Debug Logging */}
        <section id="logging">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-yellow-600">📝</span>
            Debug Logging (v1.0.7)
          </h2>
          <p className="text-gray-600 mb-8">
            Comprehensive logging system for troubleshooting and development.
          </p>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">silent</h4>
                <p className="text-xs text-gray-600">Production (no logs)</p>
              </div>
              <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">info</h4>
                <p className="text-xs text-gray-600">Default (important events)</p>
              </div>
              <div className="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">debug</h4>
                <p className="text-xs text-gray-600">Development (full logs)</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded p-4 text-sm text-gray-600">
              Logging level demo will be added here
            </div>
          </div>
        </section>

        {/* Direct Contract Access */}
        <section id="direct-contract">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-indigo-600">🔧</span>
            Direct Contract Access
          </h2>
          <p className="text-gray-600 mb-8">
            Access contract instances directly for custom contract interactions (useSubscrypts hook).
          </p>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-orange-800">
                <strong>⚠️ Advanced:</strong> Most developers should use the standard hooks instead.
                Direct contract access is for custom functionality not covered by the SDK.
              </p>
            </div>

            <div className="bg-gray-50 rounded p-4 text-sm text-gray-600">
              Direct contract demo will be added here
            </div>
          </div>
        </section>

        {/* Security Best Practices */}
        <section id="security">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-red-600">🔒</span>
            Security Best Practices
          </h2>
          <p className="text-gray-600 mb-8">
            Security considerations for production applications.
          </p>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">✅ Do</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>✓ Use HTTPS in production</li>
                  <li>✓ Validate all user input</li>
                  <li>✓ Clear sessions on logout</li>
                  <li>✓ Implement rate limiting</li>
                  <li>✓ Set reasonable gas limits</li>
                  <li>✓ Use transaction confirmations</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">❌ Don't</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>✗ Store private keys</li>
                  <li>✗ Skip input validation</li>
                  <li>✗ Trust user input</li>
                  <li>✗ Ignore error states</li>
                  <li>✗ Use HTTP in production</li>
                  <li>✗ Hard-code sensitive data</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Developer Resources */}
        <section className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Developer Resources</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://github.com/Subscrypts/react-sdk/blob/main/docs/advanced.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              📖 Advanced Guide
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
            <a
              href="https://github.com/Subscrypts/react-sdk/blob/main/docs/security.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              🔒 Security Guide
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
