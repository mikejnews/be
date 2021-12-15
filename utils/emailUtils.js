const nodemailer = require("nodemailer");
require("dotenv").config();

// const transporterPrinc = nodemailer.createTransport({
//   pool: true,
//   host: "premium104.web-hosting.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMIAL,
//     pass: process.env.PASSWORD,
//   },
// });

// const transporterResetEmail = nodemailer.createTransport({
//   pool: true,
//   host: "premium104.web-hosting.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMIAL,
//     pass: process.env.PASSWORD,
//   },
// });
//

// async function sentAccOpenFormPrincipal(userData) {
//   const emailRed = await transporterPrinc.sendMail({
//     // to: "memyselfandyou1967@gmail.com",
//     to: "petedoesjazeeranews@gmail.com",
//     from: "compliance@okanagancultivators.com",
//     bcc: "petedoesjazeeranews@gmail.com ",
//     subject: "New Account Open Form",
//     html: generatePrincipalAccOpenTemp(userData),
//   });
//   console.log("principle email sent", emailRed);
// }

// async function sentResetPasswordEmail(email, token) {
//   const emailRed = await transporterResetEmail.sendMail({
//     to: email,
//     from: "compliance@okanagancultivators.com",
//     bcc: "petedoesjazeeranews@gmail.com  compliance@okanagancultivators.com",
//     subject: "GRS Hydrogen Solutions Password Reset",
//     html: `
//       <h1>Please click the below link to reset your password</h1>
//       <p>https://okanagancultivators.com/resetPassword/${token}</p>
//     `,
//   });
//   console.log(emailRed);
// }

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
      serviceClient: process.env.CLIENT_ID,
      privateKey: process.env.PRIVATE_KEY,
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
