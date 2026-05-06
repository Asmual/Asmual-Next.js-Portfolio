import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;


    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }


    const db = await getDB();
    const collection = db.collection("messages");


    const newMessage = {
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newMessage);

    return NextResponse.json(
      { success: true, message: "Message saved successfully", data: result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}