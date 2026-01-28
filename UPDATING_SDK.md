# SDK Update Guide

This document explains how to update the Subscrypts React SDK Demo when the SDK releases new versions.

## Real-World Example: v1.0.9 → v1.4.0 Upgrade

This demo recently underwent a major upgrade from SDK v1.0.9 to v1.4.0, spanning 5 minor versions with 38 new features added. This document reflects lessons learned from that real-world upgrade.

## Why Modular Architecture Matters

The Subscrypts smart contract is **stable** (production, low flexibility), but the React SDK is in **active development** (high velocity, rapid changes). This creates a challenge: how do we keep the demo up-to-date without constant refactoring?

**Solution**: Modular architecture with isolated components and centralized registries.

### Architecture Benefits

**When SDK Updates (Adding New Feature):**
1. Add feature to `src/config/sdkFeatures.ts` registry
2. Create new isolated demo component (e.g., `NewFeatureDemo.tsx`)
3. Add code example to `src/utils/codeExamples/`
4. Add documentation to appropriate page docs file
5. Import demo into showcase page
6. Done! No refactoring needed.

**Time Estimate**: ~30 minutes per new feature

**When SDK Updates (Breaking Change to Existing Feature):**
1. Update isolated demo component for that feature only
2. Update code example in `src/utils/codeExamples/`
3. Update documentation in page docs file
4. Other demos remain untouched

**Time Estimate**: ~15 minutes per breaking change

**When SDK Updates (Feature Deprecated):**
1. Remove feature from `src/config/sdkFeatures.ts`
2. Delete isolated demo component
3. Remove from showcase page imports
4. Clean up docs and examples
5. Other features unaffected

**Time Estimate**: ~10 minutes per deprecated feature

---

## SDK Update Checklist

Use this checklist every time the SDK releases a new version:

### 1. Review SDK Changelog
- [ ] Read the SDK [CHANGELOG.md](https://github.com/Subscrypts/react-sdk/blob/main/CHANGELOG.md)
- [ ] Identify new features added
- [ ] Identify breaking changes to existing features
- [ ] Identify deprecated features
- [ ] Note version number

**Example (v1.4.0 release):**
```
New Features:
- useMerchantPlans() hook
- useMerchantSubscribers() hook
- useMerchantRevenue() hook
- MerchantDashboard component

Breaking Changes: None

Deprecated: None
```

### 2. Update package.json
- [ ] Update SDK version in `package.json`
- [ ] Run `npm install` to install new version
- [ ] Run `npm run build` to verify no build errors
- [ ] Test existing features for backward compatibility

**Commands:**
```bash
# Update package.json
npm install @subscrypts/react-sdk@latest

# Verify build
npm run build

# Start dev server and test
npm run dev
```

### 3. Update SDK Feature Registry
- [ ] Open `src/config/sdkFeatures.ts`
- [ ] Add new features to appropriate arrays:
  - `SDK_HOOKS` - New hooks
  - `SDK_COMPONENTS` - New components
  - `SDK_UTILITIES` - New utilities
  - `SDK_CONSTANTS` - New constants
  - `PROVIDER_PROPS` - New provider props
- [ ] Include version number and description for each feature
- [ ] Update `SDK_STATS.currentVersion`

**Example:**
```typescript
export const SDK_HOOKS: SDKFeature[] = [
  // ... existing hooks ...

  // New in v1.4.0
  { name: 'useMerchantPlans', version: '1.4.0', category: 'hook', description: 'Fetch all plans owned by merchant' },
  { name: 'useMerchantSubscribers', version: '1.4.0', category: 'hook', description: 'Paginated subscribers for a plan' },
  { name: 'useMerchantRevenue', version: '1.4.0', category: 'hook', description: 'Calculate MRR from active subscriptions' },
];

export const SDK_STATS = {
  // ...
  currentVersion: '1.4.0', // Update this!
};
```

### 4. Add Code Examples
- [ ] Open appropriate file in `src/utils/codeExamples/`:
  - `hooks.ts` - For new hooks
  - `components.ts` - For new components
  - `utilities.ts` - For new utilities
- [ ] Add copy-pasteable code examples for each new feature
- [ ] Include realistic usage scenarios
- [ ] Show proper TypeScript types
- [ ] Include error handling where appropriate

**Example:**
```typescript
// src/utils/codeExamples/hooks.ts

export const HOOK_EXAMPLES = {
  // ... existing examples ...

  useMerchantRevenue: `import { useMerchantRevenue } from '@subscrypts/react-sdk';

function RevenueOverview({ planIds }: { planIds?: string[] }) {
  const {
    totalMRR,
    mrrByCurrency,
    usdValue,
    activeSubscriptions,
    isLoading,
    error
  } = useMerchantRevenue(planIds);

  if (isLoading) return <p>Calculating revenue...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Monthly Recurring Revenue</h2>
      <p>Total MRR: \${usdValue.toFixed(2)}</p>
      <p>Active Subscriptions: {activeSubscriptions}</p>
    </div>
  );
}`,
};
```

### 5. Create Isolated Demo Components
- [ ] Create new demo component file in `src/components/examples/`:
  - `hooks/` - For hook demos
  - `components/` - For component demos
  - `utilities/` - For utility demos
- [ ] Implement live, interactive demo
- [ ] Show all props/parameters
- [ ] Include loading and error states
- [ ] Add explanatory text

**Example:**
```typescript
// src/components/examples/hooks/MerchantRevenueDemo.tsx

import { useMerchantRevenue } from '@subscrypts/react-sdk';

export function MerchantRevenueDemo() {
  const {
    totalMRR,
    usdValue,
    activeSubscriptions,
    isLoading,
    error
  } = useMerchantRevenue();

  return (
    <div className="demo-card">
      <h3>useMerchantRevenue Hook</h3>
      <p>Calculate Monthly Recurring Revenue from active subscriptions</p>

      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error.message}</p>}

      {!isLoading && !error && (
        <div className="revenue-display">
          <p><strong>MRR:</strong> ${usdValue.toFixed(2)}</p>
          <p><strong>Active Subscriptions:</strong> {activeSubscriptions}</p>
        </div>
      )}
    </div>
  );
}
```

### 6. Update Documentation Files
- [ ] Identify which pages should showcase the new feature
- [ ] Open corresponding file in `src/utils/devDocs/`:
  - `hooksDocs.ts` - For Hooks page
  - `componentsDocs.ts` - For Components page
  - `utilitiesDocs.ts` - For Utilities page
  - `advancedDocs.ts` - For Advanced page
- [ ] Add documentation section for new feature
- [ ] Include feature description, parameters, return values
- [ ] Link to SDK GitHub documentation

### 7. Integrate into Showcase Pages
- [ ] Open the appropriate showcase page:
  - `src/pages/examples/Hooks.tsx` - For hooks
  - `src/pages/examples/Components.tsx` - For components
  - `src/pages/examples/Utilities.tsx` - For utilities
  - `src/pages/examples/Advanced.tsx` - For advanced features
- [ ] Import new demo component
- [ ] Add to page layout
- [ ] Test that demo renders correctly

**Example:**
```typescript
// src/pages/examples/Hooks.tsx

import { MerchantRevenueDemo } from '@/components/examples/hooks/MerchantRevenueDemo';

export default function HooksPage() {
  return (
    <div>
      {/* ... existing demos ... */}

      <section id="merchant-hooks">
        <h2>Merchant Hooks (v1.4.0)</h2>
        <MerchantRevenueDemo />
      </section>
    </div>
  );
}
```

### 8. Handle Breaking Changes
If the SDK introduces breaking changes to existing features:

- [ ] Identify affected demo components
- [ ] Update demo components to use new API
- [ ] Update code examples in `src/utils/codeExamples/`
- [ ] Update documentation to reflect changes
- [ ] Test all affected demos
- [ ] Update README if API patterns changed significantly

**Example (hypothetical):**
```typescript
// Old API (v1.3.0)
const { subscriptions } = useMySubscriptions(address);

// New API (v1.4.0) - address now optional
const { subscriptions } = useMySubscriptions(); // Uses connected address

// Update demo component:
// Before:
const { address } = useWallet();
const { subscriptions } = useMySubscriptions(address);

// After:
const { subscriptions } = useMySubscriptions(); // Simpler!
```

### 9. Update README.md
- [ ] Update "SDK Version" badge if applicable
- [ ] Update "Features" section with new feature count
- [ ] Add new features to feature list
- [ ] Update installation instructions if needed
- [ ] Update any affected code examples

### 10. Test Everything
- [ ] Test all new demo components
- [ ] Test existing demos still work
- [ ] Test developer sidebar displays new docs
- [ ] Test code examples are copy-pasteable
- [ ] Test all pages load without errors
- [ ] Run build test: `npm run build`
- [ ] Preview production build: `npm run preview`

### 11. Deploy
- [ ] Commit changes with descriptive message
- [ ] Push to GitHub
- [ ] Verify Vercel auto-deploys
- [ ] Test production deployment
- [ ] Verify all features work on HTTPS

**Example commit message:**
```
Update to SDK v1.4.0 - Add Merchant Toolkit

- Upgrade @subscrypts/react-sdk from 1.0.9 to 1.4.0
- Add useMerchantPlans, useMerchantSubscribers, useMerchantRevenue hooks
- Add MerchantDashboard component
- Create Merchant showcase page
- Add merchant demo components
- Update feature registry and code examples
- Update documentation
```

---

## Quick Reference: File Locations

### Core SDK Abstraction Files
- **Feature Registry**: `src/config/sdkFeatures.ts`
- **Feature Detection**: `src/utils/sdkFeatureDetection.ts`
- **Code Examples**: `src/utils/codeExamples/` (hooks.ts, components.ts, utilities.ts)

### Documentation Files
- **Page Docs**: `src/utils/devDocs/` (hooksDocs.ts, componentsDocs.ts, etc.)

### Demo Components
- **Hook Demos**: `src/components/examples/hooks/`
- **Component Demos**: `src/components/examples/components/`
- **Utility Demos**: `src/components/examples/utilities/`

### Showcase Pages
- **Hooks Page**: `src/pages/examples/Hooks.tsx`
- **Components Page**: `src/pages/examples/Components.tsx`
- **Utilities Page**: `src/pages/examples/Utilities.tsx`
- **Advanced Page**: `src/pages/examples/Advanced.tsx`

---

## Common Pitfalls

### ❌ Pitfall 1: Forgetting to Update Feature Registry
**Problem**: New feature works but isn't tracked in registry, causing inconsistencies.

**Solution**: Always update `src/config/sdkFeatures.ts` first. This is the single source of truth.

### ❌ Pitfall 2: Updating SDK Without Testing Backward Compatibility
**Problem**: Breaking changes break existing demos without notice.

**Solution**: Always test existing functionality after `npm install`. Run the dev server and click through all pages.

### ❌ Pitfall 3: Not Creating Isolated Demo Components
**Problem**: Putting demo code directly in showcase pages makes updates difficult.

**Solution**: Always create separate demo component files. One feature = one file.

### ❌ Pitfall 4: Forgetting to Update Code Examples
**Problem**: Documentation sidebar shows outdated code.

**Solution**: Update `src/utils/codeExamples/` immediately after updating demos.

### ❌ Pitfall 5: Not Testing on Production Build
**Problem**: Dev server works but production build fails or has issues.

**Solution**: Always run `npm run build && npm run preview` before deploying.

---

## SDK Version History

This demo tracks SDK versions and demonstrates features from each release:

| SDK Version | Release Date | Demo Status | Features Added | Notes |
|-------------|--------------|-------------|----------------|-------|
| v1.0.9 | 2025-01-23 | ✅ Complete | Initial 7 features | Starting point |
| v1.0.11 | 2025-01-27 | ✅ Complete | Plan hooks, pricing components | +6 features |
| v1.1.0 | 2026-01-27 | ✅ Complete | Error handling, connectors, sessions | +13 features |
| v1.2.0 | 2026-01-28 | ✅ Complete | Fiat pricing, management, decision helpers | +10 features |
| v1.3.0 | 2026-01-28 | ✅ Complete | Subscriber dashboard, events | +4 features |
| v1.4.0 | 2026-01-28 | ✅ Complete | Merchant toolkit | +4 features |
| **Total** | - | - | **58 features** | Current |

---

## Questions?

If you encounter issues during SDK updates:

1. **Check SDK Documentation**: [GitHub](https://github.com/Subscrypts/react-sdk)
2. **Review Changelog**: [CHANGELOG.md](https://github.com/Subscrypts/react-sdk/blob/main/CHANGELOG.md)
3. **Check Demo Issues**: [GitHub Issues](https://github.com/Subscrypts/react-sdk-demo/issues)
4. **Test Isolation**: Create a minimal reproduction to isolate the issue

---

## Maintenance Schedule

**Recommended**: Check for SDK updates weekly during active development phase.

**Minimum**: Update demo within 1 week of major SDK releases.

**Process**:
1. Monitor SDK repository for new releases
2. Follow this checklist when updates are available
3. Test thoroughly before deploying
4. Keep documentation in sync with SDK

---

*Last Updated: 2026-01-28 (v1.4.0 upgrade)*
