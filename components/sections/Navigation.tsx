"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "About", href: "#manifesto" },
  { label: "Process", href: "#process" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const scrollToSection = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed lg:absolute top-0 left-0 z-50 w-full bg-[#0a0a0a] lg:bg-transparent nav-entrance transition-all duration-300 border-b border-white/10 lg:border-transparent">
        {/* Desktop: 3-column grid */}
        <div className="hidden lg:grid grid-cols-3 items-start px-10 pt-8 pb-0">
          {/* Left: nav links stacked vertically */}
          <div className="flex flex-col gap-[15px]">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="nav-link text-left text-[11px] uppercase tracking-[0.12em] text-white/60 hover:text-white transition-colors w-fit pb-0.5"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Center: logo */}
          <div className="flex justify-center pt-0.5">
            <a
              href="#"
              className="font-clash text-lg font-semibold tracking-tight text-white"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <Image
                src="/images/cove.jpg"
                alt="Cove Logo"
                className="h-16 md:h-24 w-auto object-contain invert hue-rotate-180 mix-blend-screen"
                width={100}
                height={100}
              />
            </a>
          </div>

          {/* Right: CTA button */}
          <div className="flex justify-end items-start">
            <button
              onClick={() => scrollToSection("#contact")}
              className="btn-cove text-[11px] py-3 px-6 flex items-center gap-2 group"
            >
              <span className="inline-block rotate-45 transition-transform group-hover:rotate-90 text-base leading-none">
                ↗
              </span>
              START A PROJECT
            </button>
          </div>
        </div>

        {/* Mobile: logo + hamburger */}
        <div className="lg:hidden flex items-center justify-between px-6 py-5">
          <a
            href="#"
            className="font-clash text-xl font-semibold tracking-tight text-white"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img
              src="/images/cove.jpg"
              alt="Cove Logo"
              className="h-10 md:h-12 w-auto object-contain invert hue-rotate-180 mix-blend-screen"
            />
          </a>
          <button
            className="text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-cove-black flex flex-col items-center justify-center gap-8 lg:hidden">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                setIsMenuOpen(false);
                scrollToSection(link.href);
              }}
              className="font-clash text-3xl font-semibold text-white hover:text-cove-red transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setIsMenuOpen(false);
              scrollToSection("#contact");
            }}
            className="btn-cove mt-8"
          >
            Start a Project
          </button>
        </div>
      )}
    </>
  );
}
