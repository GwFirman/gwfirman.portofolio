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
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export interface TechBadge {
  name: string;
  icon: string;
  bg: string;
  darkBg: string;
  text: string;
  darkText: string;
  border: string;
  darkBorder: string;
}

export interface ProjectCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  techStack: TechBadge[];
  onButtonClick?: () => void;
  buttonText?: string;
  githubUrl?: string;
  gradient?: string;
}

export default function ProjectCard({
  imageSrc,
  imageAlt,
  title,
  description,
  techStack,
  onButtonClick,
  buttonText,
  githubUrl,
  gradient = "from-neutral-600 to-violet-300",
}: ProjectCardProps) {
  return (
    <div
      className={`relative w-full rounded-xl bg-gradient-to-r ${gradient}  pt-0`}
    >
      {/* Image Area */}
      <div className="relative aspect-video w-full rounded-t-xl">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover rounded-t-xl"
        />
      </div>

      {/* Card Content */}
      <Card className=" rounded-t-none dark:bg-none dark:bg-gray-950  border border-gray-200 dark:border-gray-700/20 border-t-0 rounded-b-lg">
        <CardHeader className="border-t-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100  mb-3">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((skill, idx) => (
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
        </CardContent>
        {(buttonText || githubUrl) && (
          <CardFooter className="gap-2">
            {buttonText && (
              <Button size="lg" className="flex-1" variant="default" onClick={onButtonClick}>
                {buttonText}
              </Button>
            )}
            {githubUrl && (
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open(githubUrl, "_blank")}
              >
                <Github className="size-5" />
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
