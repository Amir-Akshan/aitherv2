import {
  Documentation,
  DocumentationSection,
} from "@/components/docs/Documentation";

export default function Purpose() {
  return (
    <div className="flex items-center justify-center min-h-full">
      <Documentation title="Purpose">
        <DocumentationSection title="What are we about?">
          <p>
            At PyxisLabs, we&apos;re all about making AI accessible and
            practical for everyone, from individual developers to large
            organizations. Our mission is to simplify AI development by
            providing powerful tools and frameworks that anyone can use to
            create, launch, and scale smart systems in real-world scenarios. We
            believe that innovation shouldn&apos;t be locked behind complexity,
            so we focus on making our solutions easy to use, highly flexible,
            and fully customizable to meet a wide range of needs.
          </p>
          <p>
            Our approach is grounded in bridging the gap between advanced AI
            research and everyday applications. Whether it&apos;s a cutting-edge
            research project or a business tool designed for efficiency, we
            provide the resources and support to turn ideas into impactful
            solutions. We strive to empower developers and organizations to push
            the boundaries of what AI can achieve, without being bogged down by
            technical barriers.
          </p>
        </DocumentationSection>
        <DocumentationSection title="Why Solana?">
          <p>
            Beyond AI, we&apos;re exploring the potential of integrating
            blockchain technology, specifically Solana, into our systems.
            Solana&apos;s thriving AI community and robust ecosystem make it the
            perfect platform for our vision. By leveraging Solana&apos;s
            low-cost infrastructure and decentralized nature, we&apos;re
            building solutions that are accessible to everyone.
          </p>
          <p>
            The vibrant AI and developer community within Solana ensures that
            our technology can reach and benefit those who are already pushing
            the boundaries of what&apos;s possible in this space. This
            integration enables us to create solutions that are not just
            innovative but also community-driven and future-proof.
          </p>
        </DocumentationSection>
        <DocumentationSection>
          <p>
            At PyxisLabs, we&apos;re building a bridge between the worlds of AI
            and crypto, creating tools that are not only cutting-edge but also
            practical, scalable, and ready to shape a smarter, more connected
            future for everyone.
          </p>
        </DocumentationSection>
      </Documentation>
    </div>
  );
}
