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
        buttonText="View Project"
        gradient="from-teal-800 to-teal-300"
        githubUrl="https://github.com/username/repo"
        techStack={[
          {
            name: "React",
            icon: "/icons/react-svgrepo-com.svg",
            bg: "from-cyan-50 to-sky-50",
            darkBg: "dark:from-cyan-500/30 dark:to-sky-500/30",
            text: "text-cyan-600",
            darkText: "dark:text-cyan-300",
            border: "border-cyan-400",
            darkBorder: "dark:border-cyan-500/50",
          },
          {
            name: "TypeScript",
            icon: "/icons/typescript-official-svgrepo-com.svg",
            bg: "from-blue-50 to-indigo-50",
            darkBg: "dark:from-blue-500/30 dark:to-indigo-500/30",
            text: "text-blue-600",
            darkText: "dark:text-blue-300",
            border: "border-blue-400",
            darkBorder: "dark:border-blue-500/50",
          },
          {
            name: "Python",
            icon: "/icons/python-svgrepo-com.svg",
            bg: "from-yellow-50 to-yellow-50",
            darkBg: "dark:from-yellow-500/30 dark:to-yellow-500/30",
            text: "text-blue-600",
            darkText: "dark:text-yellow-300",
            border: "border-blue-400",
            darkBorder: "dark:border-yellow-500/50",
          },
          {
            name: "Supabase",
            icon: "/icons/supabase.svg",
            bg: "from-emerald-50 to-emerald-50",
            darkBg: "dark:from-emerald-500/30 dark:to-emerald-500/30",
            text: "text-emerald-600",
            darkText: "dark:text-emerald-300",
            border: "border-emerald-400",
            darkBorder: "dark:border-emerald-500/50",
          },
        ]}
      />
    </div>
  );
}
