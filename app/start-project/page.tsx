import type { Metadata } from "next";
import StartProjectForm from "@/components/start-project/StartProjectForm";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Start a Project | Adapts Media",
  description:
    "Tell us about your vision. Let Adapts Media transform your idea into a premium digital experience.",
  path: "/start-project",
});

export default function StartProjectPage() {
  return <StartProjectForm />;
}
