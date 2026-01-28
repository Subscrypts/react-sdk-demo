/**
 * DemoCard Component
 *
 * Reusable card wrapper for demo components.
 * Provides consistent styling and structure across all demos.
 */

interface DemoCardProps {
  title: string;
  description?: string;
  version?: string;
  children: React.ReactNode;
  className?: string;
}

export function DemoCard({ title, description, version, children, className = '' }: DemoCardProps) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
          </div>
          {version && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold">
              {version}
            </span>
          )}
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
