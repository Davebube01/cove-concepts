import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const MOTION = {
  duration: 0.8,
  ease: "power3.out",
  stagger: 0.12,
  start: "top 85%",
} as const;

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isMobile = () => window.innerWidth < 768;

type From = { x?: number; y?: number };

interface RevealOptions {
  from?: From;
  delay?: number;
  start?: string;
}

/**
 * Fade/slide one element in, once, when it scrolls into view.
 * Horizontal offsets become vertical on mobile (stacked layouts); under
 * reduced-motion nothing is hidden, so content is simply visible.
 */
export function revealIn(el: Element | null, opts: RevealOptions = {}) {
  if (!el || prefersReducedMotion()) return;

  const mobile = isMobile();
  const offset = mobile ? 28 : 48;
  const from = opts.from ?? { y: offset };
  const x = mobile ? 0 : (from.x ?? 0);
  const y = from.y ?? (from.x !== undefined && mobile ? offset : 0);

  gsap.fromTo(
    el,
    { opacity: 0, x, y },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: MOTION.duration,
      ease: MOTION.ease,
      delay: opts.delay ?? 0,
      clearProps: "transform",
      scrollTrigger: { trigger: el, start: opts.start ?? MOTION.start, once: true },
    },
  );
}

/**
 * Reveal a set of elements, each when it reaches the viewport. Elements that
 * sit in the same visual row get a small stagger; a stacked list (mobile)
 * never accumulates delay.
 */
export function revealEach(
  elements: Element[],
  opts: RevealOptions & { stagger?: number } = {},
) {
  const stagger = opts.stagger ?? MOTION.stagger;
  const tops = elements.map((el) => Math.round(el.getBoundingClientRect().top + window.scrollY));

  elements.forEach((el, i) => {
    const column = tops.slice(0, i).filter((top) => Math.abs(top - tops[i]) < 40).length;
    revealIn(el, { ...opts, delay: (opts.delay ?? 0) + column * stagger });
  });
}
