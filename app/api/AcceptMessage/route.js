import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import connectToDatabase from "../../../lib/dbconnect";
import userModel from "../../../model/user.model";

export async function POST(req) {
  try {
    await connectToDatabase();

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Not authenticated user" }, { status: 401 });
    }

    const { acceptingMessage } = await req.json();
    const updatedUser = await userModel.findByIdAndUpdate(
      session.user._id,
      { isexceptingMessage: acceptingMessage },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found and cannot update" }, { status: 404 });
    }

    return NextResponse.json({ message: "Message acceptance toggled successfully" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
console.log("helooooooooooooooooooooo")
    const session = await getServerSession(authOptions);
    console.log('session is',session)
    if (!session?.user) {
      return NextResponse.json({ message: "Not authenticated user" }, { status: 401 });
    }

    const foundUser = await userModel.findById(session.user._id);
    if (!foundUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }
console.log("accept message sucessfull")
    return NextResponse.json(
      { success: true, isexceptingMessage: foundUser.isexceptingMessage },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}