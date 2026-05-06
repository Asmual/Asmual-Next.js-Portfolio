import React from "react";
import Services from "@/components/sections/Services";

export const metadata = {
  title: "Services - Asmual Obaidul Hoque",
  description: "Professional web development and frontend design services.",
};

export default function ServicesPage() {
  return (
    <div className="bg-[#0e0e0e] pt-8">
      <Services />
    </div>
  );
}