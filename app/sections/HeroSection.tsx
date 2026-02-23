"use client";
import { MorphingText } from "@/components/ui/morphing-text";
import Image from "next/image";
import {
  ChevronDown,
  Briefcase,
  MapPin,
  Mail,
  Clock,
  Globe,
  Code2,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { Spotlight } from "@/components/ui/spotlight-new";
import ChatbotSection from "@/app/sections/ChatbotSection";
import GitHubContributionGraph from "@/components/GitHubContributionGraph";
import {
  RotatingText,
  RotatingTextContainer,
} from "@/components/animate-ui/primitives/texts/rotating";
import { Magnetic } from "@/components/animate-ui/primitives/effects/magnetic";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import ScrollDownButton from "@/components/ScrollDownButton";

export default function HeroSection() {
  return (
    <div className="relative min-h-[100dvh] pb-8 px-4 pt-16 sm:pt-0 lg:pt-24 sm:px-8 lg:px-16 flex flex-col items-center justify-between overflow-hidden">
      <Navigation />

      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center">
        {/* Hero Content */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Magnetic>
            <Image
              src="/images/avatar.png"
              alt="Firman"
              width={2048}
              height={2048}
              className="inline-block rounded-xl sm:rounded-2xl border border-white sm:border-2 shadow-sm sm:shadow-md object-cover size-16 sm:size-20 lg:size-28 flex-shrink-0"
            />
          </Magnetic>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-mono font-bold italic leading-tight text-gray-800">
                Firman Aziz
              </h1>
              {/* Open to Work Badge */}
              <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full h-fit flex-shrink-0">
                <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] sm:text-xs font-medium text-green-700">
                  Open to Work
                </span>
              </div>
            </div>
            <RotatingTextContainer
              text={[
                "Full-stack Developer",
                "Ai-integrated",
                "Vibe Coder",
                "Product Designer",
                "Human",
              ]}
            >
              <RotatingText className="text-base sm:text-lg lg:text-2xl font-mono-nl text-gray-600" />
            </RotatingTextContainer>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 sm:gap-y-3 mt-4 mb-5 sm:mb-6 font-mono-nl">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <div className="p-1 sm:p-1.5 rounded-md bg-gray-100 border border-gray-200 flex-shrink-0">
              <Briefcase size={14} className="sm:hidden text-gray-400" />
              <Briefcase size={18} className="hidden sm:block text-gray-400" />
            </div>
            <span className="truncate">UI/UX Designer & Developer</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <div className="p-1 sm:p-1.5 rounded-md bg-gray-100 border border-gray-200 flex-shrink-0">
              <MapPin size={14} className="sm:hidden text-gray-400" />
              <MapPin size={18} className="hidden sm:block text-gray-400" />
            </div>
            <span className="truncate">Bandung, Indonesia</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <div className="p-1 sm:p-1.5 rounded-md bg-gray-100 border border-gray-200 flex-shrink-0">
              <Mail size={14} className="sm:hidden text-gray-400" />
              <Mail size={18} className="hidden sm:block text-gray-400" />
            </div>
            <span className="truncate">firman@example.com</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <div className="p-1 sm:p-1.5 rounded-md bg-gray-100 border border-gray-200 flex-shrink-0">
              <Clock size={18} className="text-gray-400" />
            </div>
            <span className="truncate">WIB (UTC+7)</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <div className="p-1 sm:p-1.5 rounded-md bg-gray-100 border border-gray-200 flex-shrink-0">
              <Globe size={18} className="text-gray-400" />
            </div>
            <a
              href="https://gwfirman.vercel.app"
              target="_blank"
              className="truncate hover:text-gray-800 transition-colors"
            >
              gwfirman.vercel.app
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <div className="p-1 sm:p-1.5 rounded-md bg-gray-100 border border-gray-200 flex-shrink-0">
              <Code2 size={18} className="text-gray-400" />
            </div>
            <span className="truncate">Next.js, React, TypeScript</span>
          </div>
        </div>

        {/* GitHub Contribution Graph */}

        <GitHubContributionGraph username="GwFirman" useBlue={true} />

        {/* Chatbot Section - Added w-full */}
        <div className="w-full relative z-10 transition-all duration-300 mt-4">
          <ChatbotSection />
        </div>
      </div>

      {/* Scroll Down Button - Adjusted positioning */}
      <ScrollDownButton />

      {/* Background SVG */}
      {/* <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
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
      </div> */}
    </div>
  );
}
