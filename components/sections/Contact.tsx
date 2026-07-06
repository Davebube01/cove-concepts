'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Globe, MessageCircle, Briefcase } from 'lucide-react';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!innerRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          toggleActions: 'play none none reverse',
        },
      });

      tl.from(innerRef.current, {
        scale: 2,
        rotationX: 70,
        y: '-100%',
        transformOrigin: '50% 0%',
        ease: 'power2.out',
        duration: 1.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" ref={sectionRef} className="footer-section relative bg-cove-black overflow-hidden">
      <div ref={innerRef} className="footer-inner">
        {/* Main Contact Area */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Contact Info */}
            <div>
              <p className="text-cove-red text-sm uppercase tracking-[0.15em] mb-4 font-inter">
                Get In Touch
              </p>
              <h2 className="font-clash text-3xl md:text-5xl font-semibold text-white leading-tight mb-10">
                Let&apos;s Build Something<br />
                <span className="text-cove-red">Extraordinary</span>
              </h2>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-cove-red/10">
                    <Mail size={18} className="text-cove-red" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Email</p>
                    <a href="mailto:info@coveconcept.com" className="text-white hover:text-cove-red transition-colors">
                      info@coveconcept.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-cove-red/10">
                    <Phone size={18} className="text-cove-red" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Phone</p>
                    <a href="tel:+2347034405230" className="text-white hover:text-cove-red transition-colors">
                      +234 703 440 5230
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-cove-red/10">
                    <MapPin size={18} className="text-cove-red" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Location</p>
                    <p className="text-white">Abuja, Nigeria</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-10 flex items-center gap-4">
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center border border-white/10 text-white/50 hover:text-cove-red hover:border-cove-red/30 transition-all"
                >
                  <Globe size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center border border-white/10 text-white/50 hover:text-cove-red hover:border-cove-red/30 transition-all"
                >
                  <MessageCircle size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center border border-white/10 text-white/50 hover:text-cove-red hover:border-cove-red/30 transition-all"
                >
                  <Briefcase size={18} />
                </a>
              </div>
            </div>

            {/* Right: Email Capture */}
            <div className="flex flex-col justify-center">
              <p className="text-white/60 text-sm mb-6">
                Subscribe to receive updates, insights, and creative inspiration directly to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white/5 border border-white/10 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-cove-red/50 transition-colors"
                />
                <button className="btn-cove whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-white/30 text-xs mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs">
              &copy; {new Date().getFullYear()} Cove Concept Innovations LTD. All rights reserved.
            </p>
            <p className="text-white/50 text-xs font-clash tracking-wide">
              Cove Concept Innovations LTD — Building Brands That Stay Seen.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
