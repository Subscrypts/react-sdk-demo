import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '@subscrypts/react-sdk';
import { useState } from 'react';

function Header() {
  const { isConnected, address, connect, disconnect } = useWallet();
  const location = useLocation();
  const [examplesOpen, setExamplesOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const isExamplesActive = () =>
    location.pathname.startsWith('/examples') ||
    location.pathname === '/merchant';

  const truncateAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const handleWalletAction = async () => {
    if (isConnected && disconnect) {
      await disconnect();
    } else if (connect) {
      await connect();
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Subscrypts
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/pricing"
              className={`text-sm font-medium transition-colors ${
                isActive('/pricing')
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Pricing
            </Link>
            <Link
              to="/premium"
              className={`text-sm font-medium transition-colors ${
                isActive('/premium')
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Premium
            </Link>

            {/* Examples Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setExamplesOpen(true)}
              onMouseLeave={() => setExamplesOpen(false)}
            >
              <button
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  isExamplesActive()
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Examples
                <svg
                  className={`w-4 h-4 transition-transform ${
                    examplesOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {examplesOpen && (
                <div className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    to="/examples/hooks"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    🪝 Hooks
                  </Link>
                  <Link
                    to="/examples/components"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    🧩 Components
                  </Link>
                  <Link
                    to="/examples/utilities"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    🔧 Utilities
                  </Link>
                  <Link
                    to="/examples/advanced"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    ⚙️ Advanced
                  </Link>
                </div>
              )}
            </div>

            {/* Merchant Link */}
            <Link
              to="/merchant"
              className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                isActive('/merchant')
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <span>Merchant</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-semibold">
                v1.4.0
              </span>
            </Link>

            {isConnected && (
              <Link
                to="/account"
                className={`text-sm font-medium transition-colors ${
                  isActive('/account')
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Account
              </Link>
            )}
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center">
            <button
              onClick={handleWalletAction}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isConnected
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isConnected && address
                ? truncateAddress(address)
                : 'Connect Wallet'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
