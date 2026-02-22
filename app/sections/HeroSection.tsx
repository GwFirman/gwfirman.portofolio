"use client";
import { MorphingText } from "@/components/ui/morphing-text";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Spotlight } from "@/components/ui/spotlight-new";
import ChatbotSection from "@/app/sections/ChatbotSection";

export default function HeroSection() {
  return (
    <div className="relative min-h-[100dvh] pt-20 pb-8 px-4 sm:px-8 lg:px-16 flex flex-col items-center justify-between overflow-hidden">
      <Navigation />

      {/* Gradient Background with Grid */}
      <div className="absolute inset-0 -z-10 ">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50" />
        <svg
          className="absolute inset-0 w-full h-full opacity-40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Gradient Fade for Grid */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none" />
      </div>

      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center">
        {/* Hero Content */}
        <div className="text-center mb-6 sm:mb-10 lg:mb-12">
          <MorphingText
            className="text-blue-500 font-mono"
            texts={[
              "Hello",
              "Bonjour",
              "Hola",
              "你好",
              "こんにちは",
              "안녕하세요",
              "مرحبا",
              "Привет",
              "Hallo",
              "Ciao",
              "Olá",
            ]}
          />
          <h1 className=" text-gray-900 leading-tight mt-4 sm:mt-8 lg:mb-12 font-medium">
            <span className="font-serif italic text-2xl lg:text-5xl">
              I'm Firman
            </span>
            <Image
              src="/images/avatar2.png"
              alt="Firman"
              width={2048}
              height={2048}
              className=" inline-block rounded-lg sm:rounded-xl lg:rounded-2xl border border-sm sm:border-2 border-white shadow-sm sm:shadow-md -rotate-6 mx-1 sm:mx-2 align-middle object-cover size-10 sm:size-14 lg:size-16"
            />
            <br className="sm:hidden" />
            <span className="text-gray-500 opacity-60 text-lg lg:text-4xl">
              Building{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent font-semibold text-lg lg:text-4xl">
              modern web
            </span>
            <span className="text-gray-500 opacity-60 text-lg lg:text-4xl">
              {" "}
              apps with{" "}
            </span>
            <br className="hidden sm:block" />{" "}
            <span className="text-gray-900 text-lg lg:text-4xl">
              {" "}
              AI-driven{" "}
            </span>
            <Image
              src="/icons/spark.svg"
              alt="spark"
              width={64}
              height={64}
              className="text-yellow-300 inline-block rounded-lg sm:rounded-xl lg:rounded-2xl border border-sm sm:border-2 border-white shadow-sm sm:shadow-md bg-blue-400 rotate-6 mx-1 sm:mx-2 align-middle object-cover w-10 sm:w-14 lg:w-16 h-auto "
            />
            <span className="text-gray-900 text-lg lg:text-4xl">features.</span>
          </h1>

          {/* Open to Work Badge */}
          <div className="mt-2 inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full">
            <span className="inline-block w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs sm:text-sm font-medium text-green-700">
              Open to Work
            </span>
          </div>
        </div>

        {/* Chatbot Section - Added w-full */}
        <div className="w-full relative z-10 transition-all duration-300">
          <ChatbotSection />
        </div>
      </div>

      {/* Scroll Down Button - Adjusted positioning */}
      <div className="mt-8 relative z-10 animate-bounce self-center pb-safe">
        <button
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
            });
          }}
          className="p-2 bg-white/50 backdrop-blur-sm rounded-full shadow-lg border border-white/20 text-blue-500 hover:bg-white hover:scale-110 transition-all duration-300"
          aria-label="Scroll down"
        >
          <ChevronDown size={24} />
        </button>
      </div>
      {/* Background SVG */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="531"
          height="590"
          viewBox="0 0 531 590"
          fill="none"
          className="absolute top-72 right-0 -translate-y-1/2 scale-x-[-1]"
        >
          <g filter="url(#filter0_f_17_2333)">
            <path
              d="M17 -71.5C17 40.0615 364.755 379 314.197 379C263.639 379 -100 40.0615 -100 -71.5C-100 -183.062 -61.818 -209 -11.26 -209C39.298 -209 17 -183.062 17 -71.5Z"
              fill="url(#paint0_linear_17_2333)"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_17_2333"
              x="-311"
              y="-420"
              width="841.22"
              height="1010"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="105.5"
                result="effect1_foregroundBlur_17_2333"
              />
            </filter>
            <linearGradient
              id="paint0_linear_17_2333"
              x1="-55.2189"
              y1="-244.264"
              x2="-55.2189"
              y2="159.736"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3B82F6" />
              <stop offset="1" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
