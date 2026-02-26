"use client";

import Image from "next/image";

type Experience = {
  company: string;
  logo: string;
  position: string;
  type: string;
  period: string;
  location: string;
  achievements: string[];
  bg: string;
};

const experiences: Experience[] = [
  {
    company: "PT Puskomedia Indonesia Kreatif",
    logo: "/placeholder-logo.png",
    position: "Full Stack Developer",
    type: "Part-time",
    period: "Mar 2026 - Now",
    location: "Purwokerto",
    bg: "bg-blue-50/20 dark:bg-blue-950/30",
    achievements: [
      "Built reusable React component library used across multiple projects",
      "Implemented state management with Zustand and React Query",
      "Worked closely with backend developers to design API contracts",
      "Reduced page load time by optimizing asset delivery and lazy loading",
    ],
  },
  {
    company: "CV Prabu Bima Tech",
    logo: "/images/logopb.png",
    position: "Full Stack Developer",
    type: "Internship",
    period: "Sep 2025 - Jan 2026",
    location: "Purwokerto",
    bg: "bg-blue-50/20 dark:bg-blue-950/30",
    achievements: [
      "Developed and maintained web applications using Next.js and TypeScript",
      "Collaborated with the design team to implement responsive UI components",
      "Integrated RESTful APIs and improved application performance by 30%",
      "Participated in code reviews and agile sprint ceremonies",
    ],
  },
  {
    company: "PT Nemolab Nusa Infomedia",
    logo: "/images/logopb.png",
    position: "Mobile Developer",
    type: "Internship",
    period: "Sep 2025 - Jan 2026",
    location: "Purwokerto",
    bg: "bg-blue-50/20 dark:bg-blue-950/30",
    achievements: [
      "Developed and maintained web applications using Next.js and TypeScript",
      "Collaborated with the design team to implement responsive UI components",
      "Integrated RESTful APIs and improved application performance by 30%",
      "Participated in code reviews and agile sprint ceremonies",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section className="px-4 sm:px-0 max-w-4xl mx-auto py-20">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-2xl font-mono-nl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-4 italic">
          Experience
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 via-cyan-200 dark:from-gray-700 dark:via-gray-600 to-transparent hidden sm:block" />

        <div className="flex flex-col gap-10">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="relative sm:pl-20"
            >
              {/* Timeline dot */}
              <div className="absolute left-[18px] top-6 w-3 h-3 rounded-full bg-blue-400 dark:bg-blue-950 shadow hidden sm:block" />

              {/* Card */}
              <div
                className={`rounded-xl border border-gray-200 dark:border-gray-700/60 ${exp.bg} p-5 sm:p-6`}
              >
                {/* Top row: logo + info + period */}
                <div className="flex items-start gap-4">
                  {/* Logo */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 shadow-sm flex items-center justify-center overflow-hidden">
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 font-mono leading-tight">
                          {exp.position}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-mono-nl mt-0.5">
                          {exp.company}
                          <span className="mx-1.5 text-gray-300 dark:text-gray-600">
                            ·
                          </span>
                          <span className="text-xs font-medium px-1.5 py-0.5 bg-white/70 dark:bg-gray-700/70 rounded border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400">
                            {exp.type}
                          </span>
                        </p>
                      </div>

                      {/* Period badge */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-mono-nl">
                          {exp.period}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 font-mono-nl mt-0.5">
                          {exp.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-4 border-t border-dashed border-gray-200 dark:border-gray-700" />

                {/* Achievements */}
                <ul className="flex flex-col gap-2">
                  {exp.achievements.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400 font-mono-nl"
                    >
                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
