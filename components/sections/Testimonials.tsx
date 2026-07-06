"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          }
        });

        tl.fromTo(
          ".testimonial-header",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        )
        .fromTo(
          ".testimonial-img",
          { opacity: 0, x: -50, scale: 0.9 },
          { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ".testimonial-content",
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextTestimonial = () => {
    if (!containerRef.current) return;
    
    gsap.to(containerRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.3,
      onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
        );
      }
    });
  };

  const prevTestimonial = () => {
    if (!containerRef.current) return;
    
    gsap.to(containerRef.current, {
      opacity: 0,
      x: 20,
      duration: 0.3,
      onComplete: () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
        );
      }
    });
  };

  const current = testimonials[currentIndex];
  // Parse company name from role (e.g. "CEO, Elevate Ventures" -> "Elevate Ventures")
  const roleParts = current.role.split(',');
  const companyName = roleParts.length > 1 ? roleParts[1].trim() : "monosen";

  return (
    <section ref={sectionRef} className="relative bg-[#0a0a0a] py-32 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

         {/* Section Header */}
        <div className="text-center mb-20 testimonial-header">
          <p className="text-cove-red text-sm uppercase tracking-[0.15em] mb-4 font-inter">
            Testimonials
          </p>
          <h2 className="font-clash text-3xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight">
            What Our Clients Say
          </h2>
        </div>
        
        <div ref={containerRef} className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          
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
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 hover:border-white/30 transition-all"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 hover:border-white/30 transition-all"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
