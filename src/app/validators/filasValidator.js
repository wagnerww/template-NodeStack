const Joi = require("joi");

const filas = Joi.object()
  .keys({
    tipo: Joi.number()
      .required()
      .error(new Error("Tipo da fila é obrigatório")),
    conteudoJson: Joi.required().error(
      new Error("Conteúdo da fila é obrigatório é obrigatório")
    )
  })
  .options({ stripUnknown: true });

module.exports = filas;
