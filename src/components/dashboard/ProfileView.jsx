/* eslint-disable @next/next/no-img-element */
"use client";

import { MdEdit } from "react-icons/md";
import { FaUser, FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";

function Field({ icon, label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-gray-500 text-xs font-medium tracking-widest uppercase flex items-center gap-2">
        {icon}
        {label}
      </p>
      <p className="text-white text-sm font-semibold">
        {value || <span className="text-gray-600 font-normal">Not set</span>}
      </p>
    </div>
  );
}


export default function ProfileView({ session, profile, onEdit }) {
  return (
    <div className="bg-[#161616] border border-[#c9a84c]/20 rounded-2xl p-6 shadow-xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-4 ">
        <h2
          className="text-xl font-bold text-[#c9a84c]"
          style={{ fontFamily: "Georgia, serif" }}
        >
          My Profile
        </h2>
        <button
          onClick={onEdit}
          className="p-2 border border-[#c9a84c]/30 rounded-lg text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all duration-200"
          title="Edit Profile"
        >
          <MdEdit className="text-lg" />
        </button>
      </div>

      <div className="border-t border-dashed border-[#c9a84c]/10 mb-6" />

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

      {/* Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field
          icon={<FaUser className="text-[#c9a84c]/60 text-xs" />}
          label="Full Name"
          value={profile?.name || session?.user?.name}
        />
        <Field
          icon={<FaEnvelope className="text-[#c9a84c]/60 text-xs" />}
          label="Email"
          value={session?.user?.email}
        />
        <Field
          icon={<FaPhone className="text-[#c9a84c]/60 text-xs" />}
          label="Mobile Number"
          value={profile?.mobile}
        />
        <Field
          icon={<FaWhatsapp className="text-[#c9a84c]/60 text-xs" />}
          label="WhatsApp Number"
          value={profile?.whatsapp}
        />
      </div>
    </div>
  );
}