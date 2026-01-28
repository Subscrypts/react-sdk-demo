/**
 * DevSection Component
 *
 * Individual documentation section with collapsible content.
 * Displays code examples, props tables, and documentation for a single SDK feature.
 */

import { useState } from 'react';
import { CodeBlock } from './CodeBlock';
import { PropList } from './PropTable';
import type { DevSectionProps, FeatureType } from '../../types/devDocs';

// Icon mapping for feature types
const FEATURE_ICONS: Record<FeatureType, { icon: string; color: string; label: string }> = {
  hook: { icon: '🪝', color: 'text-blue-600', label: 'Hook' },
  component: { icon: '🧩', color: 'text-green-600', label: 'Component' },
  utility: { icon: '🔧', color: 'text-purple-600', label: 'Utility' },
  config: { icon: '⚙️', color: 'text-orange-600', label: 'Config' },
  constant: { icon: '📌', color: 'text-red-600', label: 'Constant' },
};

export function DevSection({ section, isExpanded: controlledExpanded, onToggle }: DevSectionProps) {
  // Allow controlled or uncontrolled expansion
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalExpanded(!internalExpanded);
    }
  };

  const featureInfo = FEATURE_ICONS[section.type];

  return (
    <div className="dev-section border-b border-gray-200 last:border-b-0">
      {/* Section header (clickable to expand/collapse) */}
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3 flex-1">
          {/* Feature type icon */}
          <span className="text-xl" aria-label={featureInfo.label}>
            {featureInfo.icon}
          </span>

          {/* Title and version */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              {section.title}
            </h3>
            {section.version && (
              <span className="text-xs text-gray-500">Since v{section.version}</span>
            )}
          </div>

          {/* Type badge */}
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded ${featureInfo.color} bg-opacity-10`}
          >
            {featureInfo.label}
          </span>
        </div>

        {/* Expand/collapse chevron */}
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isExpanded ? 'transform rotate-180' : ''
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

      {/* Section content (expanded) */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4">
          {/* Description */}
          {section.description && (
            <p className="text-sm text-gray-700 leading-relaxed">{section.description}</p>
          )}

          {/* Code example */}
          {section.code && (
            <div>
              <h4 className="text-xs font-semibold text-gray-600 uppercase mb-2">
                Code Example
              </h4>
              <CodeBlock code={section.code} showLineNumbers={false} maxHeight="300px" />
            </div>
          )}

          {/* Props table */}
          {section.props && section.props.length > 0 && (
            <PropList props={section.props} title="Parameters" />
          )}

          {/* Return values */}
          {section.returnValues && section.returnValues.length > 0 && (
            <PropList props={section.returnValues} title="Returns" />
          )}

          {/* Additional examples */}
          {section.examples && section.examples.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-gray-600 uppercase">
                More Examples
              </h4>
              {section.examples.map((example, index) => (
                <div key={index}>
                  <h5 className="text-sm font-medium text-gray-700 mb-1">
                    {example.title}
                  </h5>
                  {example.description && (
                    <p className="text-xs text-gray-600 mb-2">{example.description}</p>
                  )}
                  <CodeBlock
                    code={example.code}
                    language={example.language || 'typescript'}
                    showLineNumbers={false}
                    maxHeight="200px"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Notes */}
          {section.notes && section.notes.length > 0 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
              <h4 className="text-xs font-semibold text-yellow-800 uppercase mb-1">
                Important Notes
              </h4>
              <ul className="list-disc list-inside space-y-1">
                {section.notes.map((note, index) => (
                  <li key={index} className="text-sm text-yellow-700">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* External links */}
          {section.links && section.links.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {section.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {link.label}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
