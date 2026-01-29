/**
 * PermitSigningDemo - ERC-2612 Permit Signatures
 *
 * Demonstrates PERMIT2 signature generation for gasless token approvals.
 * Uses EIP-712 typed data signing for secure off-chain authorization.
 * Added in SDK v1.0.0.
 */

import { useState } from 'react';
import {
  useSubscrypts,
  generatePermit2Signature,
  PERMIT2_DOMAIN,
  PERMIT2_TYPES,
  getUsdcTokenAddress,
  getSubscryptsContractAddress,
  ARBITRUM_ONE,
  parseTokenAmount,
} from '@subscrypts/react-sdk';
import { DemoCard } from '../shared';

export function PermitSigningDemo() {
  const { wallet, signer } = useSubscrypts();
  const address = wallet.address;
  const [amount, setAmount] = useState('100');
  const [deadline, setDeadline] = useState('30');
  const [signature, setSignature] = useState<{ signature: string; nonce: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePermit = async () => {
    if (!signer) {
      setError('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSignature(null);

    try {
      const usdcAddress = getUsdcTokenAddress(ARBITRUM_ONE.chainId);
      const subscryptsAddress = getSubscryptsContractAddress(ARBITRUM_ONE.chainId);
      const amountInWei = parseTokenAmount(amount, 6); // USDC has 6 decimals
      const deadlineTimestamp = BigInt(Math.floor(Date.now() / 1000) + parseInt(deadline) * 60);

      const result = await generatePermit2Signature(
        signer,
        usdcAddress,
        amountInWei,
        subscryptsAddress,
        deadlineTimestamp
      );

      setSignature(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate permit signature');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <DemoCard
      title="PERMIT2 Signature Generation"
      description="Generate EIP-712 signatures for gasless token approvals using PERMIT2."
    >
      <div className="space-y-6">
        {/* What is PERMIT2? */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <h3 className="font-semibold text-blue-900 mb-2">What is PERMIT2?</h3>
          <p className="text-sm text-blue-800">
            PERMIT2 (EIP-3009 / Uniswap Permit2) is a universal token approval system that allows users to
            approve token transfers with a signature instead of an on-chain transaction. This enables:
          </p>
          <ul className="text-sm text-blue-800 list-disc list-inside mt-2 space-y-1">
            <li><strong>Gasless approvals</strong> - No need for a separate approval transaction</li>
            <li><strong>Better UX</strong> - One signature instead of two transactions</li>
            <li><strong>Revocable permits</strong> - Permits expire after a deadline</li>
            <li><strong>Nonce-based security</strong> - Each permit has a unique nonce</li>
          </ul>
        </div>

        {/* Wallet Status */}
        {!address ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <p className="text-sm text-yellow-800">
              ⚠️ Please connect your wallet to generate permit signatures.
            </p>
          </div>
        ) : (
          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <p className="text-sm text-green-800">
              ✅ Wallet connected: <code className="bg-green-100 px-1 rounded">{address}</code>
            </p>
          </div>
        )}

        {/* Permit Parameters */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Permit Parameters</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (USDC)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="100"
                min="0"
                step="0.01"
              />
              <p className="text-xs text-gray-500 mt-1">
                Amount of USDC to authorize for spending
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deadline (minutes from now)
              </label>
              <input
                type="number"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="30"
                min="1"
                step="1"
              />
              <p className="text-xs text-gray-500 mt-1">
                How long the permit will be valid
              </p>
            </div>

            <button
              onClick={handleGeneratePermit}
              disabled={!address || isLoading}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Generating Permit...' : 'Generate Permit Signature'}
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-sm text-red-800">
              ❌ <strong>Error:</strong> {error}
            </p>
          </div>
        )}

        {/* Signature Result */}
        {signature && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-gray-900">Generated Permit Signature</h3>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Signature</label>
                <button
                  onClick={() => copyToClipboard(signature.signature)}
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  Copy
                </button>
              </div>
              <div className="bg-white p-3 rounded border border-gray-300 font-mono text-xs break-all">
                {signature.signature}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">Nonce</label>
                <button
                  onClick={() => copyToClipboard(signature.nonce)}
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  Copy
                </button>
              </div>
              <div className="bg-white p-3 rounded border border-gray-300 font-mono text-xs break-all">
                {signature.nonce}
              </div>
            </div>

            <p className="text-xs text-gray-600 mt-2">
              ✅ This signature can now be used to authorize the Subscrypts contract to spend {amount} USDC
              on your behalf, valid for {deadline} minutes.
            </p>
          </div>
        )}

        {/* PERMIT2 Constants */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">PERMIT2 Constants</h3>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="text-sm font-medium text-gray-700 mb-2">PERMIT2_DOMAIN</h4>
              <div className="bg-white p-3 rounded border border-gray-300 font-mono text-xs">
                <pre>{JSON.stringify(PERMIT2_DOMAIN, null, 2)}</pre>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="text-sm font-medium text-gray-700 mb-2">PERMIT2_TYPES</h4>
              <div className="bg-white p-3 rounded border border-gray-300 font-mono text-xs overflow-x-auto">
                <pre>{JSON.stringify(PERMIT2_TYPES, null, 2)}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Usage Examples</h3>
          <div className="space-y-4">
            {/* Basic Usage */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Generate Permit Signature</h4>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`import {
  generatePermit2Signature,
  getUsdcTokenAddress,
  getSubscryptsContractAddress,
  ARBITRUM_ONE,
  parseTokenAmount,
} from '@subscrypts/react-sdk';

const signer = /* ethers signer */;
const usdcAddress = getUsdcTokenAddress(ARBITRUM_ONE.chainId);
const subscryptsAddress = getSubscryptsContractAddress(ARBITRUM_ONE.chainId);

// Amount: 100 USDC (6 decimals)
const amount = parseTokenAmount('100', 6);

// Deadline: 30 minutes from now
const deadline = BigInt(Math.floor(Date.now() / 1000) + 1800);

// Generate permit signature
const { signature, nonce } = await generatePermit2Signature(
  signer,
  usdcAddress,
  amount,
  subscryptsAddress,
  deadline
);

console.log('Signature:', signature);
console.log('Nonce:', nonce);`}</pre>
              </div>
            </div>

            {/* Integration with Subscribe */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Using Permit in Subscription Flow</h4>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`import { useSubscribe, generatePermit2Signature } from '@subscrypts/react-sdk';

function SubscribeComponent() {
  const { subscribe } = useSubscribe();

  const handleSubscribe = async () => {
    // Generate permit signature
    const { signature, nonce } = await generatePermit2Signature(
      signer,
      usdcTokenAddress,
      amount,
      subscryptsAddress,
      deadline
    );

    // Subscribe using permit (no approval transaction needed!)
    await subscribe({
      planId: '1',
      paymentMethod: 'USDC',
      permit: {
        signature,
        nonce,
        deadline,
      },
    });
  };

  return <button onClick={handleSubscribe}>Subscribe with Permit</button>;
}`}</pre>
              </div>
            </div>

            {/* EIP-712 Typed Data */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">EIP-712 Typed Data Structure</h4>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`// The signature is generated from this typed data structure
const typedData = {
  domain: PERMIT2_DOMAIN,
  types: PERMIT2_TYPES,
  message: {
    permitted: {
      token: tokenAddress,
      amount: amount.toString(),
    },
    spender: spenderAddress,
    nonce: nonce,
    deadline: deadline.toString(),
  },
};

// User signs this typed data with their wallet
const signature = await signer.signTypedData(
  typedData.domain,
  typedData.types,
  typedData.message
);`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Security Considerations */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
          <h3 className="font-semibold text-yellow-900 mb-2">🔒 Security Considerations</h3>
          <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
            <li><strong>Always set a deadline</strong> - Permits should expire to limit exposure</li>
            <li><strong>Use appropriate amounts</strong> - Don't authorize more than needed</li>
            <li><strong>Verify the spender</strong> - Ensure you're authorizing the correct contract</li>
            <li><strong>Check the domain</strong> - Confirm the domain matches the expected chain</li>
            <li><strong>Nonces prevent replay</strong> - Each signature can only be used once</li>
            <li><strong>User controls approval</strong> - Users must sign to authorize the permit</li>
          </ul>
        </div>

        {/* Benefits */}
        <div className="bg-green-50 border-l-4 border-green-500 p-4">
          <h3 className="font-semibold text-green-900 mb-2">✨ Benefits of PERMIT2</h3>
          <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
            <li><strong>Gasless approvals</strong> - Save users gas fees on approval transactions</li>
            <li><strong>Better UX</strong> - One-click subscriptions instead of approve + subscribe</li>
            <li><strong>Faster onboarding</strong> - Reduce friction for new users</li>
            <li><strong>Time-bound permits</strong> - Automatic expiration increases security</li>
            <li><strong>Revocable permissions</strong> - Users can revoke by changing nonce</li>
            <li><strong>Standard implementation</strong> - Works across all PERMIT2-compatible contracts</li>
          </ul>
        </div>
      </div>
    </DemoCard>
  );
}
