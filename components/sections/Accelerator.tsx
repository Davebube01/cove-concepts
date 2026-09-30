'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Check, Zap, Calendar, BarChart3, FileText, Video, Share2 } from 'lucide-react';
import Image from 'next/image';
import { revealEach } from '@/lib/motion';

export default function Accelerator() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      revealEach(Array.from(contentRef.current!.children), { stagger: 0.15 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const engineFeatures = [
    { icon: Calendar, text: 'Monthly content strategy and calendar' },
    { icon: FileText, text: 'Graphic designs and visual assets' },
    { icon: Video, text: 'Video and motion content' },
    { icon: Share2, text: 'Social media posting and management' },
    { icon: BarChart3, text: 'Performance tracking and analytics reports' },
  ];

  const engineOutcomes = [
    'Consistent brand visibility',
    'Improved engagement',
    'Structured growth',
    'No stress managing multiple creatives',
  ];

  return (
    <section ref={sectionRef} className="relative bg-cove-black py-20 md:py-32 overflow-hidden">
      {/* Cove Content Engine Section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Image */}
          <div className="relative">
            <Image
              src="/images/accelerator.jpg"
              alt="Cove Content Engine"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cove-black via-transparent to-transparent" />
          </div>

          {/* Right: Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cove-red/10 border border-cove-red/20 mb-6">
              <Zap size={16} className="text-cove-red" />
              <span className="text-cove-red text-xs uppercase tracking-[0.15em] font-medium">
                Signature Solution
              </span>
            </div>

            <h2 className="font-clash text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-6">
              COVE CONTENT ENGINE<sup className="text-cove-red text-lg">TM</sup>
            </h2>

            <p className="text-white/60 text-base leading-relaxed mb-8">
              A monthly subscription-based system designed to handle your brand&apos;s entire creative and digital presence.
            </p>

            {/* What It Includes */}
            <div className="mb-8">
              <h4 className="font-clash text-sm uppercase tracking-[0.1em] text-white/80 mb-4">
                What It Includes
              </h4>
              <div className="space-y-3">
                {engineFeatures.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.text} className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-cove-red/10">
                        <Icon size={14} className="text-cove-red" />
                      </div>
                      <span className="text-white/70 text-sm">{feature.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Outcome */}
            <div className="border border-cove-red/20 bg-cove-red/5 p-6">
              <h4 className="font-clash text-sm uppercase tracking-[0.1em] text-cove-red mb-4">
                The Outcome
              </h4>
              <div className="space-y-2">
                {engineOutcomes.map((outcome) => (
                  <div key={outcome} className="flex items-center gap-2">
                    <Check size={14} className="text-cove-red flex-shrink-0" />
                    <span className="text-white/80 text-sm">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
