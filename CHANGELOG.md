# Changelog

All notable changes to the Subscrypts React SDK Demo will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

#### Major Architecture Simplification - Removed Custom Wrappers
- **Removed** custom `DEMO_PLANS` configuration (`src/config/plans.ts`)
  - Plan data now fetched directly from blockchain via SDK hooks
  - Eliminates string vs number type conversion issues
  - No longer needed for plan name display
  - 13 files previously depended on this custom configuration

- **Removed** custom `PlanCard` component (`src/components/subscription/PlanCard.tsx`)
  - Replaced with SDK's built-in `PricingTable` component
  - SDK component provides automatic data fetching, styling, and checkout integration
  - Demonstrates proper SDK usage patterns for developers

- **Refactored** Pricing page (`src/pages/Pricing.tsx`)
  - Now uses SDK's `<PricingTable>` component directly
  - One component replaces entire custom grid + card logic
  - Plans: 1 (Basic), 2 (Pro - featured), 3 (Enterprise)
  - Hardcoded plan IDs: `['1', '2', '3']`
  - Automatic checkout flow with `onSubscriptionSuccess` callback

- **Simplified** Account and Premium pages
  - Hardcoded merchant plan IDs: `[1, 2]` (Basic and Pro plans)
  - Removed plan name mapping (displays "Plan {id}")
  - Cleaner subscription filtering logic using `Number(sub.planId)`
  - Fixed type mismatch by ensuring numeric comparison

- **Updated** 10 demo component files
  - Replaced `DEMO_PLANS` imports with hardcoded `const DEMO_PLAN_IDS = ['1', '2', '3']`
  - Dropdowns now show "Plan 1", "Plan 2", "Plan 3"
  - Focuses demos on SDK functionality, not custom configuration
  - Files updated:
    - CheckoutWizardDemo.tsx
    - PlanCardDemo.tsx
    - PricingTableDemo.tsx
    - SubscriptionGuardDemo.tsx
    - SubscryptsButtonDemo.tsx
    - UsePlanDemo.tsx
    - UsePlanPriceDemo.tsx
    - UsePlansDemo.tsx
    - UseSubscribeDemo.tsx
    - UseSubscriptionStatusDemo.tsx

### Removed
- `src/config/plans.ts` - Custom plan configuration file
- `src/components/subscription/PlanCard.tsx` - Custom wrapper component
- Environment variable dependency (`VITE_DEMO_PLAN_ID_*` no longer required)

### Impact
- **Simpler deployment**: No environment variables needed for plan IDs
- **Better demo**: Shows SDK components as intended by package authors
- **Fewer bugs**: No type conversion issues between string and number plan IDs
- **Less code**: 2 files deleted, 13 files simplified
- **Production ready**: Deployment to Vercel no longer requires .env.local configuration

### SDK Version
- **Upgraded** @subscrypts/react-sdk from 1.4.0 to 1.4.1
  - Fixes critical subscription detection bug in v1.4.0
  - Patch version with full backward compatibility

#### Code Quality - Account Page
- **Refactored** to use SDK's `canAccess()` utility
  - Removed custom `isSubscriptionActive()` helper (lines 87-90)
  - Replaced with SDK's `canAccess(subscription)` (available since v1.2.0)
  - More robust: checks both subscription status and nextPaymentDate
  - Demonstrates proper SDK usage patterns

#### Code Cleanup
- **Removed Custom Debug Code** from Account page
  - Deleted debug UI panel (lines 102-124)
  - Deleted debug console logging useEffect (lines 43-64)
  - This was troubleshooting code added to diagnose subscription detection bug
  - No longer needed after SDK v1.4.1 upgrade fixes the bug
  - SDK's own logging (via `<SubscryptsProvider debug>`) is sufficient
  - Cleaner production code

### Technical Details
- Modified Files:
  - `package.json` - SDK version bump to 1.4.1
  - `package-lock.json` - Lock file update
  - `src/pages/Account.tsx` - Use `canAccess()`, removed debug code
  - `CHANGELOG.md` - This update

- Breaking Changes: None (patch version upgrade)

### Fixed

#### Plan ID Type Mismatch (Critical Bug)
- **Root Cause:** String vs number type mismatch between DEMO_PLANS configuration and SDK subscription objects
  - DEMO_PLANS.id: string ("1", "2", "3") from environment variables
  - subscription.planId: number (1, 2, 3) from blockchain smart contract
  - Strict equality comparison ("1" === 1) always returned false

- **Impact:** All subscription detection failed across the demo
  - Account page showed "no subscriptions" despite active on-chain subscription
  - Premium page incorrectly redirected to /pricing
  - useSubscriptionStatus and useMySubscriptions appeared to return no data

- **Fix:** Convert numeric subscription.planId to string for comparisons
  - Account.tsx: Fixed filtering logic (line 40)
  - Account.tsx: Fixed plan display matching (line 266)
  - Premium.tsx: Fixed activeSubscriptions mapping (line 13)
  - All comparisons now use String(sub.planId) for type-safe matching

- **Files Modified:**
  - src/pages/Account.tsx
  - src/pages/Premium.tsx
  - CHANGELOG.md

- **Testing:** Verified with wallet 0x8ED1f25ab90Fa078aBdb35a2d88fe8B35281Fd27 subscribed to plan ID 1

### Added - Major v1.4.0 Update

#### New Pages
- **Merchant Dashboard** (`/merchant`) - Complete business owner dashboard showcasing v1.4.0 merchant hooks
  - Revenue tracking with MRR calculations
  - Subscriber list management
  - Plan overview for merchants
- **Hooks Showcase** (`/examples/hooks`) - Comprehensive demonstration of all 16 SDK hooks
  - Interactive demos with live wallet data
  - useWallet, useTokenBalance, useSubscriptionStatus, usePlan demos
  - Categorized by Core, Subscription, Plan, Pricing, Merchant, and Events
- **Components Showcase** (`/examples/components`) - Interactive showcase of all 15 SDK components
  - Organized by category (Checkout, Protection, Pricing, Dashboard, etc.)
- **Utilities Showcase** (`/examples/utilities`) - Demonstrations of 22+ utility functions
  - Formatters, validators, helpers, error handling, and session management
- **Advanced Features** (`/examples/advanced`) - Advanced SDK patterns with **5 comprehensive demos**
  - **ProviderConfigDemo** (277 lines) - All 10 SubscryptsProvider configuration options
    - Interactive debug level switching (silent/info/debug)
    - Event callbacks (onAccountChange, onChainChange) with simulation
    - External wallet integration patterns (Privy, RainbowKit, Wagmi)
    - Custom RPC URLs and balance refresh interval examples
  - **LoggerDemo** (342 lines) - SDK logger utility with full feature demonstration
    - Live log level configuration and switching
    - All 5 logging methods: debug(), info(), warn(), error(), success()
    - Grouped logging and table output examples
    - In-app log output display with browser console integration
  - **ErrorPatternsDemo** (509 lines) - Robust error handling best practices
    - 5 interactive error handling patterns
    - All 7 SDK error classes demonstrated (SubscryptsError, WalletError, NetworkError, etc.)
    - Retry logic with exponential backoff
    - Graceful degradation and fallback strategies
  - **PermitSigningDemo** (329 lines) - PERMIT2 signature generation
    - EIP-712 typed data signing for gasless token approvals
    - Interactive form with amount and deadline parameters
    - Security considerations and best practices
    - Integration examples with subscription flow
  - **DirectContractDemo** (437 lines) - Direct contract access patterns
    - useSubscrypts hook for raw access to contracts, signer, provider
    - Live wallet state, network info, and contract availability display
    - Custom RPC calls, token transfers, and event listening examples
    - Interactive balance refresh and contract method demonstrations

#### Developer Experience
- **Context-Aware Documentation Sidebar** - Collapsible sidebar on every page
  - Relevant code examples for current page
  - Full TypeScript interfaces and prop tables
  - Copy-to-clipboard functionality
  - Links to SDK documentation
  - Version compatibility notes
- **Interactive Hook Demos** - Live, working demonstrations
  - `UseWalletDemo` - Wallet connection with network switching
  - `UseTokenBalanceDemo` - Real-time SUBS/USDC balance display
  - `UseSubscriptionStatusDemo` - Active subscription checker with plan selector
  - `UsePlanDemo` - Plan details fetcher with JSON display
- **Shared Demo Components**
  - `DemoCard` - Reusable card wrapper for consistent styling
  - `ConnectWalletPrompt` - Wallet connection prompt for demos
  - `DemoSection` - Section wrapper for organizing demos

#### Architecture & Infrastructure
- **Modular Architecture** - SDK update best practices demonstration
  - Centralized SDK feature registry (`src/config/sdkFeatures.ts`)
  - Feature detection utility (`src/utils/sdkFeatureDetection.ts`)
  - Version-agnostic code examples
  - Isolated demo components for easy maintenance
- **Documentation System**
  - Page-specific documentation for all 9 pages
  - Comprehensive code examples for hooks, components, utilities
  - PropTable components for API documentation
  - DevSection, DevSidebar, DevToggleButton components
- **SDK Update Guide** - `UPDATING_SDK.md` documentation
  - Real-world example of v1.0.9 → v1.4.0 upgrade
  - Step-by-step update checklist
  - Modular architecture benefits explained

#### Navigation
- **Examples Dropdown Menu** in header navigation
  - Hover interaction with smooth transitions
  - Links to Hooks, Components, Utilities, Advanced pages
  - Visual indicators (emojis) for each section
- **Merchant Link** with v1.4.0 badge in navigation
- Active route highlighting for Examples submenu

#### Account Page Enhancements
- Added v1.3.0 enhancement banner showing upgrade path
- Documented migration to `SubscriptionDashboard` component
- Inline comments showing v1.3.0 alternative approaches
- Clear upgrade path to newer SDK components

### Changed

#### SDK Version
- **Upgraded** from v1.0.9 to v1.4.0
  - Adds 30+ new features across 5 minor versions
  - Full backward compatibility maintained

#### Documentation
- **README.md** - Completely rewritten
  - Comprehensive feature list for all 9 pages
  - Updated project structure reflecting new architecture
  - Added SDK version history section
  - Updated technology stack (React 18.2, Vite 5.0, TypeScript 5.3)
  - New "What's Included" section with detailed page descriptions

#### Dependencies
- Added `react-syntax-highlighter@15.5.0` for code highlighting
- Added `@types/react-syntax-highlighter@15.5.0` for TypeScript support

### Technical Details

#### File Structure Changes
```
New Files Created (~60 files):
- src/pages/Merchant.tsx
- src/pages/examples/Hooks.tsx
- src/pages/examples/Components.tsx
- src/pages/examples/Utilities.tsx
- src/pages/examples/Advanced.tsx
- src/components/dev/* (7 files)
- src/components/examples/shared/* (3 files)
- src/components/examples/hooks/* (16 files)
- src/components/examples/components/* (16 files)
- src/components/examples/utilities/* (6 files)
- src/components/examples/advanced/* (5 files + index.ts)
  - ProviderConfigDemo.tsx
  - LoggerDemo.tsx
  - ErrorPatternsDemo.tsx
  - PermitSigningDemo.tsx
  - DirectContractDemo.tsx
- src/utils/devDocs/* (10 files)
- src/utils/codeExamples/* (4 files)
- src/config/sdkFeatures.ts
- src/utils/sdkFeatureDetection.ts
- UPDATING_SDK.md
```

#### Modified Files
- `src/App.tsx` - Added 5 new routes, integrated DevSidebar
- `src/components/layout/Header.tsx` - Added Examples dropdown and Merchant link
- `src/pages/Account.tsx` - Added v1.3.0 enhancement documentation
- `package.json` - Updated SDK version to 1.4.0
- `README.md` - Complete rewrite with comprehensive documentation, detailed Advanced demos section
- `CHANGELOG.md` - Detailed documentation of all 5 advanced demos with line counts and features

#### Build & Performance
- Production build: 7.83s
- Bundle size: 1,611.54 KB (gzipped: 487.73 KB)
- TypeScript strict mode enabled
- All type errors resolved (0 errors)
- 1,368 modules transformed

### Fixed

#### Critical Bug Fixes (Production Testing)
- **Account Page** - Fixed subscription detection not showing active on-chain subscriptions
  - Upgraded from v1.0.0 `useSubscriptionStatus` (checks specific plan IDs only) to v1.3.0 `useMySubscriptions` (fetches ALL on-chain subscriptions)
  - Now detects subscriptions to ANY plan, not just hardcoded demo plans (IDs 1, 2, 3)
  - Displays real blockchain data: next payment date, subscription ID, auto-renewal status, remaining cycles
  - Updated developer note badge from blue "Enhancement Available" to green "v1.4.0 Implementation"
  - Added proper loading, error, and empty states
  - Fixes issue where users with active subscriptions saw "No subscriptions found"

- **Account Page Enhancements** - Added comprehensive subscription display with expandable details
  - Now displays BOTH active AND inactive subscriptions (previously only showed active)
  - Filters to show ONLY merchant's plans (plan IDs 1 and 2: Basic and Pro)
  - Visual status indicators: green badge/background for active, gray badge/background for inactive
  - Added `isSubscriptionActive()` helper to check if `nextPaymentDate` is in the future
  - Added expandable `<details>` element to view all subscription field values
  - Clicking "Click to view all field values →" reveals complete JSON data with proper BigInt serialization
  - Shows subscriber address field (previously hidden)
  - Updated section header to clarify "Showing all subscriptions (active and inactive) to our plans"
  - Updated empty state message to "You don't have any subscriptions to our plans yet"
  - Updated debug panel to show "Merchant Plan IDs" and filtered count
  - Improved debugging: users can now inspect complete on-chain subscription data directly in UI

- **Premium Page** - Fixed incorrect redirect despite having active subscription
  - Changed guard from single-plan (`planId`) to multi-plan (`planIds` array)
  - Now accepts ONLY merchant's plans (plan IDs 1 and 2: Basic and Pro)
  - Uses `DEMO_PLANS.slice(0, 2)` to filter for merchant's plans only
  - Added `requireAll={false}` to accept any active subscription to these plans
  - Upgraded content display from `useSubscriptionStatus` to `useMySubscriptions`
  - Shows "Next Payment" date instead of "Expires" (more accurate for active subscriptions)
  - SubscriptionGuard automatically checks if subscription is active (based on nextPaymentDate)
  - Fixes issue where users with valid subscriptions were incorrectly redirected to /pricing

- **UseSUBSPrice Hook Demo** - Fixed BigInt conversion error on Hooks page
  - Added proper BigInt to number conversion: `const priceNumber = priceUsd !== null ? Number(priceUsd) : null`
  - Updated all `.toFixed()` calls and arithmetic operations to use `priceNumber` instead of raw BigInt
  - Added display of raw BigInt value for developer reference
  - Fixes "cannot convert BigInt, BigInt, BigInt" error that prevented price display

**Root Cause**: Account and Premium pages were using outdated v1.0.0 patterns that only checked for subscriptions to specific hardcoded plan IDs. Modern SDK v1.3.0+ patterns use `useMySubscriptions` to automatically fetch ALL on-chain subscriptions without requiring specific plan IDs.

**Impact**: Demo now accurately reflects on-chain subscription state for ALL users, regardless of which plan they're subscribed to. This makes the demo a proper reference implementation that works in real-world scenarios.

### SDK Features Showcased

#### Hooks (16 total)
- **Core**: useWallet, useTokenBalance, useSubscrypts
- **Subscription**: useSubscriptionStatus, useSubscribe, useMySubscriptions
- **Plan**: usePlan, usePlans, usePlansByMerchant, usePlanPrice
- **Pricing**: useSUBSPrice
- **Management**: useManageSubscription
- **Merchant (v1.4.0)**: useMerchantPlans, useMerchantSubscribers, useMerchantRevenue
- **Events (v1.3.0)**: useSubscryptsEvents

#### Components (15 total)
- **Checkout**: SubscryptsButton, CheckoutWizard
- **Protection**: SubscriptionGuard
- **Pricing**: PlanCard, PricingTable
- **Dashboard**: SubscriptionCard, SubscriptionDashboard
- **Management**: ManageSubscriptionModal, ConfirmDialog
- **Merchant**: MerchantDashboard
- **Wallet**: ConnectWalletModal
- **Error Handling**: ErrorDisplay, NetworkSwitchPrompt, SubscryptsErrorBoundary
- **UI**: LoadingSpinner

#### Utilities (22+ functions)
- Formatters, validators, helpers, error handling, session management, network info

### Notes

This update transforms the demo from a simple showcase into a **comprehensive learning resource** for the Subscrypts React SDK. The modular architecture ensures easy maintenance and demonstrates best practices for handling SDK updates in active development.

All changes maintain backward compatibility with existing functionality while adding extensive new features and documentation.

## [1.0.0] - Initial Release

### Added
- Basic demo application with 4 pages (Home, Pricing, Premium, Account)
- SubscryptsProvider setup
- Wallet connection with useWallet hook
- Token balance display with useTokenBalance
- Subscription status checking with useSubscriptionStatus
- SubscryptsButton for one-click checkout
- SubscriptionGuard for content protection
- Basic styling with Tailwind CSS
- Vercel deployment configuration

[Unreleased]: https://github.com/Subscrypts/react-sdk-demo/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/Subscrypts/react-sdk-demo/releases/tag/v1.0.0
