const mongoose = require("mongoose");

const Scheema = mongoose.Schema;

const clientDataSchema = new Scheema(
  {
    mrmrs: { type: String, required: true },
    birth: { type: String, required: true },
    marstatus: { type: String, required: true },
    country: { type: String, required: true },
    investammount: { type: String, required: true },
    financeCrimes: { type: String, required: true },
    sharesOrBonds: { type: String, required: true },
    oweHome: { type: String, required: true },
    isStockBroker: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    areacode: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String },
    employername: { type: String, required: true },
    annualsalary: { type: String, required: true },
    yarsworkedCurrentEmployer: { type: String, required: true },
    valueOfInvestHoldings: { type: String, required: false },
    paymentDue: {
      type: String,
      required: false,
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
    files: [],
    transactions: [
      {
        transactionId: {
          type: String,
          required: false,
        },
        date: {
          type: String,
          required: false,
        },
        numberOfShares: {
          type: Number,
          required: false,
        },
        unitPrice: {
          type: Number,
          required: false,
        },
      },
    ],
    numberOfShares: {
      type: String,
      required: false,
    },
    invoiceDate: {
      type: String,
      required: false,
    },
    invoiceNumber: {
      type: String,
      required: false,
    },
    accountNumber: {
      type: String,
      required: false,
    },
    amountInvested: {
      type: String,
      required: false,
    },
    pricePerShare: {
      type: String,
      required: false,
    },
    actualInvestmentAmmount: {
      type: String,
      required: false,
    },
    interestPaymentAmount: {
      type: String,
      required: false,
    },
    interestPaymentDue: {
      type: String,
      required: false,
    },
    serial: {
      type: String,
      required: false,
    },
    permiumMember: {
      type: String,
      required: false,
    },
    userData: {
      type: Scheema.Types.ObjectID,
      ref: "User",
      default: null,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("clientData", clientDataSchema);
