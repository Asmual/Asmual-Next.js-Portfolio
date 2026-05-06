import React from "react";
import Blogs from "@/components/sections/Blogs";

export const metadata = {
  title: "Blogs - Asmual Obaidul Hoque",
  description: "Read the latest articles on web development, design, and coding by Asmual.",
};

export default function BlogsPage() {
  return (
    <div className="bg-[#0e0e0e] pt-8">
      <Blogs />
    </div>
  );
}