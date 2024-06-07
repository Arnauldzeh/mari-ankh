const express = require("express");
const { login } = require("../controller/admin");
const { createAdmin } = require("../controller/admin");
const { createPublication } = require("../controller/admin");
const { getPublication } = require("../controller/admin");
const { getOnePublication } = require("../controller/admin");
const { updatePublication } = require("../controller/admin");
const { createEvent } = require("../controller/admin");
const { updateEvent } = require("../controller/admin");

const { authenticateAdmin } = require("../middleware/authAdmin");
const upload = require("../middleware/multer");
const router = new express.Router();

// Route pour la connexion de l'admin
router.post("/login", login);
router.post("/addAmin", createAdmin);

router.post("/newpublication", upload.single("file"), createPublication);
router.get("/publications", getPublication);
router.get("/publications/:id", getOnePublication);
router.put("/updatepublication/:id", updatePublication);

router.post("/newEvent", upload.single("file"), createEvent);

router.put("/updateEvent/:id", updateEvent);

module.exports = router;
