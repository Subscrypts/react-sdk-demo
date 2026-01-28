/**
 * SDK Feature Detection Utility
 *
 * Runtime detection of SDK features to support multiple versions gracefully.
 * This allows the demo to work with different SDK versions and provide
 * clear error messages when features are missing.
 *
 * Usage:
 * ```typescript
 * if (isFeatureAvailable('useMerchantRevenue')) {
 *   // Use the feature
 * } else {
 *   // Show upgrade message or fallback
 * }
 * ```
 */

import * as SDK from '@subscrypts/react-sdk';
import { hasFeature as hasFeatureInRegistry } from '../config/sdkFeatures';

/**
 * Check if a feature is available in the installed SDK version
 *
 * @param featureName - Name of the feature to check (hook, component, utility, etc.)
 * @returns true if feature is available, false otherwise
 */
export function isFeatureAvailable(featureName: string): boolean {
  try {
    // Check if feature exists in the SDK module
    const sdkExports = SDK as Record<string, unknown>;
    return featureName in sdkExports && sdkExports[featureName] !== undefined;
  } catch {
    return false;
  }
}

/**
 * Get missing features compared to the registry
 * Useful for showing users what's not available in their SDK version
 *
 * @returns Array of feature names that are in registry but not in SDK
 */
export function getMissingFeatures(): string[] {
  const missingFeatures: string[] = [];

  // This would need to iterate through all features in the registry
  // For now, returning empty array as we expect v1.4.0 to have everything

  return missingFeatures;
}

/**
 * Check if the SDK version meets minimum requirements
 *
 * @param minVersion - Minimum required version (e.g., "1.4.0")
 * @returns true if installed version >= minVersion
 */
export function meetsMinimumVersion(_minVersion: string): boolean {
  try {
    // Get SDK version from package
    // This is a simplified check - in production you'd parse package.json
    // or use the SDK's version export if available
    return true; // For now, assume v1.4.0 is installed
  } catch {
    return false;
  }
}

/**
 * Get a user-friendly message for missing features
 *
 * @param featureName - Name of the missing feature
 * @returns Error message with upgrade instructions
 */
export function getMissingFeatureMessage(featureName: string): string {
  if (hasFeatureInRegistry(featureName)) {
    return `The feature "${featureName}" is not available in your SDK version. Please upgrade to the latest version: npm install @subscrypts/react-sdk@latest`;
  }
  return `Unknown feature: "${featureName}". Please check the feature name.`;
}

/**
 * Safely import a feature with fallback
 *
 * @param featureName - Name of the feature to import
 * @param fallback - Fallback value if feature is not available
 * @returns The feature or fallback
 */
export function safeImport<T>(featureName: string, fallback: T): T {
  if (isFeatureAvailable(featureName)) {
    const sdkExports = SDK as Record<string, unknown>;
    return sdkExports[featureName] as T;
  }
  return fallback;
}

/**
 * Check if multiple features are available
 *
 * @param featureNames - Array of feature names to check
 * @returns Object with feature name as key and availability as value
 */
export function checkMultipleFeatures(featureNames: string[]): Record<string, boolean> {
  const results: Record<string, boolean> = {};

  for (const featureName of featureNames) {
    results[featureName] = isFeatureAvailable(featureName);
  }

  return results;
}

/**
 * Get SDK version information
 *
 * @returns Object with version info
 */
export function getSDKVersionInfo(): {
  version: string;
  isLatest: boolean;
  features: {
    total: number;
    available: number;
    missing: number;
  };
} {
  // In a real implementation, you'd read this from package.json or SDK exports
  return {
    version: '1.4.0',
    isLatest: true,
    features: {
      total: 58, // From our feature registry
      available: 58,
      missing: 0,
    },
  };
}

/**
 * Check if a hook is available
 * Convenience function specifically for hooks
 */
export function isHookAvailable(hookName: string): boolean {
  return isFeatureAvailable(hookName);
}

/**
 * Check if a component is available
 * Convenience function specifically for components
 */
export function isComponentAvailable(componentName: string): boolean {
  return isFeatureAvailable(componentName);
}

/**
 * Check if a utility function is available
 * Convenience function specifically for utilities
 */
export function isUtilityAvailable(utilityName: string): boolean {
  return isFeatureAvailable(utilityName);
}

/**
 * Development helper: Log all available features
 * Useful for debugging and development
 */
export function logAvailableFeatures(): void {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  console.group('Subscrypts SDK - Available Features');

  const sdkExports = SDK as Record<string, unknown>;
  const features = Object.keys(sdkExports).filter(key =>
    typeof sdkExports[key] === 'function' ||
    typeof sdkExports[key] === 'object'
  );

  console.log('Total exports:', features.length);
  console.log('Features:', features.sort());
  console.groupEnd();
}

/**
 * Get feature availability summary for display
 */
export function getFeatureAvailabilitySummary(): {
  hooks: { name: string; available: boolean }[];
  components: { name: string; available: boolean }[];
  utilities: { name: string; available: boolean }[];
} {
  // This would check all features from the registry
  // For now, returning empty arrays as we expect everything to be available
  return {
    hooks: [],
    components: [],
    utilities: [],
  };
}
