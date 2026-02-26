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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface ProjectCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  tags: string[];
  onButtonClick?: () => void;
  buttonText?: string;
  gradient?: string;
}

export default function ProjectCard({
  imageSrc,
  imageAlt,
  title,
  description,
  tags,
  onButtonClick,
  buttonText,
  gradient = "from-neutral-600 to-violet-300",
}: ProjectCardProps) {
  return (
    <div
      className={`relative w-full rounded-xl bg-gradient-to-r ${gradient} pt-0 shadow-lg`}
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
      <Card className="border-none rounded-t-none">
        <CardHeader className="border-t-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription className="flex flex-wrap items-center gap-2">
            {tags.map((tag, idx) => (
              <Badge key={idx} variant="outline" className="rounded-sm">
                {tag}
              </Badge>
            ))}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
        </CardContent>
        {buttonText && (
          <CardFooter>
            <Button size="lg" className="w-full" onClick={onButtonClick}>
              {buttonText}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
