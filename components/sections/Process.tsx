"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const processGridRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);

  // Three.js submerged background
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    mountRef.current.appendChild(renderer.domElement);
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;
          vec2 mouse = uMouse * 0.5 + 0.5;
          float dist = distance(uv, mouse);
          float wave = sin(uv.x * 10.0 + uTime) * cos(uv.y * 10.0 + uTime) * 0.05;
          uv += wave * (1.0 - smoothstep(0.0, 0.5, dist));
          float gray = sin(uv.x * 20.0 + uTime) * cos(uv.y * 20.0 + uTime) * 0.5 + 0.5;
          vec3 color = mix(vec3(0.02, 0.02, 0.02), vec3(0.1, 0.02, 0.02), gray);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleMouseMove = (e: MouseEvent) => {
      uniforms.uMouse.value.x = (e.clientX / window.innerWidth) * 2 - 1;
      uniforms.uMouse.value.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationId: number;
    const animate = (time: number) => {
      uniforms.uTime.value = time * 0.001;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.forceContextLoss();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  // Scroll depth text reveal
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── DESKTOP ANIMATIONS ──
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=100%", // Drastically shortens the required scroll distance
            scrub: true,
            pin: true,
          },
        });

        tl.set(".reveal-word", { opacity: 0, filter: "blur(20px)", y: 50 });
        tl.to(".reveal-word:nth-child(1)", {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1,
        });
        tl.to(
          ".reveal-word:nth-child(1)",
          { opacity: 0, filter: "blur(10px)", y: -50, duration: .5 },
          "+=0.5",
        );
        tl.to(
          ".reveal-word:nth-child(2)",
          { opacity: 1, filter: "blur(0px)", y: 0, duration: .5 },
          "<",
        );
        tl.to(
          ".reveal-word:nth-child(2)",
          { opacity: 0, filter: "blur(10px)", y: -50, duration: .5 },
          "+=0.5",
        );
        tl.to(
          ".reveal-word:nth-child(3)",
          { opacity: 1, filter: "blur(0px)", y: 0, duration: .5 },
          "<",
        );

        // Process Cards cinematic reveal animation
        if (processGridRef.current) {
          const cards = gsap.utils.toArray(".process-card");

          cards.forEach((card: any) => {
            const imgContainer = card.querySelector(".process-card-img-container");
            const img = card.querySelector(".process-card-img");
            const textElements = card.querySelectorAll(".process-card-text");

            const cardTl = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            });

            gsap.set(imgContainer, { clipPath: "inset(0 0 100% 0)" }); 
            gsap.set(img, { scale: 1.3 });

            cardTl.to(imgContainer, {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.2,
              ease: "power3.inOut",
            })
              .to(
                img,
                {
                  scale: 1,
                  duration: 1.2,
                  ease: "power3.inOut",
                  clearProps: "transform"
                },
                "<",
              )
              .fromTo(
                textElements,
                { opacity: 0, y: 30 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  stagger: 0.15,
                  ease: "power2.out",
                },
                "-=0.6",
              );
          });
        }

        // Animate the main section headers
        gsap.fromTo(
          ".process-header-text",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: processGridRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // ── MOBILE ANIMATIONS ──
      mm.add("(max-width: 767px)", () => {
        // No pinning, just ensure the reveal words are visible
        gsap.set(".reveal-word", { opacity: 1, filter: "blur(0px)", y: 0 });

        // Simple entrance for process cards without pinnedContainer calculation
        if (processGridRef.current) {
          const cards = gsap.utils.toArray(".process-card");

          cards.forEach((card: any) => {
            const imgContainer = card.querySelector(".process-card-img-container");
            const img = card.querySelector(".process-card-img");
            const textElements = card.querySelectorAll(".process-card-text");

            const cardTl = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            });

            gsap.set(imgContainer, { clipPath: "inset(0 0 100% 0)" }); 
            gsap.set(img, { scale: 1.3 });

            cardTl.to(imgContainer, {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1,
              ease: "power3.inOut",
            })
              .to(
                img,
                {
                  scale: 1,
                  duration: 1,
                  ease: "power3.inOut",
                  clearProps: "transform"
                },
                "<",
              )
              .fromTo(
                textElements,
                { opacity: 0, y: 30 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  stagger: 0.15,
                  ease: "power2.out",
                },
                "-=0.6",
              );
          });
        }

        // Animate the main section headers
        gsap.fromTo(
          ".process-header-text",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: processGridRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="process-section relative">
      {/* Three.js Background Mount */}
      <div
        ref={mountRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Reveal Words Container */}
      <div
        ref={containerRef}
        className="relative z-10 min-h-[50vh] md:min-h-screen flex flex-col md:block items-center justify-center pt-32 md:pt-0"
      >
        <div className="reveal-word md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 text-white text-center px-4 w-full relative mb-4 md:mb-0 font-clash font-bold leading-none tracking-tighter text-5xl md:text-[clamp(80px,15vw,250px)]">
          STRATEGY
        </div>
        <div className="reveal-word md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 text-cove-red text-center px-4 w-full relative mb-4 md:mb-0 font-clash font-bold leading-none tracking-tighter text-5xl md:text-[clamp(80px,15vw,250px)]">
          CREATE
        </div>
        <div className="reveal-word md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 text-white text-center px-4 w-full relative font-clash font-bold leading-none tracking-tighter text-5xl md:text-[clamp(80px,15vw,250px)]">
          EXECUTE
        </div>
      </div>

      {/* Our Process Steps */}
      <div className="relative z-10 bg-cove-black/80 backdrop-blur-sm py-32 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <p className="process-header-text text-cove-red text-sm uppercase tracking-[0.15em] mb-4 font-inter text-center">
            How We Work
          </p>
          <h2 className="process-header-text font-clash text-3xl md:text-5xl font-semibold text-white text-center mb-16">
            Our Process
          </h2>

          <div
            ref={processGridRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-32 md:gap-y-52"
          >
            {[
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
            ].map((step, index) => {
              // Calculate positioning for I-I-O, O-I-I, I-O-I layout
              const rowPattern = Math.floor(index / 2) % 3;
              const isFirstInPair = index % 2 === 0;

              let colClass = "";
              if (rowPattern === 0) {
                // I-I-O (starts at 1 and 2)
                colClass = isFirstInPair ? "md:col-start-1" : "md:col-start-2";
              } else if (rowPattern === 1) {
                // O-I-I (starts at 2 and 3)
                colClass = isFirstInPair ? "md:col-start-2" : "md:col-start-3";
              } else {
                // I-O-I (starts at 1 and 3)
                colClass = isFirstInPair ? "md:col-start-1" : "md:col-start-3";
              }

              return (
                <div
                  key={step.num}
                  className={`process-card flex flex-col group cursor-pointer ${colClass} border-b border-gray-100/50 pb-5`}
                >
                  {/* Top Info */}
                  <div className="process-card-text flex justify-between items-center mb-4 text-white/50 text-xs md:text-sm font-medium tracking-widest uppercase">
                    <span>PROCESS // {step.title}</span>
                    <span>{step.num}</span>
                  </div>

                  {/* Image Container */}
                  <div className="process-card-img-container relative w-full aspect-[4/5] overflow-hidden mb-6 bg-white/5 rounded-sm">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="process-card-img object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                    />
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>

                  {/* Bottom Info */}
                  <div className="process-card-text flex flex-col gap-2">
                    <p className="text-white/60 text-xs md:text-sm leading-relaxed uppercase tracking-widest">
                      {step.desc}
                    </p>
                    
                    {/* Left-to-Right Wipe Effect */}
                    <div className="relative inline-block w-fit">
                      <h4 className="font-clash text-3xl md:text-5xl lg:text-6xl font-semibold text-white uppercase tracking-tight">
                        {step.title}
                      </h4>
                      <h4 className="absolute left-0 top-0 font-clash text-3xl md:text-5xl lg:text-6xl font-semibold text-cove-red uppercase tracking-tight transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)] w-full">
                        {step.title}
                      </h4>
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
