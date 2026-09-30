"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Order matters: "We are a CREATIVE Agency" is what visitors see on load,
// then it swipes to STRATEGIC, then DYNAMIC, as they scroll.
const WORDS = ["CREATIVE", "STRATEGIC", "DYNAMIC"];
const widestWord = WORDS.reduce((longest, w) => (w.length > longest.length ? w : longest));

const STATS = [
  { num: "9+", label: "YEARS" },
  { num: "500+", label: "PROJECTS" },
  { num: "99%", label: "CLIENT SATISFACTION" },
];

export default function Hero() {
  const outerRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const wordGroupRef = useRef<HTMLDivElement>(null);
  const topWordRef = useRef<HTMLDivElement>(null);
  const bottomWordRef = useRef<HTMLHeadingElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentWord, setCurrentWord] = useState(0);

  // The rotating word swipes on scroll, not on a timer. "We are a" and
  // "AGENCY" don't move or fade at all — only the active word changes.
  useEffect(() => {
    if (!outerRef.current) return;

    const onUpdate = (self: ScrollTrigger) => {
      const idx = Math.min(WORDS.length - 1, Math.floor(self.progress * WORDS.length));
      setCurrentWord(idx);
    };

    const mm = gsap.matchMedia();
    // Desktop pins the hero for an extra 100vh so the video can grow —
    // "bottom bottom" gives a real scroll range there, lined up with the
    // same range the video grows over.
    mm.add("(min-width: 1024px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: outerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate,
      });
      return () => trigger.kill();
    });
    // Mobile doesn't pin, so the video (with the words on it) is only on
    // screen for the distance it takes to scroll past its own card — not
    // the whole hero section, which is much taller (stats/statement sit
    // below it). End the range there so all 3 words are seen before the
    // video scrolls out of view.
    mm.add("(max-width: 1023px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: outerRef.current,
        start: "top top",
        end: () => {
          const video = videoWrapperRef.current;
          if (!video) return "bottom top";
          return video.getBoundingClientRect().bottom + window.scrollY;
        },
        onUpdate,
      });
      return () => trigger.kill();
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const ctx = gsap.context(() => {
      // Entrance (all breakpoints)
      gsap.fromTo(
        [wordGroupRef.current, statsRef.current, statementRef.current],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.1, delay: 1.5 },
      );

      const mm = gsap.matchMedia();

      // ── Desktop: video grows from a card to full-bleed on scroll; the
      // text group grows/stays centred with it since both share the same
      // sticky anchor. Stats/statement (not part of the client's request)
      // just fade early, as before.
      mm.add("(min-width: 1024px)", () => {
        const layer = layerRef.current;
        const wrap = videoWrapperRef.current;
        if (!layer || !wrap) return;

        gsap.fromTo(
          wordGroupRef.current,
          { xPercent: -50, yPercent: -50 },
          { xPercent: -50, yPercent: -50, duration: 1, delay: 1.5 },
        );
        gsap.fromTo(
          wrap,
          { opacity: 0, scale: 0.92, xPercent: -50, yPercent: -50 },
          { opacity: 1, scale: 1, xPercent: -50, yPercent: -50, duration: 1, ease: "expo.out", delay: 1.6 },
        );

        const startWidth = () =>
          Math.min(window.innerWidth * 0.29, window.innerHeight * 0.58, 560);

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
            { width: () => startWidth(), height: () => startWidth() * 0.6 },
            { width: () => layer.clientWidth, height: () => layer.clientHeight, ease: "none" },
            0,
          )
          .to(
            [statsRef.current, statementRef.current],
            { opacity: 0, duration: 0.4 },
            0,
          );
      });

      // ── Mobile: no grow, just a simple fade-in; video and text overlay
      // share one small box (see JSX).
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          videoWrapperRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.9, ease: "expo.out", delay: 1.6 },
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

      {/*
        Mobile: video and text share one small relative box, with text
        absolutely filling it as an overlay.
        Desktop (lg:contents): this wrapper disappears from the box model,
        so the video and the text group become independent children of the
        sticky panel below, each centred on it the same way (top/left 50% +
        GSAP xPercent/yPercent), which is what keeps them coincident while
        the video grows — the words stay "on" the video at every size.
      */}
      <div
        ref={layerRef}
        className="relative z-20 mb-4 lg:sticky lg:top-0 lg:mb-0 lg:flex lg:h-screen lg:items-center lg:justify-center"
      >
        <div className="relative w-full max-w-[460px] mx-auto lg:contents">
          {/* ── VIDEO ── */}
          <div
            ref={videoWrapperRef}
            onClick={toggleVideo}
            className="group relative lg:absolute z-10 lg:top-1/2 lg:left-1/2 aspect-[16/10] w-full lg:w-[min(29vw,58vh,560px)] cursor-pointer overflow-hidden bg-black rounded lg:rounded-[4px]"
            style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.8)" }}
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
            <div className="absolute inset-0 bg-black/35 pointer-events-none" />
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

          {/* ── "We are a" / [WORD] / "AGENCY" — static, overlaid on the video ── */}
          <div
            ref={wordGroupRef}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-1 text-center pointer-events-none lg:inset-auto lg:top-1/2 lg:left-1/2 lg:gap-2"
          >
            <p
              ref={labelRef}
              className="text-white text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.85)" }}
            >
              We are a
            </p>

            {/* Rotating word — decorative; the real heading is the AGENCY h1 below */}
            <div
              ref={topWordRef}
              aria-hidden="true"
              className="hero-overlay-text text-white select-none whitespace-nowrap text-center"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.9)" }}
            >
              <div className="relative h-[1.1em] overflow-hidden">
                {/* Invisible, in normal flow: reserves width for the widest
                    word so the swiping rows below (all absolutely
                    positioned) don't collapse this box to zero width. */}
                <span className="invisible">{widestWord}</span>
                {WORDS.map((word, index) => (
                  <div
                    key={word}
                    className="absolute inset-x-0 top-0 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.85,0,0.15,1)]"
                    style={{
                      transform: `translateY(${(index - currentWord) * 100}%)`,
                      opacity: index === currentWord ? 1 : 0,
                    }}
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>

            <h1
              ref={bottomWordRef}
              aria-label={`We are a ${WORDS.join(", ")} Agency`}
              className="hero-overlay-text m-0 p-0 text-white select-none whitespace-nowrap"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.9)" }}
            >
              <span aria-hidden="true">AGENCY</span>
            </h1>
          </div>
        </div>
      </div>

      {/* ── Left side Stats ── */}
      <div
        ref={statsRef}
        className="hero-info hero-stats relative z-30 mb-10 flex w-full flex-col gap-3 lg:absolute lg:mb-0 lg:w-auto lg:gap-[0.75em]"
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

      {/* ── Right side Statement ── */}
      <div
        ref={statementRef}
        className="hero-info hero-statement relative z-30 w-full lg:absolute"
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
