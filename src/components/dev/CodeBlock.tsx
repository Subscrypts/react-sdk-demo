/**
 * CodeBlock Component
 *
 * Displays syntax-highlighted code with copy-to-clipboard functionality.
 * Uses react-syntax-highlighter with Prism theme.
 */

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { CodeBlockProps } from '../../types/devDocs';

export function CodeBlock({
  code,
  language = 'typescript',
  showLineNumbers = true,
  highlightLines = [],
  maxHeight,
  className = '',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  return (
    <div className={`code-block relative ${className}`}>
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded transition-colors z-10"
        aria-label="Copy code to clipboard"
      >
        {copied ? '✓ Copied!' : '📋 Copy'}
      </button>

      {/* Code display */}
      <div
        className="code-block-content overflow-auto rounded-lg"
        style={{ maxHeight: maxHeight || '500px' }}
      >
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          showLineNumbers={showLineNumbers}
          wrapLines={true}
          lineProps={(lineNumber) => {
            const style: React.CSSProperties = {};
            if (highlightLines.includes(lineNumber)) {
              style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
              style.display = 'block';
            }
            return { style };
          }}
          customStyle={{
            margin: 0,
            padding: '1rem',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

/**
 * Copy button component (can be used standalone)
 */
export function CopyButton({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`copy-button px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors ${className}`}
      aria-label="Copy to clipboard"
    >
      {copied ? '✓ Copied' : '📋 Copy'}
    </button>
  );
}
