const knex = require("../../config/database");

const { Model } = require("objection");

Model.knex(knex);

const Usuario = require("./usuarios");

class EnderecosUsuario extends Model {
  static get tableName() {
    return "usuario_enderecos";
  }

  static get relationMappings() {
    return {
      usuario: {
        relation: Model.BelongsToOneRelation,
        modelClass: Usuario,
        join: {
          from: "usuario_enderecos.usr_id",
          to: "usuarios.id"
        }
      }
    };
  }
}

module.exports = EnderecosUsuario;
