"use client";

import { motion } from "motion/react";
import { Trophy, Medal, Award, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Achievement = {
  title: string;
  event: string;
  organizer: string;
  year: string;
  rank: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  details: string[];
};

const achievements: Achievement[] = [
  {
    title: "Juara 1 Web Development",
    event: "LKS SMK Tingkat Kabupaten",
    organizer: "Dinas Pendidikan Kabupaten",
    year: "2025",
    rank: "🥇 Juara 1",
    icon: Trophy,
    color: "text-yellow-500",
    bg: "bg-yellow-50/20 dark:bg-yellow-950/20",
    details: [
      "Merancang dan mengembangkan aplikasi web fullstack dalam waktu terbatas",
      "Menggunakan teknologi modern seperti React dan Node.js",
      "Mengungguli peserta dari berbagai SMK se-kabupaten",
    ],
  },
  {
    title: "Juara 2 UI/UX Design Competition",
    event: "Tech Festival Nasional",
    organizer: "Universitas Indonesia",
    year: "2025",
    rank: "🥈 Juara 2",
    icon: Medal,
    color: "text-gray-400",
    bg: "bg-slate-50/20 dark:bg-slate-950/20",
    details: [
      "Mendesain ulang aplikasi kesehatan digital dengan pendekatan user-centered",
      "Melakukan riset pengguna dan usability testing",
      "Presentasi solusi desain di depan panel juri profesional",
    ],
  },
  {
    title: "Best Innovation Award",
    event: "Hackathon Nasional",
    organizer: "Kementerian Kominfo",
    year: "2024",
    rank: "🏆 Best Innovation",
    icon: Award,
    color: "text-cyan-500",
    bg: "bg-cyan-50/20 dark:bg-cyan-950/20",
    details: [
      "Mengembangkan solusi IoT untuk smart farming dalam 48 jam",
      "Integrasi sensor dan dashboard monitoring real-time",
      "Terpilih dari 100+ tim peserta se-Indonesia",
    ],
  },
  {
    title: "Finalis Olimpiade Informatika",
    event: "OSN Tingkat Provinsi",
    organizer: "Kementerian Pendidikan",
    year: "2024",
    rank: "⭐ Finalis",
    icon: Star,
    color: "text-purple-500",
    bg: "bg-purple-50/20 dark:bg-purple-950/20",
    details: [
      "Lolos seleksi tingkat kabupaten dan kota",
      "Menyelesaikan soal algoritma dan pemrograman kompetitif",
      "Mewakili sekolah di tingkat provinsi",
    ],
  },
];

export default function AchievementSection() {
  return (
    <section className="px-4 sm:px-0 max-w-4xl mx-auto py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-2xl font-mono-nl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-4 italic">
          Achievement
        </h2>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-yellow-200 via-cyan-200 dark:from-gray-700 dark:via-gray-600 to-transparent hidden sm:block" />

        <div className="flex flex-col gap-10">
          {achievements.map((ach, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="relative sm:pl-20"
            >
              {/* Timeline dot */}
              <div className="absolute left-[18px] top-6 w-3 h-3 rounded-full bg-yellow-400 dark:bg-yellow-600 shadow hidden sm:block" />

              {/* Card */}
              <div
                className={`rounded-xl border border-gray-200 dark:border-gray-700/60 ${ach.bg} p-5 sm:p-6`}
              >
                {/* Top row: icon + info + year */}
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 shadow-sm flex items-center justify-center">
                    <ach.icon className={`w-6 h-6 ${ach.color}`} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 font-mono leading-tight">
                          {ach.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-mono-nl mt-0.5">
                          {ach.event}
                          <span className="mx-1.5 text-gray-300 dark:text-gray-600">
                            ·
                          </span>
                          <span className="text-xs font-medium px-1.5 py-0.5 bg-white/70 dark:bg-gray-700/70 rounded border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400">
                            {ach.rank}
                          </span>
                        </p>
                      </div>

                      {/* Year & organizer */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-mono-nl">
                          {ach.year}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 font-mono-nl mt-0.5">
                          {ach.organizer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-4 border-t border-dashed border-gray-200 dark:border-gray-700" />

                {/* Details */}
                <ul className="flex flex-col gap-2">
                  {ach.details.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400 font-mono-nl"
                    >
                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
