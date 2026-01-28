/**
 * TypeScript interfaces for developer documentation system
 */

/**
 * Types of SDK features
 */
export type FeatureType = 'hook' | 'component' | 'utility' | 'config' | 'constant';

/**
 * Property/parameter definition
 */
export interface PropDefinition {
  name: string;
  type: string;
  required?: boolean;
  default?: string;
  description: string;
}

/**
 * Code example with optional description
 */
export interface CodeExample {
  title: string;
  code: string;
  description?: string;
  language?: string;
}

/**
 * Developer documentation section
 */
export interface DevSection {
  id: string;
  title: string;
  type: FeatureType;
  description: string;
  version?: string; // SDK version when feature was introduced
  code?: string; // Main code example
  props?: PropDefinition[]; // Props/parameters
  returnValues?: PropDefinition[]; // Return values for hooks
  examples?: CodeExample[]; // Additional examples
  notes?: string[]; // Important notes
  links?: {
    label: string;
    url: string;
  }[];
}

/**
 * Documentation content for a page
 */
export interface PageDocumentation {
  pageName: string;
  pageDescription: string;
  sections: DevSection[];
}

/**
 * Props for DevSidebar component
 */
export interface DevSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  documentation: PageDocumentation;
}

/**
 * Props for DevSection component
 */
export interface DevSectionProps {
  section: DevSection;
  isExpanded?: boolean;
  onToggle?: () => void;
}

/**
 * Props for CodeBlock component
 */
export interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  maxHeight?: string;
  className?: string;
}

/**
 * Props for PropTable component
 */
export interface PropTableProps {
  props: PropDefinition[];
  title?: string;
  className?: string;
}

/**
 * Props for DevToggleButton component
 */
export interface DevToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

/**
 * State for useDevSidebar hook
 */
export interface DevSidebarState {
  isOpen: boolean;
  expandedSections: Set<string>;
}

/**
 * Return type for useDevSidebar hook
 */
export interface UseDevSidebarReturn {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  expandedSections: Set<string>;
  toggleSection: (sectionId: string) => void;
  expandSection: (sectionId: string) => void;
  collapseSection: (sectionId: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
}
