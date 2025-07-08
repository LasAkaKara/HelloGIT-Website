import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendInvite = async (to, link) => {
  
  await transporter.sendMail({
    from: `"HelloGIT Club" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: "You're invited to join HelloGIT!",
    html: `
      <h3>Hello from HelloGIT 👋</h3>
      <p>You’ve been invited to join the HelloGIT platform.</p>
      <p><a href="${link}">Click here to register</a></p>
      <p>This link expires in 2 days.</p>
    `
  });
};