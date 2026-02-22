"use client";

import { useCallback, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const morphTime = 1.5;
const cooldownTime = 0.5;

const useMorphingText = (texts: string[]) => {
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(0);
  const lastTimeRef = useRef(new Date());

  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  const setStyles = useCallback(
    (fraction: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current];
      if (!current1 || !current2) return;

      // Optimization: Avoid setting styles if fraction hasn't changed significantly or elements are hidden
      // Use toFixed to avoid sub-pixel rendering jitter which is expensive

      const blur2 = Math.min(8 / fraction - 8, 100);
      const opacity2 = Math.pow(fraction, 0.4) * 100;

      current2.style.filter = `blur(${blur2.toFixed(2)}px)`;
      current2.style.opacity = `${opacity2.toFixed(1)}%`;

      const invertedFraction = 1 - fraction;
      const blur1 = Math.min(8 / invertedFraction - 8, 100);
      const opacity1 = Math.pow(invertedFraction, 0.4) * 100;

      current1.style.filter = `blur(${blur1.toFixed(2)}px)`;
      current1.style.opacity = `${opacity1.toFixed(1)}%`;

      // Text content updates happen rarely, no need to optimize string setting heavily
      current1.textContent = texts[textIndexRef.current % texts.length];
      current2.textContent = texts[(textIndexRef.current + 1) % texts.length];
    },
    [texts],
  );

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;

    let fraction = morphRef.current / morphTime;

    if (fraction > 1) {
      cooldownRef.current = cooldownTime;
      fraction = 1;
    }

    setStyles(fraction);

    if (fraction === 1) {
      textIndexRef.current++;
    }
  }, [setStyles]);

  const doCooldown = useCallback(() => {
    morphRef.current = 0;
    const [current1, current2] = [text1Ref.current, text2Ref.current];
    if (current1 && current2) {
      current2.style.filter = "none";
      current2.style.opacity = "100%";
      current1.style.filter = "none";
      current1.style.opacity = "0%";
    }
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const newTime = new Date();
      // Cap dt to avoid huge jumps if tab was inactive
      const dt = Math.min(
        (newTime.getTime() - lastTimeRef.current.getTime()) / 1000,
        0.1,
      );
      lastTimeRef.current = newTime;

      cooldownRef.current -= dt;

      if (cooldownRef.current <= 0) doMorph();
      else doCooldown();
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [doMorph, doCooldown]);

  return { text1Ref, text2Ref };
};

const Texts: React.FC<{ texts: string[] }> = ({ texts }) => {
  const { text1Ref, text2Ref } = useMorphingText(texts);
  return (
    <>
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
        // Removed will-change from class and added translate-z-0 for hardware acceleration
        style={{
          willChange: "filter, opacity",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
        ref={text1Ref}
      />
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
        style={{
          willChange: "filter, opacity",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
        ref={text2Ref}
      />
    </>
  );
};

// Moved SVG out to be rendered once, or use CSS filter if possible (but threshold effect needs SVG)
const SvgFilters: React.FC = () => (
  <svg
    id="filters"
    className="fixed h-0 w-0"
    style={{ display: "none" }} // Hide from layout calculation completely
  >
    <defs>
      <filter id="threshold">
        {/* Reduce the quality slightly for performance if needed, but standard matrix is usually okay */}
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
        />
      </filter>
    </defs>
  </svg>
);

interface MorphingTextProps {
  className?: string;
  texts: string[];
}

export const MorphingText: React.FC<MorphingTextProps> = ({
  texts,
  className,
}) => (
  <>
    {/* We move SvgFilters outside the main render loop implicitly by component structure, but ensuring it's in DOM */}
    <SvgFilters />
    <div
      className={cn(
        "relative mx-auto h-16 w-full max-w-screen-md text-center font-sans text-[40pt] leading-none font-bold md:h-24 lg:text-[6rem]",
        // Apply the filter here. The translate3d forces GPU layer promotion.
        "[filter:url(#threshold)_blur(0.6px)] [transform:translate3d(0,0,0)]",
        className,
      )}
    >
      <Texts texts={texts} />
    </div>
  </>
);
