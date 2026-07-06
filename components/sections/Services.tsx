"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  { name: "Creative Direction", image: "/images/services/creative.jpg" },
  { name: "UI/UX Design", image: "/images/services/uiux.jpg" },
  { name: "Branding Strategy", image: "/images/services/branding.jpg" },
  { name: "Video Editing", image: "/images/services/video.jpg" },
  { name: "Motion Design", image: "/images/services/motion.jpg" },
  { name: "Digital Marketing", image: "/images/services/marketing.jpg" },
];

function splitName(name: string): [string, string] {
  const idx = name.indexOf(" ");
  return idx === -1 ? [name, ""] : [name.slice(0, idx), name.slice(idx + 1)];
}

const ITEM_GAP = 50; 

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const list = listRef.current;
    if (!container || !list) return;

    let raf: number;
    let scrollHandler: () => void;

    const initAnimation = () => {
      // If mobile, reset and abort custom scroll logic
      if (window.innerWidth < 768) {
        container.style.height = "auto";
        return;
      }

      // Desktop logic
      const rows = Array.from(list.querySelectorAll<HTMLElement>("[data-svc-row]"));
      if (!rows.length) return;

      const firstRow = rows[0];
      const lastRow = rows[rows.length - 1];
      const center = window.innerHeight / 2;

      const itemsWrapper = list.querySelector<HTMLElement>("#services-items-wrapper");
      if (itemsWrapper) {
        itemsWrapper.style.marginTop = `${window.innerHeight * 0.3}px`;
      }

      const totalTravel = lastRow.offsetTop + lastRow.offsetHeight / 2 - center;
      container.style.height = `${window.innerHeight + totalTravel}px`;

      const sectionTop = container.getBoundingClientRect().top + window.scrollY;
      const threshold = firstRow.offsetHeight * 0.8 + ITEM_GAP;

      const applyState = (listY: number) => {
        rows.forEach((row) => {
          const itemScreenY = row.offsetTop + row.offsetHeight / 2 - listY;
          const dist = Math.abs(itemScreenY - center);
          
          let progress = 0;
          if (dist < 20) {
            progress = 1;
          } else {
            progress = Math.max(0, 1 - (dist - 20) / threshold);
          }
          
          const easeProgress = progress * (2 - progress);
          const scale = 1 + easeProgress * 0.15;
          row.style.transform = `scale(${scale})`;

          const w1 = row.querySelector<HTMLElement>("[data-w1]")!;
          const w2 = row.querySelector<HTMLElement>("[data-w2]")!;
          const img = row.querySelector<HTMLElement>("[data-img]")!;

          const brightness = Math.max(70, Math.round(255 - (1 - easeProgress) * 155));
          const hex = brightness.toString(16).padStart(2, "0");
          const col = `#${hex}${hex}${hex}`;
          w1.style.color = col;
          w2.style.color = col;

          const imgW = easeProgress * 90;
          img.style.width = `${imgW}px`;
          img.style.opacity = easeProgress > 0.05 ? easeProgress.toFixed(2) : "0";
        });
      };

      scrollHandler = () => {
        const scrolled = Math.max(0, window.scrollY - sectionTop);
        const listY = Math.min(scrolled, totalTravel);
        list.style.transform = `translateY(${-listY}px)`;
        applyState(listY);
      };

      window.addEventListener("scroll", scrollHandler, { passive: true });
      scrollHandler(); // run once to init state
    };

    const handleResize = () => {
      if (scrollHandler) {
        window.removeEventListener("scroll", scrollHandler);
      }
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(initAnimation);
    };

    window.addEventListener("resize", handleResize);
    raf = requestAnimationFrame(initAnimation);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(max-width: 767px)", () => {
        if (mobileContainerRef.current) {
          const items = gsap.utils.toArray('.mobile-animate', mobileContainerRef.current);
          gsap.fromTo(
            items,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: mobileContainerRef.current,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        }
      });
    }, containerRef);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (scrollHandler) window.removeEventListener("scroll", scrollHandler);
      if (raf) cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, []);

  return (
    <section id="services" ref={containerRef} className="relative bg-black">
      
      {/* ════ DESKTOP STICKY PANE ════ */}
      <div className="hidden md:block sticky top-0 left-0 w-full h-screen overflow-hidden">
        <div className="absolute left-0 w-full overflow-hidden" style={{ top: "0", bottom: "80px" }}>
          <div ref={listRef} className="will-change-transform w-full relative">
            <div className="w-full pt-10 flex justify-center pointer-events-none">
              <h2
                className="font-clash font-black uppercase text-white text-center leading-none"
                style={{ fontSize: "clamp(52px, 8vw, 130px)" }}
              >
                Our Core Skills
              </h2> 
            </div>

            <div id="services-items-wrapper" className="flex flex-col items-center w-full" style={{ gap: `${ITEM_GAP}px` }}>
              {servicesList.map((svc, i) => {
                const [w1, w2] = splitName(svc.name);
                return (
                  <div key={i} data-svc-row className="flex items-center justify-center w-full max-w-[90vw] whitespace-nowrap select-none pointer-events-none">
                    <span data-w1 className="flex-1 text-right font-clash font-semibold tracking-tight leading-none text-[#464646] transition-colors duration-100" style={{ fontSize: "clamp(24px, 3vw, 50px)", paddingRight: "clamp(12px, 2vw, 24px)" }}>
                      {w1}
                    </span>
                    <div data-img className="overflow-hidden flex-shrink-0 rounded-xl" style={{ width: "0px", height: "clamp(40px, 5vw, 64px)", opacity: 0 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={svc.image} alt={w1} className="w-full h-full object-cover" />
                    </div>
                    <span data-w2 className="flex-1 text-left font-clash font-semibold tracking-tight leading-none text-[#464646] transition-colors duration-100" style={{ fontSize: "clamp(24px, 3vw, 50px)", paddingLeft: "clamp(12px, 2vw, 24px)" }}>
                      {w2}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Desktop Corner Texts */}
        <div className="absolute bottom-0 left-0 w-full flex justify-between items-end px-16 pb-10 z-20 pointer-events-none">
          <p className="text-white font-bold text-[11px] uppercase tracking-widest leading-snug max-w-[200px]">
            Creative and digital solutions designed for modern brands and tech startups.
          </p>
          <p className="text-white font-bold text-[11px] uppercase tracking-widest leading-snug max-w-[200px] text-right">
            Creative services that help brands communicate, grow, and stand out.
          </p>
        </div>
      </div>

      {/* ════ MOBILE STATIC PANE ════ */}
      <div ref={mobileContainerRef} className="md:hidden w-full flex flex-col items-center py-20 px-6 gap-6">
        <h2 className="mobile-animate font-clash font-black uppercase text-white text-center text-4xl mb-6">
          Our Core Skills
        </h2>
        
        <div className="flex flex-col w-full gap-4">
          {servicesList.map((svc, i) => (
            <div key={i} className="mobile-animate flex items-center gap-4 w-full bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={svc.image} alt={svc.name} className="w-full h-full object-cover" />
              </div>
              <span className="font-clash font-semibold text-lg text-white">
                {svc.name}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile Statement Texts */}
        <div className="mobile-animate mt-8 flex flex-col gap-6 text-center border-t border-white/10 pt-8">
          <p className="text-white/60 font-bold text-[10px] uppercase tracking-widest leading-relaxed">
            Creative and digital solutions designed for modern brands and tech startups.
          </p>
          <p className="text-white/60 font-bold text-[10px] uppercase tracking-widest leading-relaxed">
            Creative services that help brands communicate, grow, and stand out.
          </p>
        </div>
      </div>

    </section>
  );
}
