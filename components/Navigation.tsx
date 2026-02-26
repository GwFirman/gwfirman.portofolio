"use client";

import { User, Briefcase, BookOpen, Link2, Menu, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

const navItems = [
  { label: "Who am I?", href: "/#profile", icon: User },
  { label: "Work", href: "/#works", icon: Briefcase },
  { label: "Guest Book", href: "/guestbook", icon: BookOpen },
  { label: "Connect", href: "#", icon: Link2 },
];

export default function Navigation() {
  return (
    <>
      {/* Top Navbar — desktop only */}
      <nav className="hidden sm:flex fixed top-0 left-0 right-0 z-50 justify-center pt-6 font-mono-nl">
        <div className="bg-white/20 dark:bg-[#050505]/20 backdrop-blur-lg  rounded-full px-6 lg:px-8 py-2 sm:py-3 shadow-sm border border-gray-200/50 dark:border-gray-700/50 mx-4">
          <div className="flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium whitespace-nowrap transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            <AnimatedThemeToggler />
          </div>
        </div>
      </nav>

      {/* Top Navbar — mobile only */}
      <nav className="sm:hidden fixed top-0 left-0 right-0 z-50 bg-white/50 dark:bg-gray-900/70 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-700/30 shadow-sm font-mono-nl">
        <div className="flex items-center justify-between px-4 h-14">
          <span className="text-sm text-gray-800 dark:text-gray-200">
            u/@gwfirman
          </span>
          <div className="flex items-center gap-2">
            <AnimatedThemeToggler />
            <Drawer>
              <DrawerTrigger asChild>
                <button
                  className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
                  aria-label="Open menu"
                >
                  <Menu size={22} />
                </button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="flex items-center justify-center pr-4">
                  <DrawerTitle className="text-lg text-center">
                    Menu
                  </DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col gap-1 px-4 pb-8 font-mono-nl">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DrawerClose asChild key={item.label}>
                        <a
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                        >
                          <Icon
                            size={20}
                            className="text-gray-400 dark:text-gray-500"
                          />
                          <span className="text-base font-medium">
                            {item.label}
                          </span>
                        </a>
                      </DrawerClose>
                    );
                  })}
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </nav>
    </>
  );
}
