import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async ({ to, subject, html }: { to: string; subject: string; html: string }) => {
  try {
    await transporter.sendMail({
      from: `"${process.env.BUSINESS_NAME || 'ARYA CONSULTANT'}" <${process.env.SMTP_FROM}>`,
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error };
  }
};

export const sendAdminNotification = async (subject: string, html: string) => {
  return sendEmail({
    to: process.env.ADMIN_EMAIL || '',
    subject,
    html,
  });
};
