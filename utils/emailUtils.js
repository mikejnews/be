const nodemailer = require("nodemailer");
require("dotenv").config();
const keys = require("../grs-email-d65f84490f72.json");

async function sendMail({
  to,
  subject = "Welcome to GRS Hydrogen Solutions",
  html,
}) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "compliance@grs-hydrogen.com",
      serviceClient: keys.client_id,
      privateKey: keys.private_key,
    },
  });

  await transporter.verify();
  await transporter.sendMail({
    to,
    from: "compliance@grs-hydrogen.com",
    bcc: "petedoesjazeeranews@gmail.com",
    subject,
    html,
  });
}
exports.sendMail = sendMail;
// exports.sentAccOpenFormPrincipal = sentAccOpenFormPrincipal;
// exports.sentResetPasswordEmail = sentResetPasswordEmail;
