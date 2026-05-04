import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, mobile, whatsapp } = body;

    const db = await getDB();

    await db.collection("userProfiles").updateOne(
      { email: session.user.email },
      {
        $set: {
          email: session.user.email,
          name: name || session.user.name,
          mobile: mobile || "",
          whatsapp: whatsapp || "",
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDB();

    const profile = await db.collection("userProfiles").findOne({
      email: session.user.email,
    });

    return NextResponse.json({ profile });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}