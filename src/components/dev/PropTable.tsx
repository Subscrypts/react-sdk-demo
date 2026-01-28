/**
 * PropTable Component
 *
 * Displays props/parameters in a formatted table.
 * Used for showing hook parameters, return values, and component props.
 */

import type { PropTableProps } from '../../types/devDocs';

export function PropTable({ props, title, className = '' }: PropTableProps) {
  if (!props || props.length === 0) {
    return null;
  }

  return (
    <div className={`prop-table ${className}`}>
      {title && <h4 className="text-sm font-semibold mb-2 text-gray-700">{title}</h4>}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 border-b">
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 border-b">
                Type
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 border-b">
                Required
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 border-b">
                Default
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 border-b">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {props.map((prop, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2 text-sm font-mono text-blue-600">
                  {prop.name}
                </td>
                <td className="px-4 py-2 text-xs font-mono text-gray-600">
                  {prop.type}
                </td>
                <td className="px-4 py-2 text-xs text-center">
                  {prop.required ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      Yes
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      No
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 text-xs font-mono text-gray-500">
                  {prop.default || '-'}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Compact prop list (alternative to table)
 * Useful for small screens or sidebars
 */
export function PropList({ props, title, className = '' }: PropTableProps) {
  if (!props || props.length === 0) {
    return null;
  }

  return (
    <div className={`prop-list ${className}`}>
      {title && <h4 className="text-sm font-semibold mb-2 text-gray-700">{title}</h4>}

      <div className="space-y-3">
        {props.map((prop, index) => (
          <div key={index} className="border-l-2 border-blue-500 pl-3 py-1">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-mono text-sm text-blue-600 font-semibold">
                {prop.name}
              </span>
              <span className="font-mono text-xs text-gray-500">{prop.type}</span>
              {prop.required && (
                <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                  required
                </span>
              )}
              {prop.default && (
                <span className="font-mono text-xs text-gray-400">
                  = {prop.default}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">{prop.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
