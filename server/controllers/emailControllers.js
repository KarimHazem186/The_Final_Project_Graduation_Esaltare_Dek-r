const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

// This function handles sending emails
const sendEmail = asyncHandler(async (data) => {
  // Create transporter using SMTP configuration
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // false for other ports
    auth: {
      user: process.env.MAIL_ID, // your Gmail email address
      pass: process.env.MP, // your Gmail password or App password
    },
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates
    }
  });

  // Send the email
  let info = await transporter.sendMail({
    from: `"No Reply" <${process.env.MAIL_ID}>`, // Email sender address
    to: data.to, // Recipient email address
    subject: data.subject, // Subject of the email
    text: data.text, // Plain text version of the email
    html: data.html, // HTML version of the email
  });

  // Log the result
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  return info; // Optionally return the info object for further use
});

module.exports = sendEmail;
