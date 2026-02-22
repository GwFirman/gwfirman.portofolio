"use client";

import { SkillTags, type SkillTag } from "@/components/skill-tags";
import {
  Figma,
  PenTool,
  Instagram,
  CircuitBoard,
  Globe,
  BrainCircuit,
} from "lucide-react";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import HeroSection from "./sections/HeroSection";
import ProjectsSection from "./sections/ProjectsSection";
import { MorphingText } from "@/components/ui/morphing-text";
import ProfileSection from "./sections/ProfileSection";
import GitHubSection from "./sections/GitHubSection";

// Define skill data
const skillsRow1: SkillTag[] = [
  { label: "Website", icon: Globe, color: "#fb923c" },
  { label: "Machine Learning", icon: BrainCircuit, color: "#fcd34d" },
  { label: "UI / UX", icon: Figma, color: "#06b6d4" },
  { label: "Design Graphich", icon: PenTool, color: "#84cc16" },
  { label: "Social Media Content", icon: Instagram, color: "#a855f7" },
  { label: "Internet of Things", icon: CircuitBoard, color: "#64748b" },
];

export default function Component() {
  return (
    <div className="min-h-screen max-w-4-xl lg:w-full bg-transparent">
      <Navigation />
      <HeroSection />
      <ProfileSection />
      <ProjectsSection />
      {/* <GitHubSection /> */}
    </div>
  );
}
