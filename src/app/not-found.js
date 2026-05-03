"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex flex-col items-center justify-center px-4 relative overflow-hidden">

      {/* Background decorative circles */}
      <div className="absolute w-96 h-96 rounded-full border border-[#c9a84c]/10 top-10 -left-32 pointer-events-none" />
      <div className="absolute w-64 h-64 rounded-full border border-[#c9a84c]/10 bottom-10 -right-20 pointer-events-none" />
      <div className="absolute w-48 h-48 rounded-full border border-[#c9a84c]/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Main Content */}
      <div
        className="flex flex-col items-center text-center z-10 transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
        }}
      >
        {/* 404 Big Text */}
        <h1
          className="text-[120px] sm:text-[180px] font-bold leading-none select-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "2px #c9a84c",
            fontFamily: "Georgia, serif",
            opacity: 0.15,
          }}
        >
          404
        </h1>

        {/* Divider line */}
        <div className="w-16 h-[2px] bg-[#c9a84c] my-6" />

        {/* Title */}
        <h2
          className="text-2xl sm:text-4xl font-bold text-white mb-3"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Page Not Found
        </h2>

        {/* Subtitle */}
        <p className="text-gray-400 text-sm sm:text-base max-w-md mb-8 leading-relaxed">
          Sorry! The page you are looking for does not exist. It may have been moved or the URL might be incorrect.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="px-6 py-2.5 text-sm font-medium bg-[#c9a84c] text-[#111] rounded hover:bg-[#b8923e] transition-all duration-200"
          >
            ← Back to Home
          </Link>
          <Link
            href="/contact"
            className="px-6 py-2.5 text-sm font-medium border border-[#c9a84c] text-[#c9a84c] rounded hover:bg-[#c9a84c]/10 transition-all duration-200"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Bottom text */}
      <p className="absolute bottom-6 text-gray-600 text-xs z-10">
        © {new Date().getFullYear()} Asmual — All rights reserved
      </p>
    </div>
  );
}