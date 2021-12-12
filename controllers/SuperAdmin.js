const ClientData = require("../models/ClientData");
const User = require("../models/User");
const { validationResult } = require("express-validator");
const { APIError, PublicInfo } = require("../models/shared/messages");

exports.assignUser = async (req, res, next) => {
  const useId = req.body.useId;
  const dataId = req.body.dataId;
  console.log(useId, dataId);
  try {
    const retreivedData = await ClientData.findById(dataId);
    const retreivedUser = await User.findById(useId);
    retreivedData.userData = useId;
    retreivedData.invoiceNumber = dataId;
    const dataSaved = await retreivedData.save();
    retreivedUser.clientData = dataId;
    const savedUser = await retreivedUser.save();
    res.status(200).json({
      dataSaved,
      savedUser,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getAllClientData = async (req, res, next) => {
  try {
    const allClientData = await ClientData.find();
    res.status(200).json({
      message: "All Client Data Success",
      allClientData,
    });
  } catch (e) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// create and assign User to ClientData model
exports.createUser = async (req, res, next) => {
  const {
    email,
    name,
    clientData,
    password,
    accountNumber,
    pricePerShare,
    status,
  } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(422).json({
      message: errors.array()[0].msg,
    });
  }

  try {
    const user = new User({
      email,
      password,
      name,
      clientData,
      status,
    });
    const createdUser = await user.save();
    const retrievedClientInfo = await ClientData.findById(clientData);

    retrievedClientInfo.pricePerShare = pricePerShare;
    retrievedClientInfo.accountNumber = accountNumber;
    retrievedClientInfo.serial = password;

    retrievedClientInfo.userData = createdUser._id;

    const savedClientInfo = await retrievedClientInfo.save();

    if (!savedClientInfo || !createdUser) next(APIError.errServerError());
    res.json(PublicInfo.infoCreated({ createdUser, savedClientInfo }));
  } catch (e) {
    console.log(e);
    next(APIError.errServerError());
  }
};

exports.updateUser = async (req, res, next) => {
  const userId = req.body.userId;
  const email = req.body.email;
  const password = req.body.password;
  const accountNumber = req.body.accountNumber;
  const numberOfShares = req.body.numberOfShares;
  const pricePerShare = req.body.pricePerShare;
  const interestPaymentAmount = req.body.interestPaymentAmount;
  const interestPaymentDue = req.body.interestPaymentDue;
  const actualInvestmentAmmount = req.body.actualInvestmentAmmount;
  const invoiceDate = req.body.invoiceDate;
  const files = req.body.files;
  const permiumMember = req.body.permiumMember;
  const transactions = req.body.transactions;

  try {
    const retreivedUser = await User.findById(userId);
    const retrievedClientInfo = await ClientData.findById(
      retreivedUser.clientData
    );
    retreivedUser.email = email;
    if (password) {
      retrievedClientInfo.serial = password;
      retreivedUser.password = password;
    }

    if (files.length > 0) {
      retrievedClientInfo.files = files.split(",");
    }
    retrievedClientInfo.accountNumber = accountNumber;
    retrievedClientInfo.numberOfShares = numberOfShares;
    retrievedClientInfo.pricePerShare = pricePerShare;
    retrievedClientInfo.interestPaymentAmount = interestPaymentAmount;
    retrievedClientInfo.actualInvestmentAmmount = actualInvestmentAmmount;
    retrievedClientInfo.interestPaymentDue = interestPaymentDue;
    retrievedClientInfo.transactions = transactions;
    retrievedClientInfo.permiumMember = permiumMember;
    retrievedClientInfo.invoiceDate = invoiceDate;
    retrievedClientInfo.email = email;

    const savedUser = await retreivedUser.save();
    const savedClientData = await retrievedClientInfo.save();

    res.json(PublicInfo.infoUpdated(savedUser, savedClientData));
  } catch (e) {
    console.log(e);
    next(APIError.errServerError());
  }
};

exports.updateClientData = async (req, res, next) => {
  const clientId = req.body.clientId;
  try {
    const retreivedUser = await User.findById(clientId);
    const clientDataFound = await ClientData.findById(retreivedUser.clientData);
    clientDataFound.mrmrs = req.body.mrmrs;
    clientDataFound.birth = req.body.birth;
    clientDataFound.marstatus = req.body.marstatus;
    clientDataFound.country = req.body.country;
    clientDataFound.investammount = req.body.investammount;
    clientDataFound.financeCrimes = req.body.financeCrimes;
    clientDataFound.sharesOrBonds = req.body.sharesOrBonds;
    clientDataFound.oweHome = req.body.oweHome;
    clientDataFound.isStockBroker = req.body.isStockBroker;
    clientDataFound.tnc = req.body.tnc;
    clientDataFound.fname = req.body.fname;
    clientDataFound.lname = req.body.lname;
    clientDataFound.areacode = req.body.areacode;
    clientDataFound.phone = req.body.phone;
    clientDataFound.email = req.body.email;
    clientDataFound.address = req.body.address;
    clientDataFound.city = req.body.city;
    clientDataFound.state = req.body.state;
    clientDataFound.province = req.body.province;
    clientDataFound.employername = req.body.employername;
    clientDataFound.annualsalary = req.body.annualsalary;
    clientDataFound.yarsworkedCurrentEmployer =
      req.body.yarsworkedCurrentEmployer;
    clientDataFound.currentEmployerAddress = req.body.currentEmployerAddress;
    clientDataFound.valueOfInvestHoldings = req.body.valueOfInvestHoldings;
    clientDataFound.accountNumber = req.body.accountNumber;
    clientDataFound.invoiceDate = req.body.invoiceDate;
    clientDataFound.paymentDue = req.body.paymentDue;
    clientDataFound.pricePerShare = req.body.pricePerShare;
    clientDataFound.interestPaymentAmount = req.body.interestPaymentAmount;
    clientDataFound.interestPaymentDue = req.body.interestPaymentDue;
    clientDataFound.numberOfShares = req.body.numberOfShares;
    if (req.body.files.length > 0) {
      clientDataFound.files = req.body.files;
    }

    const result = await clientDataFound.save();
    res.status(201).send(result);
  } catch (e) {
    console.log(e);
  }
};

exports.deleteClientData = async (req, res, next) => {
  const clientDataId = req.body.clientDataId;
  const userId = req.body.userId;
  console.log(clientDataId, userId);
  try {
    const client = await ClientData.findById(clientDataId);
    const result = await client.remove();
    if (userId) {
      const retrievedUser = await User.findById(userId);
      const deletedUser = retrievedUser.remove();
      res.status(201).json({
        message: "User Deleted",
        deletedUser,
      });
    }
    console.log(result);
    res.status(200).send({
      message: "UserData deleted",
      value: result,
    });
  } catch (e) {
    console.log(e);
  }
};
