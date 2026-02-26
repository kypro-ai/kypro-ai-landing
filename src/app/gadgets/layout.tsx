import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Gadgets — TokenSpy | Real Failures, Real Lessons",
  description:
    "Browse 13+ real-world AI gadgets we tested and documented — chatbot disasters, hallucinated APIs, trading strategy failures, and more. Learn from expensive mistakes before you make them.",
  openGraph: {
    title: "AI Gadgets — TokenSpy",
    description:
      "Real-world AI failures tested, documented, and priced. Learn from expensive mistakes.",
    type: "website",
  },
};

export default function GadgetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
