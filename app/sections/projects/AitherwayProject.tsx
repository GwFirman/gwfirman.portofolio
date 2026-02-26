"use client";
import ProjectCard from "./ProjectCard";

export default function AitherwayProject() {
  return (
    <div className="space-y-4">

      <ProjectCard
        imageSrc="/images/projects/aitherway.png"
        imageAlt="Aitherway Platform"
        title="Aitherway Platform"
        description="A modern platform crafted with elegance and purpose, delivering seamless digital experiences."
        tags={["UI/UX Design", "Branding", "Web App"]}
        buttonText="View Project"
        gradient="from-rose-800 to-rose-300"
        onButtonClick={() =>
          window.open("https://aither-way.vercel.app/", "_blank")
        }
      />
    </div>
  );
}
