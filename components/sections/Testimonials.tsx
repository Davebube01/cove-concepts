"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { prefersReducedMotion, revealIn } from "@/lib/motion";

// Keep exactly as user had it
const testimonials = [
  {
    quote:
      "Cove Concept Innovations transformed our brand completely. Their strategic approach to design and content has increased our online engagement by over 300%. They're not just a service provider — they're true partners in growth.",
    author: "Sarah Mitchell",
    role: "CEO, Elevate Ventures",
  },
  {
    quote:
      "The COVE CONTENT ENGINE is a game-changer. Having one team handle everything from strategy to execution means our brand message stays consistent across all channels. Our social media following has doubled in just three months.",
    author: "David Okonkwo",
    role: "Founder, NxtGen Tech Solutions",
  },
  {
    quote:
      "Working with Cove has been transformative for our business. Their team understood our vision immediately and delivered designs that truly capture who we are. The quality of their work speaks for itself.",
    author: "Amara Diallo",
    role: "Creative Director, Lumina Studios",
  },
];

const fallbackImages = [
  "/images/testimonials/1.jpg",
  "/images/testimonials/2.jpg",
  "/images/testimonials/3.jpg"
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAnimating = useRef(false);
  const touchStartX = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      revealIn(section.querySelector(".testimonial-header"));
      revealIn(section.querySelector(".testimonial-img"), { from: { x: -50 } });
      revealIn(section.querySelector(".testimonial-content"), { from: { x: 50 }, delay: 0.12 });
    }, section);

    return () => ctx.revert();
  }, []);

  // dir: 1 = forward (content exits left), -1 = back (exits right)
  const goTo = (index: number, dir: 1 | -1) => {
    const el = containerRef.current;
    if (!el || isAnimating.current || index === currentIndex) return;

    if (prefersReducedMotion()) {
      setCurrentIndex(index);
      return;
    }

    isAnimating.current = true;
    gsap.to(el, {
      opacity: 0,
      x: -20 * dir,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setCurrentIndex(index);
        gsap.fromTo(
          el,
          { opacity: 0, x: 20 * dir },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              isAnimating.current = false;
            },
          },
        );
      },
    });
  };

  const nextTestimonial = () => goTo((currentIndex + 1) % testimonials.length, 1);
  const prevTestimonial = () =>
    goTo((currentIndex - 1 + testimonials.length) % testimonials.length, -1);

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) nextTestimonial();
    else prevTestimonial();
  };

  const current = testimonials[currentIndex];
  // Parse company name from role (e.g. "CEO, Elevate Ventures" -> "Elevate Ventures")
  const roleParts = current.role.split(',');
  const companyName = roleParts.length > 1 ? roleParts[1].trim() : "monosen";

  return (
    <section ref={sectionRef} className="relative bg-[#0a0a0a] py-20 md:py-32 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

         {/* Section Header */}
        <div className="text-center mb-12 md:mb-20 testimonial-header">
          <p className="text-cove-red text-sm uppercase tracking-[0.15em] mb-4 font-inter">
            Testimonials
          </p>
          <h2 className="font-clash text-3xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight">
            What Our Clients Say
          </h2>
        </div>
        
        <div
          ref={containerRef}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={handleTouchEnd}
          className="flex flex-col md:flex-row items-center gap-12 md:gap-24 touch-pan-y"
        >
          
          {/* ── LEFT: Image & Circular Outlines ── */}
          <div className="relative w-full max-w-[320px] md:max-w-[400px] shrink-0 testimonial-img">
            {/* The intersecting circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square border border-white/10 rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-[80%] -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square border border-white/10 rounded-full pointer-events-none hidden md:block" />
            
            {/* The Image */}
            <div className="relative w-full aspect-square bg-[#1a1a1a] z-10">
              <Image 
                src={fallbackImages[currentIndex]}
                alt={current.author}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* ── RIGHT: Content ── */}
          <div className="flex-1 flex flex-col justify-center testimonial-content">
            
            {/* Company Name */}
            {/* <h3 className="text-white text-2xl md:text-xl font-semibold mb-8 md:mb-12 lowercase" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.03em" }}>
              {companyName}
            </h3> */}
            
            {/* Large Quote */}
            <p className="text-white text-2xl md:text-xl lg:text-[30px] font-medium leading-[1.3] mb-12 md:mb-20">
              {current.quote}
            </p>
            
            {/* Bottom Row: Author details & Navigation */}
            <div className="flex items-end justify-between w-full">
              <div>
                <p className="text-white font-bold text-lg mb-1">
                  {current.author}
                </p>
                <p className="text-white/50 text-[11px] md:text-xs uppercase tracking-[0.1em]">
                  {current.role}
                </p>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={prevTestimonial}
                  className="w-11 h-11 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 hover:border-white/30 transition-all"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="w-11 h-11 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 hover:border-white/30 transition-all"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Mobile position dots (swipe or tap) */}
        <div className="mt-10 flex justify-center md:hidden">
          {testimonials.map((t, i) => (
            <button
              key={t.author}
              onClick={() => goTo(i, i > currentIndex ? 1 : -1)}
              aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
              aria-current={i === currentIndex}
              className="p-3"
            >
              <span
                className={`block h-2 w-2 rounded-full transition-colors duration-300 ${
                  i === currentIndex ? "bg-cove-red" : "bg-white/25"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
