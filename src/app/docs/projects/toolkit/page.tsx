import {
  Documentation,
  DocumentationSection,
} from "@/components/docs/Documentation";

export default function Toolkit() {
  return (
    <div className="flex items-center justify-center min-h-full">
      <Documentation title="Toolkit">
        <DocumentationSection title="What is Toolkit?">
          <p>
            Think of our Toolkit as a Swiss Army knife for AI function
            development. Built in both Go and Rust, it&apos;s designed to help
            develop and manage tools that work seamlessly with AI models.
          </p>
        </DocumentationSection>

        <DocumentationSection title="What Can It Do?">
          <ul className="list-disc pl-6 mt-2 space-y-3">
            <li>
              <strong>Build Your Own AI Tools:</strong> Creating tools for AI is
              as simple as building with blocks. We provide straightforward
              interfaces that help your AI understand and use the tools you
              create.
            </li>

            <li>
              <strong>Start Right Away:</strong> Don&apos;t want to start from
              scratch? We&apos;ve packed in some ready-to-use tools that you can
              use right out of the box. They come with all the nuts and bolts
              already in place!
            </li>

            <li>
              <strong>Keep Things Tidy:</strong> Just like organizing your
              kitchen drawers, you can group similar tools together into
              toolkits. This makes finding and managing your tools a breeze.
            </li>

            <li>
              <strong>Set Things Up Your Way:</strong> We believe in
              flexibility:
              <ul className="list-disc pl-6 mt-1">
                <li>Go developers: Use our functional options pattern</li>
                <li>Rust developers: Enjoy our intuitive builder pattern</li>
              </ul>
            </li>

            <li>
              <strong>Speaks JSON Fluently:</strong> Defining how your tools
              take input and give output is straightforward with JSON schemas.
            </li>
          </ul>
          
        </DocumentationSection>
      </Documentation>
    </div>
  );
}
