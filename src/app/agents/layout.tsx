import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PyxisLabs - whitepaper",
  description:
    "read the PyxisLabs whitepaper to learn about our vision and technology.",
  openGraph: {
    title: "PyxisLabs - whitepaper",
    description:
      "read the PyxisLabs whitepaper to learn about our vision and technology.",
  },
};

export default function WhitepaperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="pt-14 pb-14">{children}</div>;
}
