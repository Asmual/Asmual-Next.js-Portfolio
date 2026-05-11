/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState } from "react";
import { MdEdit, MdCameraAlt } from "react-icons/md";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";

function Field({ icon, label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-gray-500 text-xs font-medium tracking-widest uppercase flex items-center gap-2">
        {icon}
        {label}
      </p>

      <p className="text-white text-sm font-semibold">
        {value || (
          <span className="text-gray-600 font-normal">Not set</span>
        )}
      </p>
    </div>
  );
}

export default function ProfileView({
  session,
  profile,
  onEdit,
}) {
  const fileInputRef = useRef(null);

  const [image, setImage] = useState(
    session?.user?.image || ""
  );

  const [uploading, setUploading] = useState(false);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setUploading(true);

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: reader.result,
          }),
        });

        const data = await res.json();

        if (data.success) {
          setImage(data.url);

          await fetch("/api/user/profile-image", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              image: data.url,
            }),
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false);
      }
    };
  };

  return (
    <div className="bg-[#161616] border border-[#c9a84c]/20 rounded-2xl p-6 shadow-xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
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

      {/* Profile Image */}
      <div className="flex justify-center mb-8">
        <div className="relative">

          {/* Image */}
          <div className="relative w-28 h-28 rounded-full border-2 border-[#c9a84c] overflow-hidden bg-[#222] flex items-center justify-center">

            {image ? (
              <img
                src={image}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[#c9a84c] text-4xl font-bold">
                {session?.user?.name?.[0]?.toUpperCase() || "U"}
              </span>
            )}

            {/* Upload Loading */}
            {uploading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs">
                Uploading...
              </div>
            )}
          </div>

          {/* Camera Button */}
          <button
            onClick={handleImageClick}
            className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-[#c9a84c] text-black flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-200"
          >
            <MdCameraAlt className="text-lg" />
          </button>

          {/* Hidden Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Fields */}
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