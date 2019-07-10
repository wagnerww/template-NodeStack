const knex = require("../../config/database");

const { Model } = require("objection");

Model.knex(knex);

class Filas extends Model {
  static get tableName() {
    return "filas";
  }
}

module.exports = Filas;
