"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        document.body.style.overflow = "";
      },
    });

    // Animate the counter object from 0 to 100
    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 2, // 2 seconds loading duration
      ease: "power2.inOut",
      onUpdate: () => {
        setProgress(Math.round(counter.val));
      },
    });

    // Wait a tiny bit at 100%, then slide up
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "expo.inOut",
      delay: 0.2,
    });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center text-white"
    >
      <div 
        ref={numberRef}
        className="text-7xl md:text-9xl font-bold font-clash"
      >
        {progress}%
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] uppercase text-white/50">
        Loading Experience
      </div>
    </div>
  );
}
