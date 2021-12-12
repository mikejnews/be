const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { cloudinaryConfig } = require("./config/cloudinaryConfig");
const cors = require("cors");
const fileExchange = require("./routes/fileExchange");
const clientDataRoutes = require("./routes/clientData");
const authRoutes = require("./routes/auth");
const superAdminRoutes = require("./routes/superAdmin");
const errorMiddleware = require("./middleware/errorHandling");
const superAdminAuthenticator = require("./middleware/superAdminAuthenticator");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use("*", cloudinaryConfig);

app.get("/", (req, res, next) => {
  res.send("Hi friend!");
});

// create clientData
// user Update his data
app.use("/clientData", clientDataRoutes);

// auth
// reath
app.use("/auth", authRoutes);

// superadmin
app.use("/superAdmin", superAdminAuthenticator, superAdminRoutes);

// cloudinary image upload
app.use("/upload", fileExchange);
// arr.use(errorMiddleware);

app.use(errorMiddleware);

const env = process.env.NODE_ENV || "development";

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-uwxgx.mongodb.net/${env === "development"
        ? process.env.DEV_DATABASE
        : process.env.DATABASE}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() =>
    app.listen(process.env.PORT || 8080, () =>
      console.log("Server started on 8080...")
    )
  )
  .catch((err) => console.log(err));
