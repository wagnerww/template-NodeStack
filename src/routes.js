const express = require("express");
const multer = require("multer");
const multerConfig = require("./config/multer");
const routes = express.Router();

const authMiddleware = require("./app/middlewares/auth");

const usuariosController = require("./app/controllers/usuariosController");
const enderecosUsuarioController = require("./app/controllers/enderecosUsuarioController");
const sessaoController = require("./app/controllers/sessaoController");
const agendamentoFilasController = require("./app/controllers/agendamentoFilasController");

routes.get("/", (req, res) => res.send("API operando 🚀"));

routes.post("/usuarios", usuariosController.store);
routes.post("/login", sessaoController.store);

/* ---- RECUPERAÇÃO DE SENHA ---- */
routes.post("/usuario/recuperarsenha", usuariosController.recuperarSenha);

routes.use(authMiddleware);
routes.get("/usuarios", usuariosController.index);

// Daqui para baixo, tudo é autenticado

/* ---- FILAS ---- */
routes.post("/filas", agendamentoFilasController.store);

/* ---- USUÁRIO ---- */
routes.put("/usuario", usuariosController.update);
routes.delete("/usuario", usuariosController.destroy);
routes.get("/usuario", usuariosController.show);
routes.post(
  "/usuario/avatar",
  multer(multerConfig).single("file"),
  usuariosController.storeAvatar
);

/* ---- USUÁRIO ENDEREÇOS ---- */
// -- CRUD Endereço do usuário
routes.post("/usuario/endereco", enderecosUsuarioController.store);
routes.put("/usuario/endereco/:id", enderecosUsuarioController.update);
routes.delete("/usuario/endereco/:id", enderecosUsuarioController.destroy);
routes.get("/usuario/enderecos", enderecosUsuarioController.index);
// -- Todos os endereços de um usuário
routes.get("/usuario/enderecos/:id", enderecosUsuarioController.show);

module.exports = routes;
