"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const REVEAL_WORDS = [
  { text: "STRATEGY", red: false },
  { text: "CREATE", red: true },
  { text: "EXECUTE", red: false },
];

const STEPS = [
  {
    num: "01",
    title: "DISCOVERY",
    desc: "We understand your brand, goals, audience, and competitive landscape.",
    image: "/images/process/discovery.jpg",
  },
  {
    num: "02",
    title: "STRATEGY",
    desc: "We develop a tailored plan to position your brand for maximum impact.",
    image: "/images/process/strategy.jpg",
  },
  {
    num: "03",
    title: "CREATION",
    desc: "Our team designs, writes, and produces all creative assets.",
    image: "/images/process/creation.jpg",
  },
  {
    num: "04",
    title: "EXECUTION",
    desc: "We implement campaigns, post content, and manage your digital presence.",
    image: "/images/process/execution.jpg",
  },
  {
    num: "05",
    title: "OPTIMIZATION",
    desc: "We track performance and refine strategies for continuous growth.",
    image: "/images/process/optimization.jpg",
  },
  {
    num: "06",
    title: "SCALING",
    desc: "We expand your reach and amplify your brand's impact globally.",
    image: "/images/process/scaling.jpg",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Full-bleed shader background. Lives inside the pinned container so it stays
  // put behind the words, and only renders while it is on screen.
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isTouch ? 1.25 : 1.75));
    renderer.domElement.className = "block h-full w-full";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uAspect;
        uniform vec2 uMouse;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;
          vec2 mouse = uMouse * 0.5 + 0.5;
          float dist = distance(uv, mouse);
          float wave = sin(uv.x * 10.0 + uTime) * cos(uv.y * 10.0 + uTime) * 0.05;
          uv += wave * (1.0 - smoothstep(0.0, 0.5, dist));
          vec2 q = vec2(uv.x * uAspect, uv.y);
          float gray = sin(q.x * 20.0 + uTime) * cos(q.y * 20.0 + uTime) * 0.5 + 0.5;
          vec3 color = mix(vec3(0.02, 0.02, 0.02), vec3(0.1, 0.02, 0.02), gray);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
    scene.add(new THREE.Mesh(geometry, material));

    const renderOnce = () => renderer.render(scene, camera);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      uniforms.uAspect.value = w / h;
      if (reduceMotion) renderOnce();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      uniforms.uMouse.value.x = (e.clientX / window.innerWidth) * 2 - 1;
      uniforms.uMouse.value.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    if (!isTouch) window.addEventListener("mousemove", handleMouseMove);

    let raf = 0;
    let running = false;
    const loop = (time: number) => {
      uniforms.uTime.value = time * 0.001;
      renderOnce();
      raf = requestAnimationFrame(loop);
    };
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (reduceMotion) return;
      if (entry.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    intersectionObserver.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      mount.removeChild(renderer.domElement);
      renderer.forceContextLoss();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  // Pinned STRATEGY → CREATE → EXECUTE reveal, plus card/header entrances
  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          isMobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean };

          // ── Word reveal: first word is already showing when the pin starts,
          // every word gets a hold, and the last one dwells before unpinning.
          const words = gsap.utils.toArray<HTMLElement>(".reveal-word", container);
          const blur = isDesktop ? 12 : 0;
          const shift = isDesktop ? 60 : 36;
          const withBlur = (px: number) => (blur ? { filter: `blur(${px}px)` } : {});

          gsap.set(words, { opacity: 0, y: shift, ...withBlur(blur) });
          gsap.set(words[0], { opacity: 1, y: 0, ...withBlur(0) });

          const HOLD = 0.8;
          const FADE = 0.6;
          const tl = gsap.timeline({
            defaults: { ease: "power1.inOut" },
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: () => `+=${Math.round(window.innerHeight * (isDesktop ? 2.4 : 1.7))}`,
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.to({}, { duration: HOLD });
          words.forEach((word, i) => {
            const next = words[i + 1];
            if (!next) return;
            tl.to(word, { opacity: 0, y: -shift, ...withBlur(blur), duration: FADE });
            tl.to(next, { opacity: 1, y: 0, ...withBlur(0), duration: FADE }, "<");
            tl.to({}, { duration: i === words.length - 2 ? 1.2 : HOLD });
          });
          if (barRef.current) {
            tl.fromTo(
              barRef.current,
              { scaleX: 0 },
              { scaleX: 1, duration: tl.duration(), ease: "none" },
              0,
            );
          }

          // ── Header entrance (triggered by the header itself)
          gsap.fromTo(
            ".process-header-text",
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: "power2.out",
              scrollTrigger: { trigger: headerRef.current, start: "top 88%", once: true },
            },
          );

          // ── Cards
          gsap.utils.toArray<HTMLElement>(".process-card", section).forEach((card) => {
            const imgContainer = card.querySelector(".process-card-img-container");
            const img = card.querySelector(".process-card-img");
            const texts = card.querySelectorAll(".process-card-text");

            gsap.set(imgContainer, { clipPath: "inset(0 0 100% 0)" });
            gsap.set(img, { scale: 1.2 });

            gsap
              .timeline({
                scrollTrigger: { trigger: card, start: isDesktop ? "top 85%" : "top 90%", once: true },
              })
              .to(imgContainer, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.inOut" })
              .to(img, { scale: 1, duration: 0.9, ease: "power3.inOut", clearProps: "transform" }, "<")
              .fromTo(
                texts,
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
                "-=0.5",
              );
          });
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative">
      <h2 className="sr-only">Strategy. Create. Execute.</h2>

      {/* Pinned word reveal */}
      <div
        ref={containerRef}
        className="relative z-10 grid h-svh min-h-[480px] w-full place-items-center overflow-hidden motion-reduce:h-auto motion-reduce:py-24"
      >
        <div ref={mountRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" />

        {REVEAL_WORDS.map(({ text, red }) => (
          <div
            key={text}
            aria-hidden="true"
            className={`reveal-word relative z-10 col-start-1 row-start-1 w-full px-4 text-center font-clash font-bold uppercase leading-none tracking-tighter text-[14.5vw] md:text-[clamp(80px,15vw,250px)] motion-reduce:row-auto ${
              red ? "text-cove-red" : "text-white"
            }`}
          >
            {text}
          </div>
        ))}

        <div
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 z-10 h-px w-28 -translate-x-1/2 bg-white/15 motion-reduce:hidden"
        >
          <div ref={barRef} className="h-full origin-left bg-cove-red" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>

      {/* Process steps */}
      <div className="relative z-10 bg-cove-black/80 px-6 py-20 backdrop-blur-sm md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div ref={headerRef} className="mb-10 text-center md:mb-16">
            <p className="process-header-text mb-4 font-inter text-sm uppercase tracking-[0.15em] text-cove-red">
              How We Work
            </p>
            <h2 className="process-header-text font-clash text-3xl font-semibold text-white md:text-5xl">
              Our Process
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3 md:gap-y-52">
            {STEPS.map((step, index) => {
              // I-I-O, O-I-I, I-O-I column pattern
              const rowPattern = Math.floor(index / 2) % 3;
              const isFirstInPair = index % 2 === 0;

              let colClass = "";
              if (rowPattern === 0) {
                colClass = isFirstInPair ? "md:col-start-1" : "md:col-start-2";
              } else if (rowPattern === 1) {
                colClass = isFirstInPair ? "md:col-start-2" : "md:col-start-3";
              } else {
                colClass = isFirstInPair ? "md:col-start-1" : "md:col-start-3";
              }

              return (
                <div
                  key={step.num}
                  className={`process-card group flex flex-col @container ${colClass} border-b border-white/10 pb-5`}
                >
                  <div className="process-card-text mb-4 flex items-center justify-between text-xs font-medium uppercase tracking-widest text-white/50 md:text-sm">
                    <span>PROCESS // {step.title}</span>
                    <span>{step.num}</span>
                  </div>

                  <div className="process-card-img-container relative mb-6 aspect-[16/10] w-full overflow-hidden bg-white/5 md:aspect-[4/5]">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="process-card-img object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-transparent" />
                  </div>

                  <div className="process-card-text flex flex-col gap-2">
                    <p className="text-xs uppercase leading-relaxed tracking-widest text-white/60 md:text-sm">
                      {step.desc}
                    </p>

                    {/* Left-to-right wipe on hover; titles size to their column so long words never overflow */}
                    <div className="relative inline-block w-fit">
                      <h3 className="font-clash text-[min(13cqw,2.5rem)] font-semibold uppercase tracking-tight text-white md:text-[min(13cqw,3.75rem)]">
                        {step.title}
                      </h3>
                      <h3
                        aria-hidden="true"
                        className="absolute left-0 top-0 w-full font-clash text-[min(13cqw,2.5rem)] font-semibold uppercase tracking-tight text-cove-red transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)] md:text-[min(13cqw,3.75rem)]"
                      >
                        {step.title}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
