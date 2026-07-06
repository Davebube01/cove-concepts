"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const aboutLabelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const p2Ref = useRef<HTMLParagraphElement>(null);
  
  const partnersRef = useRef<HTMLDivElement>(null);

  const partners = [
    {
      name: "Walter.",
      stats: [
        { value: "200+", label: "Digital experiences built" },
        { value: "67%", label: "More qualified rate" },
      ],
    },
    {
      name: "monosen",
      stats: [
        { value: "200+", label: "Engaging user interfaces" },
        { value: "75%", label: "Higher retention rate" },
      ],
    },
    {
      name: "Overcut",
      stats: [
        { value: "80+", label: "Innovative solutions" },
        { value: "90%", label: "Conversion rate" },
      ],
    },
  ];

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      // Storytelling Scroll Sequence
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "+=150%", // Pin the section for 1.5x the viewport height
            pin: true,
            scrub: 1, // Smooth scrub
          },
        });

        tl.fromTo(
          imageColRef.current,
          { x: -100, opacity: 0, filter: "blur(10px)", scale: 0.9 },
          { x: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 1, ease: "power2.out" }
        )
        .fromTo(
          aboutLabelRef.current,
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          headingRef.current,
          { x: 100, opacity: 0, filter: "blur(5px)" },
          { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          p1Ref.current,
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          p2Ref.current,
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );
      });

      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          [imageColRef.current, aboutLabelRef.current, headingRef.current, p1Ref.current, p2Ref.current],
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.2,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // ── Partners content cascades in with a slight scale effect ───────
      if (partnersRef.current) {
        gsap.fromTo(
          gsap.utils.toArray('.partner-animate', partnersRef.current),
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: partnersRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <section id="manifesto" className="relative bg-cove-black text-white">
      {/* 
        Pinned About Us Section
      */}
      <div
        ref={wrapperRef}
        className="relative md:min-h-screen w-full overflow-hidden flex items-center justify-center px-6 md:px-10 py-16 md:py-0"
      >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Image */}
          <div ref={imageColRef} className="relative w-full aspect-square md:aspect-[4/3] rounded-xl overflow-hidden group">
            <Image 
              src="/images/about_cove.png"
              alt="Cove Concepts Workspace"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          </div>

          {/* Right Column: Text */}
          <div className="flex flex-col justify-center text-left">
            <p ref={aboutLabelRef} className="text-cove-red text-[11px] md:text-sm uppercase tracking-[0.15em] mb-4 md:mb-6 font-semibold">
              About Us
            </p>
            {/* <h2 ref={headingRef} className="font-clash text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-semibold text-white leading-tight mb-6 md:mb-10">
              We Build Powerful Brand Presence Through Strategy, Design, and Consistent Execution
            </h2> */}
            <p ref={p1Ref} className="text-white/60 text-sm md:text-lg leading-relaxed mb-6 md:mb-8">
              Cove Concept Innovations LTD is a creative and digital solutions
              company focused on building powerful brand presence through strategy,
              design, and consistent execution. We go beyond traditional design
              services. We partner with businesses to manage their entire creative
              and digital communication — ensuring their brand is not only visually
              appealing but consistently active, engaging, and growth-driven.
            </p>
            <p ref={p2Ref} className="text-white/60 text-sm md:text-lg leading-relaxed">
              By combining design excellence, content strategy, and social media
              management, we eliminate the need for multiple creatives and provide a
              unified system that drives visibility, engagement, and long-term brand
              growth.
            </p>
          </div>
        </div>
      </div>

      {/* Partners / Stats Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pb-32 md:pb-48 pt-20">
        <div className="w-full h-[1px] bg-white/10 mb-20 md:mb-32" />

        <div ref={partnersRef} className="w-full">
          {/* Headline */}
          <div className="partner-animate mb-20 md:mb-32">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight max-w-2xl tracking-tight text-white">
              Partnering with startups and tech teams shaping the future.
            </h2>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="partner-animate flex flex-col gap-8 bg-white/5 p-8 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors duration-500"
              >
                {/* Partner Name / Logo Placeholder */}
                <div className="flex items-center gap-3">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2L2 22H22L12 2Z" fill="#ff3b30" />
                  </svg>
                  <span className="text-xl font-semibold tracking-wide text-white">
                    {partner.name}
                  </span>
                </div>

                {/* Stats Pair */}
                <div className="grid grid-cols-2 gap-4">
                  {partner.stats.map((stat, sIndex) => (
                    <div key={sIndex} className="flex flex-col gap-2">
                      <span className="text-3xl md:text-4xl font-bold text-white">
                        {stat.value}
                      </span>
                      <span className="text-white/50 text-xs md:text-sm font-medium pr-4 leading-snug">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
