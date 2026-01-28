/**
 * DemoSection Component
 *
 * Section wrapper for organizing multiple demo components.
 * Provides category headers and spacing.
 */

interface DemoSectionProps {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function DemoSection({ id, title, description, children, className = '' }: DemoSectionProps) {
  return (
    <section id={id} className={`mb-12 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        {description && (
          <p className="text-gray-600">{description}</p>
        )}
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
}
