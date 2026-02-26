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
        buttonText="View Project"
        gradient="from-rose-800 to-rose-300"
        onButtonClick={() =>
          window.open("https://aither-way.vercel.app/", "_blank")
        }
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
            name: "Node.js",
            icon: "/icons/node-js-svgrepo-com.svg",
            bg: "from-green-50 to-emerald-50",
            darkBg: "dark:from-green-500/30 dark:to-emerald-500/30",
            text: "text-green-600",
            darkText: "dark:text-green-300",
            border: "border-green-400",
            darkBorder: "dark:border-green-500/50",
          },
          {
            name: "PostgreSQL",
            icon: "/icons/postgresql-svgrepo-com.svg",
            bg: "from-indigo-50 to-blue-50",
            darkBg: "dark:from-indigo-500/30 dark:to-blue-500/30",
            text: "text-indigo-600",
            darkText: "dark:text-indigo-300",
            border: "border-indigo-400",
            darkBorder: "dark:border-indigo-500/50",
          },
        ]}
      />
    </div>
  );
}
