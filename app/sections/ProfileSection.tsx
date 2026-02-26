"use client";
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import {
  MotionGrid,
  MotionGridCells,
} from "@/components/animate-ui/primitives/animate/motion-grid";

export default function ProfileSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  return (
    <section
      id="profile"
      ref={sectionRef}
      className="relative min-h-screen px-4 sm:px-8 lg:px-16 py-20 flex items-center overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" />
      </div>

      {/* Left decorative blob */}
      <motion.div
        aria-hidden
        initial={{ x: -600, opacity: 0 }}
        animate={isInView ? { x: -100, opacity: 0.9 } : { x: -600, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pointer-events-none absolute left-0 top-24 -z-10 dark:z-50 hidden md:block"
      >
        <div className="p-20 ">
          <MotionGrid
            className="w-fit gap-1"
            gridSize={[7, 7]}
            duration={220}
            frames={[
              // Frame 0: Plus penuh
              [
                [3, 3],
                [4, 3],
                [5, 3],
                [6, 3],
                [2, 3],
                [1, 3],
                [0, 3],
                [3, 2],
                [3, 1],
                [3, 0],
                [3, 4],
                [3, 5],
                [3, 6],
              ],

              // Frame 1: Plus memendek, diagonal mulai tumbuh
              [
                [3, 3],
                [4, 3],
                [5, 3],
                [2, 3],
                [1, 3],
                [3, 2],
                [3, 1],
                [3, 4],
                [3, 5],
                [4, 2],
                [2, 4],
              ],

              // Frame 2: Plus sangat pendek, diagonal makin panjang
              [
                [3, 3],
                [4, 3],
                [2, 3],
                [3, 2],
                [3, 4],
                [4, 2],
                [5, 1],
                [2, 4],
                [1, 5],
                [2, 2],
                [1, 1],
                [4, 4],
                [5, 5],
              ],

              // Frame 3: X penuh
              [
                [3, 3],
                [4, 2],
                [5, 1],
                [6, 0],
                [2, 4],
                [1, 5],
                [0, 6],
                [2, 2],
                [1, 1],
                [0, 0],
                [4, 4],
                [5, 5],
                [6, 6],
              ],

              // Frame 4: X memendek, cardinal mulai tumbuh
              [
                [3, 3],
                [4, 2],
                [5, 1],
                [2, 4],
                [1, 5],
                [2, 2],
                [1, 1],
                [4, 4],
                [5, 5],
                [4, 3],
                [2, 3],
              ],

              // Frame 5: X sangat pendek, cardinal makin panjang
              [
                [3, 3],
                [4, 2],
                [2, 4],
                [2, 2],
                [4, 4],
                [4, 3],
                [5, 3],
                [2, 3],
                [1, 3],
                [3, 2],
                [3, 1],
                [3, 4],
                [3, 5],
              ],
            ]}
          >
            <MotionGridCells className="size-3 rounded-full data-[active=true]:bg-blue-500 transition-colors duration-200" />
          </MotionGrid>
        </div>
      </motion.div>

      {/* Right decorative blob */}
      <motion.div
        aria-hidden
        initial={{ x: 600, opacity: 0 }}
        animate={isInView ? { x: 100, opacity: 0.85 } : { x: 600, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="pointer-events-none absolute right-0 bottom-24 -z-10  dark:z-50 hidden md:block"
      >
        <div className="p-20 ">
          <MotionGrid
            className="w-fit gap-1"
            gridSize={[7, 7]}
            duration={220}
            frames={[
              [[3, 3]],
              [
                [3, 2],
                [3, 3],
                [3, 4],
                [4, 3],
                [2, 3],
              ],
              [
                [2, 4],
                [3, 2],
                [4, 2],
                [3, 5],
                [3, 3],
                [3, 4],
                [4, 4],
                [4, 3],
                [5, 3],
                [2, 3],
                [2, 2],
                [1, 3],
              ],
              [
                [3, 6],
                [2, 5],
                [2, 4],
                [1, 4],
                [0, 3],
                [0, 2],
                [1, 2],
                [1, 1],
                [2, 1],
                [3, 2],
                [4, 2],
                [5, 1],
                [4, 1],
                [5, 2],
                [6, 3],
                [6, 2],
                [5, 4],
                [4, 5],
                [3, 5],
                [3, 3],
                [3, 4],
                [4, 4],
                [4, 3],
                [5, 3],
                [2, 3],
                [2, 2],
                [1, 3],
              ],
              [
                [3, 6],
                [2, 5],
                [2, 4],
                [1, 4],
                [0, 3],
                [0, 2],
                [1, 2],
                [1, 1],
                [2, 1],
                [3, 2],
                [4, 2],
                [5, 1],
                [4, 1],
                [5, 2],
                [6, 3],
                [6, 2],
                [5, 4],
                [4, 5],
                [3, 5],
                [3, 3],
                [3, 4],
                [4, 4],
                [4, 3],
                [5, 3],
                [2, 3],
                [2, 2],
                [1, 3],
              ],
              [
                [2, 4],
                [3, 2],
                [4, 2],
                [3, 5],
                [3, 3],
                [3, 4],
                [4, 4],
                [4, 3],
                [5, 3],
                [2, 3],
                [2, 2],
                [1, 3],
              ],
              [
                [3, 2],
                [3, 3],
                [3, 4],
                [4, 3],
                [2, 3],
              ],
            ]}
          >
            <MotionGridCells className="size-3 rounded-full data-[active=true]:bg-blue-500 transition-colors duration-200" />
          </MotionGrid>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <h2 className="text-2xl font-mono-nl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-4 italic">
            About Me
          </h2>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <div className="relative w-full aspect-square">
                <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-md overflow-hidden">
                  <Image
                    src="/images/piala.jpeg"
                    alt="Profile"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>

            {/* Bio Side */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              {/* <p className="text-blue-500 font-semibold text-lg   ">Firman</p> */}
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-600 dark:text-gray-300 mb-2 font-mono">
                Full Stack Developer
              </h3>

              <p className="text-gray-400 dark:text-gray-500 text-sm md:text-lg leading-relaxed mb-8 font-medium font-mono-nl">
                Driven by a love for clean code and innovation, I focus on
                developing full-stack applications that leverage AI to solve
                real-world problems.
              </p>

              {/* Skills */}
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
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
                      name: "Hugginface",
                      icon: "/icons/hf-logo.svg",
                      bg: "from-yellow-50 to-yellow-50",
                      darkBg: "dark:from-yellow-500/30 dark:to-yellow-500/30",
                      text: "text-yellow-600",
                      darkText: "dark:text-yellow-300",
                      border: "border-yellow-400",
                      darkBorder: "dark:border-yellow-500/50",
                    },
                    {
                      name: "Github",
                      icon: "/icons/github-142-svgrepo-com.svg",
                      bg: "from-slate-50 to-slate-50",
                      darkBg: "dark:from-slate-500/30 dark:to-slate-500/30",
                      text: "text-slate-600",
                      darkText: "dark:text-slate-300",
                      border: "border-slate-400",
                      darkBorder: "dark:border-slate-500/50",
                    },
                  ].map((skill, idx) => (
                    <span
                      key={idx}
                      className={`flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r ${skill.bg} ${skill.darkBg} ${skill.text} ${skill.darkText} text-sm rounded-sm border border-dashed ${skill.border} ${skill.darkBorder}`}
                    >
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={16}
                        height={16}
                        className="size-4"
                      />
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
