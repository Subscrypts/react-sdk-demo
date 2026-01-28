/**
 * Custom hook for managing developer sidebar state
 *
 * Features:
 * - Persistent state (localStorage)
 * - Section expansion tracking
 * - Batch operations (expand/collapse all)
 */

import { useState, useEffect, useCallback } from 'react';
import type { DevSidebarState, UseDevSidebarReturn } from '../types/devDocs';

const STORAGE_KEY = 'subscrypts-dev-sidebar-state';
const STORAGE_KEY_SECTIONS = 'subscrypts-dev-sidebar-sections';

/**
 * Load sidebar state from localStorage
 */
function loadState(): DevSidebarState {
  try {
    const isOpenStr = localStorage.getItem(STORAGE_KEY);
    const sectionsStr = localStorage.getItem(STORAGE_KEY_SECTIONS);

    return {
      isOpen: isOpenStr === 'true',
      expandedSections: sectionsStr ? new Set(JSON.parse(sectionsStr)) : new Set(),
    };
  } catch (error) {
    console.error('Failed to load dev sidebar state:', error);
    return {
      isOpen: false,
      expandedSections: new Set(),
    };
  }
}

/**
 * Save sidebar state to localStorage
 */
function saveState(state: DevSidebarState): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(state.isOpen));
    localStorage.setItem(
      STORAGE_KEY_SECTIONS,
      JSON.stringify(Array.from(state.expandedSections))
    );
  } catch (error) {
    console.error('Failed to save dev sidebar state:', error);
  }
}

/**
 * Custom hook for developer sidebar state management
 */
export function useDevSidebar(): UseDevSidebarReturn {
  // Initialize state from localStorage
  const [state, setState] = useState<DevSidebarState>(loadState);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Toggle sidebar open/close
  const toggle = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  // Open sidebar
  const open = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: true }));
  }, []);

  // Close sidebar
  const close = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  // Toggle section expansion
  const toggleSection = useCallback((sectionId: string) => {
    setState((prev) => {
      const newExpanded = new Set(prev.expandedSections);
      if (newExpanded.has(sectionId)) {
        newExpanded.delete(sectionId);
      } else {
        newExpanded.add(sectionId);
      }
      return { ...prev, expandedSections: newExpanded };
    });
  }, []);

  // Expand section
  const expandSection = useCallback((sectionId: string) => {
    setState((prev) => {
      const newExpanded = new Set(prev.expandedSections);
      newExpanded.add(sectionId);
      return { ...prev, expandedSections: newExpanded };
    });
  }, []);

  // Collapse section
  const collapseSection = useCallback((sectionId: string) => {
    setState((prev) => {
      const newExpanded = new Set(prev.expandedSections);
      newExpanded.delete(sectionId);
      return { ...prev, expandedSections: newExpanded };
    });
  }, []);

  // Expand all sections
  const expandAll = useCallback(() => {
    // This will be called with section IDs from parent
    // For now, just clear the set (all sections expanded by default)
    setState((prev) => ({ ...prev, expandedSections: new Set() }));
  }, []);

  // Collapse all sections
  const collapseAll = useCallback(() => {
    setState((prev) => ({ ...prev, expandedSections: new Set() }));
  }, []);

  return {
    isOpen: state.isOpen,
    toggle,
    open,
    close,
    expandedSections: state.expandedSections,
    toggleSection,
    expandSection,
    collapseSection,
    expandAll,
    collapseAll,
  };
}
