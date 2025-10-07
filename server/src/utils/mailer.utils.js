const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: process.env.SMTP_PORT || 1025,
  secure: false,
  auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  } : undefined
});

const sendMail = async ({ to, subject, text, html }) => {
  const info = await transporter.sendMail({
    from: '"Test technique Les bon artisans" <noreply@test.com>',
    to,
    subject,
    text,
    html
  });
  console.log('Message sent: %s', info.messageId);
};

module.exports = { sendMail };
