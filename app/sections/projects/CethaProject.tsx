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
        buttonText="View Project"
        gradient="from-blue-800 to-blue-300"
        techStack={[
          {
            name: "Next.js",
            icon: "/icons/next-js-svgrepo-com.svg",
            bg: "from-gray-50 to-slate-50",
            darkBg: "dark:from-gray-500/30 dark:to-slate-500/30",
            text: "text-gray-700",
            darkText: "dark:text-gray-300",
            border: "border-gray-400",
            darkBorder: "dark:border-gray-500/50",
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
            name: "Laravel",
            icon: "/icons/laravel-svgrepo-com.svg",
            bg: "from-red-50 to-red-50",
            darkBg: "dark:from-red-500/30 dark:to-red-500/30",
            text: "text-red-600",
            darkText: "dark:text-red-300",
            border: "border-red-400",
            darkBorder: "dark:border-red-500/50",
          },
          {
            name: "MySQL",
            icon: "/icons/mysql-svgrepo-com.svg",
            bg: "from-blue-50 to-blue-50",
            darkBg: "dark:from-blue-500/30 dark:to-blue-500/30",
            text: "text-blue-600",
            darkText: "dark:text-blue-300",
            border: "border-blue-400",
            darkBorder: "dark:border-blue-500/50",
          },
        ]}
      />
    </div>
  );
}
