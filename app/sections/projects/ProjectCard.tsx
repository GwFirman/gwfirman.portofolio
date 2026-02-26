"use client";
import Image from "next/image";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export interface DecorativeIcon {
  src: string;
  className: string;
}

export interface ProjectCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  tags: string[];
  onButtonClick?: () => void;
  buttonText?: string;
  bgColor?: string;
  accentColor?: string;
  decorativeIcons?: DecorativeIcon[];
  mobileOverlay?: React.ReactNode;
}

export default function ProjectCard({
  imageSrc,
  imageAlt,
  title,
  description,
  tags,
  onButtonClick,
  buttonText,
  bgColor = "bg-teal-50",
  accentColor = "teal",
  decorativeIcons = [],
  mobileOverlay,
}: ProjectCardProps) {
  // Map accent color to Tailwind classes
  const accentMap: Record<
    string,
    {
      tag: string;
      tagBorder: string;
      button: string;
      buttonHover: string;
      grid: string;
    }
  > = {
    teal: {
      tag: "bg-teal-500/20 text-teal-300 border-teal-400/30",
      tagBorder: "border-teal-400/30",
      button: "bg-teal-500",
      buttonHover: "hover:bg-teal-400",
      grid: "#14B8A6",
    },
    blue: {
      tag: "bg-blue-500/20 text-blue-300 border-blue-400/30",
      tagBorder: "border-blue-400/30",
      button: "bg-blue-500",
      buttonHover: "hover:bg-blue-400",
      grid: "#3B82F6",
    },
    rose: {
      tag: "bg-rose-500/20 text-rose-300 border-rose-400/30",
      tagBorder: "border-rose-400/30",
      button: "bg-rose-500",
      buttonHover: "hover:bg-rose-400",
      grid: "#F43F5E",
    },
  };

  const colors = accentMap[accentColor] || accentMap.teal;

  return (
    <div
      className={`flex flex-col md:flex-row md:items-stretch relative md:w-[650px] md:aspect-video ${bgColor} rounded-2xl transition-all duration-300 md:overflow-hidden group max-w-sm md:max-w-7xl`}
    >
      {/* Image */}
      <div className="relative w-full aspect-square md:absolute md:inset-0 md:w-auto md:h-auto md:aspect-auto overflow-hidden rounded-t-2xl md:rounded-2xl">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
      </div>

      {/* Mobile Info (below image, hidden on desktop) */}
      <Card className="md:hidden rounded-t-none border-t-0 shadow-none rounded-b-2xl dark:bg-gray-900">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-gray-800 dark:text-gray-100">
            {title}
          </CardTitle>
          <CardDescription className="text-xs line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className={`px-2 py-0.5 ${colors.tag} rounded-full text-xs border ${colors.tagBorder}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
        {buttonText && (
          <CardFooter>
            <button
              className={`w-full ${colors.button} ${colors.buttonHover} text-white px-4 py-1.5 rounded-lg transition-colors duration-200 text-xs font-medium`}
              onClick={onButtonClick}
            >
              {buttonText}
            </button>
          </CardFooter>
        )}
      </Card>

      {/* Hover Overlay (desktop only) */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 md:group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
        <div className="text-center text-white p-6 transform translate-x-4 md:group-hover:translate-x-0 transition-transform duration-300">
          <h3 className="text-2xl font-bold mb-3">{title}</h3>
          <p className="text-gray-200 mb-4 text-sm leading-relaxed max-w-sm">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className={`px-3 py-1 ${colors.tag} rounded-full text-xs border ${colors.tagBorder}`}
              >
                {tag}
              </span>
            ))}
          </div>
          {buttonText && (
            <button
              className={`${colors.button} ${colors.buttonHover} text-white px-6 py-2 rounded-lg transition-colors duration-200 text-sm font-medium`}
              onClick={onButtonClick}
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
