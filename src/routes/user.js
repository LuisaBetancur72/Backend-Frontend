const express = require("express");
const UserController = require("../controllers/user");
const api = express.Router();
const middlewares_authentication = require("../middlewares/authenticated");
const fs = require("fs");
const Multiparty = require("multiparty");
const uploadDir = "./uploads/avatar";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const form = new Multiparty.Form({ uploadDir: uploadDir });

api.post("/createuser", UserController.createUser);
api.put("/:id", middlewares_authentication.asureAuth, UserController.updateUser);
api.delete("/:id", middlewares_authentication.asureAuth, UserController.deleteUser);
api.get("/user/me", UserController.getMe);
api.get("/users", UserController.getUsers);

module.exports = api;
