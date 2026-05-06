"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#0e0e0e] flex items-center overflow-hidden">

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full border border-[#c9a84c]/10" />
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full border border-[#c9a84c]/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#c9a84c]/5" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-24">

        {/* LEFT: Text Content */}
        <div
          className="flex flex-col gap-6 z-10 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-40px)",
          }}
        >
          {/* Tag */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-[2px] bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-sm font-medium tracking-widest uppercase">
              Full Stack Developer
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Hi, I am{" "}
            <span className="text-[#c9a84c]">Asmual</span>
          </h1>

          {/* Sub heading */}
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg">
            I build modern, fast, and beautiful web applications. Passionate about clean code, great UI, and delivering real value through technology.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mt-2">
            <div>
              <h3 className="text-2xl font-bold text-[#c9a84c]" style={{ fontFamily: "Georgia, serif" }}>2+</h3>
              <p className="text-gray-500 text-xs mt-1">Years Experience</p>
            </div>
            <div className="w-[1px] bg-[#c9a84c]/20" />
            <div>
              <h3 className="text-2xl font-bold text-[#c9a84c]" style={{ fontFamily: "Georgia, serif" }}>20+</h3>
              <p className="text-gray-500 text-xs mt-1">Projects Done</p>
            </div>
            <div className="w-[1px] bg-[#c9a84c]/20" />
            <div>
              <h3 className="text-2xl font-bold text-[#c9a84c]" style={{ fontFamily: "Georgia, serif" }}>10+</h3>
              <p className="text-gray-500 text-xs mt-1">Happy Clients</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-2">
            <Link
              href="/projects"
              className="px-6 py-3 text-sm font-medium bg-[#c9a84c] text-[#111] rounded hover:bg-[#b8923e] transition-all duration-200"
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 text-sm font-medium border border-[#c9a84c] text-[#c9a84c] rounded hover:bg-[#c9a84c]/10 transition-all duration-200"
            >
              Contact Me
            </Link>
          </div>
        </div>

        {/* RIGHT: Photo */}
        <div
          className="flex justify-center lg:justify-end z-10 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(40px)",
            transitionDelay: "200ms",
          }}
        >
          <div className="relative">
            {/* Outer gold ring */}
            <div className="absolute -inset-3 rounded-full border border-[#c9a84c]/30" />
            {/* Inner gold ring */}
            <div className="absolute -inset-1 rounded-full border border-[#c9a84c]/20" />

            {/* Gold corner accents */}
            <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-[#c9a84c]" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-[#c9a84c]" />

            {/* Photo container */}
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-[420px] rounded-2xl overflow-hidden border-2 border-[#c9a84c]/40">
              {/* Dark overlay for color matching */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/60 via-transparent to-transparent z-10" />
              <Image
                src="/images/Asmual Formal Look.PNG"
                alt="Asmual"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>

      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0e0e0e] to-transparent pointer-events-none" />
    </section>
  );
}