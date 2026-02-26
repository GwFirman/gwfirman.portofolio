"use client";
import ProjectCard from "./ProjectCard";

export default function DaunesiaProject() {
  return (
    <div className="space-y-4">
      <ProjectCard
        imageSrc="/images/projects/daunesia.png"
        imageAlt="Daunesia Platform"
        title="Daunesia Platform"
        description="A comprehensive digital platform for herbal medicine information and consultation services."
        tags={["UI/UX Design", "Branding", "Mobile App"]}
        buttonText="View Project"
        gradient="from-teal-800 to-teal-300"
      />
    </div>
  );
}
