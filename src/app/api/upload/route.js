import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const uploadResponse = await cloudinary.uploader.upload(body.image, {
      folder: "asmual-portfolio",
    });

    return NextResponse.json({
      success: true,
      url: uploadResponse.secure_url,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Upload failed",
      },
      { status: 500 }
    );
  }
}