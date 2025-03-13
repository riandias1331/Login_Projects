const express = require("express");
const router = express.Router();
const Controller = require("./src/controllers/Controller.js")

// private routes
router.get("/", Controller.getUsers);

// public routes
router.post("/register", Controller.register);
router.post("/login", Controller.login);

module.exports = router;
