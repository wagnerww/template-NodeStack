const express = require("express");
const multer = require("multer");
const multerConfig = require("./config/multer");
const routes = express.Router();

const authMiddleware = require("./app/middlewares/auth");
const usuariosController = require("./app/controllers/usuariosController");
const enderecosUsuarioController = require("./app/controllers/enderecosUsuarioController");
const sessaoController = require("./app/controllers/sessaoController");

routes.get("/", (req, res) => res.send("API operando 🚀"));

routes.post("/usuarios", usuariosController.store);
routes.post("/login", sessaoController.store);

routes.use(authMiddleware);
// Daqui para baixo, tudo é autenticado
/* ---- USUÁRIOS ---- */
routes.put("/usuarios/:id", usuariosController.update);
routes.delete("/usuarios/:id", usuariosController.destroy);
routes.get("/usuarios", usuariosController.index);
routes.get("/usuarios/:id", usuariosController.show);
routes.post(
  "/usuarios/:id/avatar",
  multer(multerConfig).single("file"),
  usuariosController.storeAvatar
);

/* ---- USUÁRIOS ENDEREÇOS ---- */
// -- CRUD Endereço do usuário
routes.post("/usuario/:usr_id/endereco", enderecosUsuarioController.store);
routes.put("/usuario/:usr_id/endereco/:id", enderecosUsuarioController.update);
routes.delete(
  "/usuario/:usr_id/endereco/:id",
  enderecosUsuarioController.destroy
);
routes.get("/usuario/:usr_id/enderecos", enderecosUsuarioController.index);
// -- Todos os endereços de um usuário
routes.get("/usuario/:usr_id/enderecos/:id", enderecosUsuarioController.show);

module.exports = routes;
