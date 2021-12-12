const { Router } = require("express");
const authController = require("../controllers/Auth");
const authenticator = require("../middleware/authinticator");

const authRouter = Router();

authRouter.post("/local", authController.loginUser);

authRouter.get("/me", authenticator, authController.whoAmI);

authRouter.put("/updateUser", authenticator, authController.updateUserAuth);

authRouter.put("/forgotpassword", authController.forgotPassword);

authRouter.put("/reserpassword", authController.resetPassword);

module.exports = authRouter;
