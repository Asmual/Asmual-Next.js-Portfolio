/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { MdClose, MdSave } from "react-icons/md";
import { FaUser, FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";



function InputField({
  icon,
  label,
  name,
  value,
  type = "text",
  disabled = false,
  onChange,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-gray-400 text-xs font-medium tracking-widest uppercase flex items-center gap-2">
        {icon}
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        placeholder={`Enter ${label}`}
        className={`w-full py-3 px-4 rounded bg-[#1f1f1f] border text-sm transition-all duration-200 focus:outline-none
          ${disabled
            ? "border-[#c9a84c]/10 text-gray-600 cursor-not-allowed"
            : "border-[#c9a84c]/20 text-white placeholder-gray-600 focus:border-[#c9a84c]/60"
          }`}
      />
      {disabled && (
        <p className="text-gray-600 text-xs">Email cannot be changed</p>
      )}
    </div>
  );
}


export default function ProfileEdit({ session, profile, onCancel, onSave }) {
  const [form, setForm] = useState({
    name: profile?.name || session?.user?.name || "",
    mobile: profile?.mobile || "",
    whatsapp: profile?.whatsapp || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Saving changes...");

    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        toast.error("Failed to save. Please try again.", { id: toastId });
        return;
      }

      toast.success("Profile updated successfully!", { id: toastId });
      onSave(form);
    } catch (err) {
      toast.error("Something went wrong.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#161616] border border-[#c9a84c]/20 rounded-2xl p-6 shadow-xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-xl font-bold text-[#c9a84c]"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Edit Profile
        </h2>
        <button
          onClick={onCancel}
          className="p-2 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-400/10 transition-all duration-200"
          title="Cancel"
        >
          <MdClose className="text-lg" />
        </button>
      </div>

      <div className="border-t border-dashed border-[#c9a84c]/10 mb-6" />

      {/* Avatar*/}
      <div className="flex justify-center mb-6">
        <div className="relative w-24 h-24 rounded-full border-2 border-[#c9a84c] overflow-hidden bg-[#222] flex items-center justify-center">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-[#c9a84c] text-4xl font-bold">
              {session?.user?.name?.[0]?.toUpperCase() || "U"}
            </span>
          )}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <InputField
            icon={<FaUser className="text-[#c9a84c]/60 text-xs" />}
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <InputField
            icon={<FaEnvelope className="text-[#c9a84c]/60 text-xs" />}
            label="Email"
            name="email"
            value={session?.user?.email}
            type="email"
            disabled={true}
          />

          <InputField
            icon={<FaPhone className="text-[#c9a84c]/60 text-xs" />}
            label="Mobile Number"
            name="mobile"
            value={form.mobile}
            type="tel"
            onChange={handleChange}
          />

          <InputField
            icon={<FaWhatsapp className="text-[#c9a84c]/60 text-xs" />}
            label="WhatsApp Number"
            name="whatsapp"
            value={form.whatsapp}
            type="tel"
            onChange={handleChange}
          />

        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-2">
          <button
            type="button"
            onClick={onCancel}
            className="py-2 px-5 text-sm font-medium border border-gray-600 text-gray-400 rounded hover:bg-gray-600/10 transition-all duration-200"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="py-2 px-5 text-sm font-medium bg-[#c9a84c] text-[#111] rounded hover:bg-[#b8923e] transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MdSave className="text-base" />
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </form>
    </div>
  );
}