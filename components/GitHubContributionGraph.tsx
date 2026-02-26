"use client";

import { useEffect, useState, useRef } from "react";
import {
  getGitHubContributions,
  ContributionDay,
  ContributionWeek,
} from "@/app/actions/github-contributions";

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  date: string;
  count: number;
}

const LEVEL_COLORS_BLUE = [
  "#ebedf0",
  "#bfdbfe",
  "#93c5fd",
  "#3b82f6",
  "#1d4ed8",
];

const LEVEL_COLORS_BLUE_DARK = [
  "#161b22",
  "#1e3a5f",
  "#1d4ed8",
  "#3b82f6",
  "#93c5fd",
];

const LEVEL_COLORS_GREEN = [
  "#ebedf0",
  "#9be9a8",
  "#40c463",
  "#30a14e",
  "#216e39",
];

const LEVEL_COLORS_GREEN_DARK = [
  "#161b22",
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353",
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const CELL = 12;
const GAP = 4;
const STEP = CELL + GAP;

export default function GitHubContributionGraph({
  username = "GwFirman",
  useBlue = true,
}: {
  username?: string;
  useBlue?: boolean;
}) {
  const [weeks, setWeeks] = useState<ContributionWeek[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    date: "",
    count: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const COLORS = useBlue
    ? isDark
      ? LEVEL_COLORS_BLUE_DARK
      : LEVEL_COLORS_BLUE
    : isDark
      ? LEVEL_COLORS_GREEN_DARK
      : LEVEL_COLORS_GREEN;

  useEffect(() => {
    const update = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    getGitHubContributions(username)
      .then((data) => {
        setWeeks(data.weeks);
        setTotalContributions(data.totalContributions);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [username]);

  const monthLabels: { label: string; weekIndex: number }[] = [];
  weeks.forEach((week, i) => {
    const firstDay = week.days[0];
    if (!firstDay) return;
    const date = new Date(firstDay.date + "T00:00:00");
    if (date.getDate() <= 7) {
      monthLabels.push({ label: MONTHS[date.getMonth()], weekIndex: i });
    }
  });

  const handleMouseEnter = (
    e: React.MouseEvent<SVGRectElement>,
    day: ContributionDay,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const container = containerRef.current?.getBoundingClientRect();
    if (!container) return;
    setTooltip({
      visible: true,
      x: rect.left - container.left + CELL / 2,
      y: rect.top - container.top - 8,
      date: day.date,
      count: day.contributionCount,
    });
  };

  const handleMouseLeave = () => {
    setTooltip((t) => ({ ...t, visible: false }));
  };

  if (loading) {
    const skeletonWeeks = 53;
    return (
      <div className="relative w-full">
        <div className="overflow-x-auto w-full">
          <svg
            viewBox={`0 0 ${skeletonWeeks * STEP + 4} ${7 * STEP + 24}`}
            width="100%"
            style={{ minWidth: skeletonWeeks * STEP + 4, display: "block" }}
          >
            {/* Month label skeletons */}
            {Array.from({ length: 12 }).map((_, i) => (
              <rect
                key={i}
                x={Math.round((i / 12) * skeletonWeeks) * STEP}
                y={2}
                width={20}
                height={8}
                rx={2}
                fill="currentColor"
                className="animate-pulse text-gray-200 dark:text-[#131313]"
              />
            ))}
            {/* Cell skeletons */}
            {Array.from({ length: skeletonWeeks }).map((_, wi) =>
              Array.from({ length: 7 }).map((_, di) => (
                <rect
                  key={`${wi}-${di}`}
                  x={wi * STEP}
                  y={di * STEP + 16}
                  width={CELL}
                  height={CELL}
                  rx={2}
                  fill="currentColor"
                  className="animate-pulse text-gray-200 dark:text-[#131313]"
                  style={{ animationDelay: `${((wi + di) % 5) * 0.05}s` }}
                />
              )),
            )}
          </svg>
        </div>
        <div className="flex justify-between items-center mt-1">
          <div className="h-3 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="flex items-center gap-1">
            <div className="h-3 w-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="rounded-sm bg-gray-200 dark:bg-gray-700 animate-pulse"
                style={{ width: 12, height: 12 }}
              />
            ))}
            <div className="h-3 w-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-xs text-gray-400 text-center py-4">
        Unable to load contribution data.
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="overflow-x-auto w-full">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${weeks.length * STEP + 4} ${7 * STEP + 24}`}
          width="100%"
          style={{ minWidth: weeks.length * STEP + 4, display: "block" }}
        >
          {monthLabels.map(({ label, weekIndex }) => (
            <text
              key={`${label}-${weekIndex}`}
              x={weekIndex * STEP}
              y={10}
              fontSize={11}
              fill={isDark ? "#6b7280" : "#9ca3af"}
            >
              {label}
            </text>
          ))}

          {weeks.map((week, wi) =>
            week.days.map((day) => (
              <rect
                key={day.date}
                x={wi * STEP}
                y={new Date(day.date + "T00:00:00").getDay() * STEP + 16}
                width={CELL}
                height={CELL}
                rx={2}
                ry={2}
                fill={COLORS[day.level]}
                className="cursor-pointer transition-opacity hover:opacity-70"
                onMouseEnter={(e) => handleMouseEnter(e, day)}
                onMouseLeave={handleMouseLeave}
              />
            )),
          )}
        </svg>
      </div>

      {tooltip.visible && (
        <div
          className="absolute z-50 pointer-events-none -translate-x-1/2 -translate-y-full"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="bg-gray-900 text-white text-xs rounded-md px-2.5 py-1.5 whitespace-nowrap shadow-lg">
            <span className="font-semibold">
              {tooltip.count} contribution{tooltip.count !== 1 ? "s" : ""}
            </span>{" "}
            on {formatDate(tooltip.date)}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {totalContributions.toLocaleString()}
            </span>{" "}
            contributions in the last year
          </span>
        </div>
        <div className="flex items-center gap-1 justify-end">
          <span className="text-xs text-gray-400 dark:text-gray-500 mr-1">
            Less
          </span>
          {COLORS.map((color, i) => (
            <div
              key={i}
              className="rounded-sm"
              style={{ width: 12, height: 12, backgroundColor: color }}
            />
          ))}
          <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">
            More
          </span>
        </div>
      </div>
    </div>
  );
}
