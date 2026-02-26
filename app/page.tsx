"use client";

import HeroSection from "./sections/HeroSection";
import ProjectsSection from "./sections/ProjectsSection";
import ProfileSection from "./sections/ProfileSection";
import ExperienceSection from "./sections/ExperienceSection";
import AchievementSection from "./sections/AchievementSection";

export default function Component() {
  return (
    <div className="min-h-screen max-w-4-xl lg:w-full dark:bg-gray-950">
      <HeroSection />
      <ProfileSection />
      <ProjectsSection />
      <ExperienceSection />
      <AchievementSection />
    </div>
  );
}
