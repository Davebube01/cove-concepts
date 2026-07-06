"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);

  // Animated words state
  const words = ["STRATEGIC", "CREATIVE", "DYNAMIC"];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!outerRef.current || !stickyRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── Desktop Animations (lg and up)
      mm.add("(min-width: 1024px)", () => {
        const entTl = gsap.timeline({
          delay: 1.5,
          onComplete: () => {
            // ── Scroll-driven video expansion (Desktop Only)
            const expandTl = gsap.timeline({
              scrollTrigger: {
                trigger: outerRef.current,
                start: "top top",
                end: "bottom bottom", // Finishes before the next section scrolls up
                scrub: 1.2,
              },
            });

            // Words slide up and down off screen
            expandTl.to(
              text1Ref.current,
              { y: -300, opacity: 0, ease: "power2.in", duration: 1 },
              0,
            );
            expandTl.to(
              text2Ref.current,
              { y: 300, opacity: 0, ease: "power2.in", duration: 1 },
              0,
            );
            expandTl.to(
              [statsRef.current, statementRef.current],
              { opacity: 0, duration: 0.4 },
              0,
            );

            // Video grows from card to full viewport
            expandTl.to(
              videoWrapperRef.current,
              {
                width: "100%",
                height: "100%",
                yPercent: -50,
                xPercent: -50,
                borderRadius: 0,
                ease: "power2.inOut",
                duration: 1,
              },
              0.05,
            );
          },
        });

        entTl
          .fromTo(
            textRef.current,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power4.out",
              stagger: 0.12,
            },
          )
          .fromTo(
            [text1Ref.current, text2Ref.current],
            { y: 50, opacity: 0 },
            {
              y: -70,
              opacity: 1,
              duration: 1.2,
              ease: "power4.out",
              stagger: 0.12,
            },
          )
          .fromTo(
            videoWrapperRef.current,
            { scale: 0.85, opacity: 0, xPercent: -50, yPercent: -50 },
            {
              scale: 1,
              opacity: 1,
              xPercent: -50,
              yPercent: -80,
              duration: 1.1,
              ease: "expo.out",
            },
            "-=0.9",
          )
          .fromTo(
            [statsRef.current, statementRef.current],
            { y: 120, opacity: 0, yPercent: -50 },
            {
              y: 160,
              opacity: 1,
              yPercent: -50,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.08,
            },
            "-=0.6",
          );
      });

      // ── Mobile Animations (below lg)
      mm.add("(max-width: 1023px)", () => {
        const entTl = gsap.timeline({ delay: 1.5 });
        entTl.fromTo(
          [
            textRef.current,
            text1Ref.current,
            videoWrapperRef.current,
            text2Ref.current,
            statsRef.current,
            statementRef.current,
          ],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        );
      });
    }, outerRef);

    return () => ctx.revert();
  }, []);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div ref={outerRef} className="lg:min-h-[200vh]">
      <div
        ref={stickyRef}
        className="relative lg:sticky lg:top-32 z-10 min-h-screen lg:h-screen w-full overflow-hidden bg-[#0a0a0a] flex flex-col lg:block px-6 pt-24 pb-12 lg:p-0"
      >
        <p
          ref={textRef}
          className="text-white lg:text-white/50 text-xs md:text-xs font-semibold tracking-[0.3em] uppercase z-10 mb-2 lg:mb-0 lg:absolute lg:top-[unset] lg:left-[20%] lg:w-[30%]"
        >
          We are <span className="hidden lg:inline">a</span>
        </p>

        {/* ── TOP WORD: Animated list ── */}
        <h1
          ref={text1Ref}
          className="relative lg:absolute z-10 text-white select-none uppercase m-0 p-0 leading-none text-left lg:text-center w-full flex justify-start lg:justify-center mb-6 lg:mb-0 lg:top-[12%] lg:left-0 whitespace-nowrap"
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(50px, 15vw, 200px)",
            letterSpacing: "-0.03em",
          }}
        >
          <div className="relative h-[1em] overflow-hidden w-full text-left lg:text-center">
            {words.map((word, index) => (
              <div
                key={word}
                className="absolute top-0 left-0 w-full text-left lg:text-center transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)]"
                style={{
                  transform: `translateY(${(index - currentWord) * 100}%)`,
                  opacity:
                    Math.abs(index - currentWord) > 1
                      ? 0
                      : index === currentWord
                        ? 1
                        : 0,
                }}
              >
                {word}
              </div>
            ))}
          </div>
        </h1>

        {/* ── VIDEO ── */}
        <div
          ref={videoWrapperRef}
          className="relative lg:absolute z-20 overflow-hidden bg-black cursor-pointer group mb-4 lg:mb-0 lg:top-1/2 lg:left-1/2 w-full lg:w-[clamp(350px,50vw,300px)] aspect-[16/10] rounded lg:rounded-[4px]"
          style={{
            boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
          }}
          onClick={toggleVideo}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            src="/videos/hero-bg.mp4"
          />
          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            {isPlaying ? (
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 text-white ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>
        </div>

        {/* ── BOTTOM WORD: AGENCY ── */}
        <div
          className="flex flex-col items-end w-full mb-12 lg:mb-0 lg:absolute lg:bottom-[8%] lg:left-0 z-10"
          ref={text2Ref}
        >
          <h1
            className="text-white select-none uppercase m-0 p-0 leading-none text-right lg:text-center w-full"
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(50px, 15vw, 200px)",
              letterSpacing: "-0.03em",
              whiteSpace: "nowrap",
            }}
          >
            AGENCY
          </h1>
          {/* <span className="lg:hidden text-white font-medium tracking-[0.2em] text-sm mt-1">
            EVER
          </span> */}
        </div>

        {/* ── Left side Stats ── */}
        <div
          ref={statsRef}
          className="relative lg:absolute z-30 flex flex-col gap-3 md:gap-3 mb-10 lg:mb-0 lg:top-1/2 lg:left-[clamp(20px,4vw,20px)] w-full lg:w-auto"
        >
          {[
            { num: "9+", label: "YEARS" },
            { num: "500+", label: "PROJECTS" },
            { num: "99%", label: "CLIENT SATISFACTION" },
          ].map(({ num, label }) => (
            <div
              key={label}
              className="flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-0"
            >
              <span className="text-white text-lg lg:text-xl font-bold leading-none w-14 lg:w-auto text-left">
                {num}
              </span>
              <span className="text-white/80 lg:text-white/50 text-[10px] lg:text-[11px] tracking-[0.15em] uppercase">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Right side Statement ── */}
        <div
          ref={statementRef}
          className="relative lg:absolute z-30 w-full lg:max-w-[280px] lg:top-1/2 lg:right-[clamp(20px,4vw,20px)] lg:text-right"
        >
          <p className="text-[11px] lg:text-xs font-medium tracking-[0.15em] leading-relaxed text-white/80 lg:text-white/60 uppercase text-left lg:text-right">
            <strong className="text-white not-italic block mb-2 font-bold">
              <span className="lg:hidden">
                WE DON'T BELIEVE IN ONE-SIZE-FITS-ALL SOLUTIONS.
              </span>
              <span className="hidden lg:inline">
                EVERY BRAND HAS ITS OWN STORY
              </span>
            </strong>
            <span className="lg:hidden">
              EVERY BRAND HAS ITS OWN STORY. OUR JOB IS TO ALIGN STRATEGY.
            </span>
            <span className="hidden lg:inline">
              We Build, Manage, and Grow Brands That Command Attention
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
