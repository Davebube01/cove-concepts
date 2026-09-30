'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { revealIn } from '@/lib/motion';

const WHATSAPP_URL = 'https://wa.me/2347034405230';
const INSTAGRAM_URL = 'https://instagram.com/cove_concept';
const FACEBOOK_URL = 'https://facebook.com/cove_concept';

// lucide-react dropped brand/logo icons, so these are hand-drawn to match its
// stroke style (currentColor, strokeWidth 2) rather than pulling in a whole
// separate icon package for two glyphs.
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!isValid) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
  };

  useEffect(() => {
    if (!innerRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      revealIn(innerRef.current, { start: 'top 90%' });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" ref={sectionRef} className="footer-section relative bg-cove-black overflow-hidden">
      <div ref={innerRef} className="footer-inner">
        {/* Main Contact Area */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-32">
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
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Email</p>
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
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Phone</p>
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
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Location</p>
                    <p className="text-white">Abuja, Nigeria</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-10 flex items-center gap-4">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="w-10 h-10 flex items-center justify-center border border-white/10 text-white/50 hover:text-cove-red hover:border-cove-red/30 transition-all"
                >
                  <InstagramIcon />
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  className="w-10 h-10 flex items-center justify-center border border-white/10 text-white/50 hover:text-cove-red hover:border-cove-red/30 transition-all"
                >
                  <FacebookIcon />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with us on WhatsApp"
                  className="w-10 h-10 flex items-center justify-center border border-white/10 text-white/50 hover:text-cove-red hover:border-cove-red/30 transition-all"
                >
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>

            {/* Right: Email Capture */}
            <div className="flex flex-col justify-center">
              <p className="text-white/60 text-sm mb-6">
                Subscribe to receive updates, insights, and creative inspiration directly to your inbox.
              </p>
              {status === 'success' ? (
                <p className="text-white border border-cove-red/30 bg-cove-red/5 px-6 py-4 text-sm">
                  Thanks for subscribing — you&apos;re on the list.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} noValidate>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      placeholder="Enter your email"
                      aria-invalid={status === 'error'}
                      className={`flex-1 bg-white/5 border px-6 py-4 text-white placeholder:text-white/30 focus:outline-none transition-colors ${
                        status === 'error' ? 'border-cove-red' : 'border-white/10 focus:border-cove-red/50'
                      }`}
                    />
                    <button type="submit" className="btn-cove whitespace-nowrap">
                      Subscribe
                    </button>
                  </div>
                  {status === 'error' && (
                    <p className="text-cove-red text-xs mt-3">
                      Please enter a valid email address.
                    </p>
                  )}
                </form>
              )}
              <p className="text-white/50 text-xs mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-xs">
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
