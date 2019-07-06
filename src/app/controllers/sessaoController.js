const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sessaoValidator = require("../validators/sessaoValidator");

const response = require("../../config/responsePattern");
const usuariosModel = require("../models/usuarios");
const authConfig = require("../../config/auth");

class SessionController {
  async store(req, res, next) {
    const { body } = req;
    //Valida schema de dados
    const { error } = sessaoValidator.validate(body);

    if (error) {
      response.statusCode = 400;
      response.message = error.message;
      next(response);
      return;
    }

    const { email, senha } = body;

    const usuario = await usuariosModel
      .query()
      .where({ email })
      .first();

    if (!usuario) {
      response.statusCode = 400;
      response.message = "usuário não encontrado";
      next(response);
      return;
    }

    const { id } = usuario;

    const senhaOk = await bcrypt.compare(senha, usuario.senha);

    if (!senhaOk) {
      response.statusCode = 400;
      response.message = "senha inválida";
      next(response);
      return;
    }

    const token = await jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expired
    });

    response.statusCode = 200;
    response.data = { token: token };
    next(response);
    return;
  }
}

module.exports = new SessionController();
