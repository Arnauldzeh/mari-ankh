const express = require("express");
const { donorInfo } = require("../controller/donor");

const router = new express.Router();

// Route pour la connexion de l'admin
router.post("/donor", donorInfo);

module.exports = router;
