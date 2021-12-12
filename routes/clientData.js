const { body } = require("express-validator");
const ClientDataController = require("../controllers/ClientData");
const authenticator = require("../middleware/authinticator");

const { Router } = require("express");

const router = Router();

router
  .route("/")
  .post(
    [body("email").isEmail().normalizeEmail()],
    ClientDataController.createClientData
  )
  .get(authenticator, ClientDataController.getClientData);

module.exports = router;
