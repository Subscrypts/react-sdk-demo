/**
 * Advanced Examples Page
 *
 * Advanced SDK features and patterns including provider configuration,
 * logging, permit signatures, direct contract access, and error handling.
 */

import { DemoSection } from '../../components/examples/shared';
import {
  ProviderConfigDemo,
  LoggerDemo,
  PermitSigningDemo,
  DirectContractDemo,
  ErrorPatternsDemo,
} from '../../components/examples/advanced';

export default function AdvancedPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Advanced SDK Features</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Deep dive into advanced Subscrypts SDK patterns including provider configuration,
          logging, permit signatures, direct contract access, and robust error handling.
        </p>
      </div>

      {/* Advanced Features */}
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Provider Configuration */}
        <DemoSection
          id="provider-config"
          title="⚙️ Provider Configuration"
          description="Configure SubscryptsProvider with custom options for logging, callbacks, and wallet management."
        >
          <ProviderConfigDemo />
        </DemoSection>

        {/* Logger */}
        <DemoSection
          id="logger"
          title="📝 Logger Utility"
          description="Use the SDK logger for debugging and monitoring with configurable log levels."
        >
          <LoggerDemo />
        </DemoSection>

        {/* Error Handling */}
        <DemoSection
          id="error-patterns"
          title="🛡️ Error Handling Patterns"
          description="Learn best practices for handling errors gracefully with custom error classes and recovery strategies."
        >
          <ErrorPatternsDemo />
        </DemoSection>

        {/* Permit Signatures */}
        <DemoSection
          id="permit-signing"
          title="✍️ PERMIT2 Signatures"
          description="Generate EIP-712 signatures for gasless token approvals using PERMIT2."
        >
          <PermitSigningDemo />
        </DemoSection>

        {/* Direct Contract Access */}
        <DemoSection
          id="direct-contract"
          title="🔧 Direct Contract Access"
          description="Access raw contracts, signers, and providers for advanced custom functionality."
        >
          <DirectContractDemo />
        </DemoSection>
      </div>

      {/* Footer Note */}
      <div className="max-w-6xl mx-auto mt-16 bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-2">🎓 When to Use Advanced Features</h3>
        <p className="text-sm text-gray-600 mb-3">
          The Subscrypts SDK is designed to work out of the box with sensible defaults.
          Use these advanced features when you need:
        </p>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>Custom logging and debugging for production monitoring</li>
          <li>Integration with external wallet providers (Privy, RainbowKit, etc.)</li>
          <li>Gasless approvals with PERMIT2 signatures</li>
          <li>Direct access to contract methods not covered by SDK hooks</li>
          <li>Robust error handling with retry logic and fallbacks</li>
          <li>Real-time event listening or custom RPC calls</li>
        </ul>
        <p className="text-sm text-gray-600 mt-3">
          For most use cases, the high-level hooks and components are sufficient.
          Only dive into these advanced patterns when you have specific requirements.
        </p>
      </div>
    </div>
  );
}
