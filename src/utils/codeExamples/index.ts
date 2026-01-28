/**
 * Code Examples Index
 *
 * Centralized exports for all SDK code examples.
 * These examples are displayed in the developer documentation sidebar.
 */

export { HOOK_EXAMPLES } from './hooks';
export { COMPONENT_EXAMPLES } from './components';
export { UTILITY_EXAMPLES } from './utilities';

/**
 * Get code example by feature name
 */
export function getCodeExample(featureName: string): string | undefined {
  const { HOOK_EXAMPLES } = require('./hooks');
  const { COMPONENT_EXAMPLES } = require('./components');
  const { UTILITY_EXAMPLES } = require('./utilities');

  return (
    HOOK_EXAMPLES[featureName] ||
    COMPONENT_EXAMPLES[featureName] ||
    UTILITY_EXAMPLES[featureName]
  );
}

/**
 * Get all code examples by category
 */
export function getCodeExamplesByCategory(category: 'hook' | 'component' | 'utility') {
  if (category === 'hook') {
    const { HOOK_EXAMPLES } = require('./hooks');
    return HOOK_EXAMPLES;
  } else if (category === 'component') {
    const { COMPONENT_EXAMPLES } = require('./components');
    return COMPONENT_EXAMPLES;
  } else if (category === 'utility') {
    const { UTILITY_EXAMPLES } = require('./utilities');
    return UTILITY_EXAMPLES;
  }
  return {};
}

/**
 * Check if code example exists for a feature
 */
export function hasCodeExample(featureName: string): boolean {
  return getCodeExample(featureName) !== undefined;
}

/**
 * Get all available code example names
 */
export function getAllCodeExampleNames(): string[] {
  const { HOOK_EXAMPLES } = require('./hooks');
  const { COMPONENT_EXAMPLES } = require('./components');
  const { UTILITY_EXAMPLES } = require('./utilities');

  return [
    ...Object.keys(HOOK_EXAMPLES),
    ...Object.keys(COMPONENT_EXAMPLES),
    ...Object.keys(UTILITY_EXAMPLES),
  ];
}
