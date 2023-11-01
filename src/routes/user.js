const express = require("express");
const multiparty = require("connect-multiparty");
const UserController = require("../controllers/user");
const middlewares_authentication = require("../middlewares/authenticated");
const fs = require("fs");
const uploadDir = "./uploads/avatar";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const md_upload = multiparty({ uploadDir: uploadDir });
const api= express.Router()

api.post("/createuser",[middlewares_authentication.asureAuth, md_upload], UserController.createUser);
api.put("/:id", [middlewares_authentication.asureAuth, md_upload], UserController.updateUser);
api.delete("/:id", [middlewares_authentication.asureAuth], UserController.deleteUser);
api.get("/user/me", UserController.getMe);
api.get("/users", UserController.getUsers);
api.get("/:id", UserController.getUser);

module.exports = api;
