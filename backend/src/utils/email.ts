import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async (options: { to: string; subject: string; text: string }) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@smartfoods.com',
      to: options.to,
      subject: options.subject,
      text: options.text,
    });
  } catch (error) {
    console.error('Email error:', error);
  }
};
