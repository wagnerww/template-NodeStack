const express = require("express");
const multer = require("multer");
const multerConfig = require("./config/multer");
const routes = express.Router();

const authMiddleware = require("./app/middlewares/auth");
const usuariosController = require("./app/controllers/usuariosController");
const sessaoController = require("./app/controllers/sessaoController");

routes.get("/", (req, res) => res.send("tudo certo"));

routes.post("/usuarios", usuariosController.store);
routes.post("/login", sessaoController.store);

// Daqui para baixo, tudo é autenticado
routes.use(authMiddleware);
routes.put("/usuarios/:id", usuariosController.update);
routes.delete("/usuarios/:id", usuariosController.destroy);
routes.get("/usuarios", usuariosController.index);
routes.get("/usuarios/:id", usuariosController.show);
routes.post(
  "/usuarios/:id/avatar",
  multer(multerConfig).single("file"),
  usuariosController.storeAvatar
);

module.exports = routes;
