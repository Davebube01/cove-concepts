'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Target,
  TrendingUp,
  Award,
  Users,
  Shield,
  Palette,
  LayoutGrid,
  Fingerprint,
  Clapperboard,
  Wand2,
  Megaphone,
} from 'lucide-react';
import { revealEach } from '@/lib/motion';

const reasons = [
  {
    icon: Target,
    title: 'All-in-One Creative & Digital Solution',
    desc: 'Strategy, design, content, and management — all under one roof. No need to juggle multiple agencies.',
  },
  {
    icon: TrendingUp,
    title: 'Consistent & Structured Content Delivery',
    desc: 'Our systems ensure your brand stays active and visible with regular, high-quality content output.',
  },
  {
    icon: Award,
    title: 'High-Quality Design',
    desc: 'Every pixel is intentional. We craft visuals that speak your brand language and captivate audiences.',
  },
  {
    icon: Users,
    title: 'Results-Driven Approach',
    desc: 'We focus on metrics that matter — engagement, growth, and conversion — not just aesthetics.',
  },
  {
    icon: Shield,
    title: 'Reliable Team',
    desc: "A dedicated team of creatives and strategists committed to your brand's long-term success.",
  },
];

// The words shown on the glass panels, replacing the old orbital-drag effect.
const glassWords = ['Collaborative', 'Scalable', 'Strategy', 'Reliable', 'Professional Team'];

// "Our Core Skill" — replaces the old "Core Standards" block, reusing its
// icon/title/desc card layout. Also stands in for the old standalone
// "Our Core Skills" section (Services.tsx), which is no longer rendered.
const coreSkills = [
  {
    icon: Palette,
    title: 'Creative Direction',
    desc: 'We shape the visual and strategic direction behind every brand touchpoint, from concept to execution.',
  },
  {
    icon: LayoutGrid,
    title: 'UI/UX Design',
    desc: 'We design intuitive, engaging interfaces that make digital products easy to use and hard to forget.',
  },
  {
    icon: Fingerprint,
    title: 'Branding Strategy',
    desc: 'We build brand identities and positioning that help you stand out and stay memorable.',
  },
  {
    icon: Clapperboard,
    title: 'Video Editing',
    desc: 'We cut and craft video content that holds attention and tells your story with impact.',
  },
  {
    icon: Wand2,
    title: 'Motion Design',
    desc: 'We bring static ideas to life with animation that adds energy and polish to every frame.',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    desc: 'We plan and run campaigns that turn visibility into measurable growth across platforms.',
  },
];

export default function WhyChoose() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemsRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      revealEach(Array.from(itemsRef.current!.children));
      if (glassRef.current) {
        revealEach(Array.from(glassRef.current.children));
      }
      revealEach(gsap.utils.toArray<HTMLElement>('.values-grid .value-card'));
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-cove-black py-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-cove-red text-sm uppercase tracking-[0.15em] mb-4 font-inter">
            Why Cove
          </p>
          <h2 className="font-clash text-3xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight">
            Why Choose Us
          </h2>
        </div>

        {/* Glass panels */}
        <div
          ref={glassRef}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-16 md:mb-20"
        >
          {glassWords.map((word) => (
            <div
              key={word}
              className="px-6 py-4 md:px-8 md:py-5 bg-white/[0.06] backdrop-blur-md border border-white/15 hover:border-cove-red/40 hover:bg-white/[0.1] transition-colors duration-300"
            >
              <span className="font-clash text-xl md:text-3xl font-semibold text-white whitespace-nowrap">
                {word}
              </span>
            </div>
          ))}
        </div>

        {/* Reasons Grid */}
        <div ref={itemsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="value-card group"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center mb-4 md:mb-6 border border-cove-red/30 bg-cove-red/5 group-hover:bg-cove-red/10 transition-colors">
                  <Icon size={24} className="text-cove-red" />
                </div>
                <h3 className="font-clash text-lg font-semibold text-white mb-3 leading-tight">
                  {reason.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Our Core Skill */}
        <div id="services" className="mt-20 md:mt-40 scroll-mt-24">
          <div className="mb-10 md:mb-20">
            <h2
              className="font-clash font-black uppercase text-white leading-[0.85] tracking-tight"
              style={{ fontSize: 'clamp(50px, 12vw, 180px)' }}
            >
              OUR CORE SKILLS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 md:gap-y-16 values-grid">
            {coreSkills.map((skill) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.title}
                  className="value-card group flex flex-col transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 flex items-center justify-center mb-6 border border-white/15 transition-colors duration-300 group-hover:border-cove-red/40 group-hover:bg-cove-red/5">
                    <Icon
                      size={26}
                      className="text-white transition-all duration-300 group-hover:scale-110 group-hover:text-cove-red"
                    />
                  </div>
                  <h3 className="font-clash text-[22px] md:text-2xl font-semibold text-white mb-3">
                    {skill.title}
                  </h3>
                  <p className="text-[#a1a1a1] text-[15px] leading-relaxed max-w-[95%]">
                    {skill.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
