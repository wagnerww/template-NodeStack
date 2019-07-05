const knex = require("../../config/database");

const { Model } = require("objection");

Model.knex(knex);

class Usuarios extends Model {
  static get tableName() {
    return "usuarios";
  }
}

module.exports = Usuarios;
