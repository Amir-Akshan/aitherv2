import type { Metadata } from "next";
import Navigation from "@/components/docs/Navigation";

export const metadata: Metadata = {
  title: "AitherLabs - docs",
  description:
    "read the AitherLabs docs to learn about our vision and technology.",
  openGraph: {
    title: "AitherLabs - docs",
    description:
      "read the AitherLabs docs to learn about our vision and technology.",
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-14 pb-14">
      <div className="flex min-h-full items-start justify-center py-12">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="w-full lg:w-64">
              <div className="bg-white/10 backdrop-blur-md rounded-lg py-3 px-6 lg:py-6 border border-white/20">
                <Navigation />
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 max-w-3xl border border-white/20">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
