const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function sendEmail(to, subject, html) {
  await transporter.sendMail({
    from: '"Support" <no-reply@yourapp.com>',
    to,
    subject,
    html,
  });
}

module.exports = sendEmail;
