import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Pitfalls — TokenSpy | Real Failures, Real Lessons",
  description:
    "Browse 13+ real-world AI pitfalls we tested and documented — chatbot disasters, hallucinated APIs, trading strategy failures, and more. Learn from expensive mistakes before you make them.",
  openGraph: {
    title: "AI Pitfalls — TokenSpy",
    description:
      "Real-world AI failures tested, documented, and priced. Learn from expensive mistakes.",
    type: "website",
  },
};

export default function PitfallsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
