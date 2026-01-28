/**
 * Developer Documentation Index
 *
 * Centralized exports for all page documentation.
 * Each file provides context-aware documentation for the sidebar.
 */

export { homePageDocs } from './homeDocs';
export { pricingPageDocs } from './pricingDocs';
export { premiumPageDocs } from './premiumDocs';
export { accountPageDocs } from './accountDocs';
export { merchantPageDocs } from './merchantDocs';
export { hooksPageDocs } from './hooksDocs';
export { componentsPageDocs } from './componentsDocs';
export { utilitiesPageDocs } from './utilitiesDocs';
export { advancedPageDocs } from './advancedDocs';

import type { PageDocumentation } from '../../types/devDocs';
import { homePageDocs } from './homeDocs';
import { pricingPageDocs } from './pricingDocs';
import { premiumPageDocs } from './premiumDocs';
import { accountPageDocs } from './accountDocs';
import { merchantPageDocs } from './merchantDocs';
import { hooksPageDocs } from './hooksDocs';
import { componentsPageDocs } from './componentsDocs';
import { utilitiesPageDocs } from './utilitiesDocs';
import { advancedPageDocs } from './advancedDocs';

/**
 * Get documentation for a specific page by route path
 */
export function getDocumentationForRoute(pathname: string): PageDocumentation {
  // Normalize pathname
  const path = pathname.toLowerCase().replace(/\/$/, '');

  // Map routes to documentation
  const routeMap: Record<string, PageDocumentation> = {
    '/': homePageDocs,
    '/pricing': pricingPageDocs,
    '/premium': premiumPageDocs,
    '/account': accountPageDocs,
    '/merchant': merchantPageDocs,
    '/examples/hooks': hooksPageDocs,
    '/examples/components': componentsPageDocs,
    '/examples/utilities': utilitiesPageDocs,
    '/examples/advanced': advancedPageDocs,
  };

  // Return matching documentation or home page as fallback
  return routeMap[path] || homePageDocs;
}

/**
 * Get all available documentation pages
 */
export function getAllDocumentation(): PageDocumentation[] {
  return [
    homePageDocs,
    pricingPageDocs,
    premiumPageDocs,
    accountPageDocs,
    merchantPageDocs,
    hooksPageDocs,
    componentsPageDocs,
    utilitiesPageDocs,
    advancedPageDocs,
  ];
}

/**
 * Get documentation page names (for navigation)
 */
export function getDocumentationPageNames(): string[] {
  return getAllDocumentation().map((doc) => doc.pageName);
}
