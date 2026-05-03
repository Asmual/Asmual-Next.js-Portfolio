"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await authClient.signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      router.push("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background decorative circles */}
      <div className="absolute top-10 -left-32 w-96 h-96 rounded-full border border-[#c9a84c]/10 pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-64 h-64 rounded-full border border-[#c9a84c]/10 pointer-events-none" />

      <div className="w-full max-w-md z-10">

        {/* Card */}
        <div className="bg-[#161616] border border-[#c9a84c]/20 rounded-2xl p-8 shadow-2xl">

          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-10 h-[2px] bg-[#c9a84c] mb-4" />
            <h1
              className="text-3xl font-bold text-white"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Create Account
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Join and get started today
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 px-4 py-3 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-400 text-xs font-medium tracking-widest uppercase">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Asmual"
                className="w-full px-4 py-3 rounded bg-[#1f1f1f] border border-[#c9a84c]/20 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/60 transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-400 text-xs font-medium tracking-widest uppercase">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded bg-[#1f1f1f] border border-[#c9a84c]/20 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/60 transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-400 text-xs font-medium tracking-widest uppercase">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded bg-[#1f1f1f] border border-[#c9a84c]/20 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/60 transition-all duration-200"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-400 text-xs font-medium tracking-widest uppercase">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded bg-[#1f1f1f] border border-[#c9a84c]/20 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/60 transition-all duration-200"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 text-sm font-medium bg-[#c9a84c] text-[#111] rounded hover:bg-[#b8923e] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-[1px] bg-[#c9a84c]/10" />
            <span className="text-gray-600 text-xs">OR</span>
            <div className="flex-1 h-[1px] bg-[#c9a84c]/10" />
          </div>

          {/* Login link */}
          <p className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#c9a84c] hover:underline font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Back to home */}
        <p className="text-center text-gray-600 text-xs mt-6">
          <Link href="/" className="hover:text-[#c9a84c] transition-colors">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
