const knex = require("../../config/database");

const { Model } = require("objection");
Model.knex(knex);

const Enderecos = require("./enderecosUsuario");

class Usuarios extends Model {
  static get tableName() {
    return "usuarios";
  }

  static get relationMappings() {
    return {
      enderecos: {
        relation: Model.HasManyRelation,
        modelClass: Enderecos,
        join: {
          from: "usuarios.id",
          to: "usuario_enderecos.usr_id"
        }
      }
    };
  }
}

module.exports = Usuarios;
