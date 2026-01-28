# Changelog

All notable changes to the Subscrypts React SDK Demo will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
- **Advanced Features** (`/examples/advanced`) - Advanced SDK patterns and configurations
  - Provider configuration, custom connectors, error boundaries, logging

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
New Files Created (~50 files):
- src/pages/Merchant.tsx
- src/pages/examples/Hooks.tsx
- src/pages/examples/Components.tsx
- src/pages/examples/Utilities.tsx
- src/pages/examples/Advanced.tsx
- src/components/dev/* (7 files)
- src/components/examples/shared/* (3 files)
- src/components/examples/hooks/* (5 files)
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
- `README.md` - Complete rewrite with comprehensive documentation

#### Build & Performance
- Production build: 6.10s
- Bundle size: 1,344 KB (gzipped: 439 KB)
- TypeScript strict mode enabled
- All type errors resolved

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
