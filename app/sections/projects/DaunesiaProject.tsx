"use client";
import Image from "next/image";
import ProjectCard from "./ProjectCard";

export default function DaunesiaProject() {
  return (
    <div className="space-y-4">
      {/* Project Title */}
      <div className="flex items-center gap-3">
        <h3 className="text-xl md:text-4xl font-serif italic text-gray-800">
          Daunesia
        </h3>
        <div className="h-px flex-1 bg-gradient-to-r from-teal-300 to-transparent"></div>
      </div>
      <div className="flex w-fit flex-row gap-4 h-64 md:h-96">
        {/* Main Project Card */}
        <ProjectCard
          imageSrc="/images/projects/daunesia.png"
          imageAlt="Daunesia Platform"
          title="Daunesia Platform"
          description="A comprehensive digital platform for herbal medicine information and consultation services."
          tags={["UI/UX Design", "Branding", "Mobile App"]}
          buttonText="View Project"
          bgColor="bg-teal-50"
          accentColor="teal"
          decorativeIcons={[
            {
              src: "icons/daun.svg",
              className:
                "absolute z-0 top-12 md:top-6 -rotate-6 left-4 size-10 md:size-16",
            },
            {
              src: "icons/jaringan.svg",
              className:
                "absolute z-0 top-12 right-1/2 rotate-12 size-10 md:size-16",
            },
            {
              src: "icons/kacamata.svg",
              className: "absolute z-0 top-0 right-0 size-10 md:size-16",
            },
          ]}
          mobileOverlay={
            <div className="absolute top-4 left-4 z-30 md:hidden">
              <h1 className="text-lg font-semibold text-gray-800">Daunesia</h1>
              <p className="text-xs text-gray-800">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
                explicabo!
              </p>
            </div>
          }
        />

        {/* Side Panel */}
        <div className="md:flex flex-col justify-between gap-4 w-fit h-full hidden">
          <div className="size-48 bg-teal-50 rounded-xl">
            <Image
              src="/images/projects/daunesia logo.png"
              alt="Daunesia Logo"
              width={150}
              height={150}
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
          <div className="size-48 bg-teal-500 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
