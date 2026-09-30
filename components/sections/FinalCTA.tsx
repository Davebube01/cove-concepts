'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { revealIn } from '@/lib/motion';

export default function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      revealIn(contentRef.current, { start: 'top 80%' });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="cta-section relative py-24 md:py-40 overflow-hidden">
      {/* Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255, 59, 48, 0.3) 0%, transparent 70%)',
        }}
      />

      <div ref={contentRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 text-center">
        <h2 className="font-clash text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight mb-8">
          Ready to Elevate<br />
          <span className="text-cove-red">Your Brand?</span>
        </h2>

        <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12">
          Let Cove Concept Innovations LTD handle your creative and digital presence while you focus on growing your business.
        </p>

        <button
          onClick={scrollToContact}
          className="btn-cove inline-flex items-center gap-3 text-base group"
        >
          Start Your Project Today
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
