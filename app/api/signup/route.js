import connectToDatabase from "../../../lib/dbconnect";
import User from "../../../model/user.model";
import bcrypt from "bcryptjs";
import sendVerificationEmail from "../../../helpers/sendVerificationemail";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectToDatabase();

  try {
    const { username, email, password } = await request.json();
  

    
    // Check if username already exists and verified
    const existingVerifiedUser = await User.findOne({ username, isVerified: true });
    if (existingVerifiedUser) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }


    // Check if email already exists
    const existingUserByEmail = await User.findOne({ email });
    const verifyCodeOTP = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      // Update existing user with new password + OTP
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUserByEmail.password = hashedPassword;
      existingUserByEmail.verifyCode = verifyCodeOTP;
      existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
      await existingUserByEmail.save();

      const emailResponse = await sendVerificationEmail(email, username, verifyCodeOTP);
      if (!emailResponse.success) {
        return NextResponse.json({ message: emailResponse.message }, { status: 500 });
      }

      return NextResponse.json(
        { message: "User updated. Verification email sent." },
        { status: 200 }
      );
    }

    // If email not found → create new user
    const hashed = await bcrypt.hash(password, 10);
    const expiryDate = new Date(Date.now() + 3600000);

    const newUser = new User({
      username,
      email,
      password: hashed,
      verifyCode: verifyCodeOTP,
      verifyCodeExpiry: expiryDate,
      isVerified: false,
      isAcceptingMessage: true,
      Message: [],
    });

    await newUser.save();

    const emailResponse = await sendVerificationEmail(email, username, verifyCodeOTP);
    if (!emailResponse.success) {
      return NextResponse.json({ message: emailResponse.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "User created. Verification email sent." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}