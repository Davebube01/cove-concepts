'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, TrendingUp, Award, Users, Shield } from 'lucide-react';

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

const coreValues = [
  {
    title: 'Strategy First',
    desc: 'We align creativity with business objectives to ensure every decision supports measurable growth.',
    icon: () => (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 20C18 26.6274 12.6274 32 6 32V8C12.6274 8 18 13.3726 18 20Z" fill="#D9D9D9"/>
        <path d="M22 20C22 13.3726 27.3726 8 34 8V32C27.3726 32 22 26.6274 22 20Z" fill="#D9D9D9"/>
      </svg>
    )
  },
  {
    title: 'Over Complexity',
    desc: 'We simplify systems, interfaces, and brand communication to make complex ideas easy to understand.',
    icon: () => (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 8L8 20L20 32V8Z" fill="#D9D9D9"/>
        <path d="M32 8L20 20L32 32V8Z" fill="#D9D9D9"/>
      </svg>
    )
  },
  {
    title: 'Scalable Systems',
    desc: 'We design solutions that can adapt and expand as your business grows, ensuring long-term sustainability.',
    icon: () => (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="12" stroke="#D9D9D9" strokeWidth="2.5"/>
        <path d="M8 20H32" stroke="#D9D9D9" strokeWidth="2.5"/>
        <path d="M8 20A12 12 0 0 1 32 20H8Z" fill="#D9D9D9"/>
      </svg>
    )
  },
  {
    title: 'Creativity',
    desc: 'Our work is measured by impact, combining aesthetics with purpose to deliver memorable experiences.',
    icon: () => (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="14" stroke="#D9D9D9" strokeWidth="2.5"/>
        <rect x="14" y="14" width="12" height="12" fill="#D9D9D9"/>
      </svg>
    )
  },
  {
    title: 'Execution',
    desc: 'We relentlessly pursue quality and precision in every project, turning bold ideas into reality.',
    icon: () => (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="24" r="10" stroke="#D9D9D9" strokeWidth="2.5"/>
        <circle cx="24" cy="16" r="10" fill="#D9D9D9"/>
      </svg>
    )
  },
  {
    title: 'Collaborative',
    desc: 'We operate as an extension of your team, fostering open communication and shared goals.',
    icon: () => (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 20H8C8 13.3726 13.3726 8 20 8V20Z" fill="#D9D9D9"/>
        <path d="M20 20H32C32 26.6274 26.6274 32 20 32V20Z" fill="#D9D9D9"/>
        <path d="M20 20V8C26.6274 8 32 13.3726 32 20H20Z" fill="#D9D9D9"/>
        <path d="M20 20V32C13.3726 32 8 26.6274 8 20H20Z" fill="#D9D9D9"/>
      </svg>
    )
  }
];

export default function WhyChoose() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!itemsRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemsRef.current!.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.value-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.values-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.mission-card',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.mission-vision-container',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Orbital Animation Logic
  useEffect(() => {
    if (window.innerWidth < 768) return;
    
    const orbitContainer = orbitRef.current;
    if (!orbitContainer) return;
    const container = orbitContainer;

    // Use Core Values for the orbital text
    const textList = coreValues.map(v => v.title.split(' ')[0]); // Takes the first word for clean orbit
    const options = { radiusX: 350, radiusY: 150, speed: 0.005, spacing: 1.3 };
    let angle = 0;
    let isDragging = false;
    let startX = 0;

    function toRad(deg: number) {
      return deg * (Math.PI / 180);
    }

    function createLightning(startEl: Element, endEl: Element) {
      const svg = document.getElementById('lightning-svg-why');
      if (!svg) return;
      const rectS = startEl.getBoundingClientRect();
      const rectE = endEl.getBoundingClientRect();
      const sx = rectS.left + rectS.width / 2;
      const sy = rectS.top + rectS.height / 2;
      const ex = rectE.left + rectE.width / 2;
      const ey = rectE.top + rectE.height / 2;

      let d = `M ${sx} ${sy}`;
      for (let i = 1; i <= 4; i++) {
        const x1 = sx + (ex - sx) * (i / 5);
        const y1 = sy + (ey - sy) * (i / 5);
        const x2 = x1 + (Math.random() - 0.5) * 40;
        const y2 = y1 + (Math.random() - 0.5) * 40;
        d += ` L ${x2} ${y2}`;
        d += ` L ${sx + (ex - sx) * ((i + 1) / 5)} ${sy + (ey - sy) * ((i + 1) / 5)}`;
      }

      svg.innerHTML += `<path d="${d}" fill="none" stroke="#ff3b30" stroke-width="2" style="filter: url(#glow-why); opacity: 0.8;" />`;
    }

    let animationId: number;
    function animate() {
      if (!isDragging) {
        angle += options.speed;
      }

      const svg = document.getElementById('lightning-svg-why');
      if (svg) svg.innerHTML = '';

      const center = document.getElementById('center-point-why');

      textList.forEach((text, i) => {
        const theta = toRad(i * (360 / textList.length) + angle * 50);
        const x = options.radiusX * Math.cos(theta * options.spacing);
        const y = options.radiusY * Math.sin(theta);
        const z = Math.sin(theta);

        let el = document.getElementById(`orb-why-${i}`);
        if (!el) {
          el = document.createElement('div');
          el.id = `orb-why-${i}`;
          el.className = 'orbital-char absolute font-clash text-2xl md:text-4xl text-white font-bold whitespace-nowrap cursor-default pointer-events-none select-none';
          el.textContent = text;
          container.appendChild(el);
        }

        el.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
        el.style.opacity = `${(z + 100) / 200}`;

        if (center && Math.random() > 0.95) {
          createLightning(center, el);
        }
      });

      animationId = requestAnimationFrame(animate);
    }

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const delta = e.clientX - startX;
      startX = e.clientX;
      angle += delta * 0.005;
    };
    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch support
    const handleTouchStart = (e: TouchEvent) => {
      isDragging = true;
      startX = e.touches[0].clientX;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const delta = e.touches[0].clientX - startX;
      startX = e.touches[0].clientX;
      angle += delta * 0.005;
    };
    const handleTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      
      // Cleanup dynamically created elements
      textList.forEach((_, i) => {
        const el = document.getElementById(`orb-why-${i}`);
        if (el) el.remove();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-cove-black py-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center mb-6">
          <p className="text-cove-red text-sm uppercase tracking-[0.15em] mb-4 font-inter">
            Why Cove
          </p>
          <h2 className="font-clash text-3xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight">
            Why Choose Us
          </h2>
        </div>

        {/* Electric Orbital Concept (Imported from Services) */}
        <div
          ref={orbitRef}
          className="hidden md:flex relative w-full h-[500px] items-center justify-center mb-20 cursor-grab active:cursor-grabbing"
        >
          {/* Center Point */}
          <div
            id="center-point-why"
            className="absolute w-4 h-4 bg-cove-red rounded-full"
            style={{ boxShadow: '0 0 30px #ff3b30, 0 0 60px rgba(255, 59, 48, 0.3)' }}
          />

          {/* SVG Lightning Layer */}
          <svg
            id="lightning-svg-why"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 5 }}
          >
            <defs>
              <filter id="glow-why">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>
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
                <div className="w-14 h-14 flex items-center justify-center mb-6 border border-cove-red/30 bg-cove-red/5 group-hover:bg-cove-red/10 transition-colors">
                  <Icon size={24} className="text-cove-red" />
                </div>
                <h3 className="font-clash text-lg font-semibold text-white mb-3 leading-tight">
                  {reason.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Core Standards */}
        <div className="mt-40">
          <div className="mb-20">
            <h2 
              className="font-clash font-black uppercase text-white leading-[0.85] tracking-tight" 
              style={{ fontSize: 'clamp(50px, 12vw, 180px)' }}
            >
              CORE STANDARDS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 values-grid">
            {coreValues.map((value) => (
              <div key={value.title} className="value-card flex flex-col">
                <div className="mb-6">
                  <value.icon />
                </div>
                <h3 className="font-clash text-[22px] md:text-2xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-[#a1a1a1] text-[15px] leading-relaxed max-w-[95%]">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-12 mission-vision-container">
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
      </div>
    </section>
  );
}
