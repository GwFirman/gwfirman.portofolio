"use client";
import ProjectCard from "./ProjectCard";

export default function CethaProject() {
  return (
    <div className="space-y-4">

      <ProjectCard
        imageSrc="/images/projects/cetha.png"
        imageAlt="Cetha Platform"
        title="Cetha Platform"
        description="An innovative web application designed to provide clear and transparent information services."
        tags={["UI/UX Design", "Web Development", "Full Stack"]}
        buttonText="View Project"
        gradient="from-blue-800 to-blue-300"
      />
    </div>
  );
}
