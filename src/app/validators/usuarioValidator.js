const Joi = require("joi");

const usuarioStore = Joi.object()
  .keys({
    nome: Joi.string()
      .required()
      .error(new Error("nome é obrigatório")),
    email: Joi.string()
      .email()
      .required()
      .error(new Error("e-mail é obrigatório")),
    senha: Joi.string()
      .required()
      .error(new Error("senha é obrigatório"))
  })
  .options({ stripUnknown: true });

const recuperarSenha = Joi.object()
  .keys({
    email: Joi.string()
      .email()
      .required()
      .error(new Error("e-mail é obrigatório"))
  })
  .options({ stripUnknown: true });

module.exports = { usuarioStore, recuperarSenha };
