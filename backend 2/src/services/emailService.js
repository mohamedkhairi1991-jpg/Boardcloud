const sgMail = require('@sendgrid/mail');
if (process.env.SENDGRID_API_KEY) sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail({ to, subject, text, html }) {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SENDGRID_API_KEY not set. Email would be sent to:', to, subject);
    return;
  }
  const msg = {
    to,
    from: process.env.SENDER_EMAIL || 'no-reply@example.com',
    subject,
    text,
    html
  };
  await sgMail.send(msg);
}

async function sendOTP(email, code) {
  await sendEmail({
    to: email,
    subject: 'BoardCloud OTP Verification',
    text: `Your verification code: ${code} (expires in 10 minutes)`,
    html: `<p>Your verification code: <strong>${code}</strong> (expires in 10 minutes)</p>`
  });
}

module.exports = { sendEmail, sendOTP };
