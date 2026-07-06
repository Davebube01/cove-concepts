'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Star, Building2 } from 'lucide-react';

const plans = [
  {
    name: 'STARTER PLAN',
    price: '₦150,000',
    period: '/ month',
    featured: false,
    features: [
      '12 posts per month',
      'Basic graphics',
      '1 platform management',
      'Monthly content calendar',
      'Basic analytics report',
    ],
    cta: 'Get Started',
  },
  {
    name: 'GROWTH PLAN',
    price: '₦300,000',
    period: '/ month',
    featured: true,
    features: [
      '20-25 posts per month',
      'Premium graphics & designs',
      'Up to 2 platform management',
      'Advanced analytics report',
      'Monthly strategy session',
      'Video content (2-3 per month)',
    ],
    cta: 'Most Popular',
  },
  {
    name: 'DOMINANCE PLAN',
    price: '₦600,000',
    period: '/ month',
    featured: false,
    features: [
      '30+ posts per month',
      'Advanced video & motion content',
      'Multiple platform management',
      'Weekly analytics reports',
      'Bi-weekly consultation',
      'Priority support',
      'Brand strategy oversight',
    ],
    cta: 'Go Pro',
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!cardsRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        gsap.fromTo(
          cardsRef.current!.children,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="relative bg-cove-black py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-cove-red text-sm uppercase tracking-[0.15em] mb-4 font-inter">
            Pricing
          </p>
          <h2 className="font-clash text-3xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
            Monthly Retainer Plans
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Choose the plan that fits your brand&apos;s needs. All plans include access to the COVE CONTENT ENGINE<sup className="text-cove-red">TM</sup>.
          </p>
        </div>

        {/* Pricing Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card ${plan.featured ? 'featured' : ''} relative`}
            >
              {plan.featured && (
                <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-cove-red to-transparent" />
              )}

              <div className="flex items-center gap-2 mb-6">
                {plan.featured && <Star size={16} className="text-cove-red" />}
                <h3 className="font-clash text-sm uppercase tracking-[0.1em] text-white/60">
                  {plan.name}
                </h3>
              </div>

              <div className="mb-8">
                <span className="font-clash text-4xl md:text-5xl font-semibold text-white">
                  {plan.price}
                </span>
                <span className="text-white/40 text-sm ml-1">{plan.period}</span>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check size={16} className="text-cove-red flex-shrink-0 mt-0.5" />
                    <span className="text-white/60 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-4 text-sm font-medium uppercase tracking-widest transition-all duration-200 ${
                  plan.featured
                    ? 'bg-cove-red text-white hover:bg-white hover:text-cove-black'
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white hover:text-cove-black hover:border-white'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Custom Enterprise Plan */}
        <div className="pricing-card flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-cove-red/10">
              <Building2 size={24} className="text-cove-red" />
            </div>
            <div>
              <h3 className="font-clash text-xl font-semibold text-white mb-1">
                CUSTOM ENTERPRISE PLAN
              </h3>
              <p className="text-white/50 text-sm">
                Tailored solutions for large organizations with specific needs
              </p>
            </div>
          </div>
          <button className="btn-cove-outline whitespace-nowrap">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
