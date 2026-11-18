const express = require("express");
const router = express.Router();

const heroesController = require("../controllers/heroes.controllers.js")


router.get("/", heroesController.list);
router.post("/", heroesController.create);
routes.put("/", heroesController.update);
routes.patch("/", heroesController.patch);
routes.delete("/", heroesController.deleteHero);


module.exports = router;
