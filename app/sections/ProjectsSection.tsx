"use client";
import AitherwayProject from "./projects/AitherwayProject";
import CethaProject from "./projects/CethaProject";
import DaunesiaProject from "./projects/DaunesiaProject";
import { motion, useInView } from "motion/react";

export default function ProjectsSection() {
  return (
    <div className="px-4 sm:px-6 lg:px-64">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-2xl sm:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
          My Works
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
      </motion.div>

      <div className="mx-auto mb-8 lg:mb-16">
        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 justify-items-center items-center">
          {/* Daunesia Project */}
          <DaunesiaProject />
          <CethaProject />
          <AitherwayProject />

          {/* Tambah project lain di sini */}
        </div>
      </div>
    </div>
  );
}
