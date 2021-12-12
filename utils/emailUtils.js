const nodemailer = require("nodemailer");
require("dotenv").config();
const generateAccOpenTemp = require("../emailTemplates/accountOpen");
const generatePrincipalAccOpenTemp = require("../emailTemplates/principalEmailTemp");

const transporter = nodemailer.createTransport({
  pool: true,
  host: "premium104.web-hosting.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMIAL,
    pass: process.env.PASSWORD,
  },
});

const transporterPrinc = nodemailer.createTransport({
  pool: true,
  host: "premium104.web-hosting.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMIAL,
    pass: process.env.PASSWORD,
  },
});

const transporterResetEmail = nodemailer.createTransport({
  pool: true,
  host: "premium104.web-hosting.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMIAL,
    pass: process.env.PASSWORD,
  },
});

async function sendMailToClient(email, name) {
  const emailRed = await transporter.sendMail({
    to: email,
    from: "compliance@okanagancultivators.com",
    bcc: "petedoesjazeeranews@gmail.com",
    subject: "Welcome to GRS Hydrogen Solutions",
    html: generateAccOpenTemp(name),
  });
}

async function sentAccOpenFormPrincipal(userData) {
  const emailRed = await transporterPrinc.sendMail({
    // to: "memyselfandyou1967@gmail.com",
    to: "petedoesjazeeranews@gmail.com",
    from: "compliance@okanagancultivators.com",
    bcc: "petedoesjazeeranews@gmail.com ",
    subject: "New Account Open Form",
    html: generatePrincipalAccOpenTemp(userData),
  });
  console.log("principle email sent", emailRed);
}

async function sentResetPasswordEmail(email, token) {
  const emailRed = await transporterResetEmail.sendMail({
    to: email,
    from: "compliance@okanagancultivators.com",
    bcc: "petedoesjazeeranews@gmail.com  compliance@okanagancultivators.com",
    subject: "GRS Hydrogen Solutions Password Reset",
    html: `
      <h1>Please click the below link to reset your password</h1>
      <p>https://okanagancultivators.com/resetPassword/${token}</p>
    `,
  });
  console.log(emailRed);
}

exports.sendMailToClient = sendMailToClient;
exports.sentAccOpenFormPrincipal = sentAccOpenFormPrincipal;
exports.sentResetPasswordEmail = sentResetPasswordEmail;
