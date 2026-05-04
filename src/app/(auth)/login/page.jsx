"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Signing in...");

    const { data, error } = await authClient.signIn.email({
      email: form.email,
      password: form.password,
    });

    if (error) {
      if (error.status === 401 || error.status === 404) {
        toast.error("No account found. Please sign up first.", { id: toastId });
      } else if (error.status === 422 || error.status === 403) {
        toast.error("Incorrect password. Please try again.", { id: toastId });
      } else {
        toast.error("Login failed. Please try again.", { id: toastId });
      }
      setLoading(false);
      return;
    }

    if (data?.user) {
      toast.success(`Welcome back, ${data.user.name || ""}!`, { id: toastId });
      router.push("/dashboard");
    } else {
      toast.error("Something went wrong. Please try again.", { id: toastId });
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center p-4 relative overflow-hidden">

      <div className="absolute top-10 -left-32 w-96 h-96 rounded-full border border-[#c9a84c]/10 pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-64 h-64 rounded-full border border-[#c9a84c]/10 pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <div className="bg-[#161616] border border-[#c9a84c]/20 rounded-2xl p-8 shadow-2xl">

          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-10 h-0.5 bg-[#c9a84c] mb-4" />
            <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm mt-2">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-400 text-xs font-medium tracking-widest uppercase">
                Email
              </label>
              <div className="relative flex items-center">
                <MdEmail className="absolute left-3 text-[#c9a84c]/60 text-lg pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full py-3 pl-10 pr-4 rounded bg-[#1f1f1f] border border-[#c9a84c]/20 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/60 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-gray-400 text-xs font-medium tracking-widest uppercase">
                  Password
                </label>
                <Link href="/forgot-password" className="text-[#c9a84c] text-xs hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative flex items-center">
                <MdLock className="absolute left-3 text-[#c9a84c]/60 text-lg pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full py-3 pl-10 pr-10 rounded bg-[#1f1f1f] border border-[#c9a84c]/20 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/60 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-500 hover:text-[#c9a84c] transition-colors"
                >
                  {showPassword ? <MdVisibilityOff className="text-lg" /> : <MdVisibility className="text-lg" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-1 text-sm font-medium bg-[#c9a84c] text-[#111] rounded hover:bg-[#b8923e] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#c9a84c]/10" />
            <span className="text-gray-600 text-xs">OR</span>
            <div className="flex-1 h-px bg-[#c9a84c]/10" />
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 py-3 text-sm font-medium bg-[#1f1f1f] border border-[#c9a84c]/20 text-white rounded hover:border-[#c9a84c]/50 hover:bg-[#252525] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FcGoogle className="text-xl" />
            {googleLoading ? "Please wait..." : "Continue with Google"}
          </button>

          <p className="text-center text-gray-500 text-sm mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#c9a84c] hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          <Link href="/" className="hover:text-[#c9a84c] transition-colors">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
