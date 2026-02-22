"use client"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

export interface SkillTag {
    label: string
    icon: LucideIcon
    color: string
    textColor?: string
}

interface SkillTagsProps {
    tags: SkillTag[]
    className?: string
    speed?: number // Animation duration in seconds (default: 15)
    direction?: "left" | "right" // Animation direction (default: "left")
    mobileSpeed?: number // Optional mobile-specific speed
}

export function SkillTags({
    tags,
    className,
    speed = 15, // Default speed is 15 seconds
    direction = "left", // Default direction is left
    mobileSpeed
}: SkillTagsProps) {
    // Create more copies on mobile for better loop coverage, fewer on desktop
    const copyCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 15 : 20
    const repeatedTags = Array.from({ length: copyCount }, () => tags).flat()
    
    // Use mobile speed if provided and on mobile, otherwise use regular speed
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const effectiveSpeed = isMobile && mobileSpeed ? mobileSpeed : speed
    
    // Set animation values based on direction for seamless looping
    const animationX = direction === "left" 
        ? ["0%", "-50%"]  // Left: start at 0%, end at -50%
        : ["-50%", "0%"]  // Right: start at -50%, end at 0%
    
    return (
        <div className={cn("overflow-hidden whitespace-nowrap", className)}>
            <motion.div
                className="flex py-1 sm:py-2 lg:py-3 gap-2 sm:gap-3 lg:gap-4 w-fit"
                animate={{
                    x: animationX,
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: effectiveSpeed, // Use the effective speed
                        ease: "linear",
                    },
                }}
            >
                {repeatedTags.map((tag, index) => {
                    const IconComponent = tag.icon
                    return (
                        <motion.span
                            key={`${tag.label}-${index}`}
                            className={cn(
                                "px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-2.5 rounded-full font-medium whitespace-nowrap flex items-center gap-1.5 sm:gap-2 cursor-pointer flex-shrink-0 text-xs sm:text-sm lg:text-base",
                                tag.textColor || "text-white"
                            )}
                            style={{
                                backgroundColor: tag.color
                            }}
                            whileHover={{ 
                                scale: 1.05,
                                y: -2,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ 
                                scale: 0.95,
                                transition: { duration: 0.1 }
                            }}
                        >
                            <IconComponent 
                                size={14} 
                                className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" 
                            />
                            <span className="hidden xs:inline sm:inline">
                                {tag.label}
                            </span>
                            <span className="xs:hidden sm:hidden">
                                {tag.label.length > 8 ? `${tag.label.substring(0, 8)}...` : tag.label}
                            </span>
                        </motion.span>
                    )
                })}
            </motion.div>
        </div>
    )
}
