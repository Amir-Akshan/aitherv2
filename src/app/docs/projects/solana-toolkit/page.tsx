import {
  Documentation,
  DocumentationSection,
} from "@/components/docs/Documentation";

export default function Toolkit() {
  return (
    <div className="flex items-center justify-center min-h-full">
      <Documentation title="Solana Toolkit">
        <DocumentationSection title="What is Solana Toolkit?">
          <p>
            The Solana Toolkit extends our base Toolkit implementation to
            provide Solana-specific functionality. It&apos;s designed to help
            developers build AI-powered applications that interact with the
            Solana blockchain.
          </p>
        </DocumentationSection>

        <DocumentationSection title="Features">
          <ul className="list-disc pl-6 mt-2 space-y-3">
            <li>
              <strong>Solana Integration:</strong> Built-in support for
              interacting with Solana programs and accounts
            </li>
            <li>
              <strong>AI Tools for Blockchain:</strong> Specialized tools for
              analyzing and interacting with on-chain data
            </li>
            <li>
              <strong>Program Interfaces:</strong> Easy-to-use interfaces for
              common Solana program interactions
            </li>
          </ul>
          <p className="mb-4">
            Coming soon! The Solana Toolkit is currently under active
            development.
          </p>
          
        </DocumentationSection>
      </Documentation>
    </div>
  );
}
