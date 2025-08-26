import {
  Documentation,
  DocumentationSection,
} from "@/components/docs/Documentation";

export default function Hana() {
  return (
    <div className="flex items-center justify-center min-h-full">
      <Documentation title="Mine">
        <DocumentationSection title="What/who is Mine?">
          <p>
          Mine is an AI-powered Twitter agent built on our Eva framework,
            designed to showcase the seamless functionality of our platform. We
            developed Mine as a practical example of how Eva can be used to
            create intelligent, adaptable agents, demonstrating its capabilities
            in a real-world application.
          </p>
          <p className="mt-4">
          Mine will also leverage our Toolkit to enhance its capabilities,
            allowing for more sophisticated interactions and demonstrating the
            power of our integrated solutions.
          </p>
        </DocumentationSection>

        <DocumentationSection title="Development Timeline">
          <p>
            While Eva provides a plug-and-play framework for building AI agents,
            Mine&apos;s development timeline extends beyond basic
            implementation. This is because we&apos;re focusing on several
            critical aspects:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>
              <strong>Toolkit Integration:</strong> Developing and implementing
              custom tools that allow Mine to:
              <ul className="list-disc pl-6 mt-1">
                <li>Analyze Twitter trends and conversations</li>
                <li>Analyze market data</li>
                <li>Interact with the Solana blockchain</li>
                <li>And much more!</li>
              </ul>
            </li>
            <li>
              <strong>Safety Measures:</strong> Implementing robust safety
              protocols and content filtering to maintain responsible AI
              interactions.
            </li>
            <li>
              <strong>Platform Integration:</strong> Developing and testing
              Twitter-specific features while ensuring compliance with platform
              policies and rate limits.
            </li>
          </ul>
          
        </DocumentationSection>
      </Documentation>
    </div>
  );
}
