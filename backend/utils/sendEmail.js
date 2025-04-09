const nodemailer = require('nodemailer');

/**
 * Send email using nodemailer
 * @param {Object} options - Email options containing email, subject, and message
 * @returns {Promise} - Result of sending the email
 */
const sendEmail = async (options) => {
  // Create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
    port: process.env.SMTP_PORT || 2525,
    auth: {
      user: process.env.SMTP_EMAIL || 'default_user',
      pass: process.env.SMTP_PASSWORD || 'default_password'
    }
  });

  // Define email options
  const message = {
    from: `${process.env.FROM_NAME || 'Web App'} <${process.env.FROM_EMAIL || 'noreply@webapp.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  // Send email
  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;