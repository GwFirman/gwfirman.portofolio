"use client";
import Image from "next/image";
import ProjectCard from "./ProjectCard";

export default function AitherwayProject() {
  return (
    <div className="space-y-4">
      {/* Project Title */}
      <div className="flex items-center gap-3">
        <h3 className="text-xl md:text-4xl font-serif italic text-gray-800">
          Aitherway
        </h3>
        <div className="h-px flex-1 bg-gradient-to-r from-rose-300 to-transparent"></div>
      </div>
      <div className="flex w-fit flex-row gap-4 h-64 md:h-96">
        {/* Main Project Card */}
        <ProjectCard
          imageSrc="/images/projects/aitherway.png"
          imageAlt="Aitherway Platform"
          title="Aitherway Platform"
          description="A modern platform crafted with elegance and purpose, delivering seamless digital experiences."
          tags={["UI/UX Design", "Branding", "Web App"]}
          buttonText="View Project"
          bgColor="bg-rose-50"
          accentColor="rose"
          onButtonClick={() =>
            window.open("https://aither-way.vercel.app/", "_blank")
          }
          mobileOverlay={
            <div className="absolute top-4 left-4 z-30 md:hidden">
              <h1 className="text-lg font-semibold text-gray-800">Aitherway</h1>
              <p className="text-xs text-gray-800">
                A modern platform crafted with elegance and purpose.
              </p>
            </div>
          }
        />

        {/* Side Panel */}
        <div className="md:flex flex-col justify-between gap-4 w-fit h-full hidden">
          <div className="size-48 bg-rose-50 rounded-xl p-8 flex items-center justify-center">
            <Image
              src="/images/projects/aiterway_logo.png"
              alt="Aitherway Logo"
              width={150}
              height={150}
              className="rounded-lg w-full h-full object-contain"
            />
          </div>
          <div className="size-48 bg-rose-500 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
