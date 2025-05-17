import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: 'wssd dmmm vuxl ysyd'
  },
});

const sendEmail = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: `"My App" <${process.env.ADMIN_EMAIL}>`,
    to,
    subject,
    html: htmlContent,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}
export {
    sendEmail
}