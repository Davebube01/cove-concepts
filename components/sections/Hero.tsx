"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["CREATIVE", "STRATEGIC", "DYNAMIC"];

const STATS = [
  { num: "9+", label: "YEARS" },
  { num: "500+", label: "PROJECTS" },
  { num: "99%", label: "CLIENT SATISFACTION" },
];

export default function Hero() {
  const outerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const topWordRef = useRef<HTMLDivElement>(null);
  const bottomWordRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const wordSpanRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentWord, setCurrentWord] = useState(0);
  const [wordWidths, setWordWidths] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Desktop label ("We are a") tracks the left edge of whichever word is showing
  useEffect(() => {
    const measure = () =>
      setWordWidths(wordSpanRefs.current.map((el) => el?.offsetWidth ?? 0));
    measure();
    document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const ctx = gsap.context(() => {
      // Entrance (all breakpoints)
      gsap.fromTo(
        [
          labelRef.current,
          topWordRef.current,
          bottomWordRef.current,
          statsRef.current,
          statementRef.current,
        ],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          delay: 1.5,
        },
      );
      gsap.fromTo(
        videoWrapperRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 1, ease: "expo.out", delay: 1.6 },
      );

      // Desktop: the video is pinned (CSS sticky) while it grows from a card to
      // full-bleed. Words, stats and statement scroll away naturally underneath.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const layer = layerRef.current;
        const wrap = videoWrapperRef.current;
        if (!layer || !wrap) return;

        const startWidth = () =>
          Math.min(window.innerWidth * 0.186, window.innerHeight * 0.368);

        gsap
          .timeline({
            scrollTrigger: {
              trigger: outer,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(
            wrap,
            {
              width: () => startWidth(),
              height: () => startWidth() * 0.6,
              // Card rests below centre (≈64vh) like the reference, and
              // travels back to true centre as it grows to full-bleed.
              y: () => window.innerHeight * 0.14,
            },
            {
              width: () => layer.clientWidth,
              height: () => layer.clientHeight,
              y: 0,
              ease: "none",
            },
          );
      });
    }, outer);

    return () => ctx.revert();
  }, []);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const labelShift = -(wordWidths[currentWord] ?? 0) / 2;

  return (
    <div
      ref={outerRef}
      className="relative flex flex-col min-h-screen px-6 pt-24 pb-12 lg:block lg:min-h-0 lg:h-[200vh] lg:p-0"
    >
      {/* Faint crosshair + rings (desktop only) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 hidden h-screen overflow-hidden lg:block"
      >
        <div className="absolute inset-x-0 top-[33.5vh] h-px bg-white/[0.06]" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-white/[0.06]" />
        <div className="absolute left-1/2 top-[33.5vh] h-[98vh] w-[98vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]" />
        <div className="absolute left-1/2 top-[33.5vh] h-[90vh] w-[90vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]" />
      </div>

      <p
        ref={labelRef}
        className="hero-label relative z-10 mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-white lg:absolute lg:left-1/2 lg:mb-0 lg:font-normal lg:tracking-normal"
      >
        <span
          className="inline-block lg:translate-x-[var(--label-x)] lg:transition-transform lg:duration-700 lg:ease-[cubic-bezier(0.85,0,0.15,1)]"
          style={{ "--label-x": `${labelShift}px` } as React.CSSProperties}
        >
          We are <span className="hidden lg:inline">a</span>
        </span>
      </p>

      {/* Rotating word (decorative — the real heading is the AGENCY h1) */}
      <div
        ref={topWordRef}
        aria-hidden="true"
        className="hero-display hero-word-top relative z-10 mb-6 select-none whitespace-nowrap text-left text-white lg:absolute lg:inset-x-0 lg:mb-0 lg:text-center"
      >
        <div className="relative h-[1em] overflow-hidden">
          {WORDS.map((word, index) => (
            <div
              key={word}
              className="absolute inset-x-0 top-0 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.85,0,0.15,1)]"
              style={{
                transform: `translateY(${(index - currentWord) * 100}%)`,
                opacity: index === currentWord ? 1 : 0,
              }}
            >
              <span
                ref={(el) => {
                  wordSpanRefs.current[index] = el;
                }}
                className="inline-block"
              >
                {word}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Video: sticky on desktop, grows to full-bleed on scroll */}
      <div
        ref={layerRef}
        className="relative z-20 mb-4 lg:sticky lg:top-0 lg:mb-0 lg:flex lg:h-screen lg:items-center lg:justify-center lg:pointer-events-none"
      >
        <div
          ref={videoWrapperRef}
          onClick={toggleVideo}
          className="group relative aspect-[16/10] w-full cursor-pointer overflow-hidden bg-black lg:pointer-events-auto lg:aspect-[5/3] lg:w-[min(18.6vw,36.8vh)]"
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            src="/videos/hero-intro.mp4"
          />
          <div className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/55 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 lg:bottom-5 lg:right-5 lg:h-14 lg:w-14">
            {isPlaying ? (
              <svg className="h-4 w-4 text-white lg:h-5 lg:w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="ml-0.5 h-4 w-4 text-white lg:h-5 lg:w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>
        </div>
      </div>

      <div
        ref={bottomWordRef}
        className="hero-display hero-word-bottom relative z-10 mb-12 flex w-full flex-col items-end text-white lg:absolute lg:inset-x-0 lg:mb-0 lg:items-center"
      >
        <h1
          aria-label="We are a Strategic, Creative, Dynamic Agency"
          className="m-0 w-full select-none whitespace-nowrap p-0 text-right lg:text-center"
        >
          <span aria-hidden="true">AGENCY</span>
        </h1>
      </div>

      <div
        ref={statsRef}
        className="hero-info hero-stats relative z-10 mb-10 flex w-full flex-col gap-3 lg:absolute lg:mb-0 lg:w-auto lg:gap-[0.75em]"
      >
        {STATS.map(({ num, label }) => (
          <div key={label} className="flex items-center gap-4 lg:gap-0">
            <span className="w-14 text-lg font-bold leading-none text-white lg:w-[3.4em] lg:text-[1em]">
              {num}
            </span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-white/80 lg:text-[1em] lg:tracking-normal lg:text-white/70">
              {label}
            </span>
          </div>
        ))}
      </div>

      <div
        ref={statementRef}
        className="hero-info hero-statement relative z-10 w-full lg:absolute"
      >
        <p className="text-left text-[11px] font-medium uppercase leading-relaxed tracking-[0.15em] text-white/70 lg:text-[1em] lg:leading-[1.5] lg:tracking-normal">
          <strong className="font-medium text-white">
            WE DON&apos;T BELIEVE IN ONE-SIZE-FITS-ALL SOLUTIONS.
          </strong>{" "}
          EVERY BRAND HAS ITS OWN STORY. OUR JOB IS TO ALIGN STRATEGY.
        </p>
      </div>
    </div>
  );
}
