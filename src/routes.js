const express = require("express");
const multer = require("multer");
const multerConfig = require("./config/multer");
const routes = express.Router();

const authMiddleware = require("./app/middlewares/auth");

const usuariosController = require("./app/controllers/usuariosController");
const senhaUsuarioController = require("./app/controllers/senhaUsuarioController");
const enderecosUsuarioController = require("./app/controllers/enderecosUsuarioController");
const sessaoController = require("./app/controllers/sessaoController");
const agendamentoFilasController = require("./app/controllers/agendamentoFilasController");

routes.get("/", (req, res) => res.send("API operando 🚀"));

routes.post("/usuarios", usuariosController.store);
routes.post("/login", sessaoController.store);

/* ---- RECUPERAÇÃO DE SENHA ---- */
routes.post("/usuario/recuperarsenha", senhaUsuarioController.recuperarSenha);
routes.post("/usuario/trocarsenha/:hash", senhaUsuarioController.trocarSenha);

routes.use(authMiddleware);
// Daqui para baixo, tudo é autenticado

/* ---- FILAS ---- */
routes.post("/filas", agendamentoFilasController.store);

/* ---- USUÁRIOS ---- */
routes.get("/usuarios", usuariosController.index);
routes.put("/usuario/:id", usuariosController.update);
routes.delete("/usuario/:id", usuariosController.destroy);
routes.get("/usuario/:id", usuariosController.show);
routes.post(
  "/usuario/:id/avatar",
  multer(multerConfig).single("file"),
  usuariosController.storeAvatar
);

/* ---- USUÁRIO ENDEREÇOS ---- */
// -- CRUD Endereço do usuário
routes.post("/usuario/:usr_id/endereco", enderecosUsuarioController.store);
routes.put("/usuario/:usr_id/endereco/:id", enderecosUsuarioController.update);
routes.delete(
  "/usuario/:usr_id/endereco/:id",
  enderecosUsuarioController.destroy
);
// -- Todos os endereços de um usuário
routes.get("/usuario/:usr_id/enderecos", enderecosUsuarioController.index);
routes.get("/usuario/:usr_id/enderecos/:id", enderecosUsuarioController.show);

module.exports = routes;
