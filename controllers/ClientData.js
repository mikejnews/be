const { validationResult } = require("express-validator");
const ClientData = require("../models/ClientData");
const { sendMail } = require("../utils/emailUtils");
const User = require("../models/User");
const { APIError, PublicInfo } = require("../models/shared/messages");
const generateAccOpenTemp = require("../emailTemplates/accountOpen");
const generatePrincipalAccOpenTemp = require("../emailTemplates/principalEmailTemp");

exports.createClientData = async (req, res, next) => {
  const { errors } = validationResult(req);
  console.log(errors);
  if (errors.length !== 0) {
    return next(APIError.errInvalidQueryParameter("validation failed"));
  }
  const data = req.body;
  const clientData = new ClientData(data);

  try {
    const clientDataReturned = await clientData.save();
    if (!clientDataReturned) next(APIError.errServerError());

    res.json(PublicInfo.infoCreated());
    await sendMail({
      to: data.email,
      html: generateAccOpenTemp(
        `${req.body.mrmrs} ${req.body.fname} ${req.body.lname}`
      ),
    });
    await sendMail({
      to: process.env.PRINCIPLE_EMAIL,
      subject: "New client",
      html: generatePrincipalAccOpenTemp(data),
    });
  } catch (e) {
    console.log(e);
    next(APIError.errServerError());
  }
};

exports.getClientData = async (req, res, next) => {
  // comes authenticator from middleware
  const userId = req.userId;
  // if (userId === "5ebe6fb81fecb40f2abf20ff") return next();

  try {
    const fetchedUser = await User.findById(userId);
    const client = await ClientData.findById(fetchedUser.clientData);
    if (!client) return next(APIError.errNotFound());
    res.json(PublicInfo.infoRetrieved({ client }));
  } catch (e) {
    next(APIError.errServerError());
  }
};
