import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PyxisLabs - Token",
  description:
    "Token information and charts powered by Pump.fun API and GMGN API.",
  openGraph: {
    title: "PyxisLabs - Token",
    description:
      "Token information and charts powered by Pump.fun API and GMGN API.",
  },
};

export default function TokenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="pt-14 pb-14">{children}</div>;
}



