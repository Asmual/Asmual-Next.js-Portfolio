"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const dropdownRef = useRef(null);

  // Dropdown-এর বাইরে ক্লিক করলে প্যানেল বন্ধ করার জন্য লজিক
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      await signOut();
      toast.success("Logged out successfully!", { id: toastId });
      router.push("/");
    } catch (err) {
      toast.error("Something went wrong.", { id: toastId });
    }
  };

  const handleLogoutAndClose = async () => {
    await handleLogout();
    setDropdownOpen(false);
  };

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
                sizes="36px"
                className="object-contain"
              />
            </div>
            <span
              className="text-xl font-bold tracking-wide text-[#c9a84c]"
              style={{ fontFamily: "Georgia, serif" }}
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

          {/* RIGHT: Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-[#222] animate-pulse" />
            ) : session ? (
              <div className="relative" ref={dropdownRef}>
                {/* Profile Icon / Button */}
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
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

                {/* Dropdown Panel */}
                {dropdownOpen && (
                  <ul className="absolute right-0 bg-[#1a1a1a] border border-[#c9a84c]/30 rounded-xl z-50 mt-2 w-56 p-4 shadow-xl flex flex-col items-center text-center">
                    {/* Profile Picture & Name/Email */}
                    <li className="w-full flex flex-col items-center pb-4 border-b border-[#c9a84c]/10 mb-3">
                      <div className="w-14 h-14 rounded-full border-2 border-[#c9a84c] overflow-hidden flex items-center justify-center bg-[#222] text-[#c9a84c] font-bold text-lg mb-3">
                        {session.user?.image ? (
                          <Image
                            src={session.user.image}
                            alt="Avatar"
                            width={56}
                            height={56}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          session.user?.name?.[0]?.toUpperCase() || "U"
                        )}
                      </div>
                      <p className="text-white text-sm font-semibold truncate w-full max-w-[200px]">
                        {session.user?.name}
                      </p>
                      <p className="text-gray-500 text-xs truncate w-full max-w-[200px]">
                        {session.user?.email}
                      </p>
                    </li>

                    {/* View Profile Button */}
                    <li className="w-full mb-3">
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex justify-center items-center w-full py-2 text-sm text-[#c9a84c] border border-[#c9a84c] rounded-md hover:bg-[#c9a84c]/10 transition-all duration-200"
                      >
                        View Profile
                      </Link>
                    </li>

                    {/* Links and Logout */}
                    <li className="w-full border-t border-[#c9a84c]/10 pt-3 flex flex-col gap-1.5">
                      <Link
                        href="/about"
                        onClick={() => setDropdownOpen(false)}
                        className="text-gray-400 hover:text-[#c9a84c] text-sm text-left px-2 py-1 rounded hover:bg-[#222] transition-all"
                      >
                        About
                      </Link>
                      <Link
                        href="/contact"
                        onClick={() => setDropdownOpen(false)}
                        className="text-gray-400 hover:text-[#c9a84c] text-sm text-left px-2 py-1 rounded hover:bg-[#222] transition-all"
                      >
                        Contact
                      </Link>
                      <button
                        onClick={handleLogoutAndClose}
                        className="text-red-400 hover:text-red-300 text-sm text-left px-2 py-1 rounded hover:bg-red-500/10 transition-all w-full cursor-pointer"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="py-1.5 px-4 text-sm font-medium border border-[#c9a84c] text-[#c9a84c] rounded hover:bg-[#c9a84c]/10 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="py-1.5 px-4 text-sm font-medium bg-[#c9a84c] text-[#111] rounded hover:bg-[#b8923e] transition-all duration-200"
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

          <div className="mt-4 pt-4 border-t border-[#c9a84c]/10">
            {session ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full border-2 border-[#c9a84c] flex items-center justify-center bg-[#222] text-[#c9a84c] font-bold text-sm overflow-hidden">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="Avatar"
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      session.user?.name?.[0]?.toUpperCase() || "U"
                    )}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">
                      {session.user?.name}
                    </p>
                    <p className="text-gray-500 text-xs">{session.user?.email}</p>
                  </div>
                </div>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center py-2 text-sm border border-[#c9a84c] text-[#c9a84c] rounded hover:bg-[#c9a84c]/10 transition-all"
                >
                  View Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogoutAndClose();
                    setMenuOpen(false);
                  }}
                  className="w-full py-2 text-sm text-red-400 border border-red-400/30 rounded hover:bg-red-400/10 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
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
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}