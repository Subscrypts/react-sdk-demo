# Subscrypts React SDK Demo

A comprehensive demo application showcasing **ALL features** of the [Subscrypts React SDK](https://github.com/Subscrypts/react-sdk). This production-ready boilerplate demonstrates how to build subscription-based applications on Arbitrum with wallet integration, content protection, seamless checkout flows, and powerful developer tools.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Subscrypts/react-sdk-demo)

> ✨ **Built with Subscrypts React SDK** - Showcases **16 hooks**, **15 components**, and **22+ utilities** with live, interactive examples!
>
> 🎓 **Perfect for Learning** - Context-aware developer documentation sidebar on every page with copy-pasteable code examples.
>
> ⚠️ **HTTPS Required** - This demo requires HTTPS to interact with MetaMask and browser extension wallets.

---

## ⚠️ IMPORTANT: HTTPS Required

**The Subscrypts SDK and browser extension wallets (MetaMask, etc.) require HTTPS to function.**

### ❌ Local HTTP Development Will NOT Work
Running `npm run dev` on `http://localhost:5173` will **not** allow wallet connections because:
- Browser extension wallets block requests from non-secure origins
- The SDK cannot communicate with the wallet on HTTP
- This is a security feature of browser extension wallets, not a bug

### ✅ Working Development Options

#### Option 1: Deploy to Vercel (Recommended - Easiest)
The fastest way to see the demo working:

1. **Fork this repository** on GitHub
2. **Connect to Vercel**: [vercel.com/new](https://vercel.com/new) → Import your fork
3. **Auto-deploy**: Every push to `main` automatically deploys with HTTPS

> 💡 **Why Vercel?** Automatic HTTPS, instant previews, zero configuration

#### Option 2: Use ngrok (For Local Testing)
Create an HTTPS tunnel to your local development server:

```bash
# Terminal 1: Start the dev server
npm run dev

# Terminal 2: Create HTTPS tunnel
npx ngrok http 5173

# Copy the HTTPS URL (e.g., https://abc123.ngrok.io)
# Open that URL in your browser
```

> ⚠️ **ngrok Limitations**: Free tier has session limits, URLs change on restart

#### Option 3: Local HTTPS (Advanced)
Set up a local HTTPS certificate (requires additional configuration):

```bash
# Build the project
npm run build

# Serve with HTTPS (using a tool like serve or local-ssl-proxy)
npx serve dist -l 443 --ssl
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/))
- **MetaMask** browser extension ([Install](https://metamask.io/))
- **Arbitrum One** network configured in MetaMask
- **SUBS or USDC** tokens on Arbitrum (for testing subscriptions)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Subscrypts/react-sdk-demo.git
cd react-sdk-demo
```

2. **Install dependencies**

```bash
npm install
```

3. **Build for production**

```bash
npm run build
```

4. **Deploy to see it working** (HTTPS required)

See deployment options above (Vercel recommended).

---

## 📋 What's Included

This demo includes **9 pages** showcasing every feature of the Subscrypts React SDK:

### 🏠 Core Application Pages

#### **Home** - `/`
Your subscription app landing page with SDK setup and features overview.

#### **Pricing** - `/pricing`
Interactive subscription plans with one-click checkout using `SubscryptsButton`.
- Multi-step checkout modal with transaction tracking
- Payment method selection (SUBS or USDC)
- Real-time token balance display
- Subscription duration options

#### **Premium** - `/premium`
Protected content demonstration using `SubscriptionGuard` component.
- Automatic access control
- Multi-plan protection support (v1.1.0+)
- Custom fallback components

#### **Account** - `/account`
User dashboard for subscription management.
- Wallet information and token balances
- Active subscription status for all plans
- Expiration dates and auto-renewal status
- Path to v1.3.0 `SubscriptionDashboard` component

#### **Merchant** - `/merchant` 🆕 **(v1.4.0)**
Business owner dashboard for managing subscription revenue.
- Monthly Recurring Revenue (MRR) tracking
- Subscriber lists with pagination
- Plan management overview
- Uses `useMerchantPlans`, `useMerchantSubscribers`, `useMerchantRevenue` hooks

### 📖 Developer Showcase Pages

#### **Hooks** - `/examples/hooks` 🆕
Comprehensive showcase of **all 16 SDK hooks** with live examples:
- **Core**: `useWallet`, `useTokenBalance`, `useSubscrypts`
- **Subscription**: `useSubscriptionStatus`, `useSubscribe`, `useMySubscriptions`
- **Plan**: `usePlan`, `usePlans`, `usePlansByMerchant`, `usePlanPrice`
- **Pricing**: `useSUBSPrice`
- **Management**: `useManageSubscription`
- **Merchant**: `useMerchantPlans`, `useMerchantSubscribers`, `useMerchantRevenue`
- **Events**: `useSubscryptsEvents`

#### **Components** - `/examples/components` 🆕
Interactive showcase of **all 15 SDK components**:
- **Checkout**: `SubscryptsButton`, `CheckoutWizard`
- **Protection**: `SubscriptionGuard`
- **Pricing**: `PlanCard`, `PricingTable`
- **Dashboard**: `SubscriptionCard`, `SubscriptionDashboard`
- **Management**: `ManageSubscriptionModal`, `ConfirmDialog`
- **Merchant**: `MerchantDashboard`
- **Wallet**: `ConnectWalletModal`
- **Error Handling**: `ErrorDisplay`, `NetworkSwitchPrompt`, `SubscryptsErrorBoundary`
- **UI**: `LoadingSpinner`

#### **Utilities** - `/examples/utilities` 🆕
Demonstrations of **22+ utility functions**:
- **Formatters**: `formatTokenAmount`, `formatSubs`, `formatUsdc`, `formatFiatPrice`, `formatDate`
- **Validators**: `validateAddress`, `validatePositiveNumber`, `validatePlanId`
- **Helpers**: `shortenAddress`, `canAccess`, `isPaymentDue`, `shouldRenew`, `getSubscriptionHealth`
- **Error Handling**: `getErrorMessage`, `getErrorCode`
- **Session Management**: `saveSession`, `loadSession`, `clearSession`
- **Network Info**: Contract addresses, chain ID, RPC URLs

#### **Advanced** - `/examples/advanced` 🆕
Advanced SDK features and patterns for power users with **5 interactive demos**:
- **Provider Configuration** - All 10 SubscryptsProvider options with interactive debug level switching, event callbacks, external wallet integration, custom RPC, and balance refresh settings
- **Logger Utility** - SDK logging system with live log level configuration (silent/info/debug), demonstrations of all logging methods, grouped logging, and table output
- **Error Handling Patterns** - 5 error handling patterns (try-catch, type checking, error utilities, retry logic, graceful degradation) with all 7 custom error classes
- **PERMIT2 Signatures** - EIP-712 signature generation for gasless token approvals with interactive form, security considerations, and integration examples
- **Direct Contract Access** - useSubscrypts hook for raw contract/signer/provider access, custom RPC calls, token transfers, and event listening

### 🎓 Developer Experience Features

#### **Context-Aware Documentation Sidebar**
Every page includes a collapsible sidebar with:
- Relevant code examples for the current page
- Full TypeScript interfaces and prop tables
- Copy-to-clipboard functionality
- Links to SDK documentation
- Version compatibility notes

#### **Modular Architecture**
Demonstrates SDK update best practices:
- Centralized feature registry ([src/config/sdkFeatures.ts](src/config/sdkFeatures.ts))
- Version-agnostic code examples
- Isolated demo components
- Easy update path (see [UPDATING_SDK.md](UPDATING_SDK.md))

---

## 🗂️ Project Structure

```
react-sdk-demo/
├── src/
│   ├── pages/
│   │   ├── Home.tsx                    # Landing page
│   │   ├── Pricing.tsx                 # Subscription plans
│   │   ├── Premium.tsx                 # Protected content
│   │   ├── Account.tsx                 # User dashboard
│   │   ├── Merchant.tsx                # Merchant dashboard (v1.4.0)
│   │   └── examples/
│   │       ├── Hooks.tsx               # All SDK hooks showcase
│   │       ├── Components.tsx          # All SDK components showcase
│   │       ├── Utilities.tsx           # All SDK utilities showcase
│   │       └── Advanced.tsx            # Advanced features showcase
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx              # Navigation + Examples dropdown
│   │   │   └── Footer.tsx              # Footer with links
│   │   ├── subscription/
│   │   │   └── PlanCard.tsx            # Subscription plan card
│   │   └── dev/
│   │       ├── DevSidebar.tsx          # Context-aware documentation sidebar
│   │       ├── DevToggleButton.tsx     # Sidebar toggle button
│   │       ├── DevSection.tsx          # Documentation section
│   │       ├── CodeBlock.tsx           # Syntax-highlighted code
│   │       └── PropTable.tsx           # Props/parameters table
│   ├── config/
│   │   ├── plans.ts                    # Demo subscription plans
│   │   └── sdkFeatures.ts              # SDK feature registry (v1.4.0)
│   ├── utils/
│   │   ├── devDocs/                    # Page-specific documentation
│   │   │   ├── homeDocs.ts
│   │   │   ├── pricingDocs.ts
│   │   │   ├── premiumDocs.ts
│   │   │   ├── accountDocs.ts
│   │   │   ├── merchantDocs.ts
│   │   │   ├── hooksDocs.ts
│   │   │   ├── componentsDocs.ts
│   │   │   ├── utilitiesDocs.ts
│   │   │   ├── advancedDocs.ts
│   │   │   └── index.ts                # Route mapping
│   │   ├── codeExamples/               # Copy-pasteable code examples
│   │   │   ├── hooks.ts                # All hook examples
│   │   │   ├── components.ts           # All component examples
│   │   │   ├── utilities.ts            # All utility examples
│   │   │   └── index.ts
│   │   └── sdkFeatureDetection.ts      # Feature availability checks
│   ├── types/
│   │   └── devDocs.ts                  # Documentation type definitions
│   ├── hooks/
│   │   └── useDevSidebar.ts            # Sidebar state management
│   ├── styles/
│   │   └── index.css                   # Global styles + Tailwind
│   ├── App.tsx                         # Main app with 9 routes
│   └── main.tsx                        # Entry point with SubscryptsProvider
├── public/
├── package.json                        # Dependencies
├── vite.config.ts                      # Vite build configuration
├── UPDATING_SDK.md                     # SDK update process guide
└── README.md                           # This file
```

---

## ⚙️ Configuration

### Network Requirements

This demo runs exclusively on **Arbitrum One** (Chain ID: 42161):

- MetaMask will automatically prompt users to switch networks if needed
- All transactions occur on Arbitrum mainnet
- Users need SUBS or USDC tokens on Arbitrum

### Getting Test Tokens

To test subscriptions, you'll need tokens on Arbitrum:

1. **Bridge funds to Arbitrum**: Use the [Arbitrum Bridge](https://bridge.arbitrum.io/)
2. **Get SUBS tokens**: Visit the Subscrypts platform or use a DEX
3. **Get USDC**: Bridge USDC or swap on [Uniswap](https://app.uniswap.org/)

---

## 🎨 Customization

### Changing Colors

Edit CSS variables in [src/styles/index.css](src/styles/index.css):

```css
:root {
  --subscrypts-primary: #3b82f6;        /* Primary blue */
  --subscrypts-primary-hover: #2563eb;  /* Hover state */
  --subscrypts-success: #10b981;        /* Success green */
  --subscrypts-error: #ef4444;          /* Error red */
}
```

Or modify Tailwind theme in [tailwind.config.js](tailwind.config.js):

```js
theme: {
  extend: {
    colors: {
      'subscrypts-blue': '#3b82f6',
      'subscrypts-dark': '#1e293b',
    }
  }
}
```

### Adding Your Own Plans

Update [src/config/plans.ts](src/config/plans.ts) with your plan details:

```typescript
export const DEMO_PLANS: PlanConfig[] = [
  {
    id: '1',  // Your plan ID from Subscrypts
    name: 'Starter',
    description: 'Perfect for beginners',
    pricePerMonth: '5 SUBS',
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3',
    ],
    recommended: false,
  },
  // Add more plans...
];
```

### Modifying Page Layouts

All pages use Tailwind CSS for styling. Key components:

- **Header**: [src/components/layout/Header.tsx](src/components/layout/Header.tsx)
- **Footer**: [src/components/layout/Footer.tsx](src/components/layout/Footer.tsx)
- **Plan Cards**: [src/components/subscription/PlanCard.tsx](src/components/subscription/PlanCard.tsx)

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

#### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Subscrypts/react-sdk-demo)

#### Manual Deployment

1. **Install Vercel CLI**

```bash
npm i -g vercel
```

2. **Deploy**

```bash
vercel
```

3. **Redeploy**

```bash
vercel --prod
```

### Custom Domain (Optional)

In Vercel dashboard:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

---

## 🛠️ Troubleshooting

### "Wrong Network" Error

**Problem**: User is not on Arbitrum One network.

**Solution**:
- Click the network switcher in MetaMask
- Select "Arbitrum One" (Chain ID: 42161)
- Or wait for the SDK to prompt automatic network switching

### "Insufficient Balance" Error

**Problem**: User doesn't have enough SUBS or USDC tokens.

**Solution**:
- Check token balance in the Pricing page
- Bridge funds to Arbitrum: [bridge.arbitrum.io](https://bridge.arbitrum.io/)
- Get SUBS tokens from a DEX or the Subscrypts platform

### MetaMask Not Connecting

**Problem**: Wallet connection fails on HTTP localhost.

**Solution**:
- **This is expected** - MetaMask requires HTTPS
- Deploy to Vercel for HTTPS, or use ngrok for local HTTPS tunnel
- See [⚠️ HTTPS Required](#-important-https-required) section

### Transaction Failed

**Problem**: Subscription transaction reverts.

**Solution**:
- Ensure sufficient token balance (including gas fees)
- Check that you've approved token spending
- Verify you're on Arbitrum One network
- Try increasing gas limit in MetaMask settings

### Build Errors

**Problem**: `npm run build` fails.

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

---

## 📚 Resources

### Documentation
- [Subscrypts React SDK Docs](https://github.com/Subscrypts/react-sdk) - Full SDK documentation
- [Subscrypts Platform](https://subscrypts.com) - Create and manage subscription plans
- [Arbitrum Docs](https://docs.arbitrum.io/) - Learn about Arbitrum network

### Community
- [Discord](https://discord.gg/subscrypts) - Get help and connect with the community
- [Twitter](https://twitter.com/subscrypts) - Stay updated with news
- [GitHub](https://github.com/Subscrypts) - Contribute and report issues

### Support
- **Bug Reports**: [GitHub Issues](https://github.com/Subscrypts/react-sdk-demo/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/Subscrypts/react-sdk-demo/discussions)
- **SDK Questions**: [SDK Repository](https://github.com/Subscrypts/react-sdk/issues)

---

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with:
- [Subscrypts React SDK](https://github.com/Subscrypts/react-sdk) - Official React SDK for decentralized subscriptions
- [Vite 5.0](https://vitejs.dev/) - Next generation frontend tooling
- [React 18.2](https://react.dev/) - UI library
- [TypeScript 5.3](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS 3.4](https://tailwindcss.com/) - Utility-first CSS
- [React Router 6.20](https://reactrouter.com/) - Routing
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) - Code syntax highlighting for documentation
- [Arbitrum One](https://arbitrum.io/) - Layer 2 scaling solution

---

**Made with ❤️ by the Subscrypts team**

For more information, visit [subscrypts.com](https://subscrypts.com)

## 📊 SDK Version History

This demo tracks SDK updates to showcase modular architecture best practices:

- **v1.6.0** (2026-02-01) - Performance & Debugging Major Release
  - **Intelligent Caching System** - 80-90% RPC reduction with zero-config defaults
  - **Sanctions Pre-flight Checks** - Client-side validation prevents wasted gas
  - **Enhanced Debug Mode** - Performance metrics, correlation IDs, DebugPanel component
  - **Chain ID Namespacing** - Prevents testnet/mainnet cache collisions
  - **Auto-invalidation** - Automatic cache clearing after successful subscriptions
  - **Pattern-based Cache Invalidation** - Precise cache control by key patterns
- **v1.5.2** (2026-01-31) - Fixed `useMySubscriptions` hook with smart fallback strategy
- **v1.5.1** (2026-01-31) - Fixed contract runner error for read operations
- **v1.5.0** (2026-01-31) - Architectural consolidation, removed ContractService
- **v1.4.4** (2026-01-31) - Fixed data transformation bug in ContractService
- **v1.4.0** (2026-01-28) - Merchant Toolkit: `useMerchantPlans`, `useMerchantSubscribers`, `useMerchantRevenue`, `MerchantDashboard`
- **v1.3.0** - Dashboard Components: `SubscriptionDashboard`, `SubscriptionCard`, `useMySubscriptions`, `useSubscryptsEvents`
- **v1.2.0** - Management & Pricing: `useManageSubscription`, `ManageSubscriptionModal`, `useSUBSPrice`, `usePlanPrice`, decision helpers
- **v1.1.0** - Error Handling: `ErrorDisplay`, `NetworkSwitchPrompt`, `SubscryptsErrorBoundary`, custom connectors, session persistence
- **v1.0.11** - Plans: `usePlan`, `usePlans`, `PlanCard`, `PricingTable`, provider lifecycle callbacks
- **v1.0.0** - Core: `useWallet`, `useSubscriptionStatus`, `SubscryptsButton`, `SubscriptionGuard`, `CheckoutWizard`

