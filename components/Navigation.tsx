"use client";

import { User, Briefcase, BookOpen, Link2, Menu } from "lucide-react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import { useState } from "react";

const navItems = [
  { label: "Who am I?", href: "/#profile", icon: User },
  { label: "Work", href: "/#works", icon: Briefcase },
  { label: "Guest Book", href: "/guestbook", icon: BookOpen },
  { label: "Connect", href: "#", icon: Link2 },
];

const desktopNavItems = navItems.map((item) => ({
  name: item.label,
  link: item.href,
}));

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full font-mono-nl">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <a
            href="/"
            className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
          >
            <span className="font-medium text-black dark:text-white">
              u/@gwfirman
            </span>
          </a>
          <NavItems items={desktopNavItems} />
          <div className="relative z-20 flex items-center gap-4">
            <AnimatedThemeToggler />
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <a
              href="/"
              className="relative z-20 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
            >
              <span className="font-medium text-black dark:text-white">
                u/@gwfirman
              </span>
            </a>
            <div className="flex items-center gap-2">
              <AnimatedThemeToggler />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-neutral-600 dark:text-neutral-300"
                >
                  <Icon size={20} className="text-gray-400 dark:text-gray-500" />
                  <span className="block font-medium">{item.label}</span>
                </a>
              );
            })}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
