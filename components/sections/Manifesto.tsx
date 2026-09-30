"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { MOTION, revealEach, revealIn } from "@/lib/motion";

export default function Manifesto() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const aboutLabelRef = useRef<HTMLParagraphElement>(null);
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const p2Ref = useRef<HTMLParagraphElement>(null);
  
  const partnersRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);

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
      // Image slides in from the left, text from the right (from below on mobile).
      // Time-based and played once, so the section is never an empty pinned screen.
      revealIn(imageColRef.current, { from: { x: -60 } });
      [aboutLabelRef.current, p1Ref.current, p2Ref.current].forEach((el, i) =>
        revealIn(el, { from: { x: 60 }, delay: i * MOTION.stagger }),
      );

      // Mission & Vision
      if (missionRef.current) {
        revealEach(gsap.utils.toArray<HTMLElement>(".mission-card", missionRef.current), {
          from: { x: -30 },
          stagger: 0.15,
        });
      }

      // Partner headline + stat cards
      if (partnersRef.current) {
        revealEach(gsap.utils.toArray<HTMLElement>(".partner-animate", partnersRef.current));
      }
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <section id="manifesto" className="relative bg-cove-black text-white">
      {/* About Us */}
      <div
        ref={wrapperRef}
        className="relative w-full overflow-hidden flex items-center justify-center px-6 md:px-10 py-16 md:py-32"
      >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Image */}
          <div ref={imageColRef} className="relative w-full aspect-square md:aspect-[4/3] overflow-hidden group">
            <Image 
              src="/images/about_cove.png"
              alt="Cove Concept Workspace"
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

      {/* Mission & Vision */}
      <div
        ref={missionRef}
        className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12"
      >
        <div className="mission-card border-l-2 border-cove-red pl-8">
          <p className="text-cove-red text-sm uppercase tracking-[0.15em] mb-4 font-inter">
            Our Mission
          </p>
          <p className="font-clash text-2xl md:text-3xl font-semibold text-white leading-snug">
            To help brands grow, scale, and dominate their space through consistent, strategic, and high-quality creative execution.
          </p>
        </div>
        <div className="mission-card border-l-2 border-white/20 pl-8">
          <p className="text-white/50 text-sm uppercase tracking-[0.15em] mb-4 font-inter">
            Our Vision
          </p>
          <p className="font-clash text-2xl md:text-3xl font-semibold text-white leading-snug">
            To become a leading creative and digital growth partner for businesses across Africa and beyond, known for excellence, innovation, and measurable impact.
          </p>
        </div>
      </div>

      {/* Partners / Stats Content */}
      {/* <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pb-20 md:pb-48 pt-8 md:pt-20">
        <div className="w-full h-[1px] bg-white/10 mb-12 md:mb-32" />

        <div ref={partnersRef} className="w-full">
          <div className="partner-animate mb-12 md:mb-32">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight max-w-2xl tracking-tight text-white">
              Partnering with startups and tech teams shaping the future.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="partner-animate flex flex-col gap-8 bg-white/5 p-8 border border-white/5 hover:bg-white/10 transition-colors duration-500"
              >
        
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
      </div> */}
    </section>
  );
}
