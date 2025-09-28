const nodemailer = require('nodemailer');
const config = require('../config'); // root config.js

const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: Number(config.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },
});

// Simple send function
async function sendMail({ to, subject, text, html }) {
  const mailOptions = {
    from: config.SMTP_USER,
    to,
    subject,
    text,
    html,
  };
  return transporter.sendMail(mailOptions);
}

module.exports = { sendMail };
