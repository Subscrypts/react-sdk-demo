/**
 * DevToggleButton Component
 *
 * Fixed toggle button in bottom-right corner to open/close developer sidebar.
 * Shows "{}" icon when closed, "X" when open.
 */

import type { DevToggleButtonProps } from '../../types/devDocs';

export function DevToggleButton({ isOpen, onClick, className = '' }: DevToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`dev-toggle-button fixed bottom-5 right-5 z-50 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group ${className}`}
      aria-label={isOpen ? 'Close Developer Docs' : 'Open Developer Docs'}
      title={isOpen ? 'Close Developer Docs' : 'Open Developer Docs'}
    >
      {isOpen ? (
        // Close icon (X)
        <svg
          className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        // Code icon ({})
        <div className="text-xl font-bold transition-transform duration-300 group-hover:scale-110">
          {'{}'}
        </div>
      )}

      {/* Tooltip hint (visible on hover when closed) */}
      {!isOpen && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Developer Docs
          <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </button>
  );
}

/**
 * Minimal variant (smaller, less prominent)
 */
export function DevToggleButtonMinimal({ isOpen, onClick, className = '' }: DevToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`dev-toggle-button-minimal fixed bottom-4 right-4 z-50 w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-full shadow-md transition-all duration-200 flex items-center justify-center ${className}`}
      aria-label={isOpen ? 'Close Developer Docs' : 'Open Developer Docs'}
      title={isOpen ? 'Close Developer Docs' : 'Open Developer Docs'}
    >
      {isOpen ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <div className="text-sm font-bold">{'<>'}</div>
      )}
    </button>
  );
}
