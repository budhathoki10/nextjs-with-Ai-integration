const VerificationEmail = ({ username, otp }) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Hello ${username},</h2>
      <p>Your OTP code is: <strong>${otp}</strong></p>
      <p>Please use this code to verify your account.</p>
    </div>
  `;
};

export default VerificationEmail;