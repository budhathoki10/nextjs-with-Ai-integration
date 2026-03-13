import resend from "@/lib/resend.js";
import VerificationEmail from "../Email/emailverification";


const sendVerificationEmail = async (email, username, verifycode) => {
  try {
    await resend.emails.send({
      from: "budhathokikushal170@gmail.com",
      to: email,
      subject: "OTP verification",
      react: VerificationEmail({ username, otp: verifycode }),
    });

    return { success: true, message: "Verification email sent successfully" };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, message: "Failed to send verification email" };
  }
};
export default sendVerificationEmail