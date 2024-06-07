const express = require("express");
const { register } = require("../controller/user");
const { addFavorite } = require("../controller/user");
const posts = require("../controller/user");
const { addAppointement } = require("../controller/user");

const router = new express.Router();

// Route pour la connexion de l'admin
router.post("/register", register);
router.get("/posts", posts.viewPublications);
router.post("/favorite/:publicationId", addFavorite);
router.post("/appointement", addAppointement);

module.exports = router;
