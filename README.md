# Subscrypts React SDK Demo

A production-ready demo application showcasing the [Subscrypts React SDK](https://github.com/Subscrypts/react-sdk). This boilerplate demonstrates how to build subscription-based applications on Arbitrum with wallet integration, content protection, and seamless checkout flows.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Subscrypts/react-sdk-demo)

> ✨ **Now using SDK v1.0.2** - All contract addresses pre-configured! Zero additional setup needed.

## 🚀 Quick Start

Get the demo running locally in under 5 minutes:

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

3. **Configure environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Subscrypts plan IDs:

```bash
VITE_DEMO_PLAN_ID_BASIC=1
VITE_DEMO_PLAN_ID_PRO=2
VITE_DEMO_PLAN_ID_ENTERPRISE=3
```

> 💡 **How to get plan IDs**: Visit the [Subscrypts Platform](https://subscrypts.com), create your subscription plans, and copy the plan IDs.

4. **Start the development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:5173](http://localhost:5173)

You should see the demo application running! 🎉

---

## 📋 Features Showcase

This demo showcases all major features of the Subscrypts React SDK:

### 🔐 Wallet Integration
- **Component**: Header with wallet connection
- **Location**: [src/components/layout/Header.tsx](src/components/layout/Header.tsx)
- **Features**:
  - Connect/disconnect MetaMask
  - Display truncated wallet address
  - Automatic network detection (Arbitrum)

### 🛡️ Content Protection
- **Component**: SubscriptionGuard
- **Location**: [src/pages/Premium.tsx](src/pages/Premium.tsx)
- **Features**:
  - Automatic access control
  - Redirect non-subscribers to pricing
  - Loading states during verification

### 💳 Checkout Flow
- **Component**: SubscryptsButton & CheckoutWizard
- **Location**: [src/pages/Pricing.tsx](src/pages/Pricing.tsx)
- **Features**:
  - Multi-step checkout modal
  - Payment method selection (SUBS or USDC)
  - Subscription duration options (12, 24, 36 months)
  - Auto-renewal toggle
  - Transaction status tracking

### 💰 Token Balances
- **Hook**: useTokenBalance
- **Location**: [src/pages/Pricing.tsx](src/pages/Pricing.tsx)
- **Features**:
  - Real-time SUBS and USDC balance display
  - Automatic balance refresh
  - Support for multiple payment methods

### 📊 Subscription Status
- **Hook**: useSubscriptionStatus
- **Location**: [src/pages/Account.tsx](src/pages/Account.tsx)
- **Features**:
  - Check active subscriptions
  - Display expiration dates
  - Show auto-renewal status
  - View remaining cycles

---

## 🗂️ Project Structure

```
react-sdk-demo/
├── src/
│   ├── pages/
│   │   ├── Home.tsx              # Landing page (public)
│   │   ├── Pricing.tsx           # Subscription plans showcase
│   │   ├── Premium.tsx           # Protected premium content
│   │   └── Account.tsx           # Subscription management
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx        # Navigation + wallet connection
│   │   │   └── Footer.tsx        # Footer with links
│   │   └── subscription/
│   │       └── PlanCard.tsx      # Subscription plan card
│   ├── config/
│   │   └── plans.ts              # Subscription plans configuration
│   ├── styles/
│   │   └── index.css             # Global styles + Tailwind
│   ├── App.tsx                   # Main app with routing
│   └── main.tsx                  # Entry point with SubscryptsProvider
├── public/
├── .env.example                  # Environment variables template
├── package.json
├── vite.config.ts
└── README.md
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file based on `.env.example`:

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_DEMO_PLAN_ID_BASIC` | Basic plan ID from Subscrypts platform | Yes |
| `VITE_DEMO_PLAN_ID_PRO` | Pro plan ID from Subscrypts platform | Yes |
| `VITE_DEMO_PLAN_ID_ENTERPRISE` | Enterprise plan ID from Subscrypts platform | Yes |
| `VITE_RPC_URL` | Custom Arbitrum RPC URL (optional) | No |
| `VITE_REFERRAL_ADDRESS` | Referral address for subscriptions (optional) | No |

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

3. **Set Environment Variables**

In your Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add your plan IDs:
  - `VITE_DEMO_PLAN_ID_BASIC`
  - `VITE_DEMO_PLAN_ID_PRO`
  - `VITE_DEMO_PLAN_ID_ENTERPRISE`

4. **Redeploy**

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

**Problem**: Wallet connection fails.

**Solution**:
- Ensure MetaMask extension is installed and unlocked
- Refresh the page and try again
- Check browser console for errors
- Try using a different browser

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
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Arbitrum](https://arbitrum.io/) - Layer 2 scaling solution

---

**Made with ❤️ by the Subscrypts team**

For more information, visit [subscrypts.com](https://subscrypts.com)
