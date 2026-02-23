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

const navItems = [
  { label: "Who am I?", href: "#", icon: User },
  { label: "Work", href: "#", icon: Briefcase },
  { label: "Guest Book", href: "#", icon: BookOpen },
  { label: "Connect", href: "#", icon: Link2 },
];

export default function Navigation() {
  return (
    <>
      {/* Top Navbar — desktop only */}
      <nav className="hidden sm:flex fixed top-0 left-0 right-0 z-50 justify-center pt-6 font-mono-nl">
        <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 lg:px-8 py-2 sm:py-3 shadow-sm border border-gray-200/50 mx-4">
          <div className="flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm sm:text-base text-gray-700 hover:text-gray-900 font-medium whitespace-nowrap transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Top Navbar — mobile only */}
      <nav className="sm:hidden fixed top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-lg border-b border-gray-200/20 shadow-sm font-mono-nl">
        <div className="flex items-center justify-between px-4 h-14">
          <span className="text-sm text-gray-800 ">u/@gwfirman</span>
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
                <DrawerTitle className="text-lg text-center">Menu</DrawerTitle>
                {/* <DrawerClose asChild>
                  <button className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all">
                    <X size={18} />
                  </button>
                </DrawerClose> */}
              </DrawerHeader>
              <div className="flex flex-col gap-1 px-4 pb-8 font-mono-nl">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DrawerClose asChild key={item.label}>
                      <a
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
                      >
                        <Icon size={20} className="text-gray-400" />
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
      </nav>
    </>
  );
}
