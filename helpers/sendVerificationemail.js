// import resend from "../lib/resend";
// import VerificationEmail from "../Email/emailverification";


// const sendVerificationEmail = async (email, username, verifycode) => {
//   try {
//     await resend.emails.send({
//       from: "budhathokikushal170@gmail.com",
//       to: email,
      
//       subject: "OTP verification",
//       react: VerificationEmail({ username, otp: verifycode }),
//     });

//     return { success: true, message: "Verification email sent successfully" };
//   } catch (error) {
//     console.error("Email sending failed:", error);
//     return { success: false, message: "Failed to send verification email" };
//   }
// };
// export default sendVerificationEmail
import transporter from "../lib/resend"; // your nodemailer.js file
import VerificationEmail from "./emailVerification";

const sendVerificationEmail = async (email, username, verifyCode) => {
  try {
    const htmlContent = VerificationEmail({ username, otp: verifyCode });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP verification",
      html: htmlContent,
    };

    transporter.sendMail(mailOptions);

    return { success: true, message: "Verification email sent successfully" };
    console.log("he")
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, message: "Failed to send verification email" };
  }
};

export default sendVerificationEmail;