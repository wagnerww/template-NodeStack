const express = require("express");
const multer = require("multer");
const multerConfig = require("./config/multer");
const routes = express.Router();

const usuariosController = require("./app/controllers/usuariosController");
const fileController = require("./app/controllers/fileController");
const sessaoController = require("./app/controllers/sessaoController");

routes.get("/", (req, res) => res.send("tudo certo"));

routes.post("/usuarios", usuariosController.store);
routes.get("/usuarios", usuariosController.index);
routes.post(
  "/usuarios/:id/avatar",
  multer(multerConfig).single("file"),
  usuariosController.storeAvatar
);

routes.post("/login", sessaoController.store);

module.exports = routes;
