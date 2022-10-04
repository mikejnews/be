const User = require("../models/User");
const ClientData = require("../models/ClientData");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { sendMail } = require("../utils/emailUtils");
const { APIError, PublicInfo } = require("../models/shared/messages");

exports.loginUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const retrievedUser = await User.findOne({ email: email });
    if (retrievedUser._id !== mongoose.Types.ObjectId(retrievedUser._id))
      return next(APIError.errUnauthorizedError());

    if (!retrievedUser) return next(APIError.errUnauthorizedError());

    const passordComparison = password === retrievedUser.password;

    console.log(passordComparison, ">> : passordComparison"); // turbo
    if (!passordComparison) return next(APIError.errUnauthorizedError());

    const token = await jwt.sign(
      { email: retrievedUser.email, userId: retrievedUser._id.toString() },
      "secret"
    );
    res.json(
      PublicInfo.infoRetrieved({
        jwt: token,
        user: retrievedUser,
      })
    );
  } catch (err) {
    console.log(err, ">> : err"); // turbo
    next(APIError.errServerError());
  }
};

exports.updateUserAuth = async (req, res, next) => {
  // from authenticator middleware
  const userId = req.userId;

  const { fname, lname, email, address, phone } = req.body;

  const password = req.body.password;

  try {
    const retrievedUser = await User.findById(userId);
    const retrievedUserData = await ClientData.findById(
      retrievedUser.clientData
    );

    retrievedUserData.fname = fname;
    retrievedUserData.lname = lname;
    retrievedUserData.email = email;
    retrievedUserData.phone = phone;
    retrievedUserData.address = address;

    retrievedUser.email = email;
    if (password) {
      retrievedUserData.serial = password;
      retrievedUser.password = password;
    }

    const saveResultClientData = await retrievedUserData.save();
    const saveResUser = await retrievedUser.save();
    if (saveResultClientData && saveResUser) res.json(PublicInfo.infoUpdated());
  } catch (e) {
    next(APIError.errServerError());
  }
};

exports.whoAmI = async (req, res, next) => {
  try {
    const { userId } = req;
    const fetchedUser = await User.findById(userId);
    console.log(userId, " >> :userId");
    if (!fetchedUser) return next(APIError.errNotFound());
    res.json(PublicInfo.infoRetrieved({ fetchedUser }));
  } catch (e) {
    next(APIError.errServerError());
  }
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return next(APIError.errNotFound());

    const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, {
      expiresIn: "20m",
    });
    const updatedUser = await user.updateOne({ resetLink: token });
    await sendMail({
      to: email,
      subject: "GRS Hydrogen Solutions admin password reset",
      html: `
       <a href=https://client-grshydrogen.com/resetPassword/${token}><h1>Please click the below link to reset your password</h1></a>
     `,
    });

    res.json(PublicInfo.infoCreated(updatedUser));
  } catch (e) {
    return next(APIError.errServerError());
  }
};

exports.resetPassword = async (req, res, next) => {
  const { resetLink, newPassword } = req.body;
  try {
    if (!resetLink) throw Error("Reset Link not present");
    const extractedJWT = await jwt.verify(
      resetLink,
      process.env.RESET_PASSWORD_KEY
    );
    const retrievedUser = await User.findOne({ resetLink });
    console.log(retrievedUser);
    const retrievedClientData = await ClientData.findById(
      retrievedUser.clientData
    );

    if (!retrievedUser) throw new Error("No user found ");
    retrievedUser.password = newPassword;
    retrievedClientData.serial = newPassword;

    const savedUserRes = await retrievedUser.save();
    const savedData = await retrievedClientData.save();

    res.json(PublicInfo.infoCreated({ savedUserRes, savedData }));
  } catch (e) {
    console.log(e);
    next(APIError.errServerError());
  }
};
