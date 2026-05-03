"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = authClient.useSession();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#111] border-b border-[#c9a84c]/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LEFT: Logo + Name */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-9 h-9">
              <Image
                src="/images/Asmual-logo.png"
                alt="Asmual Logo"
                fill
                className="object-contain"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>
            <span
              className="text-xl font-bold tracking-wide"
              style={{ color: "#c9a84c", fontFamily: "Georgia, serif" }}
            >
              Asmual
            </span>
          </Link>

          {/* MIDDLE: Nav Links (desktop) */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-300 hover:text-[#c9a84c] transition-colors duration-200 font-medium tracking-wide"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* RIGHT: Auth Buttons or Avatar (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="w-9 h-9 rounded-full border-2 border-[#c9a84c] overflow-hidden cursor-pointer flex items-center justify-center bg-[#222] text-[#c9a84c] font-bold text-sm"
                >
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="Avatar"
                      width={36}
                      height={36}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    session.user?.name?.[0]?.toUpperCase() || "U"
                  )}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-[#1a1a1a] border border-[#c9a84c]/30 rounded-box z-50 mt-2 w-44 p-2 shadow-xl"
                >
                  <li>
                    <Link href="/dashboard" className="text-gray-300 hover:text-[#c9a84c]">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => authClient.signOut()}
                      className="text-gray-300 hover:text-red-400"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-1.5 text-sm font-medium border border-[#c9a84c] text-[#c9a84c] rounded hover:bg-[#c9a84c]/10 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-1.5 text-sm font-medium bg-[#c9a84c] text-[#111] rounded hover:bg-[#b8923e] transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="md:hidden text-[#c9a84c] text-2xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#111] border-t border-[#c9a84c]/20 px-4 pb-4 pt-2">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-gray-300 hover:text-[#c9a84c] transition-colors duration-200 text-sm font-medium py-1"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-3 mt-4">
            {session ? (
              <button
                onClick={() => authClient.signOut()}
                className="w-full py-2 text-sm text-red-400 border border-red-400/30 rounded hover:bg-red-400/10 transition-all"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center py-2 text-sm border border-[#c9a84c] text-[#c9a84c] rounded hover:bg-[#c9a84c]/10 transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center py-2 text-sm bg-[#c9a84c] text-[#111] rounded hover:bg-[#b8923e] transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}