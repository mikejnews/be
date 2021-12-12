const { Router } = require("express");
const SuperAdminController = require("../controllers/SuperAdmin");

const router = Router();

router.post("/assignUser", SuperAdminController.assignUser);

router.get("/allClientData", SuperAdminController.getAllClientData);

// assign user on front end
router.post("/createUser", SuperAdminController.createUser);

// last option in the admin update section
router.put("/updateUser", SuperAdminController.updateUser);

router.put("/updateClientData", SuperAdminController.updateClientData);

router.delete("/deleteClient", SuperAdminController.deleteClientData);

module.exports = router;
