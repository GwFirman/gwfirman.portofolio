"use client";
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";

export default function ProfileSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  return (
    <section
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
        className="pointer-events-none absolute left-0 top-24 -z-10 hidden md:block"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="w-56 h-56 rounded-full bg-gradient-to-br from-blue-200 to-cyan-200 opacity-50"
        />
      </motion.div>

      {/* Right decorative blob */}
      <motion.div
        aria-hidden
        initial={{ x: 600, opacity: 0 }}
        animate={isInView ? { x: 100, opacity: 0.85 } : { x: 600, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="pointer-events-none absolute right-0 bottom-24 -z-10 hidden md:block"
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 36, ease: "linear" }}
          className="w-64 h-64 rounded-full bg-gradient-to-br from-indigo-200 to-pink-200 opacity-40"
        />
      </motion.div>

      <div className="max-w-5xl mx-auto w-full  ">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl sm:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
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
                <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl overflow-hidden">
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
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-600 mb-2">
                Full Stack Developer
              </h3>

              <p className="text-gray-400 text-sm md:text-lg leading-relaxed mb-8 font-medium">
                Driven by a love for clean code and innovation, I focus on
                developing full-stack applications that{" "}
                <span className="text-gray-600">
                  leverage AI to solve real-world problems.
                </span>{" "}
                From scalable web architectures to smart automation, I craft
                digital experiences that are{" "}
                <span className="text-gray-600">
                  not only beautiful but also intelligent.
                </span>
              </p>

              {/* Skills */}
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-4">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Tailwind",
                    "Node.js",
                    "PostgreSQL",
                  ].map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 text-sm rounded-full border border-blue-100"
                    >
                      {skill}
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
