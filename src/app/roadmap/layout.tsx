import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PyxisLabs - roadmap",
  description:
    "read the PyxisLabs roadmap to learn about our development milestones.",
  openGraph: {
    title: "PyxisLabs - roadmap",
    description:
      "read the PyxisLabs roadmap to learn about our development milestones.",
  },
};

export default function RoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="pt-14 pb-14">{children}</div>;
}
