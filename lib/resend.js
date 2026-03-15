// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);
// export default resend

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail address
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

export default transporter;