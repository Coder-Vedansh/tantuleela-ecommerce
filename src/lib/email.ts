import nodemailer from 'nodemailer';

export const sendEmailNotification = async (subject: string, htmlMessage: string) => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  
  if (!emailUser || !emailPass) {
    console.warn("Email credentials missing. Skipping notification.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail', // Standard Gmail support
    auth: {
      user: emailUser,
      pass: emailPass, // Must be an App Password, not the regular account password
    },
  });

  try {
    await transporter.sendMail({
      from: `"Sringarika Orders" <${emailUser}>`,
      to: "sringarika0001@gmail.com", // Send to your business email
      subject: subject,
      html: htmlMessage,
    });
    console.log("Order notification email sent!");
  } catch (error) {
    console.error("Failed to send email notification:", error);
  }
};
