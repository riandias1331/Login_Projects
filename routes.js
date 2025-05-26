const express = require("express");
const router = express.Router();
const Controller = require("./src/controllers/Controller.js")
const authMiddleware = require("./src/middlwares/auth.js");

// private routes
router.get("/users", authMiddleware, Controller.getUsers);
router.get("/users/:id", authMiddleware, Controller.getUserById);
router.put("/users/:id", authMiddleware, Controller.updateUser);
router.delete("/users/:id", authMiddleware, Controller.deleteUser);
router.delete("/users", authMiddleware, Controller.deleteAllUsers);

// public routes
router.post("/register", Controller.register);
router.post("/login", Controller.login);

module.exports = router;
