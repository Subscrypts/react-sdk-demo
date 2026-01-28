/**
 * DevSidebar Component
 *
 * Collapsible developer documentation sidebar that slides from the right.
 * Context-aware - displays documentation relevant to the current page.
 *
 * Features:
 * - Slides in from right with smooth animation
 * - Semi-transparent backdrop
 * - Persistent state (localStorage)
 * - Responsive (full-screen on mobile)
 * - Scroll-able content area
 * - Collapsible sections
 */

import { useEffect } from 'react';
import { DevSection } from './DevSection';
import type { DevSidebarProps } from '../../types/devDocs';

export function DevSidebar({ isOpen, onToggle, documentation }: DevSidebarProps) {
  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onToggle();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onToggle]);

  return (
    <>
      {/* Backdrop (semi-transparent overlay) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } w-full sm:w-[90vw] md:w-[500px] lg:w-[600px] max-w-full`}
        aria-label="Developer Documentation"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Developer Documentation</h2>
              <p className="text-sm text-gray-500 mt-0.5">{documentation.pageName}</p>
            </div>

            {/* Close button */}
            <button
              onClick={onToggle}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close sidebar"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Page description */}
          {documentation.pageDescription && (
            <div className="px-6 pb-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                {documentation.pageDescription}
              </p>
            </div>
          )}
        </div>

        {/* Content (scrollable) */}
        <div className="overflow-y-auto h-[calc(100vh-140px)] pb-6">
          {documentation.sections && documentation.sections.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {documentation.sections.map((section) => (
                <DevSection key={section.id} section={section} />
              ))}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No Documentation Available
              </h3>
              <p className="text-sm text-gray-500">
                Documentation for this page is being prepared.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Subscrypts React SDK v{documentation.sections[0]?.version || '1.4.0'}</span>
            <a
              href="https://github.com/Subscrypts/react-sdk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1"
            >
              View on GitHub
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}

/**
 * Compact sidebar variant (narrower, for less content)
 */
export function DevSidebarCompact({ isOpen, onToggle, documentation }: DevSidebarProps) {
  return (
    <DevSidebar
      isOpen={isOpen}
      onToggle={onToggle}
      documentation={documentation}
    />
  );
}
