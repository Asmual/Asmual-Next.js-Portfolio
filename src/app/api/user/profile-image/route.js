import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDB } from "@/lib/mongodb";

export async function POST(req) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const body = await req.json();

    const db = await getDB();

    await db.collection("user").updateOne(
      {
        email: session.user.email,
      },
      {
        $set: {
          image: body.image,
        },
      }
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save image",
      },
      { status: 500 }
    );
  }
}