"use client";
import Image from "next/image";
import ProjectCard from "./ProjectCard";

export default function CethaProject() {
  return (
    <div className="space-y-4">
      {/* Project Title */}
      <div className="flex items-center gap-3">
        <h3 className="text-xl md:text-4xl font-serif italic text-gray-800">
          Cetha
        </h3>
        <div className="h-px flex-1 bg-gradient-to-r from-blue-300 to-transparent"></div>
      </div>
      <div className="flex w-fit flex-row gap-4 h-64 md:h-96">
        {/* <div className="relative w-0.5 h-full bg-gray-300 rounded-full">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-300 rounded-full"></div>
        </div> */}
        {/* Side Panel */}
        <div className="md:flex flex-col justify-between gap-4 w-fit h-full hidden">
          <div className="size-48 bg-blue-50 rounded-xl p-4">
            <Image
              src="/images/projects/cetha_logo.png"
              alt="Cetha Logo"
              width={150}
              height={150}
              className="rounded-lg w-full h-full object-contain"
            />
          </div>
          <div className="size-48 bg-blue-500 rounded-xl"></div>
        </div>
        {/* Main Project Card */}
        <ProjectCard
          imageSrc="/images/projects/cetha.png"
          imageAlt="Cetha Platform"
          title="Cetha Platform"
          description="An innovative web application designed to provide clear and transparent information services."
          tags={["UI/UX Design", "Web Development", "Full Stack"]}
          buttonText="View Project"
          bgColor="bg-blue-50"
          accentColor="blue"
          decorativeIcons={[
            {
              src: "icons/design.svg",
              className:
                "absolute z-0 top-12 md:top-6 -rotate-6 left-4 size-10 md:size-16",
            },
            {
              src: "icons/jaringan.svg",
              className:
                "absolute z-0 top-12 right-1/2 rotate-12 size-10 md:size-16",
            },
            {
              src: "icons/spark.svg",
              className: "absolute z-0 top-0 right-0 size-10 md:size-16",
            },
          ]}
          mobileOverlay={
            <div className="absolute top-4 left-4 z-30 md:hidden">
              <h1 className="text-lg font-semibold text-gray-800">Cetha</h1>
              <p className="text-xs text-gray-800">
                Clear and transparent information platform for modern web
                services.
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
}
